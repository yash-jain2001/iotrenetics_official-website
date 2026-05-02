import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LatestInsights from "../components/LatestInsights";
import NewsTicker from "../components/NewsTicker";

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
  </svg>
);
const AiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </svg>
);
const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const ArVrIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const DigitalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const focusAreas = [
  {
    icon: <HomeIcon />,
    title: "Home Automation",
    desc: "Smart lighting, security, climate control, and energy management for modern homes.",
    link: "/home-automation",
    tag: "Residential",
  },
  {
    icon: <IotIcon />,
    title: "IoT-Driven Automation",
    desc: "Connected sensor networks, real-time device orchestration, and edge computing.",
    link: "/iot-driven-automation",
    tag: "Infrastructure",
  },
  {
    icon: <AiIcon />,
    title: "AI & Generative AI",
    desc: "LLM-powered tools, AI teammates via Agentra, and private enterprise AI platforms.",
    link: "/ai-and-genrative-solutions",
    tag: "Intelligence",
  },
  {
    icon: <VideoIcon />,
    title: "Video Analytics",
    desc: "Computer vision for security, crowd analysis, anomaly detection, and monitoring.",
    link: "/video-analytics-and-computer-vision",
    tag: "Vision",
  },
  {
    icon: <ArVrIcon />,
    title: "AR/VR & Immersive Tech",
    desc: "Extended reality solutions for training, retail, and enterprise visualization.",
    link: "/arvr-and-immersive-technologies",
    tag: "Immersive",
  },
  {
    icon: <DigitalIcon />,
    title: "Digital Transformation",
    desc: "End-to-end digitization of operations, workflows, and enterprise data pipelines.",
    link: "/digital-transformation-systems",
    tag: "Enterprise",
  },
];

const industries = [
  { name: "Healthcare & MedTech", tag: "HealNet", link: "/healnet", desc: "AI-powered health monitoring and diagnostic tools" },
  { name: "Financial Technology", tag: "Finexo", link: "/finexo", desc: "Smart financial management and analytics" },
  { name: "Residential & Hospitality", tag: "Home · Hotel · Office", link: "/home-automation", desc: "Automated living and working environments" },
  { name: "Industrial Automation", tag: "IoT", link: "/iot-driven-automation", desc: "Connected manufacturing and process control" },
  { name: "Enterprise & Education", tag: "AI · AR/VR", link: "/ai-and-genrative-solutions", desc: "Intelligent tools for knowledge-driven sectors" },
];

const pillars = [
  {
    num: "01",
    title: "Sustainability",
    desc: "Eco-friendly, energy-efficient technologies engineered for long-term environmental and operational impact.",
  },
  {
    num: "02",
    title: "Innovation",
    desc: "Smart systems that learn, adapt, and evolve — built on AI, IoT, and continuous research and development.",
  },
  {
    num: "03",
    title: "Collaboration",
    desc: "Deep partnerships with enterprises, universities, and R&D labs to accelerate digital transformation across India.",
  },
];

const stats = [
  { value: "6+", label: "Technology domains" },
  { value: "3+", label: "Active products" },
  { value: "PAN India", label: "Market reach" },
];

const partnerCards = [
  {
    icon: "🏫",
    title: "Academic Collaboration",
    desc: "Joint research with universities and technology institutes to advance IoT–AI integration.",
  },
  {
    icon: "🏭",
    title: "Industry Alliances",
    desc: "Working with manufacturing, healthcare, and automation sectors to build scalable smart solutions.",
  },
  {
    icon: "🌐",
    title: "Innovation Ecosystem",
    desc: "Partnering with startups and R&D labs to foster digital transformation across India.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600">
    {children}
  </span>
);

const SectionDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-6 sm:mx-10" />
);

const FocusCard = ({ icon, title, desc, link, tag }) => (
  <Link
    to={link}
    className="group relative flex flex-col gap-4 p-7 bg-white hover:bg-gradient-to-br hover:from-blue-50/60 hover:to-white transition-all duration-300 no-underline text-inherit overflow-hidden"
  >
    {/* Hover accent line top */}
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors duration-300">
        {icon}
      </div>
      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300 group-hover:text-blue-400 transition-colors duration-300 pt-1">
        {tag}
      </span>
    </div>

    <div>
      <h3 className="text-[16px] font-semibold leading-snug text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>

    <div className="flex items-center gap-1.5 text-blue-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 mt-auto">
      Learn more <ArrowRight />
    </div>
  </Link>
);

const IndustryRow = ({ name, tag, link, desc }) => (
  <Link
    to={link}
    className="group flex items-center justify-between px-7 py-5 bg-white hover:bg-gray-50/80 border-b border-gray-100 last:border-b-0 transition-all duration-200 no-underline text-inherit"
  >
    <div className="flex flex-col gap-0.5">
      <span className="text-[17px] font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{name}</span>
      <span className="text-xs text-gray-400">{desc}</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="hidden sm:block text-[11px] font-bold tracking-wider text-blue-500/70 uppercase bg-blue-50 px-2.5 py-1 rounded-full">
        {tag}
      </span>
      <span className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 text-lg">→</span>
    </div>
  </Link>
);

const MissionPillar = ({ num, title, desc }) => (
  <div className="bg-white p-8 group hover:bg-gradient-to-b hover:from-blue-50/40 hover:to-white transition-all duration-300">
    <div className="text-[11px] font-bold tracking-[0.15em] text-blue-400/60 mb-5">{num}</div>
    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded mb-5 group-hover:w-12 transition-all duration-300" />
    <h3 className="text-[17px] font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <div className="bg-white">
      <NewsTicker />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative text-white min-h-[90vh] flex items-center justify-center px-5 overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/assets/Smart_home_transition_202603221919.mp4" type="video/mp4" />
        </video>

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-transparent z-[1]" />
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[900px] w-full mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white/90 tracking-[0.12em] uppercase">
              IoT · AI · Automation · PAN India
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[62px] font-bold leading-[1.08] tracking-[-0.025em] text-white drop-shadow-2xl mb-6">
            Intelligent systems for{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #34d399)" }}
            >
              connected environments
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed max-w-[600px] mx-auto mb-10 font-light">
            Bridging the gap between the physical and digital worlds through
            IoT, AI, and intelligent automation — built for modern India.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-gray-900 rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-200 no-underline shadow-xl shadow-black/20 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Explore Solutions <ArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/25 rounded-full text-sm font-bold hover:bg-white/20 transition-all duration-200 no-underline hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 sm:gap-16 justify-center mt-16 pt-10 border-t border-white/15 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/50 mt-1 tracking-widest font-semibold uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10 bg-gradient-to-b from-white/0 to-white/80 animate-pulse" />
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-[1120px] mx-auto px-6 sm:px-10 py-20 flex gap-16 items-start flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-3 mb-7">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-gray-900">
              Built at the intersection of<br />hardware and intelligence
            </h2>
          </div>
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
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 no-underline"
          >
            Our Story <ArrowRight />
          </Link>
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-2 gap-3">
          {[
            { label: "Stage", value: "Early stage startup" },
            { label: "Focus", value: "IoT + AI" },
            { label: "Headquarters", value: "India" },
            { label: "Products", value: "Finexo · HealNet · Agentra" },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-5 border border-gray-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200 ${i === 3 ? "col-span-2" : ""}`}
            >
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-2">
                {item.label}
              </div>
              <div className="text-[16px] font-semibold text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Core Focus ─────────────────────────────────────────────────────── */}
      <section id="solutions" className="max-w-[1120px] mx-auto px-6 sm:px-10 py-20">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-gray-900 mt-3">
              Core focus areas
            </h2>
          </div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 no-underline hover:text-blue-800 transition-colors"
          >
            View all solutions <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {focusAreas.map((item, i) => (
            <FocusCard key={i} {...item} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Products Spotlight ─────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-20">
        <div className="flex flex-col gap-3 mb-10">
          <Eyebrow>Our products</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-gray-900">
            Built to solve real problems
          </h2>
          <p className="text-base text-gray-500 max-w-[520px] leading-relaxed">
            From personal finance to healthcare — each product is a focused
            solution to a specific industry challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Finexo */}
          <Link
            to="/finexo"
            className="group relative flex flex-col justify-between p-7 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 no-underline overflow-hidden min-h-[220px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <div className="inline-flex px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold tracking-wide uppercase mb-4">
                FinTech
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Finexo</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Smart financial management and expense tracking for individuals and businesses.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold mt-6 group-hover:gap-3 transition-all duration-200">
              Learn more <ArrowRight />
            </div>
          </Link>

          {/* HealNet */}
          <Link
            to="/healnet"
            className="group relative flex flex-col justify-between p-7 rounded-2xl border border-gray-100 bg-gradient-to-br from-emerald-50 to-white hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 no-underline overflow-hidden min-h-[220px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <div className="inline-flex px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-bold tracking-wide uppercase mb-4">
                HealthTech
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HealNet</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI-powered health monitoring, diagnostics, and patient management systems.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold mt-6 group-hover:gap-3 transition-all duration-200">
              Learn more <ArrowRight />
            </div>
          </Link>

          {/* Agentra */}
          <Link
            to="/agentra"
            className="group relative flex flex-col justify-between p-7 rounded-2xl border border-gray-100 bg-gradient-to-br from-violet-50 to-white hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-300 no-underline overflow-hidden min-h-[220px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/40 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <div className="inline-flex px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full text-[11px] font-bold tracking-wide uppercase mb-4">
                AI Platform
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Agentra</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                AI teammates for business — autonomous agents that handle tasks end-to-end.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-violet-600 text-sm font-semibold mt-6 group-hover:gap-3 transition-all duration-200">
              Learn more <ArrowRight />
            </div>
          </Link>
        </div>
      </section>

      <SectionDivider />

      {/* ── Industries ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-20">
        <div className="flex flex-col gap-3 mb-10">
          <Eyebrow>Where we operate</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-gray-900">
            Industries we serve
          </h2>
        </div>

        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {industries.map((item, i) => (
            <IndustryRow key={i} {...item} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Mission ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-20">
        <div className="flex flex-col gap-3 mb-10">
          <Eyebrow>Our purpose</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-gray-900">
            Mission & vision
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-[540px]">
            To empower businesses and communities with IoT and AI-driven solutions
            that make India smarter, safer, and more connected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {pillars.map((p, i) => (
            <MissionPillar key={i} {...p} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Vision / Partners ──────────────────────────────────────────────── */}
      <section className="bg-gray-50/60 border-y border-gray-100 py-20">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col gap-3 mb-10">
            <Eyebrow>Our vision</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-gray-900">
              Building the future together
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-[560px]">
              IoTrenetics was founded with the vision of building intelligent systems
              that seamlessly connect the physical and digital worlds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {partnerCards.map((card, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-100 hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl mb-4">{card.icon}</div>
                <h3 className="text-[16px] font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Insights ────────────────────────────────────────────────── */}
      <LatestInsights />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-6 sm:px-10 py-20">
        <div
          className="relative rounded-3xl overflow-hidden px-8 sm:px-16 py-16 text-white text-center"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 40%, #0e7490 100%)" }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-16 -translate-x-16" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white/80 tracking-widest uppercase">PAN India</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to build something intelligent?
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-[480px] mx-auto mb-10">
              Whether you're exploring home automation or enterprise AI,
              we'd love to talk about what's possible for your business.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-blue-700 rounded-full text-sm font-bold hover:bg-gray-50 transition-all duration-200 no-underline shadow-xl hover:-translate-y-0.5"
              >
                Contact Us <ArrowRight />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 text-white border border-white/25 rounded-full text-sm font-bold hover:bg-white/20 transition-all duration-200 no-underline hover:-translate-y-0.5"
              >
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
