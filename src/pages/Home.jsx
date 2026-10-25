import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import LatestInsights from "../components/LatestInsights";
import NewsTicker from "../components/NewsTicker";

/* ─── Styles ───────────────────────────────────────────────────────────── */
/* Fonts: headings use Manrope (clear and compact, easy to read on a phone).
   Everything else (buttons, labels, body text) stays in DM Sans like the rest of the site.
   Hero animation classes are prefixed "hero-in-" so they never clash with Tailwind's h-1 … h-5.
   Experience Center classes are prefixed "xc-".
   Hover-only effects sit inside (hover: hover) so they never "stick" on touch screens. */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

    /* Headings only */
    .f-head { font-family: 'Manrope', 'DM Sans', sans-serif; letter-spacing: -0.02em; }

    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity: 1; transform: none; }

    .stagger > * { opacity: 0; transform: translateY(18px); }
    .stagger.visible > * { animation: su .6s cubic-bezier(.16,1,.3,1) forwards; }
    .stagger.visible > *:nth-child(2) { animation-delay: .08s; }
    .stagger.visible > *:nth-child(3) { animation-delay: .16s; }
    .stagger.visible > *:nth-child(4) { animation-delay: .24s; }
    .stagger.visible > *:nth-child(5) { animation-delay: .32s; }
    .stagger.visible > *:nth-child(6) { animation-delay: .4s; }
    @keyframes su { to { opacity: 1; transform: none; } }

    @keyframes heroIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
    .hero-in-1 { animation: heroIn .8s .1s  cubic-bezier(.16,1,.3,1) both; }
    .hero-in-2 { animation: heroIn .9s .22s cubic-bezier(.16,1,.3,1) both; }
    .hero-in-3 { animation: heroIn .8s .36s cubic-bezier(.16,1,.3,1) both; }
    .hero-in-4 { animation: heroIn .8s .48s cubic-bezier(.16,1,.3,1) both; }
    .hero-in-5 { animation: heroIn .8s .6s  cubic-bezier(.16,1,.3,1) both; }

    /* The hero fills the rest of the screen under the header and news ticker, so no white strip shows below it.
       If your header is taller or shorter, change the two rem values (6.5rem on phones, 8.5rem on larger screens). */
    .hero-full { min-height: 32rem; min-height: calc(100vh - 6.5rem); min-height: calc(100svh - 6.5rem); }
    @media (min-width: 640px) {
      .hero-full { min-height: 32rem; min-height: calc(100vh - 8.5rem); min-height: calc(100svh - 8.5rem); }
    }

    .hero-title { text-shadow: 0 2px 24px rgba(0,0,0,.35); }
    .hero-sub   { text-shadow: 0 1px 12px rgba(0,0,0,.45); }

    /* Fluid headline, tuned for ALL CAPS (caps are wider, so the size is smaller and the letters are spaced out):
       about 26px on a 390px phone, 50px on a large screen */
    .hero-h1 { font-size: clamp(1.6rem, 0.9rem + 3.4vw, 3.1rem); font-weight: 800; line-height: 1.18; letter-spacing: 0.02em; }

    @keyframes shimmer { to { background-position: 200% 50%; } }
    .shimmer-text {
      background: linear-gradient(90deg,#60a5fa,#34d399,#a78bfa,#60a5fa);
      background-size: 300% auto;
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-box-decoration-break: clone; box-decoration-break: clone;
      animation: shimmer 5s linear infinite;
      text-shadow: none;
    }

    @keyframes ring { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(2.4); opacity: 0; } }
    .pulse-ring { position: relative; display: inline-flex; }
    .pulse-ring::before { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid #06b6d4; animation: ring 2.2s ease-out infinite; }

    .card-lift { transition: transform .3s ease, box-shadow .3s ease, border-color .25s ease, background-color .25s ease; }
    @media (hover: hover) {
      .card-lift:hover { transform: translateY(-3px); box-shadow: 0 22px 44px -16px rgba(37,99,235,.18); border-color: #bfdbfe; }
    }
    .card-lift:active { transform: scale(.985); }

    #spb { position: fixed; top: 0; left: 0; height: 2px; z-index: 9999; background: linear-gradient(90deg,#2563eb,#06b6d4); pointer-events: none; }

    /* Experience Center showcase */
    @keyframes xc-hl { 0% { opacity: 0; } 4% { opacity: .5; } 14% { opacity: .5; } 18% { opacity: 0; } 100% { opacity: 0; } }
    .xc-hl { opacity: 0; animation: xc-hl 12s ease-in-out infinite; }
    @keyframes xc-lift { 0%, 8% { transform: translateY(0); } 50%, 58% { transform: translateY(-236px); } 100% { transform: translateY(0); } }
    .xc-lift { animation: xc-lift 12s ease-in-out infinite; }
    @keyframes xc-car { from { transform: translateX(-50px); } to { transform: translateX(410px); } }
    .xc-car { animation: xc-car 11s linear infinite; }
    @keyframes xc-float { from { transform: translateY(0); } to { transform: translateY(-8px); } }
    .xc-float { animation: xc-float 3.2s ease-in-out infinite alternate; }
    @keyframes xc-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(96,165,250,.55); } 50% { box-shadow: 0 0 0 12px rgba(96,165,250,0); } }
    .xc-cta { animation: xc-glow 2.4s ease-out infinite; }

    @media (prefers-reduced-motion: reduce) {
      .reveal, .stagger > * { opacity: 1 !important; transform: none !important; transition: none !important; animation: none !important; }
      .hero-in-1,.hero-in-2,.hero-in-3,.hero-in-4,.hero-in-5,.shimmer-text,.pulse-ring::before { animation: none !important; opacity: 1 !important; transform: none !important; }
      .xc-hl { animation: none !important; opacity: .1 !important; }
      .xc-lift, .xc-car, .xc-float, .xc-cta { animation: none !important; }
    }
  `}</style>
);

/* ─── Helpers ──────────────────────────────────────────────────────────── */
const ScrollBar = () => {
  useEffect(() => {
    const bar = document.getElementById("spb");
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (bar && max > 0) bar.style.width = Math.min(100, (window.scrollY / max) * 100) + "%";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div id="spb" style={{ width: 0 }} aria-hidden="true" />;
};

/* Adds "visible" once the element scrolls into view (and stops observing). */
const Reveal = ({ className = "", threshold = 0.1, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("visible");
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -4% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return <div ref={ref} className={className}>{children}</div>;
};

const Icon = ({ children, cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">{children}</svg>
);
const Arrow = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${cls} shrink-0`} aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

const Band = ({ id, tone = "white", children }) => (
  <section id={id} className={tone === "gray" ? "bg-gray-50" : "bg-white"}>
    <div className="max-w-[1120px] mx-auto px-5 sm:px-8 py-12 sm:py-16">{children}</div>
  </section>
);

/* Section heading: small label, then the heading in Manrope */
const Head = ({ eyebrow, title, sub, light = false, center = false }) => (
  <Reveal className={`reveal flex flex-col gap-2.5 mb-7 sm:mb-9 ${center ? "items-center text-center" : ""}`}>
    <span className={`text-[11px] font-bold tracking-[0.16em] uppercase ${light ? "text-cyan-400" : "text-blue-600"}`}>{eyebrow}</span>
    <h2 className={`f-head text-[1.65rem] sm:text-4xl font-extrabold leading-[1.15] ${light ? "text-white" : "text-gray-900"}`}>{title}</h2>
    {sub && <p className={`text-base leading-relaxed max-w-[580px] ${light ? "text-white/60" : "text-gray-500"}`}>{sub}</p>}
  </Reveal>
);

/* ─── Data ─────────────────────────────────────────────────────────────── */

/* Hero: three facts, taken from the Home Automation page */
const trust = ["5-year warranty, extendable to 10", "Stays on your home Wi-Fi", "Works with Alexa & Google Home"];

/* What home automation covers */
const capabilities = [
  { title: "Lights & fans", desc: "They adjust to who is in the room and the time of day.", fg: "text-amber-600", bg: "bg-amber-50", icon: <><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></> },
  { title: "Curtains", desc: "Open and close with the day, or as part of a scene.", fg: "text-violet-600", bg: "bg-violet-50", icon: <><path d="M3 3h18v18H3z" /><path d="M12 3v18M3 9h4M3 15h4M17 9h4M17 15h4" /></> },
  { title: "Doors & locks", desc: "Unlock with an RFID card, PIN or your phone, and lock in step with how you move.", fg: "text-emerald-600", bg: "bg-emerald-50", icon: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></> },
  { title: "Motion lighting", desc: "Your path lights up the moment you walk in.", fg: "text-cyan-600", bg: "bg-cyan-50", icon: <><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49" /></> },
  { title: "Scenes", desc: "Good Morning, Movie, Good Night, Guest, Away and Care.", fg: "text-blue-600", bg: "bg-blue-50", icon: <><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></> },
  { title: "App & voice", desc: "One app for every device, with Alexa and Google Home for voice.", fg: "text-rose-600", bg: "bg-rose-50", icon: <><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" /></> },
];

const studioTools = ["Interactive room demo", "Design your smart panel", "Quote in one WhatsApp message"];

/* The same automation, for other kinds of space */
const spaces = [
  { to: "/hotel-automation", title: "Hotel automation", desc: "Guests control the room from their phone, and staff see every room on one dashboard.", fg: "text-amber-600", bg: "bg-amber-50", icon: <><path d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 21h18M9 21v-6h6v6M8 9h.01M12 9h.01M16 9h.01" /></> },
  { to: "/office-automation", title: "Commercial automation", desc: "Lighting, climate and scenes for offices and other commercial spaces.", fg: "text-indigo-600", bg: "bg-indigo-50", icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></> },
  { to: "/audio-video-automation", title: "Audio & video", desc: "Home theatre and multi-room sound, controlled alongside the rest of the space.", fg: "text-rose-600", bg: "bg-rose-50", icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></> },
];

/* Software products */
const products = [
  { slug: "/finexo", pill: "FinTech", name: "Finexo", desc: "Smart financial management and expense tracking for individuals and businesses.", pillCls: "bg-blue-100 text-blue-700", grad: "from-blue-50 to-white" },
  { slug: "/healnet", pill: "HealthTech", name: "HealNet", desc: "AI-powered health monitoring, diagnostics, and patient management systems.", pillCls: "bg-emerald-100 text-emerald-700", grad: "from-emerald-50 to-white" },
  { slug: "/healsetu", pill: "HealthTech", name: "HealSetu", desc: "Connecting patients and care providers through a seamless digital health platform.", pillCls: "bg-teal-100 text-teal-700", grad: "from-teal-50 to-white" },
  { slug: "/agentra", pill: "AI Platform", name: "Agentra", desc: "AI teammates for business: autonomous agents that handle tasks end-to-end.", pillCls: "bg-violet-100 text-violet-700", grad: "from-violet-50 to-white" },
];

/* Wider technology work (secondary) */
const moreSolutions = [
  { title: "IoT-Driven Automation", link: "/iot-driven-automation", bg: "bg-cyan-50", fg: "text-cyan-600", desc: "Connected sensor networks, real-time device orchestration, and edge computing.", icon: <><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></> },
  { title: "AI & Generative AI", link: "/ai-and-genrative-solutions", bg: "bg-violet-50", fg: "text-violet-600", desc: "LLM-powered tools, Agentra AI teammates, and private enterprise AI platforms.", icon: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" /></> },
  { title: "Video Analytics", link: "/video-analytics-and-computer-vision", bg: "bg-emerald-50", fg: "text-emerald-600", desc: "Computer vision for security, crowd analysis, anomaly detection, and monitoring.", icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></> },
  { title: "AR/VR & Immersive Tech", link: "/arvr-and-immersive-technologies", bg: "bg-orange-50", fg: "text-orange-500", desc: "Extended reality for training, retail, and enterprise visualization.", icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></> },
  { title: "Digital Transformation", link: "/digital-transformation-systems", bg: "bg-blue-50", fg: "text-blue-600", desc: "End-to-end digitization of operations, workflows, and enterprise data pipelines.", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
];

const pillars = [
  { title: "Sustainability", desc: "Energy-efficient technology built for long-term impact." },
  { title: "Innovation", desc: "Systems that learn and adapt, built on AI and IoT." },
  { title: "Collaboration", desc: "Work with enterprises, universities and R&D labs." },
];

/* Experience Center: floors drawn on the mini building, and the quick links */
const MINI_FLOORS = [
  ["HOME", "#3b82f6"],
  ["HOTEL", "#f59e0b"],
  ["OFFICE", "#818cf8"],
  ["GYM", "#34d399"],
  ["DINING", "#fb7185"],
  ["LOBBY", "#94a3b8"],
];

const tryThis = [
  { title: "Smart Home", to: "/experience?floor=home", color: "#3b82f6" },
  { title: "Smart Hotel", to: "/experience?floor=hotel", color: "#f59e0b" },
  { title: "Smart Office", to: "/experience?floor=office", color: "#818cf8" },
  { title: "Smart Parking", to: "/experience?floor=parking", color: "#38bdf8" },
];

/* ─── Experience Center showcase ───────────────────────────────────────── */

/* A small simulated kW readout that drifts a little, like the real page. */
const LiveKw = () => {
  const [v, setV] = useState(57.9);
  useEffect(() => {
    const reduce = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = setInterval(() => {
      setV((p) => Math.max(54, Math.min(61, p + (Math.random() - 0.5) * 1.2)));
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{v.toFixed(1)}</span>;
};

const MiniBuilding = () => (
  <svg viewBox="0 0 360 440" className="w-full h-auto block rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.45)]" style={{ overflow: "hidden" }} role="img" aria-label="A small animated illustration of the IoTrenetics smart building, with floors lighting up one by one">
    <defs>
      <linearGradient id="xc-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a1530" /><stop offset="1" stopColor="#1c2f5e" /></linearGradient>
    </defs>
    <rect width="360" height="440" fill="url(#xc-sky)" />
    {[[24, 30], [300, 52], [330, 24], [60, 80], [250, 18], [200, 40]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.4" fill="#ffffff" opacity=".7" />
    ))}

    {/* Rooftop sign */}
    <rect x="96" y="12" width="168" height="28" rx="7" fill="#ffffff" />
    <text x="180" y="32" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0b1224" fontFamily="system-ui, sans-serif">IoT<tspan fill="#2563eb">renetics</tspan></text>

    {/* Lift shaft */}
    <rect x="282" y="54" width="22" height="276" fill="#0f172a" stroke="#334155" />
    <g className="xc-lift">
      <rect x="285" y="292" width="16" height="34" rx="2" fill="#fbbf24" stroke="#92400e" />
    </g>

    {/* Floors */}
    {MINI_FLOORS.map(([name, color], i) => {
      const y = 54 + i * 46;
      return (
        <g key={name}>
          <rect x="30" y={y} width="244" height="42" fill="#1e293b" stroke="#334155" />
          {[0, 1, 2, 3, 4, 5].map((w) => {
            const lit = (w * 5 + i * 3) % 4 !== 0;
            return <rect key={w} x={40 + w * 38} y={y + 13} width="30" height="22" rx="2" fill={lit ? "#fde68a" : "#334155"} opacity={lit ? 0.85 : 0.6} />;
          })}
          <rect className="xc-hl" style={{ animationDelay: `${i * 2}s` }} x="30" y={y} width="244" height="42" fill={color} />
          <text x="40" y={y + 9} fontSize="8" fontWeight="800" letterSpacing="1.2" fill="#ffffff" opacity=".9" fontFamily="system-ui, sans-serif">{name}</text>
          <circle cx="262" cy={y + 8} r="3" fill={color} />
        </g>
      );
    })}

    {/* Street and the car driving along it */}
    <rect x="0" y="330" width="360" height="8" fill="#334155" />
    <line x1="0" y1="334" x2="360" y2="334" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="10 8" opacity=".5" />
    <g transform="translate(0 338)">
      <g className="xc-car">
        <rect x="0" y="-12" width="30" height="9" rx="3" fill="#ef4444" />
        <rect x="6" y="-18" width="16" height="7" rx="2" fill="#fca5a5" />
        <circle cx="7" cy="-3" r="3" fill="#111827" />
        <circle cx="23" cy="-3" r="3" fill="#111827" />
        <rect x="28" y="-9" width="3" height="3" fill="#fde68a" />
      </g>
    </g>

    {/* Basement: parking and control room */}
    <rect x="0" y="338" width="360" height="102" fill="#17130f" />
    <rect x="30" y="352" width="244" height="64" fill="#0d0b09" stroke="#334155" />
    <text x="40" y="366" fontSize="8" fontWeight="800" letterSpacing="1.2" fill="#7dd3fc" fontFamily="system-ui, sans-serif">PARKING</text>
    <rect x="56" y="388" width="34" height="11" rx="4" fill="#475569" />
    <rect x="62" y="381" width="20" height="9" rx="3" fill="#475569" />
    <circle cx="66" cy="400" r="3.5" fill="#111827" />
    <circle cx="82" cy="400" r="3.5" fill="#111827" />
    <rect x="130" y="388" width="34" height="11" rx="4" fill="#7f1d1d" />
    <rect x="136" y="381" width="20" height="9" rx="3" fill="#7f1d1d" />
    <circle cx="140" cy="400" r="3.5" fill="#111827" />
    <circle cx="156" cy="400" r="3.5" fill="#111827" />
    <rect x="206" y="360" width="60" height="48" rx="3" fill="#0f172a" stroke="#22d3ee" />
    <text x="236" y="372" textAnchor="middle" fontSize="7" fontWeight="800" letterSpacing="1" fill="#67e8f9" fontFamily="system-ui, sans-serif">CONTROL</text>
    {[0, 1, 2].map((r) => <rect key={r} x="214" y={378 + r * 8} width={34 - r * 6} height="3" rx="1.5" fill="#22d3ee" opacity=".8" />)}
  </svg>
);

const ExperienceShowcase = () => (
  <section id="experience" className="relative overflow-hidden" style={{ background: "linear-gradient(150deg, #060d1f 0%, #0c1e3a 55%, #060d1f 100%)" }}>
    <div className="absolute top-0 left-1/4 w-[520px] h-[380px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,.22), transparent 70%)", filter: "blur(60px)" }} aria-hidden="true" />
    <div className="absolute bottom-0 right-0 w-[420px] h-[320px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(6,182,212,.14), transparent 70%)", filter: "blur(60px)" }} aria-hidden="true" />

    <div className="relative max-w-[1120px] mx-auto px-5 sm:px-8 py-12 sm:py-20">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <Reveal className="reveal">
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 bg-white/10 border border-white/15 rounded-full mb-5">
            <span className="pulse-ring w-2 h-2"><span className="block w-2 h-2 bg-cyan-400 rounded-full" /></span>
            <span className="text-[11px] font-bold text-white/85 tracking-[0.14em] uppercase whitespace-nowrap">New · Experience Center</span>
          </div>
          <h2 className="f-head text-[1.7rem] sm:text-5xl font-extrabold leading-[1.12] text-white">
            Don&apos;t read about a smart building. <span className="shimmer-text">Walk into one.</span>
          </h2>
          <p className="mt-4 sm:mt-5 text-white/70 text-base leading-relaxed max-w-[500px]">
            Tap any floor of a simulated building. Start a fire drill, trip a breaker by voice, or watch a car open the gate. No sign-up, and it works on your phone.
          </p>

          <div className="mt-6 sm:mt-7">
            <Link to="/experience" className="xc-cta inline-flex w-full sm:w-auto items-center justify-center gap-2.5 min-h-[48px] px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold no-underline transition-all sm:hover:-translate-y-1">
              Enter the building <Arrow />
            </Link>
          </div>

          {/* Jump straight to one floor */}
          <ul className="mt-6 grid grid-cols-2 gap-2.5 list-none p-0 max-w-[460px]">
            {tryThis.map((t) => (
              <li key={t.title}>
                <Link to={t.to} className="group flex items-center gap-2.5 min-h-[44px] px-4 rounded-full bg-white/[.06] border border-white/10 hover:bg-white/[.12] hover:border-white/25 active:bg-white/[.12] transition-colors no-underline">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: t.color }} aria-hidden="true" />
                  <span className="text-sm font-semibold text-white">{t.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11px] text-white/40">A simulated demonstration. All readings, alerts and people are made up.</p>
        </Reveal>

        <Reveal className="reveal">
          <div className="relative max-w-[300px] sm:max-w-[380px] mx-auto w-full">
            <Link to="/experience" aria-label="Open the Experience Center" className="block no-underline">
              <MiniBuilding />
            </Link>
            <div className="xc-float hidden sm:flex absolute -left-8 top-16 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white shadow-xl pointer-events-none">
              <span className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </span>
              <span>
                <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Building load</span>
                <span className="f-head block text-base font-extrabold text-gray-900 leading-none"><LiveKw /> kW</span>
              </span>
            </div>
            <div className="xc-float hidden sm:flex absolute -right-8 bottom-28 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white shadow-xl pointer-events-none" style={{ animationDelay: "-1.4s" }}>
              <span className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 2s5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z" /></svg>
              </span>
              <span>
                <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Try it</span>
                <span className="f-head block text-sm font-extrabold text-gray-900 leading-none">One-tap fire drill</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─── Page ─────────────────────────────────────────────────────────────── */
const Home = () => (
  <div className="bg-white overflow-x-hidden text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
    <SEO
      title="IoTrenetics Solutions | Smart Living, Made Effortless"
      description="IoTrenetics Solutions designs premium automated experiences for comfort: smart home, hotel and office automation, plus industrial IoT and AI, all private by design."
      url="/"
    />
    <GlobalStyles />
    <ScrollBar />
    <NewsTicker />

    {/* ── Hero: premium automated comfort ── */}
    <section className="hero-full relative flex text-white overflow-hidden bg-slate-950">
      <video
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ filter: "brightness(.78) saturate(1.1)" }}
      >
        <source src="/assets/Smart_home_transition_202603221919.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/45 to-black/85 sm:from-black/70 sm:via-black/35 sm:to-black/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-blue-950/50 via-transparent to-transparent" />

      {/* Bottom padding on phones keeps the buttons clear of the floating WhatsApp and chat bubbles */}
      <div className="relative z-10 w-full max-w-[880px] mx-auto text-center px-5 pt-10 pb-24 sm:py-14 flex flex-col items-center justify-center">
        <div className="hero-in-1 inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full mb-5 sm:mb-6 max-w-full">
          <span className="pulse-ring w-2 h-2 shrink-0"><span className="block w-2 h-2 bg-cyan-400 rounded-full" /></span>
          <span className="text-[11px] sm:text-xs font-bold text-white/90 tracking-[0.12em] sm:tracking-[0.16em] uppercase whitespace-nowrap">Premium comfort automation</span>
        </div>

        {/* ALL CAPS heading. To switch back to normal case, delete the word "uppercase" from the class list below. */}
        <h1 className="hero-in-2 hero-title hero-h1 f-head uppercase mb-4 sm:mb-5">
          Smart living, <span className="shimmer-text">made effortless</span>
        </h1>

        <p className="hero-in-3 hero-sub text-base sm:text-lg text-white/85 leading-relaxed max-w-[580px] mb-7 sm:mb-8">
          A premium automated experience for comfort. Lighting, climate, curtains, locks and scenes that adapt to you, in homes, hotels and offices. Control it all from one app or by voice, privately on your own Wi-Fi.
        </p>

        {/* Two buttons only: the main product, and the live demo */}
        <div className="hero-in-4 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center w-full max-w-[320px] sm:max-w-none mb-8 sm:mb-9">
          <Link to="/home-automation" className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-50 transition-all no-underline shadow-2xl shadow-black/25 sm:hover:-translate-y-1">Explore automation <Arrow /></Link>
          <Link to="/experience?floor=home" className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 bg-blue-600/90 hover:bg-blue-500 text-white border border-blue-300/40 rounded-full text-sm font-bold transition-all no-underline sm:hover:-translate-y-1">
            <span className="pulse-ring w-2 h-2"><span className="block w-2 h-2 bg-cyan-300 rounded-full" /></span>
            Try the live demo
          </Link>
        </div>

        <ul className="hero-in-5 flex flex-wrap justify-center gap-x-6 gap-y-2.5 pt-5 sm:pt-6 border-t border-white/10 w-full max-w-[600px] list-none p-0 m-0">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-white/80">
              <span className="text-cyan-300"><Check /></span>{t}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* ── Home automation ── */}
    <Band id="home-automation">
      <Head eyebrow="Home automation" title="One home, fully in your control" sub="Lights, curtains, doors and scenes that respond to you and to the time of day." />

      <Reveal threshold={0.04} className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {capabilities.map((c) => (
          <div key={c.title} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white">
            <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.fg} flex items-center justify-center shrink-0`}><Icon>{c.icon}</Icon></div>
            <div className="min-w-0">
              <h3 className="f-head text-base font-bold text-gray-900 leading-snug">{c.title}</h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="reveal relative rounded-3xl overflow-hidden text-white px-5 sm:px-12 py-9 sm:py-12 mt-6 sm:mt-8">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0c1e3a 0%, #1d4ed8 60%, #0e7490 100%)" }} />
        <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-7 md:gap-8 items-center">
          <div>
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-cyan-300">Smart Home Studio</span>
            <h3 className="f-head text-[1.5rem] sm:text-3xl font-extrabold leading-[1.15] mt-3 mb-3">Try it before you decide</h3>
            <p className="text-white/75 text-base leading-relaxed mb-6 max-w-[460px]">Run a live room demo, design your own smart panel, and ask for a quote on WhatsApp.</p>
            <Link to="/home-automation" className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 min-h-[48px] px-7 bg-white text-blue-700 rounded-full text-sm font-bold sm:hover:-translate-y-1 transition-all no-underline shadow-xl">Open the studio <Arrow /></Link>
          </div>
          <ul className="flex flex-col gap-2.5 sm:gap-3 list-none p-0 m-0">
            {studioTools.map((t) => (
              <li key={t} className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white/10 border border-white/15 text-sm font-medium"><span className="text-cyan-300"><Check /></span>{t}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Band>

    {/* ── Experience Center ── */}
    <ExperienceShowcase />

    {/* ── The same automation for other spaces ── */}
    <Band tone="gray">
      <Head eyebrow="Beyond the home" title="Automation for hotels, offices and entertainment" />
      <Reveal threshold={0.04} className="stagger grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {spaces.map((s) => (
          <Link key={s.title} to={s.to} className="card-lift group flex flex-col gap-3 p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white no-underline">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.fg} flex items-center justify-center`}><Icon>{s.icon}</Icon></div>
              <span className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"><Arrow /></span>
            </div>
            <h3 className="f-head text-lg font-bold text-gray-900 leading-snug">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </Reveal>
    </Band>

    {/* ── Software products ── */}
    <Band>
      <Head eyebrow="Our products" title="Software for health, finance and AI" />
      <Reveal threshold={0.04} className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((p) => (
          <Link key={p.name} to={p.slug} className={`card-lift group flex flex-col gap-2.5 p-5 sm:p-6 rounded-2xl border border-gray-100 bg-gradient-to-br ${p.grad} no-underline`}>
            <div className="flex items-center justify-between">
              <span className={`self-start px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${p.pillCls}`}>{p.pill}</span>
              <span className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"><Arrow /></span>
            </div>
            <h3 className="f-head text-xl font-extrabold text-gray-900">{p.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
          </Link>
        ))}
      </Reveal>
    </Band>

    {/* ── Wider technology work (secondary) ── */}
    <Band tone="gray">
      <Head eyebrow="Also from IoTrenetics" title="IoT, AI and immersive technology" sub="The same engineering, applied to industry and enterprise." />
      <Reveal className="reveal border border-gray-200 rounded-2xl overflow-hidden bg-white">
        {moreSolutions.map((s) => (
          <Link key={s.title} to={s.link} className="group flex items-center gap-4 px-4 sm:px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 active:bg-slate-50 transition-colors no-underline">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.fg} flex items-center justify-center shrink-0`}><Icon>{s.icon}</Icon></div>
            <div className="min-w-0 flex-1">
              <h3 className="f-head text-[15px] sm:text-base font-bold text-gray-900 leading-snug">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-snug mt-0.5">{s.desc}</p>
            </div>
            <span className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"><Arrow /></span>
          </Link>
        ))}
      </Reveal>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        <Link to="/solutions" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 no-underline min-h-[44px]">All solutions <Arrow /></Link>
        <Link to="/industries" className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 no-underline min-h-[44px]">Industries we serve <Arrow /></Link>
      </div>
    </Band>

    {/* ── About ── */}
    <Band id="about">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        <Reveal className="reveal">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-blue-600">Who we are</span>
          <h2 className="f-head text-[1.65rem] sm:text-4xl font-extrabold leading-[1.15] text-gray-900 mt-3 mb-4">Built at the intersection of hardware and intelligence</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-3">IoTrenetics Solutions Pvt. Ltd. is a technology startup working across home automation, IoT, AI, AR/VR and digital transformation.</p>
          <p className="text-base text-gray-500 leading-relaxed mb-6">We build intelligent, connected, and sustainable systems that help homes, businesses and communities make smarter decisions, faster.</p>
          <Link to="/about" className="inline-flex items-center gap-2 min-h-[46px] px-6 border border-gray-200 rounded-full text-sm font-bold text-gray-800 hover:bg-gray-50 sm:hover:-translate-y-0.5 transition-all no-underline">Our story <Arrow /></Link>
        </Reveal>

        <Reveal className="reveal flex flex-col gap-3">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex items-start gap-4 p-5 border border-gray-100 rounded-2xl bg-white">
              <span className="text-[11px] font-bold tracking-[0.18em] text-blue-400 pt-1 tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="f-head text-base font-bold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Band>

    <LatestInsights />

    {/* ── Closing call to action ── */}
    <Band>
      <Reveal className="reveal relative rounded-3xl overflow-hidden px-5 sm:px-14 py-11 sm:py-14 text-white text-center">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0e7490 100%)" }} />
        <div className="relative">
          <h2 className="f-head text-[1.65rem] sm:text-4xl font-extrabold leading-[1.15] mb-4">Planning a smart home or building?</h2>
          <p className="text-white/75 text-base leading-relaxed max-w-[500px] mx-auto mb-7 sm:mb-8">Tell us about your space and we will help you plan what to automate.</p>
          <Link to="/contact" className="inline-flex w-full sm:w-auto max-w-[320px] items-center justify-center gap-2.5 min-h-[48px] px-9 bg-white text-blue-700 rounded-full text-sm font-bold sm:hover:-translate-y-1 transition-all no-underline shadow-xl">Get a quote <Arrow /></Link>
        </div>
      </Reveal>
    </Band>
  </div>
);

export default Home;
