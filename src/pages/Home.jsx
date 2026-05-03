import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LatestInsights from "../components/LatestInsights";
import NewsTicker from "../components/NewsTicker";

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL ANIMATION STYLES  (injected once)
───────────────────────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    :root {
      --blue: #2563eb;
      --cyan: #06b6d4;
      --dark: #0a0f1e;
    }

    .font-display { font-family: 'Syne', sans-serif; }
    .font-body    { font-family: 'DM Sans', sans-serif; }

    /* Scroll-reveal base */
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.75s cubic-bezier(.16,1,.3,1),
                  transform 0.75s cubic-bezier(.16,1,.3,1);
    }
    .reveal.visible { opacity: 1; transform: none; }

    .reveal-left {
      opacity: 0;
      transform: translateX(-32px);
      transition: opacity 0.75s cubic-bezier(.16,1,.3,1),
                  transform 0.75s cubic-bezier(.16,1,.3,1);
    }
    .reveal-left.visible { opacity: 1; transform: none; }

    .reveal-right {
      opacity: 0;
      transform: translateX(32px);
      transition: opacity 0.75s cubic-bezier(.16,1,.3,1),
                  transform 0.75s cubic-bezier(.16,1,.3,1);
    }
    .reveal-right.visible { opacity: 1; transform: none; }

    /* Stagger children */
    .stagger > * { opacity: 0; transform: translateY(24px); }
    .stagger.visible > *:nth-child(1) { animation: fadeUp .6s .05s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(2) { animation: fadeUp .6s .15s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(3) { animation: fadeUp .6s .25s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(4) { animation: fadeUp .6s .35s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(5) { animation: fadeUp .6s .45s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(6) { animation: fadeUp .6s .55s cubic-bezier(.16,1,.3,1) forwards; }

    @keyframes fadeUp {
      to { opacity: 1; transform: none; }
    }

    /* Hero entrance */
    @keyframes heroIn {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: none; }
    }
    .hero-badge  { animation: heroIn .7s .2s cubic-bezier(.16,1,.3,1) both; }
    .hero-h1     { animation: heroIn .8s .4s cubic-bezier(.16,1,.3,1) both; }
    .hero-sub    { animation: heroIn .8s .55s cubic-bezier(.16,1,.3,1) both; }
    .hero-btns   { animation: heroIn .8s .7s cubic-bezier(.16,1,.3,1) both; }
    .hero-stats  { animation: heroIn .8s .85s cubic-bezier(.16,1,.3,1) both; }

    /* Glowing line */
    @keyframes scanline {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }
    .scan-line::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(96,165,250,.5), transparent);
      animation: scanline 3s ease-in-out infinite;
    }

    /* Dot grid pulse */
    @keyframes dotPulse {
      0%, 100% { opacity: .3; }
      50%       { opacity: .7; }
    }

    /* Gradient text shimmer */
    @keyframes shimmer {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    .gradient-text {
      background: linear-gradient(90deg, #60a5fa, #34d399, #60a5fa);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* Card hover lift */
    .card-lift {
      transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                  box-shadow .3s ease,
                  border-color .3s ease;
    }
    .card-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -12px rgba(37,99,235,.12);
    }

    /* Accent line slide */
    .accent-line {
      position: relative;
      overflow: hidden;
    }
    .accent-line::before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      height: 2px;
      width: 0;
      background: linear-gradient(90deg, #2563eb, #06b6d4);
      transition: width .4s cubic-bezier(.16,1,.3,1);
      border-radius: 1px;
    }
    .accent-line:hover::before { width: 100%; }

    /* Ticker */
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ticker-inner { animation: ticker 30s linear infinite; }
    .ticker-inner:hover { animation-play-state: paused; }

    /* Pulse ring */
    @keyframes ring {
      0%   { transform: scale(1);   opacity: .6; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .pulse-ring::before,
    .pulse-ring::after {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px solid #06b6d4;
      animation: ring 2s ease-out infinite;
    }
    .pulse-ring::after { animation-delay: 1s; }

    /* Number counter */
    @keyframes countUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: none; }
    }

    /* Scroll progress bar */
    #scroll-bar {
      position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
      background: linear-gradient(90deg, #2563eb, #06b6d4);
      transform-origin: left;
      transition: width .1s linear;
    }

    /* Industry row */
    .industry-row { position: relative; overflow: hidden; }
    .industry-row::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #2563eb, #06b6d4);
      transform: scaleY(0);
      transform-origin: top;
      transition: transform .3s cubic-bezier(.16,1,.3,1);
    }
    .industry-row:hover::before { transform: scaleY(1); }

    /* Product card orb */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(32px);
      pointer-events: none;
      transition: transform .5s ease;
    }
    .product-card:hover .orb { transform: scale(1.3); }

    /* CTA grid animation */
    @keyframes gridFloat {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-8px); }
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────────────────────────────────────── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────────────────────────────────────── */
const ScrollBar = () => {
  useEffect(() => {
    const bar = document.getElementById("scroll-bar");
    const update = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (bar) bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div id="scroll-bar" />;
};

/* ─────────────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────────────── */
const Icon = ({ d, viewBox = "0 0 24 24", children }) => (
  <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    {d ? <path d={d} /> : children}
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 text-blue-500">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const focusAreas = [
  {
    icon: <Icon><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>,
    title: "Home Automation",
    desc: "Smart lighting, security, climate control, and energy management for modern homes.",
    link: "/home-automation",
    tag: "Residential",
    color: "blue",
  },
  {
    icon: <Icon><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></Icon>,
    title: "IoT-Driven Automation",
    desc: "Connected sensor networks, real-time device orchestration, and edge computing.",
    link: "/iot-driven-automation",
    tag: "Infrastructure",
    color: "cyan",
  },
  {
    icon: <Icon><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></Icon>,
    title: "AI & Generative AI",
    desc: "LLM-powered tools, AI teammates via Agentra, and private enterprise AI platforms.",
    link: "/ai-and-genrative-solutions",
    tag: "Intelligence",
    color: "violet",
  },
  {
    icon: <Icon><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></Icon>,
    title: "Video Analytics",
    desc: "Computer vision for security, crowd analysis, anomaly detection, and monitoring.",
    link: "/video-analytics-and-computer-vision",
    tag: "Vision",
    color: "emerald",
  },
  {
    icon: <Icon><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Icon>,
    title: "AR/VR & Immersive Tech",
    desc: "Extended reality solutions for training, retail, and enterprise visualization.",
    link: "/arvr-and-immersive-technologies",
    tag: "Immersive",
    color: "orange",
  },
  {
    icon: <Icon><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>,
    title: "Digital Transformation",
    desc: "End-to-end digitization of operations, workflows, and enterprise data pipelines.",
    link: "/digital-transformation-systems",
    tag: "Enterprise",
    color: "blue",
  },
];

const colorMap = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-600",    border: "group-hover:border-blue-200",   shadow: "group-hover:shadow-blue-100"   },
  cyan:    { bg: "bg-cyan-50",    text: "text-cyan-600",    border: "group-hover:border-cyan-200",   shadow: "group-hover:shadow-cyan-100"   },
  violet:  { bg: "bg-violet-50",  text: "text-violet-600",  border: "group-hover:border-violet-200", shadow: "group-hover:shadow-violet-100" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "group-hover:border-emerald-200",shadow: "group-hover:shadow-emerald-100"},
  orange:  { bg: "bg-orange-50",  text: "text-orange-600",  border: "group-hover:border-orange-200", shadow: "group-hover:shadow-orange-100" },
};

const industries = [
  { name: "Healthcare & MedTech",       tag: "HealNet",              link: "/healnet",                    desc: "AI-powered health monitoring and diagnostic tools",   num: "01" },
  { name: "Financial Technology",        tag: "Finexo",               link: "/finexo",                     desc: "Smart financial management and analytics",            num: "02" },
  { name: "Residential & Hospitality",   tag: "Home · Hotel · Office",link: "/home-automation",            desc: "Automated living and working environments",           num: "03" },
  { name: "Industrial Automation",       tag: "IoT",                  link: "/iot-driven-automation",      desc: "Connected manufacturing and process control",         num: "04" },
  { name: "Enterprise & Education",      tag: "AI · AR/VR",           link: "/ai-and-genrative-solutions", desc: "Intelligent tools for knowledge-driven sectors",      num: "05" },
];

const pillars = [
  { num: "01", title: "Sustainability", desc: "Eco-friendly, energy-efficient technologies engineered for long-term environmental and operational impact." },
  { num: "02", title: "Innovation",     desc: "Smart systems that learn, adapt, and evolve — built on AI, IoT, and continuous research and development." },
  { num: "03", title: "Collaboration",  desc: "Deep partnerships with enterprises, universities, and R&D labs to accelerate digital transformation across India." },
];

const stats = [
  { value: "6+",       label: "Technology domains" },
  { value: "3+",       label: "Active products" },
  { value: "PAN India",label: "Market reach" },
];

const products = [
  {
    slug: "/finexo",
    pill: "FinTech",
    name: "Finexo",
    desc: "Smart financial management and expense tracking for individuals and businesses.",
    from: "from-blue-50", orbColor: "#bfdbfe",
    pillStyle: "bg-blue-100 text-blue-700",
    cta: "text-blue-600",
    border: "hover:border-blue-200 hover:shadow-blue-50",
    features: ["Expense tracking", "Smart budgeting", "Analytics dashboard"],
  },
  {
    slug: "/healnet",
    pill: "HealthTech",
    name: "HealNet",
    desc: "AI-powered health monitoring, diagnostics, and patient management systems.",
    from: "from-emerald-50", orbColor: "#a7f3d0",
    pillStyle: "bg-emerald-100 text-emerald-700",
    cta: "text-emerald-600",
    border: "hover:border-emerald-200 hover:shadow-emerald-50",
    features: ["Remote monitoring", "AI diagnostics", "Patient records"],
  },
  {
    slug: "/agentra",
    pill: "AI Platform",
    name: "Agentra",
    desc: "AI teammates for business — autonomous agents that handle tasks end-to-end.",
    from: "from-violet-50", orbColor: "#ddd6fe",
    pillStyle: "bg-violet-100 text-violet-700",
    cta: "text-violet-600",
    border: "hover:border-violet-200 hover:shadow-violet-50",
    features: ["Autonomous agents", "Workflow automation", "Enterprise ready"],
  },
];

const partnerCards = [
  { icon: "🏫", title: "Academic Collaboration", desc: "Joint research with universities and technology institutes to advance IoT–AI integration." },
  { icon: "🏭", title: "Industry Alliances",      desc: "Working with manufacturing, healthcare, and automation sectors to build scalable smart solutions." },
  { icon: "🌐", title: "Innovation Ecosystem",    desc: "Partnering with startups and R&D labs to foster digital transformation across India." },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
const Eyebrow = ({ children, light = false }) => (
  <span className={`font-display text-[11px] font-bold tracking-[0.18em] uppercase ${light ? "text-cyan-300" : "text-blue-600"}`}>
    {children}
  </span>
);

const SectionDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6 sm:mx-10" />
);

const SectionHeader = ({ eyebrow, title, sub, light = false, center = false }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal flex flex-col gap-3 mb-10 ${center ? "text-center items-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={`font-display text-3xl sm:text-4xl font-bold leading-[1.12] tracking-[-0.02em] ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {sub && (
        <p className={`text-base leading-relaxed max-w-[540px] font-body ${light ? "text-white/60" : "text-gray-500"} ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   FOCUS CARD
───────────────────────────────────────────────────────────────────────────── */
const FocusCard = ({ icon, title, desc, link, tag, color }) => {
  const c = colorMap[color] || colorMap.blue;
  return (
    <Link
      to={link}
      className={`group accent-line relative flex flex-col gap-4 p-7 bg-white hover:bg-gradient-to-br hover:from-slate-50/80 hover:to-white transition-all duration-300 no-underline text-inherit overflow-hidden card-lift border-b border-r border-gray-100`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold tracking-widest uppercase text-gray-300 group-hover:${c.text} transition-colors duration-300 pt-1 font-display`}>
          {tag}
        </span>
      </div>
      <div>
        <h3 className="font-display text-[16px] font-semibold leading-snug text-gray-900 mb-2">{title}</h3>
        <p className="font-body text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
      <div className={`flex items-center gap-1.5 ${c.text} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 mt-auto font-display`}>
        Learn more <ArrowRight />
      </div>
    </Link>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   INDUSTRY ROW
───────────────────────────────────────────────────────────────────────────── */
const IndustryRow = ({ name, tag, link, desc, num }) => (
  <Link
    to={link}
    className="industry-row group flex items-center justify-between px-7 py-5 bg-white hover:bg-gray-50/60 border-b border-gray-100 last:border-b-0 transition-all duration-200 no-underline text-inherit"
  >
    <div className="flex items-center gap-5">
      <span className="font-display text-[11px] font-bold text-gray-300 tracking-widest w-6">{num}</span>
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-[17px] font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{name}</span>
        <span className="font-body text-xs text-gray-400">{desc}</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="hidden sm:block font-display text-[11px] font-bold tracking-wider text-blue-500/70 uppercase bg-blue-50 px-2.5 py-1 rounded-full">
        {tag}
      </span>
      <span className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1.5 transition-all duration-200 text-lg">→</span>
    </div>
  </Link>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MISSION PILLAR
───────────────────────────────────────────────────────────────────────────── */
const MissionPillar = ({ num, title, desc }) => (
  <div className="bg-white p-8 group hover:bg-gradient-to-b hover:from-blue-50/40 hover:to-white transition-all duration-400 relative overflow-hidden">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: "radial-gradient(ellipse at top left, rgba(37,99,235,.04), transparent 70%)" }} />
    <div className="font-display text-[11px] font-bold tracking-[0.18em] text-blue-400/50 mb-5">{num}</div>
    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded mb-5 group-hover:w-14 transition-all duration-400" />
    <h3 className="font-display text-[17px] font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="font-body text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────────────────────────────── */
const ProductCard = ({ slug, pill, name, desc, from, orbColor, pillStyle, cta, border, features }) => (
  <Link
    to={slug}
    className={`product-card group relative flex flex-col justify-between p-7 rounded-2xl border border-gray-100 bg-gradient-to-br ${from} to-white ${border} hover:shadow-xl transition-all duration-400 no-underline overflow-hidden card-lift`}
  >
    <div className="orb w-40 h-40 top-0 right-0 -translate-y-10 translate-x-10" style={{ background: orbColor, opacity: .35 }} />
    <div className="relative">
      <div className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase mb-5 font-display ${pillStyle}`}>
        {pill}
      </div>
      <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="font-body text-sm text-gray-500 leading-relaxed mb-5">{desc}</p>
      <ul className="flex flex-col gap-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-body">
            <CheckIcon />{f}
          </li>
        ))}
      </ul>
    </div>
    <div className={`flex items-center gap-1.5 ${cta} text-sm font-semibold mt-6 group-hover:gap-3 transition-all duration-200 font-display`}>
      Learn more <ArrowRight />
    </div>
  </Link>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
const Home = () => {
  const aboutRef  = useReveal();
  const focusRef  = useReveal(0.05);
  const prodRef   = useReveal(0.05);
  const indRef    = useReveal();
  const missionRef= useReveal();
  const visionRef = useReveal();

  return (
    <div className="bg-white font-body overflow-x-hidden">
      <GlobalStyles />
      <ScrollBar />
      <NewsTicker />

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative text-white min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Video */}
        <video autoPlay loop playsInline muted
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-105"
          style={{ filter: "brightness(.85) saturate(1.1)" }}>
          <source src="/assets/Smart_home_transition_202603221919.mp4" type="video/mp4" />
        </video>

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(0,0,0,.5) 100%)" }} />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 z-[1] opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />

        {/* Content */}
        <div className="relative z-10 max-w-[960px] w-full mx-auto text-center px-5">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full mb-9">
            <div className="relative w-2 h-2 pulse-ring">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            </div>
            <span className="font-display text-xs font-bold text-white/85 tracking-[0.15em] uppercase">
              IoT · AI · Automation · PAN India
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-h1 font-display text-4xl sm:text-5xl md:text-[66px] font-bold leading-[1.06] tracking-[-0.03em] text-white mb-6">
            Intelligent systems<br />
            for{" "}
            <span className="gradient-text">connected environments</span>
          </h1>

          {/* Sub */}
          <p className="hero-sub font-body text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-[620px] mx-auto mb-11 font-light">
            Bridging the gap between the physical and digital worlds through
            IoT, AI, and intelligent automation — built for modern India.
          </p>

          {/* Buttons */}
          <div className="hero-btns flex gap-3 justify-center flex-wrap">
            <Link to="/solutions"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-50 transition-all duration-200 no-underline shadow-2xl shadow-black/25 hover:-translate-y-1 hover:shadow-3xl font-display">
              Explore Solutions <ArrowRight />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/8 backdrop-blur-xl text-white border border-white/20 rounded-full text-sm font-bold hover:bg-white/15 hover:border-white/30 transition-all duration-200 no-underline hover:-translate-y-1 font-display">
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats flex gap-8 sm:gap-20 justify-center mt-16 pt-10 border-t border-white/12 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                  {s.value}
                </div>
                <div className="font-display text-[10px] text-white/45 mt-1.5 tracking-[0.15em] font-bold uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-35">
          <span className="font-display text-[9px] tracking-[0.2em] uppercase text-white/60">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/70 animate-pulse" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="flex gap-16 items-start flex-col lg:flex-row">
          <div ref={aboutRef} className="reveal-left flex-1 min-w-0">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-gray-900 mt-3 mb-6">
              Built at the intersection of<br />hardware and intelligence
            </h2>
            <p className="font-body text-base text-gray-500 leading-relaxed mb-4">
              IoTrenetics Solutions Pvt. Ltd. is an innovative technology startup
              working at the intersection of IoT, AI, Generative AI, AR/VR, and
              Digital Transformation.
            </p>
            <p className="font-body text-base text-gray-500 leading-relaxed mb-8">
              Our mission is to build intelligent, connected, and sustainable
              systems that empower industries and communities across India to
              make smarter decisions.
            </p>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-sm font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 no-underline font-display hover:-translate-y-0.5">
              Our Story <ArrowRight />
            </Link>
          </div>

          <div className="reveal-right flex-1 min-w-0 grid grid-cols-2 gap-3" ref={useReveal()}>
            {[
              { label: "Stage",        value: "Early stage startup" },
              { label: "Focus",        value: "IoT + AI" },
              { label: "Headquarters", value: "India" },
              { label: "Products",     value: "Finexo · HealNet · Agentra", wide: true },
            ].map((item, i) => (
              <div key={i}
                className={`p-5 border border-gray-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/20 transition-all duration-300 card-lift ${item.wide ? "col-span-2" : ""}`}>
                <div className="font-display text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-2">{item.label}</div>
                <div className="font-display text-[16px] font-semibold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════════════════
          CORE FOCUS AREAS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="solutions" className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <SectionHeader eyebrow="What we build" title="Core focus areas" />
          <Link to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 no-underline hover:text-blue-800 transition-colors mb-10 font-display shrink-0">
            View all <ArrowRight />
          </Link>
        </div>

        <div ref={focusRef}
          className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {focusAreas.map((item, i) => (
            <FocusCard key={i} {...item} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════════════════
          PRODUCTS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeader
          eyebrow="Our products"
          title="Built to solve real problems"
          sub="From personal finance to healthcare — each product is a focused solution to a specific industry challenge."
        />
        <div ref={prodRef} className="stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p, i) => <ProductCard key={i} {...p} />)}
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════════════════
          INDUSTRIES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeader eyebrow="Where we operate" title="Industries we serve" />
        <div ref={indRef} className="reveal border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {industries.map((item, i) => <IndustryRow key={i} {...item} />)}
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════════════════
          MISSION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <SectionHeader
          eyebrow="Our purpose"
          title="Mission & vision"
          sub="To empower businesses and communities with IoT and AI-driven solutions that make India smarter, safer, and more connected."
        />
        <div ref={missionRef}
          className="stagger grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {pillars.map((p, i) => <MissionPillar key={i} {...p} />)}
        </div>
      </section>

      <SectionDivider />

      {/* ════════════════════════════════════════════════════════════════════
          VISION / PARTNERS  (dark panel)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #060d1f 0%, #0d1f3c 50%, #061221 100%)" }}>
        {/* Background dot grid */}
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative max-w-[1120px] mx-auto px-6 sm:px-10">
          <SectionHeader
            light
            eyebrow="Our vision"
            title="Building the future together"
            sub="IoTrenetics was founded with the vision of building intelligent systems that seamlessly connect the physical and digital worlds."
          />

          <div ref={visionRef}
            className="stagger grid grid-cols-1 md:grid-cols-3 gap-5">
            {partnerCards.map((card, i) => (
              <div key={i}
                className="bg-white/4 backdrop-blur-sm border border-white/8 rounded-2xl p-7 hover:bg-white/8 hover:border-white/15 transition-all duration-300 card-lift">
                <div className="text-2xl mb-5">{card.icon}</div>
                <h3 className="font-display text-[16px] font-semibold text-white mb-3">{card.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          LATEST INSIGHTS
      ════════════════════════════════════════════════════════════════════ */}
      <LatestInsights />

      {/* ════════════════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div
          className="relative rounded-3xl overflow-hidden px-8 sm:px-16 py-20 text-white text-center"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0e7490 100%)" }}>

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[.07]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff, transparent 70%)", filter: "blur(40px)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)", filter: "blur(40px)", transform: "translate(-30%, 30%)" }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-7">
              <div className="relative w-1.5 h-1.5 pulse-ring">
                <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full" />
              </div>
              <span className="font-display text-xs font-bold text-white/75 tracking-[0.15em] uppercase">PAN India</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Ready to build something<br />intelligent?
            </h2>
            <p className="font-body text-white/65 text-base leading-relaxed max-w-[500px] mx-auto mb-12">
              Whether you're exploring home automation or enterprise AI,
              we'd love to talk about what's possible for your business.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 rounded-full text-sm font-bold hover:bg-gray-50 transition-all duration-200 no-underline shadow-xl hover:-translate-y-1 font-display">
                Contact Us <ArrowRight />
              </Link>
              <Link to="/solutions"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/25 rounded-full text-sm font-bold hover:bg-white/18 transition-all duration-200 no-underline hover:-translate-y-1 font-display">
                View Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
