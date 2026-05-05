import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Neue+Montreal:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    :root {
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-dim: rgba(201,168,76,0.15);
      --dark: #07080a;
      --dark2: #0d0e11;
      --dark3: #111318;
      --off-white: #f0ece4;
      --muted: rgba(240,236,228,0.45);
    }

    * { box-sizing: border-box; }

    .av-page {
      background: var(--dark);
      color: var(--off-white);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }

    /* Custom cursor */
    .av-cursor {
      position: fixed;
      width: 10px; height: 10px;
      background: var(--gold);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background 0.2s;
      mix-blend-mode: difference;
    }
    .av-cursor-ring {
      position: fixed;
      width: 36px; height: 36px;
      border: 1px solid rgba(201,168,76,0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.35s cubic-bezier(.22,.68,0,1.2),
                  height 0.35s cubic-bezier(.22,.68,0,1.2),
                  border-color 0.25s;
    }
    .av-cursor.hover { width: 20px; height: 20px; }
    .av-cursor-ring.hover { width: 64px; height: 64px; border-color: var(--gold); }

    /* Display font */
    .font-display { font-family: 'Instrument Serif', 'Cormorant Garamond', serif; }

    /* ── Hero ── */
    .hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
      background-size: 80px 80px;
      pointer-events: none;
    }

    /* ── Waveform bars ── */
    @keyframes wave {
      0%, 100% { transform: scaleY(0.3); }
      50%       { transform: scaleY(1); }
    }
    .wave-bar {
      width: 3px;
      background: var(--gold);
      border-radius: 3px;
      transform-origin: bottom;
      animation: wave var(--dur, 1.2s) ease-in-out infinite;
      animation-delay: var(--delay, 0s);
      opacity: 0.7;
    }

    /* ── Scroll reveal ── */
    .sr { opacity: 0; transform: translateY(32px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
    .sr.in { opacity: 1; transform: none; }
    .sr-left { opacity: 0; transform: translateX(-32px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
    .sr-left.in { opacity: 1; transform: none; }
    .sr-right { opacity: 0; transform: translateX(32px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
    .sr-right.in { opacity: 1; transform: none; }

    /* ── Gold underline on hover ── */
    .gold-link {
      position: relative;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .gold-link::after {
      content: '';
      position: absolute; bottom: -2px; left: 0; right: 0;
      height: 1px; background: var(--gold);
      transform: scaleX(0); transform-origin: left;
      transition: transform .3s cubic-bezier(.16,1,.3,1);
    }
    .gold-link:hover::after { transform: scaleX(1); }

    /* ── Experience center tab ── */
    .exp-tab {
      position: relative;
      padding: 14px 28px;
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: var(--muted);
      background: transparent;
      cursor: none;
      transition: color .25s, border-color .25s, background .25s;
    }
    .exp-tab.active, .exp-tab:hover {
      color: var(--dark);
      background: var(--gold);
      border-color: var(--gold);
    }
    .exp-tab.active { color: var(--dark); }

    /* ── Soundwave visualizer ── */
    @keyframes pulse-ring-av {
      0%   { transform: scale(1); opacity: .5; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .pulse-av {
      position: relative;
    }
    .pulse-av::before, .pulse-av::after {
      content: '';
      position: absolute; inset: 0; border-radius: 50%;
      border: 1px solid var(--gold);
      animation: pulse-ring-av 2.4s ease-out infinite;
    }
    .pulse-av::after { animation-delay: 1.2s; }

    /* ── Spec card ── */
    .spec-card {
      border: 1px solid rgba(201,168,76,0.12);
      border-radius: 16px;
      background: rgba(255,255,255,0.02);
      transition: border-color .3s, background .3s, transform .35s cubic-bezier(.34,1.56,.64,1);
    }
    .spec-card:hover {
      border-color: rgba(201,168,76,0.4);
      background: rgba(201,168,76,0.04);
      transform: translateY(-4px);
    }

    /* ── Horizontal scroll track ── */
    .hscroll-track {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .hscroll-track::-webkit-scrollbar { display: none; }

    /* ── Number reveal ── */
    @keyframes numReveal {
      from { opacity: 0; transform: translateY(20px) scale(.9); }
      to   { opacity: 1; transform: none; }
    }

    /* ── CTA glow ── */
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 0 32px rgba(201,168,76,0.25); }
      50%       { box-shadow: 0 0 64px rgba(201,168,76,0.45); }
    }
    .cta-glow { animation: ctaGlow 3s ease-in-out infinite; }

    /* ── Grain overlay ── */
    .grain::after {
      content: '';
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
      pointer-events: none; opacity: .5;
    }

    /* ── Section separator ── */
    .av-sep {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 40%, rgba(201,168,76,0.2) 60%, transparent);
    }

    /* ── Mode button ── */
    .mode-btn {
      position: relative; overflow: hidden;
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 12px;
      padding: 20px 24px;
      background: rgba(255,255,255,0.02);
      cursor: none;
      transition: border-color .3s, background .3s;
      text-align: left;
    }
    .mode-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.1), transparent);
      opacity: 0;
      transition: opacity .3s;
    }
    .mode-btn:hover, .mode-btn.active {
      border-color: rgba(201,168,76,0.5);
    }
    .mode-btn:hover::before, .mode-btn.active::before { opacity: 1; }

    /* ── Timeline ── */
    .process-line {
      position: absolute;
      left: 20px; top: 32px; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, var(--gold), transparent);
    }

    /* Image hover zoom */
    .img-zoom { overflow: hidden; border-radius: 20px; }
    .img-zoom img { transition: transform .7s cubic-bezier(.16,1,.3,1); }
    .img-zoom:hover img { transform: scale(1.06); }

    /* Eyebrow */
    .eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--gold);
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────────────────────── */
const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dot.current)  { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
    };
    const over = (e) => {
      if (e.target.closest("a,button,.exp-tab,.mode-btn")) {
        dot.current?.classList.add("hover");
        ring.current?.classList.add("hover");
      } else {
        dot.current?.classList.remove("hover");
        ring.current?.classList.remove("hover");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <>
      <div className="av-cursor" ref={dot} />
      <div className="av-cursor-ring" ref={ring} />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────────────────────── */
const useReveal = (cls = "sr") => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

/* ─────────────────────────────────────────────────────────────────────────────
   WAVEFORM VISUALIZER
───────────────────────────────────────────────────────────────────────────── */
const Waveform = ({ bars = 28, height = 48 }) => (
  <div className="flex items-end gap-[3px]" style={{ height }}>
    {Array.from({ length: bars }).map((_, i) => (
      <div key={i} className="wave-bar flex-1"
        style={{
          "--dur": `${0.8 + Math.random() * 0.8}s`,
          "--delay": `${(i / bars) * 0.8}s`,
          height: `${30 + Math.random() * 70}%`,
        }} />
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const solutions = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    name: "Home Theatre",
    tag: "Cinema",
    desc: "Dolby Atmos surround, 8K projection, and acoustically tuned rooms that rival commercial cinemas.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    name: "Multi-Room Audio",
    tag: "Distributed",
    desc: "Seamless hi-res audio flowing through every zone — synchronized or independent, on demand.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <path d="M12 22V12"/><path d="M8 12h8"/>
      </svg>
    ),
    name: "Outdoor Audio",
    tag: "Weather-proof",
    desc: "Architectural landscape speakers that blend into your garden while delivering studio-grade fidelity.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M9 7h6M9 11h6M9 15h4"/>
      </svg>
    ),
    name: "Media Rooms",
    tag: "Versatile",
    desc: "Gaming, streaming, sports — one room engineered to excel at every immersive experience.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
      </svg>
    ),
    name: "Acoustic Treatment",
    tag: "Science",
    desc: "Room calibration, absorption panels, diffusers, and bass traps for perfect acoustic balance.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    name: "Sound Insulation",
    tag: "Isolation",
    desc: "Structural isolation, decoupled walls, and mass-loaded vinyl to contain sound perfectly.",
  },
];

const expZones = [
  {
    id: "theatre",
    label: "Home Theatre",
    headline: "Step inside a private cinema",
    body: "Our Experience Centre features a fully calibrated Dolby Atmos 7.2.4 theatre room. Sit in a reference listening position and hear the difference between speaker placement, room treatment, and raw output — before you commit to a single rupee.",
    specs: ["Dolby Atmos 7.2.4", "4K laser projection", "Acoustic panels + diffusers", "Reference seating position"],
    color: "from-blue-950/40 to-transparent",
  },
  {
    id: "audio",
    label: "Hi-Fi Listening",
    headline: "Hear what you've been missing",
    body: "A dedicated stereo listening room with TruAudio architectural in-walls and in-ceilings driven by premium amplification. Compare speaker models side-by-side in a properly treated space — not a showroom or a mall.",
    specs: ["TruAudio architectural speakers", "Room EQ Wizard calibration", "A/B switching between models", "Hi-Res FLAC streaming"],
    color: "from-amber-950/40 to-transparent",
  },
  {
    id: "control",
    label: "Smart Control",
    headline: "One touch. Everything.",
    body: "Live demonstration of whole-home audio, motorized shades, lighting scenes, and climate — all triggered from a single button press or voice command. See Control4 and KNX integration working in a real environment.",
    specs: ["Control4 live demo", "Voice + app + keypad control", "Multi-zone scene switching", "Lighting + AV integration"],
    color: "from-violet-950/40 to-transparent",
  },
  {
    id: "insulation",
    label: "Acoustic Lab",
    headline: "The science of silence",
    body: "Walk between our treated and untreated rooms and hear the physical difference acoustic isolation makes. We demonstrate mass-loaded vinyl, decoupled flooring, and absorption coefficients — so you understand exactly what you're buying.",
    specs: ["STC-rated wall assemblies", "Floating floor demo", "Before/after comparison", "Reverberation time measurement"],
    color: "from-emerald-950/40 to-transparent",
  },
];

const features = [
  {
    label: "Visual Excellence",
    title: "Breathtaking Home Theatre",
    body: "Transform any room into a world-class cinema. We combine 4K laser projection, acoustically transparent screens, and Dolby Atmos surround sound to transport you directly into the action. Every material, seat, and surface is chosen for its acoustic and visual contribution.",
    bullets: ["Dolby Atmos 7.2.4 calibration", "Acoustic treatment + diffusion design", "One-touch cinema control", "Light-controlled dedicated room"],
    img: "/assets/av1.png",
    imgAlt: "Home Theatre",
    reverse: false,
  },
  {
    label: "Ubiquitous Sound",
    title: "Whole Home Audio",
    body: "Music that follows you seamlessly — different tracks in every room, or the same symphony throughout the house. Invisible in-ceiling and in-wall speakers deliver extraordinary sound without compromising your interior design.",
    bullets: ["32+ independent audio zones", "Hi-Res FLAC & lossless streaming", "In-wall / in-ceiling architectural install", "App, voice, and keypad control"],
    img: "/assets/av2.png",
    imgAlt: "Whole Home Audio",
    reverse: true,
    stat1: { value: "32+", label: "Audio Zones" },
    stat2: { value: "Hi-Res", label: "Audio Quality" },
  },
];

const whyCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Premium US Brand",
    desc: "TruAudio is a globally recognized leader in architectural audio innovation, trusted by luxury integrators worldwide.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Architectural Design",
    desc: "Speakers that disappear into your walls and ceilings — invisible installations that preserve premium interiors.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "End-to-End Service",
    desc: "From acoustic design and room treatment to installation, calibration, and long-term support — everything in-house.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>
      </svg>
    ),
    title: "Smart Integration",
    desc: "Fully compatible with Control4, KNX, and major smart home ecosystems for unified single-app control.",
  },
];

const procesSteps = [
  { num: "01", title: "Consultation", desc: "We assess your space, lifestyle, and acoustic goals in a detailed discovery session." },
  { num: "02", title: "Acoustic Design", desc: "Room analysis, speaker placement modeling, and treatment design — before a single wall is opened." },
  { num: "03", title: "Experience Demo", desc: "Visit our Experience Centre to hear your proposed setup in a calibrated environment." },
  { num: "04", title: "Installation", desc: "Our certified engineers install, terminate, and calibrate every component with precision." },
  { num: "05", title: "Calibration", desc: "Room EQ Wizard, Dolby Atmos height mapping, and reference-standard tuning for your room." },
];

const modes = [
  { id: "cinema", label: "Cinema Mode", icon: "🎬", desc: "Dolby Atmos activated. Lights dim. Shades close. Pure cinema.", color: "from-blue-600 to-indigo-900" },
  { id: "party",  label: "Party Mode",  icon: "🎉", desc: "Multi-room audio syncs. Volume up. Bass optimized.", color: "from-purple-600 to-pink-900" },
  { id: "relax",  label: "Relax Mode",  icon: "🌿", desc: "Ambient music. 30% volume. Warm light scenes.", color: "from-emerald-700 to-teal-900" },
  { id: "sleep",  label: "Sleep Mode",  icon: "🌙", desc: "Audio fades to silence over 20 minutes. All zones off.", color: "from-slate-700 to-slate-900" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const AudioVideo = () => {
  const [activeZone, setActiveZone] = useState("theatre");
  const [activeMode, setActiveMode] = useState("cinema");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".sr, .sr-left, .sr-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const currentZone = expZones.find((z) => z.id === activeZone);

  return (
    <div className="av-page grain">
      <GlobalStyles />
      <Cursor />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="hero-grid" />

        {/* Parallax bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#07080a] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-35"
            alt="Luxury Home Theatre"
          />
        </motion.div>

        {/* Gold orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none z-[1]"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,.08), transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full pointer-events-none z-[1]"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,.06), transparent 70%)", filter: "blur(50px)" }} />

        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-[960px] mx-auto px-6 flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 border border-[rgba(201,168,76,0.25)] rounded-full bg-[rgba(201,168,76,0.07)] mb-10">
            <Waveform bars={8} height={14} />
            <span className="eyebrow text-[10px]">TruAudio · Premium AV · India</span>
            <Waveform bars={8} height={14} />
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .25, ease: [.16,1,.3,1] }}
            className="font-display text-[clamp(3rem,7.5vw,6.2rem)] font-light leading-[1.02] tracking-[-0.025em] mb-6">
            Experience<br />
            <em className="not-italic" style={{ color: "var(--gold)" }}>Sound.</em>{" "}
            Feel Every<br />
            <span className="text-white/50">Moment.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .44 }}
            className="text-base md:text-lg text-white/50 max-w-[520px] leading-relaxed mb-10">
            Architectural audio-video solutions for luxury residences — from Dolby Atmos
            home theatres to whole-home audio, designed and calibrated to reference standards.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .58 }}
            className="flex flex-wrap gap-3 justify-center mb-16">
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-[var(--dark)] cta-glow"
              style={{ background: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}>
              Book Private Demo
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white/80"
              style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)", fontFamily: "'DM Sans', sans-serif" }}>
              Explore Collections
            </button>
          </motion.div>

          {/* Live waveform bar */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}
            className="w-full max-w-[380px]">
            <Waveform bars={48} height={40} />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="eyebrow text-[9px] text-white/30">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" className="w-4 h-4" style={{ animation: "scrollHint 2s ease-in-out infinite" }}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STORY / BRAND INTRO
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-28">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="sr-left flex-1">
            <span className="eyebrow block mb-4">Designed for Luxury Living</span>
            <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.1] tracking-tight mb-7">
              We don't install speakers.<br />
              <em style={{ color: "var(--gold)" }}>We architect experiences.</em>
            </h2>
            <p className="text-white/50 leading-relaxed mb-4 text-[15px]">
              At IoTrenetics, every project begins with listening — to you, to your space, and to the
              acoustics of your rooms. We partner with TruAudio to bring world-class architectural
              audio that becomes invisible in your interiors while filling every room with crystal-clear sound.
            </p>
            <p className="text-white/40 leading-relaxed text-[15px] mb-8">
              From the first acoustic simulation to the final calibration sweep, we're with you
              at every step — ensuring your investment delivers a reference-standard result.
            </p>
            <div className="av-sep w-16 mb-8" />
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="font-display text-3xl" style={{ color: "var(--gold)" }}>32+</div>
                <div className="eyebrow text-[9px] mt-1">Zone Capacity</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="font-display text-3xl" style={{ color: "var(--gold)" }}>7.2.4</div>
                <div className="eyebrow text-[9px] mt-1">Dolby Atmos</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="font-display text-3xl" style={{ color: "var(--gold)" }}>4K</div>
                <div className="eyebrow text-[9px] mt-1">Laser Projection</div>
              </div>
            </div>
          </div>

          <div className="sr-right flex-1">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl opacity-20"
                style={{ background: "radial-gradient(ellipse, var(--gold), transparent 70%)", filter: "blur(30px)" }} />
              <div className="img-zoom relative z-10 border border-white/8">
                <img
                  src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2070&auto=format&fit=crop"
                  className="w-full"
                  alt="Luxury Audio"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 z-20 px-5 py-3 rounded-xl border"
                style={{ background: "var(--dark2)", borderColor: "rgba(201,168,76,0.2)" }}>
                <div className="eyebrow text-[9px] mb-1">TruAudio Partner</div>
                <div className="text-white text-sm font-semibold">Certified Installer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══════════════════════════════════════════════════════
          SOLUTIONS GRID
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="sr text-center mb-14">
          <span className="eyebrow block mb-3">Sonic Solutions</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            Tailored for every space<br />in your <em style={{ color: "var(--gold)" }}>estate</em>
          </h2>
        </div>
        <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s, i) => (
            <div key={i} className="spec-card p-6 flex flex-col gap-4 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ background: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.15)", color: "var(--gold)" }}>
                {s.icon}
              </div>
              <div>
                <span className="eyebrow text-[9px] block mb-2">{s.tag}</span>
                <h3 className="font-display text-xl font-light mb-2">{s.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══════════════════════════════════════════════════════
          EXPERIENCE CENTRE
      ══════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "var(--dark2)" }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="sr text-center mb-14">
            <span className="eyebrow block mb-3">Experience Centre</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight mb-4">
              Hear it before you buy it
            </h2>
            <p className="text-white/40 max-w-[480px] mx-auto text-sm leading-relaxed">
              Our dedicated AV Experience Centre lets you audition every system in
              a properly designed reference environment — not a showroom, not a mall.
            </p>
          </div>

          {/* Zone tabs */}
          <div className="sr flex flex-wrap justify-center gap-2 mb-10">
            {expZones.map((z) => (
              <button key={z.id} onClick={() => setActiveZone(z.id)}
                className={`exp-tab ${activeZone === z.id ? "active" : ""}`}>
                {z.label}
              </button>
            ))}
          </div>

          {/* Zone detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [.16,1,.3,1] }}
              className={`rounded-2xl border overflow-hidden`}
              style={{ borderColor: "rgba(201,168,76,0.15)", background: "var(--dark3)" }}>

              <div className="p-8 sm:p-10 flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5`}
                    style={{ background: "rgba(201,168,76,0.08)", borderColor: "rgba(201,168,76,0.2)" }}>
                    <div className="pulse-av w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                    <span className="eyebrow text-[9px]">Live Demo Available</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light mb-4">{currentZone.headline}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-[440px]">{currentZone.body}</p>

                  <Link to="/contact"
                    className="gold-link inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--gold)" }}>
                    Book this demo
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentZone.specs.map((spec, i) => (
                    <div key={i} className="spec-card px-4 py-3 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                      <span className="text-sm text-white/60">{spec}</span>
                    </div>
                  ))}
                  {/* Waveform decoration */}
                  <div className="sm:col-span-2 pt-4">
                    <Waveform bars={36} height={36} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══════════════════════════════════════════════════════
          FEATURE BLOCKS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24 flex flex-col gap-28">
        {features.map((f, fi) => (
          <div key={fi}
            className={`flex flex-col ${f.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-14 lg:gap-20`}>

            {/* Image */}
            <div className={`w-full lg:w-1/2 ${f.reverse ? "sr-right" : "sr-left"}`}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl opacity-15"
                  style={{ background: "radial-gradient(ellipse, var(--gold), transparent 70%)", filter: "blur(30px)" }} />
                <div className="img-zoom relative z-10 border border-white/8">
                  <img src={f.img} alt={f.imgAlt} className="w-full" />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className={`w-full lg:w-1/2 ${f.reverse ? "sr-left" : "sr-right"}`}>
              <span className="eyebrow block mb-3">{f.label}</span>
              <h3 className="font-display text-3xl sm:text-4xl font-light leading-[1.1] tracking-tight mb-5">{f.title}</h3>
              <p className="text-white/45 text-[15px] leading-relaxed mb-6">{f.body}</p>

              <ul className="flex flex-col gap-3 mb-7">
                {f.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                    {b}
                  </li>
                ))}
              </ul>

              {f.stat1 && (
                <div className="flex gap-4">
                  {[f.stat1, f.stat2].map((st) => (
                    <div key={st.label} className="spec-card px-5 py-4 text-center">
                      <div className="font-display text-2xl mb-1" style={{ color: "var(--gold)" }}>{st.value}</div>
                      <div className="eyebrow text-[9px]">{st.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══════════════════════════════════════════════════════
          PARALLAX IMPACT
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10" />
          <img
            src="https://images.unsplash.com/photo-1516054653923-3e3f201dd53a?q=80&w=2072&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Sound depth"
            style={{ transform: "scale(1.1)" }}
          />
        </div>
        <div className="relative z-20 text-center px-6 sr">
          <div className="mb-4"><Waveform bars={20} height={28} /></div>
          <h2 className="font-display text-4xl sm:text-6xl font-light tracking-tight">
            Feel the <em style={{ color: "var(--gold)" }}>Depth</em> of Sound
          </h2>
          <p className="text-white/40 mt-4 text-sm">When every frequency finds its perfect place in your room.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY TRUAUDIO
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24">
        <div className="sr text-center mb-14">
          <span className="eyebrow block mb-3">Why Choose Us</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            Innovation meets <em style={{ color: "var(--gold)" }}>elegance</em>
          </h2>
        </div>
        <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyCards.map((w, i) => (
            <div key={i} className="spec-card p-7 flex flex-col gap-4 group relative overflow-hidden">
              {/* Ghost icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500"
                style={{ color: "var(--gold)", transform: "scale(2.5) translate(10%, -10%)" }}>
                {w.icon}
              </div>
              <div className="text-[var(--gold)]">{w.icon}</div>
              <h3 className="font-display text-xl font-light">{w.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-24" style={{ background: "var(--dark)" }}>
        <div className="sr mb-14">
          <span className="eyebrow block mb-3">How We Work</span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
            From concept to <em style={{ color: "var(--gold)" }}>calibration</em>
          </h2>
        </div>
        <div className="sr flex flex-col gap-0">
          {procesSteps.map((step, i) => (
            <div key={i} className="relative flex gap-8 pb-10 last:pb-0">
              {/* Line */}
              {i < procesSteps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px"
                  style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.05))" }} />
              )}
              {/* Node */}
              <div className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center z-10"
                style={{ background: "var(--dark2)", borderColor: "rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                <span className="text-[11px] font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.num}</span>
              </div>
              {/* Content */}
              <div className="pt-1.5">
                <h4 className="font-display text-xl font-light mb-1">{step.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed max-w-[480px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="av-sep mx-6 sm:mx-10" />

      {/* ══════════════════════════════════════════════════════
          SMART MODES
      ══════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "var(--dark2)" }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="sr text-center mb-12">
            <span className="eyebrow block mb-3">One Touch Control</span>
            <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
              Automate your <em style={{ color: "var(--gold)" }}>atmosphere</em>
            </h2>
          </div>

          <div className="sr grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {modes.map((m) => (
              <button key={m.id} onClick={() => setActiveMode(m.id)}
                className={`mode-btn ${activeMode === m.id ? "active" : ""}`}>
                <div className="text-xl mb-3">{m.icon}</div>
                <div className="font-display text-lg font-light mb-1">{m.label}</div>
                <div className="text-white/35 text-xs leading-relaxed">{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Active mode display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: .35 }}
              className="rounded-2xl p-6 border flex items-center gap-4"
              style={{ background: "var(--dark3)", borderColor: "rgba(201,168,76,0.15)" }}>
              <div className="pulse-av w-3 h-3 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
              <span className="text-white/50 text-sm">
                <span style={{ color: "var(--gold-light)" }} className="font-semibold">{modes.find(m => m.id === activeMode)?.label}</span>
                {" "}— {modes.find(m => m.id === activeMode)?.desc}
              </span>
              <Waveform bars={16} height={20} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08), transparent 70%)" }} />
        <div className="absolute inset-0 border-y" style={{ borderColor: "rgba(201,168,76,0.1)" }} />

        <div className="relative max-w-[700px] mx-auto px-6 text-center sr">
          <span className="eyebrow block mb-5">Ready to Begin</span>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] tracking-tight mb-6">
            Ready to transform<br />
            <em style={{ color: "var(--gold)" }}>your space?</em>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-[440px] mx-auto mb-10">
            Let our experts design the perfect acoustic environment for your luxury residence.
            Visit our Experience Centre or schedule a private consultation.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-[var(--dark)] cta-glow"
              style={{ background: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}>
              Book Consultation
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-semibold text-white/70"
              style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)", fontFamily: "'DM Sans', sans-serif" }}>
              Visit Experience Centre
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AudioVideo;
