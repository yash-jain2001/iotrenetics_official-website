import { useEffect, useRef } from "react";
import CTASection from "../components/CTASection";
import FeatureCard from "../components/FeatureCard";

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

  .about-root {
    font-family: 'DM Sans', sans-serif;
    background: #fff;
    color: #0f172a;
    overflow-x: hidden;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(.22,.68,0,1), transform 0.7s cubic-bezier(.22,.68,0,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left  { opacity: 0; transform: translateX(-32px); transition: opacity 0.7s cubic-bezier(.22,.68,0,1), transform 0.7s cubic-bezier(.22,.68,0,1); }
  .reveal-left.visible  { opacity: 1; transform: translateX(0); }
  .reveal-right { opacity: 0; transform: translateX(32px);  transition: opacity 0.7s cubic-bezier(.22,.68,0,1), transform 0.7s cubic-bezier(.22,.68,0,1); }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  /* ── Hero ── */
  .hero-section {
    position: relative;
    background: #f8faff;
    overflow: hidden;
    padding: 100px 20px 80px;
  }
  .hero-mesh {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 40%, rgba(59,130,246,0.09) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 70%, rgba(96,165,250,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 60% at 60% 40%, black 30%, transparent 80%);
  }

  /* ── Eyebrow ── */
  .eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #2563eb; margin-bottom: 16px;
  }
  .eyebrow::before {
    content: ''; display: block;
    width: 16px; height: 2px;
    background: #2563eb; border-radius: 2px;
  }

  .serif { font-family: 'DM Serif Display', serif; }

  /* ── Pronunciation card ── */
  @keyframes soundWave {
    0%, 100% { transform: scaleY(0.35); }
    50%       { transform: scaleY(1); }
  }
  .sound-bar {
    display: inline-block;
    width: 3px; border-radius: 9999px;
    background: #2563eb;
    animation: soundWave 0.9s ease-in-out infinite;
    transform-origin: bottom;
  }

  .pronun-card {
    background: #fff;
    border: 1px solid #dbeafe;
    border-radius: 20px;
    padding: 24px 28px;
    display: inline-flex; flex-direction: column; gap: 14px;
    box-shadow: 0 4px 24px -6px rgba(37,99,235,0.10);
    position: relative; overflow: hidden;
    max-width: 100%;
  }
  .pronun-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #93c5fd);
  }

  .syllable-row { display: flex; align-items: flex-end; gap: 0; flex-wrap: wrap; }
  .syllable { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; }
  .syllable-text {
    font-family: 'DM Serif Display', serif;
    font-size: 22px; font-style: italic;
    color: #334155; line-height: 1;
  }
  .syllable-text.stressed { color: #2563eb; font-size: 27px; }
  .syllable-ipa { font-size: 10px; color: #94a3b8; font-weight: 600; letter-spacing: 0.06em; }
  .syllable-dot {
    font-size: 20px; color: #cbd5e1; font-weight: 300;
    align-self: flex-end; padding-bottom: 5px; padding-inline: 3px;
  }

  .play-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 9999px;
    padding: 7px 16px; font-size: 12px; font-weight: 700;
    color: #2563eb; cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
    outline: none; font-family: 'DM Sans', sans-serif;
  }
  .play-btn:hover { background: #dbeafe; box-shadow: 0 4px 14px -4px rgba(37,99,235,0.22); transform: translateY(-1px); }
  .play-btn:active { transform: translateY(0); }

  /* ── Floating chips ── */
  @keyframes floatA {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-8px) rotate(-1deg); }
  }
  @keyframes floatB {
    0%, 100% { transform: translateY(0px) rotate(1.5deg); }
    50%       { transform: translateY(-6px) rotate(1.5deg); }
  }
  .float-a { animation: floatA 4s ease-in-out infinite; }
  .float-b { animation: floatB 5s ease-in-out infinite 0.8s; }

  /* ── Pill ── */
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 9999px;
    font-size: 12px; font-weight: 600; border: 1px solid;
  }

  /* ── Divider ── */
  .divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent);
  }

  /* ── Pillar cards ── */
  .pillar-card {
    background: #fff; border: 1px solid #f1f5f9; border-radius: 20px;
    padding: 32px; display: flex; flex-direction: column; gap: 16px;
    cursor: default; transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    position: relative; overflow: hidden;
  }
  .pillar-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .pillar-card:hover { border-color: #bfdbfe; box-shadow: 0 8px 32px -8px rgba(59,130,246,0.15); transform: translateY(-4px); }
  .pillar-card:hover::before { opacity: 1; }
  .pillar-icon {
    width: 44px; height: 44px; border-radius: 14px;
    background: #eff6ff; border: 1px solid #dbeafe;
    display: flex; align-items: center; justify-content: center;
    color: #2563eb; transition: background 0.3s, transform 0.3s;
  }
  .pillar-card:hover .pillar-icon { background: #dbeafe; transform: scale(1.08) rotate(-3deg); }

  /* ── Timeline ── */
  .timeline-spine {
    position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, transparent, #bfdbfe 15%, #bfdbfe 85%, transparent);
    transform: translateX(-50%);
  }
  .timeline-dot {
    position: absolute; left: 50%; transform: translateX(-50%);
    width: 36px; height: 36px; border-radius: 9999px;
    background: #fff; border: 2px solid #bfdbfe;
    display: flex; align-items: center; justify-content: center;
    z-index: 2; box-shadow: 0 0 0 4px rgba(59,130,246,0.08);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .timeline-dot:hover { border-color: #2563eb; box-shadow: 0 0 0 6px rgba(37,99,235,0.12); }
  .timeline-dot span { width: 10px; height: 10px; border-radius: 9999px; background: #2563eb; }
  .timeline-card {
    border: 1px solid #f1f5f9; border-radius: 18px; padding: 22px 26px;
    background: #fff; transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .timeline-card:hover { border-color: #bfdbfe; box-shadow: 0 6px 24px -6px rgba(59,130,246,0.14); transform: translateY(-2px); }

  /* ── Service cards ── */
  .service-card {
    border: 1px solid #f1f5f9; border-radius: 20px; padding: 28px;
    background: #fff; display: flex; flex-direction: column; gap: 14px;
    transition: all 0.35s cubic-bezier(.22,.68,0,1);
    position: relative; overflow: hidden;
  }
  .service-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #2563eb, #60a5fa);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(.22,.68,0,1);
  }
  .service-card:hover { border-color: #bfdbfe; box-shadow: 0 12px 40px -12px rgba(37,99,235,0.18); transform: translateY(-5px); }
  .service-card:hover::after { transform: scaleX(1); }
  .service-icon {
    width: 42px; height: 42px; border-radius: 12px;
    background: #eff6ff; border: 1px solid #dbeafe;
    display: flex; align-items: center; justify-content: center;
    color: #2563eb; transition: transform 0.3s, background 0.3s;
  }
  .service-card:hover .service-icon { transform: scale(1.1) rotate(-5deg); background: #dbeafe; }

  /* ── Impact cards ── */
  .impact-card {
    background: #fff; border: 1px solid #f1f5f9; border-radius: 20px;
    padding: 32px; display: flex; flex-direction: column; gap: 14px;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .impact-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #2563eb, #93c5fd);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(.22,.68,0,1);
  }
  .impact-card:hover { border-color: #bfdbfe; box-shadow: 0 8px 28px -8px rgba(59,130,246,0.14); transform: translateY(-4px); }
  .impact-card:hover::before { transform: scaleX(1); }

  /* ── Philosophy ── */
  .philosophy-block {
    background: linear-gradient(135deg, #f8faff 0%, #eff6ff 100%);
    border: 1px solid #dbeafe; border-radius: 24px; padding: 48px;
    position: relative; overflow: hidden;
  }
  .philosophy-block::before {
    content: '"'; position: absolute; top: -20px; left: 24px;
    font-family: 'DM Serif Display', serif; font-size: 200px;
    color: rgba(37,99,235,0.06); line-height: 1;
    pointer-events: none; user-select: none;
  }

  /* ── Team cards ── */
  .team-card {
    border: 1px solid #f1f5f9; border-radius: 20px; padding: 28px;
    background: #fff; display: flex; flex-direction: column; gap: 14px;
    transition: all 0.3s;
  }
  .team-card:hover { border-color: #bfdbfe; box-shadow: 0 10px 32px -8px rgba(59,130,246,0.14); transform: translateY(-4px); }

  /* ── Stagger delays ── */
  .delay-0 { transition-delay: 0s !important; }
  .delay-1 { transition-delay: 0.08s !important; }
  .delay-2 { transition-delay: 0.16s !important; }
  .delay-3 { transition-delay: 0.24s !important; }
  .delay-4 { transition-delay: 0.32s !important; }

  .section-gray  { background: #f8fafc; }
  .section-white { background: #fff; }

  @media (max-width: 767px) {
    .timeline-spine { left: 18px; transform: none; }
    .timeline-dot   { left: 0; transform: none; }
    .philosophy-block { padding: 32px 24px; }
    .pronun-card { padding: 20px; }
    .syllable-text { font-size: 18px; }
    .syllable-text.stressed { font-size: 22px; }
  }
`;

// ── Scroll observer hook ──────────────────────────────────────────────────────
function useBatchReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;
    const children = parent.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.08 }
    );
    children.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Eyebrow = ({ children }) => <p className="eyebrow">{children}</p>;

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  home:     <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  wifi:     <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /><path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07" /></svg>,
  monitor:  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  mobile:   <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth={2} /></svg>,
  layers:   <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  eye:      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
  zap:      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  search:   <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  users:    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  shield:   <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  pen:      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  pin:      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  volume:   <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" /></svg>,
};

// ── Pronunciation Card ────────────────────────────────────────────────────────
const PronunciationCard = () => {
  const syllables = [
    { text: "Eye", ipa: "/aɪ/",   stressed: false },
    { text: "oh",  ipa: "/oʊ/",   stressed: false },
    { text: "Tren",ipa: "/trɛn/", stressed: true  },
    { text: "et",  ipa: "/ɛt/",   stressed: false },
    { text: "ics", ipa: "/ɪks/",  stressed: false },
  ];

  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance("Eye oh Trenetics");
      u.rate = 0.78;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="pronun-card">
      {/* Header row */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
          How to pronounce it
        </span>
        <span className="flex items-end gap-[3px]" style={{ height: "20px" }}>
          {[12, 16, 20, 11, 17].map((h, i) => (
            <span
              key={i}
              className="sound-bar"
              style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>

      {/* Syllable breakdown */}
      <div className="syllable-row">
        {syllables.map((s, i) => (
          <span key={i} className="flex items-end">
            <span className="syllable">
              <span className={`syllable-text ${s.stressed ? "stressed" : ""}`}>{s.text}</span>
              <span className="syllable-ipa">{s.ipa}</span>
            </span>
            {i < syllables.length - 1 && <span className="syllable-dot">·</span>}
          </span>
        ))}
      </div>

      {/* Friendly explanation */}
      <p className="text-[13px] text-gray-500 leading-relaxed">
        Spelled <span className="font-semibold text-gray-700">IoTrenetics</span>, said{" "}
        <span className="font-semibold text-blue-600 italic">"Eye-oh-Tren-et-ics"</span>
        {" "}— think <em>IoT</em> meets <em>kinetics</em>, minus the <em>ki</em>.
      </p>

      <button className="play-btn self-start" onClick={speak} type="button">
        {Icon.volume} Hear it
      </button>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  { icon: Icon.home,     heading: "Smart Home Automation",     quote: "Effortless living through automated control of lighting, climate, and security—reducing energy costs while improving comfort." },
  { icon: Icon.wifi,     heading: "AI & Intelligent Systems",  quote: "Turn data into decisions with AI that automates workflows, reduces manual effort, and helps you operate faster and smarter." },
  { icon: Icon.monitor,  heading: "Intelligent Software",      quote: "From AI agents to video analytics and health insights—custom software that streamlines operations and unlocks actionable intelligence." },
  { icon: Icon.mobile,   heading: "Mobile Applications",       quote: "Intuitive mobile apps that provide real-time insights, seamless experiences, and smarter decision-making on the go." },
  { icon: Icon.layers,   heading: "Industrial IoT",            quote: "Minimize downtime and maximize efficiency with connected systems that monitor equipment, predict failures, and optimize performance." },
  { icon: Icon.activity, heading: "Data Analytics & Insights", quote: "Transform raw data into meaningful insights with analytics dashboards that track performance and surface actionable trends." },
];

const timelineData = [
  { year: "1999",    title: "The Concept Born",          desc: "The term 'Internet of Things' was coined—conceptualizing a world where objects communicate without human interaction." },
  { year: "2010",    title: "Rise of Connected Devices", desc: "Smartphones catalyzed smart-device growth, bringing basic automation into consumer homes and personal spaces." },
  { year: "2015",    title: "Industrial IoT Expansion",  desc: "Heavy industries adopted sensors and analytics for predictive maintenance and real-time operational tracking." },
  { year: "2020",    title: "AI & IoT Convergence",      desc: "Machine learning integrated directly with edge devices, creating highly intelligent, autonomous systems." },
  { year: "Present", title: "The Agentic Era",           desc: "Advanced AI models working alongside IoT grids to continuously self-optimize infrastructure and industrial plants." },
];

const pillars = [
  { label: "Our Vision",  icon: Icon.eye,    body: "Intelligent, predictive, self-optimizing environments that seamlessly connect the physical and digital worlds for a smarter future." },
  { label: "Our Mission", icon: Icon.zap,    body: "Empowering businesses and communities with cutting-edge IoT and AI-driven solutions that improve sustainability, efficiency, and safety." },
  { label: "Our Focus",   icon: Icon.search, body: "Innovating across Industrial IoT, AI/GenAI integration, smart city infrastructure, and deep technological automation systems." },
];

const impact = [
  { icon: Icon.home,    body: "Businesses achieve measurable efficiency improvements through our automated, connected systems deployed across India." },
  { icon: Icon.monitor, body: "Real-time monitoring reduces unplanned downtime and enhances decision-making at every operational level." },
  { icon: Icon.layers,  body: "Intelligent automation enables faster, safer, and more scalable workflows from factory floors to smart homes." },
];

// ── Page ──────────────────────────────────────────────────────────────────────
const About = () => {
  const heroRef     = useBatchReveal();
  const pillarRef   = useBatchReveal();
  const timelineRef = useBatchReveal();
  const impactRef   = useBatchReveal();
  const serviceRef  = useBatchReveal();
  const philoRef    = useBatchReveal();
  const teamRef     = useBatchReveal();

  return (
    <>
      <style>{css}</style>
      <div className="about-root">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="hero-section">
          <div className="hero-mesh" />
          <div className="hero-grid" />

          <div
            ref={heroRef}
            className="max-w-[1160px] mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-14"
          >
            {/* Left */}
            <div className="flex-1 max-w-[600px]">
              <div className="reveal" style={{ transitionDelay: "0.05s" }}>
                <Eyebrow>About IoTrenetics</Eyebrow>
              </div>

              <h1
                className="reveal serif text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.1] tracking-[-0.02em] text-gray-900 mb-6"
                style={{ transitionDelay: "0.12s" }}
              >
                Building intelligent,{" "}
                <em className="text-blue-600 not-italic">connected systems</em>{" "}
                for a smarter future
              </h1>

              <p
                className="reveal text-gray-500 leading-relaxed text-[16px] mb-4"
                style={{ transitionDelay: "0.2s" }}
              >
                <span className="text-blue-600 font-semibold">IoTrenetics Solutions Pvt. Ltd.</span>{" "}
                is an innovative technology company building intelligent solutions at the intersection of IoT,
                AI, and digital transformation. We create connected, data-driven systems that help businesses
                automate operations, gain real-time insights, and make smarter decisions.
              </p>

              <p
                className="reveal text-gray-500 leading-relaxed text-[16px] mb-8"
                style={{ transitionDelay: "0.26s" }}
              >
                Driven by a vision of self-reliance, we proudly promote Swadeshi innovation—developing
                indigenous technologies that empower industries and contribute to a sustainable,
                future-ready ecosystem.
              </p>

              <div className="reveal flex flex-wrap gap-3 mb-8" style={{ transitionDelay: "0.32s" }}>
                <span className="pill bg-blue-50 text-blue-700 border-blue-100">
                  {Icon.pin} India-based Operations
                </span>
                <span className="pill bg-green-50 text-green-700 border-green-100">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Swadeshi Innovation
                </span>
              </div>

              {/* Pronunciation card — lives naturally in the hero */}
              <div className="reveal" style={{ transitionDelay: "0.38s" }}>
                <PronunciationCard />
              </div>
            </div>

            {/* Right */}
            <div className="reveal-right flex-shrink-0 relative" style={{ transitionDelay: "0.18s" }}>
              <div className="relative border border-blue-100 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-white p-7 shadow-sm w-[340px] max-w-full">
                <img
                  src="/assets/display.webp"
                  alt="IoTrenetics platform"
                  loading="lazy"
                  className="w-full opacity-90 rounded-xl"
                />
              </div>

              <div className="float-a absolute -top-4 -left-8 bg-white border border-blue-100 rounded-2xl shadow-md px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Real-time</p>
                  <p className="text-sm font-bold text-gray-900">IoT Monitoring</p>
                </div>
              </div>

              <div className="float-b absolute -bottom-4 -right-6 bg-white border border-blue-100 rounded-2xl shadow-md px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Powered by</p>
                  <p className="text-sm font-bold text-gray-900">AI & Automation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══ VISION / MISSION / FOCUS ══════════════════════════════════════════ */}
        <section className="section-white py-24">
          <div ref={pillarRef} className="max-w-[1160px] mx-auto px-5">
            <div className="reveal text-center mb-14">
              <Eyebrow>What Drives Us</Eyebrow>
              <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight">
                Purpose, Mission &amp; Focus
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pillars.map((p, i) => (
                <div key={i} className={`reveal pillar-card delay-${i}`}>
                  <div className="pillar-icon">{p.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900">{p.label}</h3>
                  <p className="text-gray-500 leading-relaxed text-[14px]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══ TIMELINE ══════════════════════════════════════════════════════════ */}
        <section className="section-gray py-24">
          <div ref={timelineRef} className="max-w-[900px] mx-auto px-5">
            <div className="reveal text-center mb-16">
              <Eyebrow>A Connected History</Eyebrow>
              <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight">
                Evolution of Connected Tech
              </h2>
            </div>
            <div className="relative">
              <div className="timeline-spine hidden md:block" />
              <div className="flex flex-col gap-10">
                {timelineData.map((item, index) => (
                  <div
                    key={index}
                    className={`reveal relative flex items-start gap-6 md:gap-0 delay-${index % 4} ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="md:hidden flex flex-col items-center gap-2 shrink-0">
                      <div className="w-8 h-8 rounded-full border-2 border-blue-200 bg-white flex items-center justify-center shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      </div>
                    </div>
                    <div className="timeline-dot hidden md:flex" />
                    <div className={`flex-1 md:max-w-[calc(50%-2.5rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}>
                      <div className="timeline-card">
                        <div className="flex items-center justify-between mb-2 gap-3">
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <span className="shrink-0 text-[10px] font-bold tracking-[0.12em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══ TECH STACK ════════════════════════════════════════════════════════ */}
        <section className="section-white py-24">
          <div className="max-w-[1160px] mx-auto px-5 text-center mb-12">
            <Eyebrow>Our Stack</Eyebrow>
            <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight mb-4">
              Technology We Specialize In
            </h2>
            <p className="max-w-[560px] mx-auto text-gray-500 leading-relaxed">
              Cutting-edge engineering and AI-driven intelligence power our future-ready systems—spanning
              IoT, Machine Learning, Computer Vision, and Robotics.
            </p>
          </div>
          <FeatureCard direction="left" />
        </section>

        <div className="divider" />

        {/* ══ IMPACT ════════════════════════════════════════════════════════════ */}
        <section className="section-gray py-24">
          <div ref={impactRef} className="max-w-[1160px] mx-auto px-5">
            <div className="reveal text-center mb-14">
              <Eyebrow>What We Enable</Eyebrow>
              <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight">
                Our Impact
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {impact.map((item, i) => (
                <div key={i} className={`reveal impact-card delay-${i}`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    {item.icon}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══ SERVICES ══════════════════════════════════════════════════════════ */}
        <section className="section-white py-24">
          <div ref={serviceRef} className="max-w-[1160px] mx-auto px-5">
            <div className="reveal text-center mb-14">
              <Eyebrow>Services</Eyebrow>
              <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight">
                What We Do
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <div key={i} className={`reveal service-card delay-${i % 3}`}>
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="font-bold text-gray-900">{s.heading}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══ PHILOSOPHY ════════════════════════════════════════════════════════ */}
        <section className="section-gray py-24">
          <div ref={philoRef} className="max-w-[1160px] mx-auto px-5">
            <div className="reveal text-center mb-14">
              <Eyebrow>Our Philosophy</Eyebrow>
              <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight">
                Intelligence in Motion
              </h2>
            </div>
            <div className="reveal philosophy-block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <p className="text-gray-600 leading-[1.85] text-[15px]">
                  "Intelligence in Motion" reflects our belief that intelligence should not remain static
                  or confined to systems—it should be continuously active, adaptive, and evolving. At
                  IoTrenetics, we embed intelligence into the flow of everyday environments, enabling
                  systems that not only collect data but interpret, learn, and act in real time.
                </p>
                <p className="text-gray-600 leading-[1.85] text-[15px]">
                  It signifies a shift from passive technology to dynamic ecosystems—where devices
                  communicate seamlessly, decisions are driven by live insights, and automation responds
                  intelligently to changing conditions. From smart homes to industrial operations, we bring
                  intelligence into motion by transforming how systems think, interact, and perform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══ TEAM ══════════════════════════════════════════════════════════════ */}
        <section className="section-white py-24">
          <div ref={teamRef} className="max-w-[1160px] mx-auto px-5">
            <div className="reveal text-center mb-14">
              <Eyebrow>The People</Eyebrow>
              <h2 className="serif text-4xl sm:text-5xl text-gray-900 font-normal tracking-tight">
                Our Team
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Icon.users,  accent: "Multidisciplinary", title: "Expert Engineers",  body: "IoT engineers, AI specialists, and automation architects united by a shared mission—building intelligent, connected systems that solve real problems." },
                { icon: Icon.shield, accent: "Trust-first",       title: "Reliable Partners", body: "We believe in full transparency and clear communication at every step—making us not just a vendor, but a long-term technology partner." },
                { icon: Icon.pen,    accent: "Problem-solvers",   title: "Creative Builders",  body: "Behind every solution is a team of passionate creators who believe in purposeful, human-centered technology that makes a genuine difference." },
              ].map((t, i) => (
                <div key={i} className={`reveal team-card delay-${i}`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-400 mb-1">{t.accent}</p>
                    <h3 className="font-bold text-gray-900">{t.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
};

export default About;
