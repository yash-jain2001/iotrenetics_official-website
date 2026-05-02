import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const focusAreas = [
  {
    icon: <HomeIcon />,
    title: "Home automation",
    desc: "Smart lighting, security, and climate control for modern homes.",
    link: "/home-automation",
  },
  {
    icon: <IotIcon />,
    title: "IoT-driven automation",
    desc: "Connected sensor networks and real-time device orchestration.",
    link: "/iot-driven-automation",
  },
  {
    icon: <AiIcon />,
    title: "AI & generative AI",
    desc: "LLM-powered tools, Agentra AI teammates, and private AI platforms.",
    link: "/ai-and-genrative-solutions",
  },
  {
    icon: <VideoIcon />,
    title: "Video analytics",
    desc: "Computer vision for security, crowd analysis, and smart monitoring.",
    link: "/video-analytics-and-computer-vision",
  },
  {
    icon: <ArVrIcon />,
    title: "AR/VR & immersive tech",
    desc: "Extended reality for training, retail, and enterprise visualization.",
    link: "/arvr-and-immersive-technologies",
  },
  {
    icon: <DigitalIcon />,
    title: "Digital transformation",
    desc: "End-to-end digitization of operations, workflows, and data pipelines.",
    link: "/digital-transformation-systems",
  },
];

const industries = [
  { name: "Healthcare & MedTech", tag: "HealNet", link: "/healnet" },
  { name: "Financial technology", tag: "Finexo", link: "/finexo" },
  { name: "Residential & hospitality", tag: "Home · Hotel · Office", link: "/home-automation" },
  { name: "Industrial automation", tag: "IoT", link: "/iot-driven-automation" },
  { name: "Enterprise & education", tag: "AI · AR/VR", link: "/ai-and-genrative-solutions" },
];

const pillars = [
  {
    num: "01",
    title: "Sustainability",
    desc: "Building eco-friendly, energy-efficient technologies designed for long-term impact.",
  },
  {
    num: "02",
    title: "Innovation",
    desc: "Smart systems that learn and adapt — powered by AI, IoT, and continuous R&D.",
  },
  {
    num: "03",
    title: "Collaboration",
    desc: "Partnering with enterprises, universities, and startups to scale digital transformation.",
  },
];

const stats = [
  { value: "6+", label: "Technology domains" },
  { value: "3", label: "Product lines" },
  { value: "India & Nepal", label: "Markets served" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-gray-400">
    {children}
  </span>
);

const SectionDivider = () => (
  <hr className="border-none border-t border-gray-100 mx-10" />
);

const FocusCard = ({ icon, title, desc, link }) => (
  <Link
    to={link}
    className="group flex flex-col gap-3 p-7 bg-white hover:bg-gray-50 transition-colors duration-150 no-underline text-inherit"
  >
    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <h3 className="text-[17px] font-medium leading-snug">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    <span className="mt-auto text-gray-300 group-hover:text-gray-500 transition-colors text-base">
      →
    </span>
  </Link>
);

const IndustryRow = ({ name, tag, link }) => (
  <Link
    to={link}
    className="flex items-center justify-between px-6 py-[18px] bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 no-underline text-inherit group"
  >
    <span className="text-[17px] font-medium">{name}</span>
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-medium tracking-wide text-gray-400 uppercase">
        {tag}
      </span>
      <span className="text-gray-300 group-hover:text-gray-500 transition-colors">→</span>
    </div>
  </Link>
);

const MissionPillar = ({ num, title, desc }) => (
  <div className="bg-white p-8">
    <div className="text-[11px] font-medium tracking-[0.1em] text-gray-400 mb-4">{num}</div>
    <div className="w-6 h-0.5 bg-blue-600 rounded mb-4" />
    <h3 className="text-[17px] font-medium mb-2.5">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Home = () => {
  return (
    <>
      <NewsTicker />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[480px] flex items-center px-10 py-20 bg-white border-b border-gray-100 overflow-hidden">
        {/* Architectural grid background */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-[620px]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-xs font-medium text-blue-700">IoT · AI · Automation</span>
          </div>

          <h1 className="text-[42px] sm:text-5xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            Intelligent systems for{" "}
            <span className="text-blue-600">connected environments</span>
          </h1>

          <p className="mt-4 text-lg text-gray-500 leading-relaxed max-w-[480px]">
            IoTrenetics builds IoT, AI, and automation products for homes,
            offices, hotels, and enterprises across India and Nepal.
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition-colors no-underline"
            >
              Explore solutions <span>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-gray-800 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors no-underline"
            >
              About us
            </Link>
          </div>

          <div className="flex gap-10 mt-14 pt-8 border-t border-gray-100 flex-wrap">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-xl font-medium tracking-tight">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-[1120px] mx-auto px-10 py-[72px] flex gap-16 items-start flex-col md:flex-row">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2.5 mb-8">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.015em]">
              Built at the intersection of hardware and intelligence
            </h2>
          </div>
          <p className="text-base text-gray-500 leading-relaxed">
            IoTrenetics Solutions Pvt. Ltd. is a technology startup working
            across IoT, AI, Generative AI, AR/VR, and Digital Transformation.
            We build intelligent, connected systems that help industries and
            communities make smarter decisions.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-gray-200 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors no-underline"
          >
            Learn more →
          </Link>
        </div>

        <div className="flex-1 min-w-0 grid grid-cols-2 gap-3">
          {[
            { label: "Founded", value: "Early stage" },
            { label: "Focus", value: "IoT + AI" },
            { label: "Headquarters", value: "India" },
            { label: "Products", value: "Finexo · HealNet" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 border border-gray-100 rounded-xl"
            >
              <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-gray-400 mb-2">
                {item.label}
              </div>
              <div className="text-[18px] font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Core Focus ─────────────────────────────────────────────────────── */}
      <section id="solutions" className="max-w-[1120px] mx-auto px-10 py-[72px]">
        <div className="flex items-baseline justify-between mb-9">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.015em] mt-2.5">
              Core focus areas
            </h2>
          </div>
          <Link to="/solutions" className="text-sm text-blue-600 no-underline hover:text-blue-800">
            See all →
          </Link>
        </div>

        {/* Grid with hairline borders between cells */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden"
        >
          {focusAreas.map((item, i) => (
            <FocusCard key={i} {...item} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Industries ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-10 py-[72px]">
        <div className="flex flex-col gap-2.5 mb-9">
          <Eyebrow>Where we operate</Eyebrow>
          <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.015em]">
            Industries we serve
          </h2>
        </div>

        <div className="border border-gray-100 rounded-xl overflow-hidden">
          {industries.map((item, i) => (
            <IndustryRow key={i} {...item} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Mission ────────────────────────────────────────────────────────── */}
      <section className="max-w-[1120px] mx-auto px-10 py-[72px]">
        <div className="flex flex-col gap-2.5 mb-9">
          <Eyebrow>Our purpose</Eyebrow>
          <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.015em]">
            Mission & vision
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-[520px]">
            To empower businesses and communities with IoT and AI-driven
            solutions that make the world smarter, safer, and more connected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {pillars.map((p, i) => (
            <MissionPillar key={i} {...p} />
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Latest Insights ────────────────────────────────────────────────── */}
      <LatestInsights />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="max-w-[1120px] mx-auto px-10 py-[72px]">
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-10 py-12 flex items-center justify-between gap-6 flex-col md:flex-row">
          <div>
            <h2 className="text-[26px] font-medium leading-[1.2] tracking-[-0.015em]">
              Ready to build something intelligent?
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mt-2 max-w-[440px]">
              Whether you're exploring home automation or enterprise AI, we'd
              love to talk about what's possible.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition-colors no-underline"
            >
              Contact us →
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-md text-sm font-medium text-gray-800 hover:bg-white transition-colors no-underline"
            >
              View solutions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
