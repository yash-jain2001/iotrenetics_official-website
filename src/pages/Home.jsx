import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LatestInsights from "../components/LatestInsights";
import NewsTicker from "../components/NewsTicker";

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    /* ── Scroll reveal ── */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
    }
    .reveal.visible { opacity: 1; transform: none; }

    .reveal-left {
      opacity: 0; transform: translateX(-28px);
      transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
    }
    .reveal-left.visible { opacity: 1; transform: none; }

    .reveal-right {
      opacity: 0; transform: translateX(28px);
      transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
    }
    .reveal-right.visible { opacity: 1; transform: none; }

    /* ── Stagger ── */
    .stagger > * { opacity: 0; transform: translateY(20px); }
    .stagger.visible > *:nth-child(1) { animation: su .6s .04s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(2) { animation: su .6s .12s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(3) { animation: su .6s .20s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(4) { animation: su .6s .28s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(5) { animation: su .6s .36s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(6) { animation: su .6s .44s cubic-bezier(.16,1,.3,1) forwards; }
    @keyframes su { to { opacity: 1; transform: none; } }

    /* ── Hero animations ── */
    @keyframes heroIn {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: none; }
    }
    .h-badge { animation: heroIn .8s .15s cubic-bezier(.16,1,.3,1) both; }
    .h-title { animation: heroIn .9s .3s  cubic-bezier(.16,1,.3,1) both; }
    .h-sub   { animation: heroIn .8s .48s cubic-bezier(.16,1,.3,1) both; }
    .h-btns  { animation: heroIn .8s .62s cubic-bezier(.16,1,.3,1) both; }
    .h-stats { animation: heroIn .8s .78s cubic-bezier(.16,1,.3,1) both; }

    /* ── Gradient text shimmer ── */
    @keyframes shimmer {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    .shimmer-text {
      background: linear-gradient(90deg, #60a5fa, #34d399, #60a5fa);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* ── Pulse rings on badge dot ── */
    @keyframes ring {
      0%   { transform: scale(1);   opacity: .7; }
      100% { transform: scale(2.4); opacity: 0;  }
    }
    .pulse-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .pulse-ring::before,
    .pulse-ring::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid #06b6d4;
      animation: ring 2.2s ease-out infinite;
    }
    .pulse-ring::after { animation-delay: 1.1s; }

    /* ── Card lift ── */
    .card-lift {
      transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                  box-shadow .3s ease, border-color .25s ease;
    }
    .card-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 48px -12px rgba(37,99,235,.13);
    }

    /* ── Focus card accent line ── */
    .focus-card { position: relative; overflow: hidden; }
    .focus-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, #2563eb, #06b6d4);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .35s cubic-bezier(.16,1,.3,1);
    }
    .focus-card:hover::before { transform: scaleX(1); }

    /* ── Industry row left bar ── */
    .ind-row { position: relative; overflow: hidden; }
    .ind-row::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #2563eb, #06b6d4);
      transform: scaleY(0);
      transform-origin: top;
      border-radius: 0 2px 2px 0;
      transition: transform .3s cubic-bezier(.16,1,.3,1);
    }
    .ind-row:hover::before { transform: scaleY(1); }

    /* ── Pillar hover line expand ── */
    .pillar-line {
      width: 28px; height: 2px;
      background: linear-gradient(90deg, #2563eb, #06b6d4);
      border-radius: 2px;
      transition: width .35s cubic-bezier(.16,1,.3,1);
    }
    .pillar:hover .pillar-line { width: 52px; }

    /* ── Scroll progress bar ── */
    #spb {
      position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
      background: linear-gradient(90deg, #2563eb, #06b6d4);
      pointer-events: none;
    }

    /* ── Scroll hint pulse ── */
    @keyframes scrollHint {
      0%, 100% { opacity: .25; transform: translateY(0); }
      50%       { opacity: .6;  transform: translateY(6px); }
    }
    .scroll-hint { animation: scrollHint 2s ease-in-out infinite; }

    /* ── Orb float ── */
    @keyframes orbFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50%       { transform: translateY(-16px) scale(1.04); }
    }

    /* ── Number count‑up ── */
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: none; }
    }
    .count-item { animation: countUp .6s cubic-bezier(.16,1,.3,1) both; }

    /* ── Vision dark section noise texture ── */
    .noise {
      position: absolute; inset: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: 0.4;
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────────────────────────────────────── */
const ScrollBar = () => {
  useEffect(() => {
    const bar = document.getElementById("spb");
    const update = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (bar) bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div id="spb" style={{ width: 0 }} />;
};

/* ─────────────────────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────────────────────────────────────── */
const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ─────────────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────────────── */
const ArrowRight = ({ size = 4 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={`w-${size} h-${size} shrink-0`}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const focusAreas = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Home Automation",
    desc: "Smart lighting, security, climate control, and energy management for modern homes.",
    link: "/home-automation", tag: "Residential",
    iconBg: "bg-blue-50", iconColor: "text-blue-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
      </svg>
    ),
    title: "IoT-Driven Automation",
    desc: "Connected sensor networks, real-time device orchestration, and edge computing.",
    link: "/iot-driven-automation", tag: "Infrastructure",
    iconBg: "bg-cyan-50", iconColor: "text-cyan-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>
      </svg>
    ),
    title: "AI & Generative AI",
    desc: "LLM-powered tools, Agentra AI teammates, and private enterprise AI platforms.",
    link: "/ai-and-genrative-solutions", tag: "Intelligence",
    iconBg: "bg-violet-50", iconColor: "text-violet-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Video Analytics",
    desc: "Computer vision for security, crowd analysis, anomaly detection, and monitoring.",
    link: "/video-analytics-and-computer-vision", tag: "Vision",
    iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "AR/VR & Immersive Tech",
    desc: "Extended reality for training, retail, and enterprise visualization.",
    link: "/arvr-and-immersive-technologies", tag: "Immersive",
    iconBg: "bg-orange-50", iconColor: "text-orange-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Digital Transformation",
    desc: "End-to-end digitization of operations, workflows, and enterprise data pipelines.",
    link: "/digital-transformation-systems", tag: "Enterprise",
    iconBg: "bg-blue-50", iconColor: "text-blue-600",
  },
];

const industries = [
  { num: "01", name: "Healthcare & MedTech",     tag: "HealNet",               link: "/healnet",                    desc: "AI-powered health monitoring and diagnostics" },
  { num: "02", name: "Financial Technology",      tag: "Finexo",                link: "/finexo",                     desc: "Smart financial management and analytics" },
  { num: "03", name: "Residential & Hospitality", tag: "Home · Hotel · Office", link: "/home-automation",            desc: "Automated living and working environments" },
  { num: "04", name: "Industrial Automation",     tag: "IoT",                   link: "/iot-driven-automation",      desc: "Connected manufacturing and process control" },
  { num: "05", name: "Enterprise & Education",    tag: "AI · AR/VR",            link: "/ai-and-genrative-solutions", desc: "Intelligent tools for knowledge-driven sectors" },
];

const pillars = [
  { num: "01", title: "Sustainability", desc: "Eco-friendly, energy-efficient technologies engineered for long-term environmental and operational impact." },
  { num: "02", title: "Innovation",     desc: "Smart systems that learn, adapt, and evolve — built on AI, IoT, and continuous research and development." },
  { num: "03", title: "Collaboration",  desc: "Deep partnerships with enterprises, universities, and R&D labs to accelerate digital transformation across India." },
];

const stats = [
  { value: "6+",        label: "Technology domains" },
  { value: "3+",        label: "Active products" },
  { value: "PAN India", label: "Market reach" },
];

const products = [
  {
    slug: "/finexo",   pill: "FinTech",     name: "Finexo",
    desc: "Smart financial management and expense tracking for individuals and businesses.",
    gradient: "from-blue-50 to-white", orbColor: "#bfdbfe",
    pillCls: "bg-blue-100 text-blue-700", ctaCls: "text-blue-600",
    borderHover: "hover:border-blue-200", shadowHover: "hover:shadow-blue-100/60",
    features: ["Expense tracking", "Smart budgeting", "Analytics dashboard"],
  },
  {
    slug: "/healnet",  pill: "HealthTech",  name: "HealNet",
    desc: "AI-powered health monitoring, diagnostics, and patient management systems.",
    gradient: "from-emerald-50 to-white", orbColor: "#a7f3d0",
    pillCls: "bg-emerald-100 text-emerald-700", ctaCls: "text-emerald-600",
    borderHover: "hover:border-emerald-200", shadowHover: "hover:shadow-emerald-100/60",
    features: ["Remote monitoring", "AI diagnostics", "Patient records"],
  },
  {
    slug: "/agentra",  pill: "AI Platform", name: "Agentra",
    desc: "AI teammates for business — autonomous agents that handle tasks end-to-end.",
    gradient: "from-violet-50 to-white", orbColor: "#ddd6fe",
    pillCls: "bg-violet-100 text-violet-700", ctaCls: "text-violet-600",
    borderHover: "hover:border-violet-200", shadowHover: "hover:shadow-violet-100/60",
    features: ["Autonomous agents", "Workflow automation", "Enterprise ready"],
  },
];

const visionCards = [
  { icon: "🏫", title: "Academic Collaboration", desc: "Joint research with universities and tech institutes to advance IoT–AI integration across India." },
  { icon: "🏭", title: "Industry Alliances",      desc: "Working with manufacturing, healthcare, and automation sectors to build scalable smart solutions." },
  { icon: "🌐", title: "Innovation Ecosystem",    desc: "Partnering with startups and R&D labs to foster digital transformation across India." },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED UI COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
const Eyebrow = ({ children, light = false }) => (
  <span style={{ fontFamily: "'Syne', sans-serif" }}
    className={`text-[11px] font-bold tracking-[0.18em] uppercase ${light ? "text-cyan-400" : "text-blue-600"}`}>
    {children}
  </span>
);

const SectionDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6 sm:mx-10" />
);

const SectionHead = ({ eyebrow, title, sub, light = false, center = false, refProp }) => (
  <div ref={refProp} className={`reveal flex flex-col gap-3 mb-10 ${center ? "items-center text-center" : ""}`}>
    <Eyebrow light={light}>{eyebrow}</Eyebrow>
    <h2 style={{ fontFamily: "'Syne', sans-serif" }}
      className={`text-3xl sm:text-4xl font-bold leading-[1.12] tracking-[-0.022em] ${light ? "text-white" : "text-gray-900"}`}>
      {title}
    </h2>
    {sub && (
      <p className={`text-base leading-relaxed max-w-[540px] ${light ? "text-white/55" : "text-gray-500"} ${center ? "mx-auto" : ""}`}>
        {sub}
      </p>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   FOCUS CARD
───────────────────────────────────────────────────────────────────────────── */
const FocusCard = ({ icon, title, desc, link, tag, iconBg, iconColor }) => (
  <Link to={link}
    className="focus-card group flex flex-col gap-4 p-7 bg-white hover:bg-gradient-to-br hover:from-slate-50/70 hover:to-white transition-all duration-300 no-underline text-inherit border-b border-r border-gray-100">
    <div className="flex items-start justify-between">
      <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <span style={{ fontFamily: "'Syne', sans-serif" }}
        className={`text-[10px] font-bold tracking-widest uppercase text-gray-300 group-hover:${iconColor} transition-colors duration-300 pt-1`}>
        {tag}
      </span>
    </div>
    <div>
      <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-[16px] font-semibold text-gray-900 mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
    <div className={`flex items-center gap-1.5 ${iconColor} text-sm font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mt-auto`}
      style={{ fontFamily: "'Syne', sans-serif" }}>
      Learn more <ArrowRight />
    </div>
  </Link>
);

/* ─────────────────────────────────────────────────────────────────────────────
   INDUSTRY ROW
───────────────────────────────────────────────────────────────────────────── */
const IndustryRow = ({ num, name, tag, link, desc }) => (
  <Link to={link}
    className="ind-row group flex items-center justify-between px-7 py-5 bg-white hover:bg-blue-50/30 border-b border-gray-100 last:border-b-0 transition-all duration-200 no-underline text-inherit">
    <div className="flex items-center gap-5">
      <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-[11px] font-bold text-gray-300 tracking-widest w-6">{num}</span>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-[17px] font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span style={{ fontFamily: "'Syne', sans-serif" }}
        className="hidden sm:block text-[10px] font-bold tracking-wider text-blue-500/60 uppercase bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
        {tag}
      </span>
      <span className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1.5 transition-all duration-200 text-base">→</span>
    </div>
  </Link>
);

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────────────────────────────── */
const ProductCard = ({ slug, pill, name, desc, gradient, orbColor, pillCls, ctaCls, borderHover, shadowHover, features }) => (
  <Link to={slug}
    className={`group relative flex flex-col p-7 rounded-2xl border border-gray-100 bg-gradient-to-br ${gradient} ${borderHover} hover:shadow-xl ${shadowHover} transition-all duration-350 no-underline overflow-hidden card-lift`}>
    {/* Orb */}
    <div className="absolute top-0 right-0 w-44 h-44 rounded-full -translate-y-12 translate-x-12 transition-transform duration-500 group-hover:scale-125"
      style={{ background: orbColor, opacity: .3, filter: "blur(24px)" }} />

    <div className="relative flex flex-col flex-1">
      <span className={`inline-flex self-start px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase mb-5 ${pillCls}`}
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {pill}
      </span>
      <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">{desc}</p>
      <ul className="flex flex-col gap-2.5 mb-6">
        {features.map((f, i) => (
          <li key={i} className={`flex items-center gap-2 text-sm ${ctaCls.replace("text-", "text-").replace("600", "500")} font-medium`}>
            <Check /> {f}
          </li>
        ))}
      </ul>
      <div className={`flex items-center gap-2 ${ctaCls} text-sm font-bold mt-auto group-hover:gap-3 transition-all duration-200`}
        style={{ fontFamily: "'Syne', sans-serif" }}>
        Explore <ArrowRight />
      </div>
    </div>
  </Link>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
const Home = () => {
  /* reveal refs */
  const aboutLeftRef  = useReveal();
  const aboutRightRef = useReveal();
  const focusRef      = useReveal(0.04);
  const prodRef       = useReveal(0.04);
  const indRef        = useReveal();
  const missionHRef   = useReveal();
  const missionGRef   = useReveal(0.04);
  const visionHRef    = useReveal();
  const visionGRef    = useReveal(0.04);

  return (
    <div className="bg-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyles />
      <ScrollBar />
      <NewsTicker />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative text-white min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Video */}
        <video autoPlay loop playsInline muted
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ filter: "brightness(.82) saturate(1.15)" }}>
          <source src="/assets/Smart_home_transition_202603221919.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/30 to-black/75" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-blue-950/45 via-transparent to-transparent" />
        <div className="absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 25%, rgba(0,0,0,.55) 100%)" }} />

        {/* Dot grid */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: .18,
          }} />

        {/* Hero content */}
        <div className="relative z-10 max-w-[1000px] w-full mx-auto text-center px-5">
          {/* Badge */}
          <div className="h-badge inline-flex items-center gap-2.5 px-5 py-2 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full mb-9">
            <div className="pulse-ring w-2 h-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-xs font-bold text-white/85 tracking-[0.15em] uppercase">
              IoT · AI · Automation · PAN India
            </span>
          </div>

          {/* H1 */}
          <h1 className="h-title mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}>
            Intelligent systems<br />
            for{" "}
            <span className="shimmer-text">connected environments</span>
          </h1>

          {/* Subheading */}
          <p className="h-sub text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-[620px] mx-auto mb-11 font-light">
            Bridging the gap between the physical and digital worlds through
            IoT, AI, and intelligent automation — built for modern India.
          </p>

          {/* Buttons */}
          <div className="h-btns flex gap-3.5 justify-center flex-wrap">
            <Link to="/solutions"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-50 transition-all duration-200 no-underline shadow-2xl shadow-black/25 hover:-translate-y-1 hover:shadow-3xl"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Explore Solutions <ArrowRight />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/8 backdrop-blur-xl text-white border border-white/20 rounded-full text-sm font-bold hover:bg-white/16 hover:border-white/30 transition-all duration-200 no-underline hover:-translate-y-1"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="h-stats flex gap-10 sm:gap-20 justify-center mt-16 pt-10 border-t border-white/10 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="text-center group cursor-default">
                <div style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                  {s.value}
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-[10px] text-white/40 mt-1.5 tracking-[0.16em] font-bold uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-[9px] tracking-[0.22em] uppercase text-white/40 font-bold">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"
            className="w-5 h-5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="flex gap-16 items-start flex-col lg:flex-row">
          <div ref={aboutLeftRef} className="reveal-left flex-1 min-w-0">
            <Eyebrow>Who we are</Eyebrow>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-3xl sm:text-4xl font-bold leading-[1.12] tracking-[-0.022em] text-gray-900 mt-3 mb-6">
              Built at the intersection of<br />hardware and intelligence
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-4">
              IoTrenetics Solutions Pvt. Ltd. is an innovative technology startup
              working at the intersection of IoT, AI, Generative AI, AR/VR, and
              Digital Transformation.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Our mission is to build intelligent, connected, and sustainable
              systems that empower industries and communities across India to
              make smarter decisions.
            </p>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-sm font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Our Story <ArrowRight />
            </Link>
          </div>

          <div ref={aboutRightRef} className="reveal-right flex-1 min-w-0 grid grid-cols-2 gap-3">
            {[
              { label: "Stage",        value: "Early stage startup" },
              { label: "Focus",        value: "IoT + AI" },
              { label: "Headquarters", value: "India" },
              { label: "Products",     value: "Finexo · HealNet · Agentra", wide: true },
            ].map((item, i) => (
              <div key={i}
                className={`p-5 border border-gray-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/25 transition-all duration-250 card-lift ${item.wide ? "col-span-2" : ""}`}>
                <div style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-2">{item.label}</div>
                <div style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-[16px] font-semibold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          CORE FOCUS AREAS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="solutions" className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <SectionHead eyebrow="What we build" title="Core focus areas" />
          <Link to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 no-underline hover:text-blue-800 transition-colors mb-10"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            View all <ArrowRight />
          </Link>
        </div>
        <div ref={focusRef}
          className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {focusAreas.map((item, i) => <FocusCard key={i} {...item} />)}
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <SectionHead
          eyebrow="Our products"
          title="Built to solve real problems"
          sub="From personal finance to healthcare — each product is a focused solution to a specific industry challenge."
        />
        <div ref={prodRef} className="stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p, i) => <ProductCard key={i} {...p} />)}
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <SectionHead eyebrow="Where we operate" title="Industries we serve" />
        <div ref={indRef} className="reveal border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {industries.map((item, i) => <IndustryRow key={i} {...item} />)}
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          MISSION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <SectionHead
          refProp={missionHRef}
          eyebrow="Our purpose"
          title="Mission & vision"
          sub="To empower businesses and communities with IoT and AI-driven solutions that make India smarter, safer, and more connected."
        />
        <div ref={missionGRef}
          className="stagger grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {pillars.map((p, i) => (
            <div key={i} className="pillar bg-white p-8 hover:bg-gradient-to-b hover:from-blue-50/40 hover:to-white transition-all duration-350 group">
              <div style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-[11px] font-bold tracking-[0.18em] text-blue-400/50 mb-5">{p.num}</div>
              <div className="pillar-line mb-5" />
              <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-[17px] font-semibold text-gray-900 mb-3">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          VISION (DARK)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #060d1f 0%, #0c1e3a 55%, #060d1f 100%)" }}>
        <div className="noise" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[.12] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
        {/* Blobs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,.18), transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,.1), transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative max-w-[1120px] mx-auto px-6 sm:px-10">
          <SectionHead
            light
            refProp={visionHRef}
            eyebrow="Our vision"
            title="Building the future together"
            sub="IoTrenetics was founded with the vision of building intelligent systems that seamlessly connect the physical and digital worlds."
          />
          <div ref={visionGRef} className="stagger grid grid-cols-1 md:grid-cols-3 gap-5">
            {visionCards.map((card, i) => (
              <div key={i}
                className="bg-white/[.04] backdrop-blur-sm border border-white/[.08] rounded-2xl p-7 hover:bg-white/[.08] hover:border-white/15 transition-all duration-300 card-lift">
                <div className="text-2xl mb-5">{card.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif" }}
                  className="text-[16px] font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LATEST INSIGHTS
      ══════════════════════════════════════════════════════════════════ */}
      <LatestInsights />

      {/* ══════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="relative rounded-3xl overflow-hidden px-8 sm:px-16 py-20 text-white text-center"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0e7490 100%)" }}>

          {/* Grid texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[.07]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

          {/* Orbs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,.07), transparent 70%)", filter: "blur(30px)", transform: "translate(25%,-25%)" }} />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,.12), transparent 70%)", filter: "blur(30px)", transform: "translate(-25%,25%)" }} />

          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/18 rounded-full mb-7">
              <div className="pulse-ring w-1.5 h-1.5">
                <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full" />
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-xs font-bold text-white/75 tracking-[0.16em] uppercase">
                PAN India
              </span>
            </div>

            <h2 style={{ fontFamily: "'Syne', sans-serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Ready to build something<br />intelligent?
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-[500px] mx-auto mb-12">
              Whether you're exploring home automation or enterprise AI, we'd love
              to talk about what's possible for your business.
            </p>

            <div className="flex gap-3.5 justify-center flex-wrap">
              <Link to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-700 rounded-full text-sm font-bold hover:bg-gray-50 transition-all duration-200 no-underline shadow-xl hover:-translate-y-1"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Contact Us <ArrowRight />
              </Link>
              <Link to="/solutions"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/22 rounded-full text-sm font-bold hover:bg-white/18 transition-all duration-200 no-underline hover:-translate-y-1"
                style={{ fontFamily: "'Syne', sans-serif" }}>
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
