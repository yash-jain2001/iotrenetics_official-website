import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";

// ── Helpers ───────────────────────────────────────────────────────────────────

const Eyebrow = ({ children }) => (
  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-3">
    {children}
  </p>
);

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />
);

// ── Data ──────────────────────────────────────────────────────────────────────

const solutions = [
  {
    id: "monitoring",
    tag: "Observability",
    number: "01",
    title: "Real-Time System Monitoring",
    highlight: "Real-Time",
    description:
      "Continuous data acquisition and analysis to monitor system health and performance. Automated alerts, predictive insights, and rapid fault detection ensure system stability and optimized operational efficiency.",
    image: "/assets/System.webp",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-5 h-5"
      >
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bullets: [
      "Automated alert pipelines",
      "Predictive fault detection",
      "Live health dashboards",
    ],
  },
  {
    id: "iot",
    tag: "Connectivity",
    number: "02",
    title: "IoT Data Control & Automation",
    highlight: "IoT",
    description:
      "Bidirectional communication with IoT endpoints for remote control, rule-based automation, and secure data transmission—enabling scalable and efficient IoT deployments at any scale.",
    image: "/assets/Data.webp",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"
          strokeLinecap="round"
        />
        <path
          d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07"
          strokeLinecap="round"
        />
      </svg>
    ),
    bullets: [
      "Bidirectional device control",
      "Rule-based automation engine",
      "Secure encrypted transmission",
    ],
  },
  {
    id: "industrial",
    tag: "Reliability",
    number: "03",
    title: "Industrial Equipment Monitoring",
    highlight: "Industrial",
    description:
      "Real-time monitoring of industrial machines using sensor data to track operational parameters, detect anomalies, and reduce unplanned downtime through continuous data-driven insights.",
    image: "/assets/industrial.webp",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-5 h-5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
      </svg>
    ),
    bullets: [
      "Sensor data aggregation",
      "Anomaly detection at edge",
      "Downtime reduction analytics",
    ],
  },
  {
    id: "optimization",
    tag: "Intelligence",
    number: "04",
    title: "Process Optimization & Automation",
    highlight: "Process",
    description:
      "AI models that continuously learn from operational data to optimize workflows, reduce energy consumption, and automate decision-making for improved industrial efficiency.",
    image: "/assets/Automation.webp",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-5 h-5"
      >
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bullets: [
      "Continuous AI learning loops",
      "Energy consumption optimizer",
      "Automated decision workflows",
    ],
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────

const css = `
  /* ── Tab underline slide ── */
  .sol-tab {
    position: relative;
    transition: color 0.25s;
  }
  .sol-tab::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0; right: 0;
    height: 2px;
    background: #2563eb;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.1);
  }
  .sol-tab.active::after { transform: scaleX(1); }
  .sol-tab.active { color: #1d4ed8; }

  /* ── Panel transition ── */
  .sol-panel {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.45s cubic-bezier(.22,.68,0,1.1),
                transform 0.45s cubic-bezier(.22,.68,0,1.1);
    pointer-events: none;
    position: absolute;
    inset: 0;
  }
  .sol-panel.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    position: relative;
  }

  /* ── Image reveal ── */
  .img-reveal {
    transition: transform 0.55s cubic-bezier(.22,.68,0,1.1),
                box-shadow 0.55s ease,
                border-color 0.3s;
    transform: scale(0.98);
  }
  .img-reveal.show {
    transform: scale(1);
  }
  .img-reveal:hover {
    transform: scale(1.018) translateY(-5px);
    box-shadow: 0 28px 64px -12px rgba(59,130,246,0.16);
    border-color: #bfdbfe;
  }

  /* ── Bullet stagger ── */
  @keyframes bulletIn {
    from { opacity:0; transform: translateX(-10px); }
    to   { opacity:1; transform: translateX(0); }
  }
  .bullet-item {
    animation: bulletIn 0.4s cubic-bezier(.22,.68,0,1.1) both;
  }
  .bullet-item:nth-child(1) { animation-delay: 0.15s; }
  .bullet-item:nth-child(2) { animation-delay: 0.26s; }
  .bullet-item:nth-child(3) { animation-delay: 0.37s; }

  /* ── Number ghost ── */
  @keyframes ghostFloat {
    0%,100% { transform: translateY(0) rotate(-3deg); }
    50%      { transform: translateY(-8px) rotate(-3deg); }
  }
  .ghost-num {
    animation: ghostFloat 6s ease-in-out infinite;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }

  /* ── Dot pulse ── */
  @keyframes dotPulse {
    0%,100% { opacity:0.3; transform:scale(1); }
    50%      { opacity:1;   transform:scale(1.6); }
  }
  .dot-pulse { animation: dotPulse 2.6s ease-in-out infinite; }

  /* ── Icon box hover ── */
  .icon-box {
    transition: background 0.25s, border-color 0.25s,
                transform 0.35s cubic-bezier(.22,.68,0,1.4);
  }
  .icon-box:hover {
    background: #dbeafe;
    border-color: #93c5fd;
    transform: rotate(-6deg) scale(1.1);
  }

  /* ── Tag pill ── */
  .tag-pill {
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    cursor: default;
  }

  /* ── Progress bar ── */
  @keyframes progressFill {
    from { width: 0%; }
    to   { width: var(--target-w); }
  }
  .progress-bar {
    animation: progressFill 4s linear forwards;
  }

  /* ── Card hover (bento) ── */
  .bento-card {
    transition: border-color 0.25s, box-shadow 0.3s, transform 0.3s cubic-bezier(.22,.68,0,1.2);
    cursor: pointer;
  }
  .bento-card:hover {
    border-color: #bfdbfe;
    box-shadow: 0 8px 32px -8px rgba(59,130,246,0.12);
    transform: translateY(-3px);
  }
  .bento-card.selected {
    border-color: #93c5fd;
    box-shadow: 0 0 0 3px #eff6ff, 0 8px 32px -8px rgba(59,130,246,0.18);
  }

  /* ── Scroll fade ── */
  .fade-up-once {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s cubic-bezier(.22,.68,0,1.1),
                transform 0.6s cubic-bezier(.22,.68,0,1.1);
  }
  .fade-up-once.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Connector line ── */
  .connector {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    background: linear-gradient(to bottom, #bfdbfe, transparent);
    transition: height 0.4s;
  }
`;

// ── Main Component ────────────────────────────────────────────────────────────

const Solutions = () => {
  const [active, setActive] = useState(0);
  const [imgReady, setImgReady] = useState(false);
  const sectionRef = useRef(null);
  const bentoRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up-once");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reset image reveal on tab change
  useEffect(() => {
    setImgReady(false);
    const t = setTimeout(() => setImgReady(true), 60);
    return () => clearTimeout(t);
  }, [active]);

  const current = solutions[active];

  return (
    <>
      <style>{css}</style>

      {/* ── Hero ── */}
      <section
        className="max-w-[1200px] mx-auto px-5 pt-24 pb-16 text-center fade-up-once"
        ref={sectionRef}
      >
        <Eyebrow>What We Build</Eyebrow>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 mb-4">
          Our Solutions
        </h1>
        <p className="max-w-[480px] mx-auto text-gray-500 leading-relaxed">
          Explore how intelligent systems transform the way businesses operate,
          monitor, and grow.
        </p>
      </section>

      <SectionDivider />

      {/* ── Bento selector grid ── */}
      <section
        className="max-w-[1200px] mx-auto px-5 py-14 fade-up-once"
        ref={bentoRef}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {solutions.map((sol, i) => (
            <button
              key={sol.id}
              onClick={() => setActive(i)}
              className={`bento-card text-left border rounded-2xl p-5 bg-white flex flex-col gap-3 ${
                active === i ? "selected" : "border-gray-100"
              }`}
            >
              {/* number + tag row */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black tracking-[0.1em] text-blue-200 select-none">
                  {sol.number}
                </span>
                <span className="tag-pill text-[9px] font-bold tracking-[0.12em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                  {sol.tag}
                </span>
              </div>

              {/* icon */}
              <div
                className={`icon-box w-9 h-9 rounded-xl flex items-center justify-center border ${
                  active === i
                    ? "bg-blue-100 border-blue-200 text-blue-700"
                    : "bg-blue-50 border-blue-100 text-blue-600"
                }`}
              >
                {sol.icon}
              </div>

              {/* title */}
              <p className="text-[13px] font-bold text-gray-800 leading-snug">
                {sol.title}
              </p>

              {/* active indicator bar */}
              <div className="h-0.5 w-full rounded-full bg-gray-100 overflow-hidden mt-auto">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: active === i ? "100%" : "0%" }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* ── Detail panel ── */}
        <div className="relative">
          {solutions.map((sol, i) => (
            <div
              key={sol.id}
              className={`sol-panel ${active === i ? "active" : ""}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
                {/* ── Text ── */}
                <div className="w-full md:w-[50%] flex flex-col gap-6">
                  {/* Ghost number */}
                  <div className="relative">
                    <span className="ghost-num absolute -top-6 -left-2 text-8xl font-black text-blue-50 select-none">
                      {sol.number}
                    </span>
                    <div className="relative flex items-center gap-3 pt-4">
                      <div className="icon-box w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        {sol.icon}
                      </div>
                      <div>
                        <span className="tag-pill inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full mb-1">
                          {sol.tag}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
                          {sol.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-3">
                    {sol.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="bullet-item flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            className="w-3 h-3 text-blue-600"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <polyline
                              points="2 6 5 9 10 3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Nav arrows */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() =>
                        setActive(
                          (prev) =>
                            (prev - 1 + solutions.length) % solutions.length,
                        )
                      }
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      aria-label="Previous solution"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="w-4 h-4"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          d="M10 4L6 8l4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-400 font-medium tabular-nums">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(solutions.length).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() =>
                        setActive((prev) => (prev + 1) % solutions.length)
                      }
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      aria-label="Next solution"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="w-4 h-4"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          d="M6 4l4 4-4 4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ── Image ── */}
                <div className="w-full md:w-[50%]">
                  <div
                    className={`img-reveal border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 relative ${
                      imgReady ? "show" : ""
                    }`}
                  >
                    <span className="dot-pulse absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-blue-300 z-10" />
                    <img
                      src={sol.image}
                      alt={sol.title}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      <CTASection />
    </>
  );
};

export default Solutions;
