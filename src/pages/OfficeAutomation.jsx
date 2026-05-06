import { useEffect, useRef } from "react";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const features = [
  {
    title: "Centralized Control",
    desc: "One dashboard. Every system. Unified command over your entire infrastructure.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "BMS Integration",
    desc: "Full building management systems — HVAC, lighting, fire, and elevators — orchestrated as one.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Enterprise Security",
    desc: "Biometric access, magnetic locks, audit trails — layered security built for command.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Energy Intelligence",
    desc: "AI-driven energy scheduling cuts operational costs without sacrificing comfort.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Zero Latency",
    desc: "Sub-100ms command execution. Your instructions are acted on the moment they're issued.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Infinitely Scalable",
    desc: "From a single boardroom to a multi-tower campus — scales without friction.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Live Monitoring",
    desc: "Real-time dashboards and alerts give you situational awareness — always.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Custom Automation",
    desc: "Every rule, scene, and schedule engineered to your operational blueprint.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

const useCases = [
  {
    title: "Smart Office",
    eyebrow: "Workspace Intelligence",
    img: "./assets/commercial1.png",
    desc: "Transform every floor into a responsive, intelligent workspace. Dimmable lighting adapts to natural light and occupancy, while climate zones respond to meeting schedules and headcounts automatically.",
    points: [
      "Dimmable adaptive lighting",
      "AC automation by occupancy",
      "Meeting room automation",
      "Director-level access control",
    ],
    accent: "blue",
  },
  {
    title: "Retail & Showroom",
    eyebrow: "Experience Design",
    img: "./assets/commercial2.png",
    desc: "Craft precisely the right atmosphere for every moment — from opening hours to high-profile presentations. Scene lighting and synchronized audio set the tone before a single word is spoken.",
    points: [
      "Scene-based lighting presets",
      "Synchronized sound automation",
      "Smart customer triggers",
      "Closing-time auto-shutdown",
    ],
    accent: "slate",
  },
  {
    title: "BMS System",
    eyebrow: "Infrastructure Command",
    img: "./assets/commercial3.png",
    desc: "Enterprise-grade building management that keeps every mechanical and electrical system aligned, monitored, and compliant — from pump controls to fire integration.",
    points: [
      "Outdoor lighting automation",
      "Fire system integration",
      "STP / ETP automation",
      "Pump & utility control",
    ],
    accent: "blue",
  },
  {
    title: "Enterprise Security",
    eyebrow: "Access & Safety",
    img: "./assets/commercial5.png",
    desc: "Multi-layer security architecture that ensures only authorized personnel move through protected zones — with full audit trails for compliance and accountability.",
    points: [
      "Magnetic lock systems",
      "Fingerprint & face unlock",
      "Time-stamped access logs",
      "Remote lock override",
    ],
    accent: "slate",
  },
  {
    title: "Conference Room",
    eyebrow: "Executive Presentations",
    img: "/assets/commercial4.png",
    desc: "One-touch boardroom command. Projector, screen, audio, lighting, and climate — all synchronized the moment a meeting begins. Focus on the agenda, not the technology.",
    points: [
      "One-tap projector automation",
      "Motorized screen control",
      "Audio-visual sync",
      "Presentation lighting scenes",
    ],
    accent: "blue",
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
);

const EyebrowLabel = ({ children, light = false }) => (
  <p
    className={`text-[11px] font-bold tracking-[0.18em] uppercase mb-3 ${light ? "text-blue-300" : "text-blue-600"}`}
  >
    {children}
  </p>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */

const OfficeAutomation = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("oa-visible");
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
    );
    document
      .querySelectorAll(".oa-reveal")
      .forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Reveal system ── */
        .oa-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .oa-reveal.oa-visible { opacity: 1; transform: none; }
        .oa-d1 { transition-delay: 0.08s; }
        .oa-d2 { transition-delay: 0.16s; }
        .oa-d3 { transition-delay: 0.24s; }
        .oa-d4 { transition-delay: 0.32s; }
        .oa-d5 { transition-delay: 0.40s; }

        /* ── Hero ── */
        @keyframes oaHeroFade {
          from { opacity:0; transform: translateY(22px); }
          to   { opacity:1; transform: none; }
        }
        .oa-hero-1 { animation: oaHeroFade 1s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .oa-hero-2 { animation: oaHeroFade 1s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        .oa-hero-3 { animation: oaHeroFade 1s 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .oa-hero-4 { animation: oaHeroFade 1s 0.65s cubic-bezier(0.16,1,0.3,1) both; }

        /* ── Feature card ── */
        .oa-feat-card {
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s, background 0.22s;
        }
        .oa-feat-card:hover {
          border-color: #bfdbfe;
          box-shadow: 0 10px 36px rgba(37,99,235,0.09);
          transform: translateY(-4px);
        }
        .oa-feat-card:hover .oa-icon-wrap {
          background: #1d4ed8;
          border-color: #1d4ed8;
          color: #fff;
        }
        .oa-icon-wrap {
          transition: background 0.22s, border-color 0.22s, color 0.22s;
        }

        /* ── Use-case card ── */
        .oa-use-card {
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .oa-use-card:hover {
          border-color: #bfdbfe;
          box-shadow: 0 16px 48px rgba(37,99,235,0.08);
          transform: translateY(-3px);
        }
        .oa-img-wrap img {
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .oa-use-card:hover .oa-img-wrap img {
          transform: scale(1.03);
        }

        /* ── Stat pulse ── */
        @keyframes oaStatPulse {
          0%,100% { opacity:1; }
          50% { opacity:0.7; }
        }
        .oa-stat-dot { animation: oaStatPulse 2.4s ease-in-out infinite; }

        /* ── Executive badge ── */
        @keyframes oaBadgeSlide {
          from { opacity:0; transform: translateX(16px); }
          to   { opacity:1; transform: none; }
        }
        .oa-badge { animation: oaBadgeSlide 0.9s 0.8s cubic-bezier(0.16,1,0.3,1) both; }

        /* Trust bar shimmer */
        @keyframes oaShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[url('/assets/MainOfficeAutomation.jpg')] bg-cover bg-center min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
        {/* Layered overlay — deep navy for executive gravitas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-blue-950/80" />

        {/* Subtle mesh grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Soft blue orb accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center gap-7">
          {/* Tier badge */}
          <div className="oa-hero-1 inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl border border-white/15 rounded-full px-5 py-2 text-white/75 text-[11px] font-bold tracking-[0.18em] uppercase">
            <span className="oa-stat-dot w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Enterprise · Commercial Automation · IoTrenetics
          </div>

          {/* Headline — commanding, terse, authoritative */}
          <h1 className="oa-hero-2 text-white text-4xl sm:text-5xl md:text-[3.75rem] font-bold tracking-[-0.035em] leading-[1.1] [text-shadow:0_8px_40px_rgba(0,0,0,0.5)]">
            Powering Intelligent
            <br />
            <span className="text-blue-300">Commercial Spaces</span>
          </h1>

          <p className="oa-hero-3 text-white/60 text-base sm:text-lg max-w-xl leading-relaxed font-light">
            From boardrooms to building infrastructure — automate, monitor, and
            command everything from a single seat of control.
          </p>

          <div className="oa-hero-4 flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/contact"
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_0_28px_rgba(59,130,246,0.5)] hover:scale-[1.03] tracking-wide"
            >
              Schedule a Demo
            </Link>
            <Link
              to="/coming-soon"
              className="bg-white/8 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 tracking-wide"
            >
              Download Capability Deck
            </Link>
          </div>
        </div>

        {/* Floating executive badge — bottom right */}
        <div className="oa-badge absolute bottom-8 right-8 hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-white text-xs font-bold">
              Director-Grade Control
            </p>
            <p className="text-white/50 text-[10px]">
              Full access · Any device · Any location
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 border-b border-white/5 py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {[
            "Smart Offices",
            "Retail Chains",
            "BMS Facilities",
            "Institutions",
            "Multi-Tower Campuses",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 text-white/50 text-xs font-semibold tracking-widest uppercase"
            >
              <span className="w-1 h-1 rounded-full bg-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── CORE FEATURES ────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 oa-reveal">
            <EyebrowLabel>Platform Capabilities</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
              Core <span className="text-blue-600">Features</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm max-w-lg mx-auto">
              A complete automation platform engineered for decision-makers who
              demand control, visibility, and performance.
            </p>
          </div>

          {/* 4×2 premium grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {features.map((f, i) => (
              <div
                key={i}
                className={`oa-feat-card bg-white border border-transparent p-7 flex flex-col gap-4 oa-reveal oa-d${(i % 4) + 1}`}
              >
                <div className="oa-icon-wrap w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 oa-reveal">
            <EyebrowLabel>Deployment Scenarios</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
              Built for Every
              <br />
              <span className="text-blue-600">Commercial Environment</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {useCases.map((item, i) => (
              <div
                key={i}
                className={`oa-use-card bg-white border border-gray-100 rounded-3xl overflow-hidden flex max-lg:flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} oa-reveal oa-d${(i % 3) + 1}`}
              >
                {/* Image */}
                <div className="oa-img-wrap w-full lg:w-[46%] min-h-[260px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-9 flex flex-col justify-center gap-5">
                  <div>
                    <EyebrowLabel>{item.eyebrow}</EyebrowLabel>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-2.5">
                    {item.points.map((p, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── VALUE PROPOSITION ────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl overflow-hidden relative">
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-[100px] pointer-events-none" />

            <div className="relative z-10 px-10 py-16 sm:px-16 flex flex-col lg:flex-row items-center gap-12 oa-reveal">
              {/* Text */}
              <div className="flex-1">
                <EyebrowLabel light>Director-Grade Visibility</EyebrowLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-white leading-tight">
                  Transform Your Commercial Space
                  <br />
                  <span className="text-blue-300">
                    into an Intelligent Ecosystem
                  </span>
                </h2>
                <p className="mt-5 text-white/55 text-sm leading-relaxed max-w-lg">
                  Real-time operational control. Energy intelligence. Security
                  oversight. Everything a director needs to run a smarter,
                  leaner, and more responsive facility.
                </p>
                <button className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_0_28px_rgba(59,130,246,0.45)] hover:scale-[1.03] tracking-wide">
                  Book Executive Walkthrough
                </button>
              </div>

              {/* Results panel */}
              <div className="flex-shrink-0 w-full lg:w-72 flex flex-col gap-4">
                {[
                  {
                    label: "Energy Savings",
                    value: "30%+",
                    sub: "vs. conventional systems",
                    icon: (
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    ),
                  },
                  {
                    label: "Operational Control",
                    value: "100%",
                    sub: "Unified dashboard access",
                    icon: (
                      <>
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </>
                    ),
                  },
                  {
                    label: "Live Monitoring",
                    value: "24/7",
                    sub: "Alerts, logs, and status",
                    icon: (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ),
                  },
                ].map(({ label, value, sub, icon }, i) => (
                  <div
                    key={i}
                    className={`bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl px-6 py-5 flex items-center gap-4 transition-colors duration-200 oa-reveal oa-d${i + 1}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 flex-shrink-0">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-xl font-bold tracking-[-0.02em]">
                        {value}
                      </p>
                      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mt-0.5">
                        {label}
                      </p>
                      <p className="text-white/30 text-[10px] mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DIRECTOR ACCESS CALLOUT ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 oa-reveal">
            <EyebrowLabel>Command from Anywhere</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900">
              Built for the{" "}
              <span className="text-blue-600">Decision-Maker</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
              Whether you're in the boardroom, traveling, or at home — your
              facility responds to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 oa-reveal">
            {[
              {
                title: "Remote Override",
                desc: "Lock doors, kill power zones, or trigger emergency modes from your phone — instantly.",
                icon: (
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
                ),
              },
              {
                title: "Role-Based Access",
                desc: "Granular permission levels from Director to Facility Staff — everyone gets exactly what they need.",
                icon: (
                  <>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                ),
              },
              {
                title: "Audit & Compliance",
                desc: "Immutable access logs and scheduled reports for governance, audits, and operational reviews.",
                icon: (
                  <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </>
                ),
              },
            ].map(({ title, desc, icon }, i) => (
              <div
                key={i}
                className="bg-white p-8 flex flex-col gap-4 hover:border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icon}
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{title}</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <CTASection />
    </>
  );
};

export default OfficeAutomation;
