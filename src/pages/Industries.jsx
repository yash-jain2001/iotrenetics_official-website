import { useEffect } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";

// ── Helpers ───────────────────────────────────────────────────────────────────

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />
);

const Eyebrow = ({ children }) => (
  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-3">
    {children}
  </p>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const industries = [
  {
    icon: "/assets/Icon1.webp",
    title: "Healthcare & MedTech",
    gif: "/assets/Gif1.gif",
    desc: "AI-driven healthcare systems for smarter, safer patient care.",
    items: [
      "Smart patient monitoring & real-time alerts.",
      "Medical video analytics for ICUs, OTs & facilities.",
      "AI assistants for clinicians, operations & compliance.",
    ],
    tag: "Health",
    number: "01",
  },
  {
    icon: "/assets/Icon2.webp",
    title: "Industrial Automation",
    gif: "/assets/Gif2.gif",
    desc: "Connected factories powered by real-time intelligence and AI.",
    items: [
      "Equipment health monitoring & predictive maintenance.",
      "Workplace safety & surveillance analytics.",
      "Operational dashboards for factories & plants.",
    ],
    tag: "Industry",
    number: "02",
  },
  {
    icon: "/assets/Icon3.webp",
    title: "Smart Cities",
    gif: "/assets/Gif3.gif",
    desc: "Building safer, sustainable and data-driven urban ecosystems.",
    items: [
      "Traffic, crowd & public safety analytics.",
      "Smart lighting, utilities & infrastructure monitoring.",
      "City-wide real-time alerts & insights.",
    ],
    tag: "Urban",
    number: "03",
  },
  {
    icon: "/assets/Icon4.webp",
    title: "Energy & Utilities",
    gif: "/assets/Gif4.gif",
    desc: "Optimizing energy and water resources through AI-powered insights.",
    items: [
      "Smart energy monitoring & consumption optimization.",
      "Water usage analytics & leak detection.",
      "Demand forecasting & sustainability reporting.",
    ],
    tag: "Energy",
    number: "04",
  },
  {
    icon: "/assets/Icon5.webp",
    title: "Education & Training",
    gif: "/assets/Gif5.gif",
    desc: "Smarter learning environments with AI and immersive technologies.",
    items: [
      "Smart classrooms & campus automation.",
      "AI teaching assistants & knowledge bots.",
      "AR/VR-based skill training & simulations.",
    ],
    tag: "EdTech",
    number: "05",
  },
  {
    icon: "/assets/Icon6.webp",
    title: "Enterprises & Corporates",
    gif: "/assets/Gif6.gif",
    desc: "AI teammates and automation for modern digital enterprises.",
    items: [
      "Internal AI copilots for email, HR, CRM & support.",
      "Secure private LLM deployments.",
      "Workflow automation & productivity intelligence.",
    ],
    tag: "Enterprise",
    number: "06",
  },
  {
    icon: "/assets/Icon7.webp",
    title: "Real Estate & Smart Buildings",
    gif: "/assets/Gif7.gif",
    desc: "Intelligent buildings with seamless automation and analytics.",
    items: [
      "Smart home & building automation systems.",
      "Energy optimization & consumption insights.",
      "Security, access control & video intelligence.",
    ],
    tag: "PropTech",
    number: "07",
  },
];

// ── Styles ────────────────────────────────────────────────────────────────────

const css = `
  /* ── Scroll reveal ── */
  .ind-block {
    opacity: 0;
  }
  .ind-block.visible {
    opacity: 1;
  }

  .slide-left {
    opacity: 0;
    transform: translateX(-36px);
    transition: opacity 0.65s cubic-bezier(.22,.68,0,1.1),
                transform 0.65s cubic-bezier(.22,.68,0,1.1);
  }
  .slide-right {
    opacity: 0;
    transform: translateX(36px);
    transition: opacity 0.65s cubic-bezier(.22,.68,0,1.1),
                transform 0.65s cubic-bezier(.22,.68,0,1.1);
  }
  .ind-block.visible .slide-left,
  .ind-block.visible .slide-right {
    opacity: 1;
    transform: translateX(0);
  }

  /* Media slightly delayed */
  .slide-right-media {
    opacity: 0;
    transform: translateX(36px) scale(0.97);
    transition: opacity 0.7s 0.12s cubic-bezier(.22,.68,0,1.1),
                transform 0.7s 0.12s cubic-bezier(.22,.68,0,1.1);
  }
  .slide-left-media {
    opacity: 0;
    transform: translateX(-36px) scale(0.97);
    transition: opacity 0.7s 0.12s cubic-bezier(.22,.68,0,1.1),
                transform 0.7s 0.12s cubic-bezier(.22,.68,0,1.1);
  }
  .ind-block.visible .slide-right-media,
  .ind-block.visible .slide-left-media {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  /* Staggered list items */
  .list-item {
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.4s, transform 0.4s, color 0.2s, padding-left 0.2s;
    position: relative;
    padding-left: 20px;
    cursor: default;
  }
  .ind-block.visible .list-item:nth-child(1) { opacity:1; transform:translateX(0); transition-delay:0.3s; }
  .ind-block.visible .list-item:nth-child(2) { opacity:1; transform:translateX(0); transition-delay:0.42s; }
  .ind-block.visible .list-item:nth-child(3) { opacity:1; transform:translateX(0); transition-delay:0.54s; }

  .list-item::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #93c5fd;
    transition: background 0.25s, transform 0.25s;
  }
  .list-item:hover { color: #1d4ed8; padding-left: 24px; }
  .list-item:hover::before { background: #2563eb; transform: translateY(-50%) scale(1.5); }

  /* Number badge */
  @keyframes numberFloat {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-5px); }
  }
  .ind-number {
    animation: numberFloat 5s ease-in-out infinite;
    background: linear-gradient(135deg, #bfdbfe, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  /* Dot pulse */
  @keyframes dotPulse {
    0%,100% { opacity: 0.35; transform: scale(1); }
    50%      { opacity: 1;    transform: scale(1.5); }
  }
  .dot-pulse { animation: dotPulse 2.8s ease-in-out infinite; }

  /* Media card hover */
  .media-wrap {
    transition: transform 0.45s cubic-bezier(.22,.68,0,1.2),
                box-shadow 0.45s ease,
                border-color 0.3s;
  }
  .media-wrap:hover {
    transform: translateY(-8px) scale(1.015);
    box-shadow: 0 28px 60px -12px rgba(59,130,246,0.16);
    border-color: #bfdbfe;
  }

  /* Icon box spin-hover */
  .icon-box {
    transition: background 0.25s, border-color 0.25s,
                transform 0.35s cubic-bezier(.22,.68,0,1.4);
  }
  .icon-box:hover {
    background: #dbeafe;
    border-color: #93c5fd;
    transform: rotate(-6deg) scale(1.1);
  }

  /* Tag pill */
  .tag-pill {
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
    cursor: default;
  }
  .tag-pill:hover {
    background: #2563eb; color: #fff; border-color: #2563eb;
    transform: translateY(-2px);
  }

  /* Separator */
  .block-sep {
    height: 1px;
    background: linear-gradient(to right, transparent, #e2e8f0 30%, #e2e8f0 70%, transparent);
  }

  /* Hero pill entrance stagger */
  @keyframes pillIn {
    from { opacity: 0; transform: translateY(10px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .pill-in {
    animation: pillIn 0.45s cubic-bezier(.22,.68,0,1.2) both;
  }

  /* Desc fade-up on block */
  .desc-text {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.5s 0.2s, transform 0.5s 0.2s;
  }
  .ind-block.visible .desc-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* Number fade-in */
  .num-wrap {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s, transform 0.5s;
  }
  .ind-block.visible .num-wrap {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ── Reveal hook ───────────────────────────────────────────────────────────────

const useReveal = () => {
  useEffect(() => {
    const blocks = document.querySelectorAll(".ind-block");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    blocks.forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, []);
};

// ── IndustryBlock ─────────────────────────────────────────────────────────────

const IndustryBlock = ({ industry, index }) => {
  const isEven = index % 2 === 0;

  // text slides in from left on even, right on odd
  const textClass   = isEven ? "slide-left"        : "slide-right";
  const mediaClass  = isEven ? "slide-right-media" : "slide-left-media";

  return (
    <>
      {index > 0 && <div className="block-sep mx-auto" />}

      <div className="ind-block py-16 md:py-24">
        <div
          className={`flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-12 lg:gap-20`}
        >
          {/* ── Text column ── */}
          <div className={`w-full md:w-[50%] flex flex-col gap-5 ${textClass}`}>

            {/* Number + tag */}
            <div className="num-wrap flex items-center gap-3">
              <span className="ind-number text-6xl font-black select-none">
                {industry.number}
              </span>
              <span className="tag-pill text-[10px] font-bold tracking-[0.15em] uppercase text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                {industry.tag}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-center gap-3">
              <div className="icon-box w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={industry.icon}
                  alt=""
                  loading="lazy"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
                {industry.title}
              </h3>
            </div>

            {/* Description */}
            <p className="desc-text text-gray-500 text-[15px] leading-relaxed max-w-[430px]">
              {industry.desc}
            </p>

            {/* Items */}
            <ul className="flex flex-col gap-3.5 mt-1">
              {industry.items.map((item, i) => (
                <li key={i} className="list-item text-gray-700 text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Media column ── */}
          <div className={`w-full md:w-[50%] ${mediaClass}`}>
            <div className="media-wrap relative border border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
              <span className="dot-pulse absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-blue-300 z-10" />
              <img
                src={industry.gif}
                alt={industry.title}
                loading="lazy"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const Industries = () => {
  useReveal();

  return (
    <>
      <style>{css}</style>

      {/* ── Hero ── */}
      <section
        className="max-w-[1200px] mx-auto px-5 pt-24 pb-12 text-center"
        data-aos="fade-up"
      >
        <Eyebrow>Sectors We Serve</Eyebrow>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 mb-4">
          Industries We Serve
        </h1>
        <p className="max-w-[500px] mx-auto text-gray-500 leading-relaxed">
          Intelligent IoT, AI &amp; automation solutions built for the
          challenges that matter most—across every sector.
        </p>

        {/* Pill tags with stagger */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {industries.map((ind, i) => (
            <span
              key={i}
              className="pill-in tag-pill text-[11px] font-semibold tracking-wide text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full"
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              {ind.tag}
            </span>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Industry Blocks ── */}
      <section className="max-w-[1200px] mx-auto px-5 pb-12">
        {industries.map((industry, i) => (
          <IndustryBlock key={i} industry={industry} index={i} />
        ))}
      </section>

      <SectionDivider />

      <CTASection />
    </>
  );
};

export default Industries;
