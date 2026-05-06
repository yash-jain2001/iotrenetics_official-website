import { useEffect, useRef } from "react";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";
import FeatureCard from "../components/FeatureCard";
import SmartHomePage from "../components/SmartifyClone";
import { Link } from "react-router-dom";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const whyCards = [
  {
    img: "/assets/Automation3.webp",
    accent: "All-in-One",
    title: "Control",
    desc: "Manage lights, curtains, and appliances from a single app.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    img: "/assets/Automation4.webp",
    accent: "Secure",
    title: "& Local",
    desc: "Your data stays safe on Indian servers—zero leaks, total privacy.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    img: "/assets/Automation5.webp",
    accent: "Voice",
    title: "Assistant",
    desc: "Seamlessly integrates with Alexa. Your voice is now your remote control.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
  },
  {
    img: "/assets/Automation6.webp",
    accent: "Zero",
    title: "Latency",
    desc: "High-speed response times so lights turn on instantly.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    img: "/assets/Automation8.webp",
    accent: "Seamless",
    title: "Integration",
    desc: "Integrate your regular switches and appliances effortlessly.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    img: "/assets/Automation7.webp",
    accent: "10-Year",
    title: "Warranty",
    desc: "We don't just sell products; we build relationships.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const modes = [
  {
    accent: "Good Morning",
    title: "Mode",
    img: "/assets/Automation9.webp",
    desc: "Experience the luxury of a home that understands your routine. As the morning light gently enters your space, the curtains open automatically, welcoming the day with warmth and elegance.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    accent: "Movie",
    title: "Mode",
    img: "/assets/Automation10.webp",
    desc: "Experience the ultimate home theater. As you settle in for your favorite film, the curtains close automatically, blocking out distractions and setting the stage for cinematic immersion.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
  },
  {
    accent: "Good Night",
    title: "Mode",
    img: "/assets/Automation11.webp",
    desc: "Experience ultimate comfort and tranquility. As evening falls, your lights dim gently, casting a serene glow that calms the mind. Curtains draw automatically, creating a private sanctuary.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    accent: "Guest",
    title: "Mode",
    img: "/assets/Automation12.webp",
    desc: "Welcome your guests in style. As visitors enter, the hallway lights illuminate sequentially, guiding them with a warm, inviting glow. The chandelier brightens, setting an elegant, premium tone.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    accent: "Away",
    title: "Mode",
    img: "/assets/Automation13.webp",
    desc: "When you step out, your home automatically secures itself—lights turn off, appliances enter energy-saving mode, and smart locks engage to protect every corner.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    accent: "Care",
    title: "Mode",
    img: "/assets/Automation14.webp",
    desc: "Our Care Mode protects babies and seniors by maintaining stable temperatures, soft lighting, and motion alerts. A vigilant, silent guardian ensuring safety for your entire family.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const automations = [
  {
    accent: "Smart",
    title: "Lights & Fans",
    img: "/assets/Automation15.webp",
    desc: "Transform your living space with intuitive lighting and airflow that automatically adjusts to your presence and the time of day.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    accent: "Smart",
    title: "Curtains",
    img: "/assets/Automation16.webp",
    desc: "Experience the ultimate convenience as your curtains automatically adapt to the time of day for the perfect blend of natural light and evening privacy.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M12 3v18M3 9h4M3 15h4M17 9h4M17 15h4" />
      </svg>
    ),
  },
  {
    accent: "Motion",
    title: "Detection",
    img: "/assets/Automation17.webp",
    desc: "Enjoy a responsive home that illuminates your path the moment motion is detected, ensuring safety and a warm welcome in every room.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
      </svg>
    ),
  },
  {
    accent: "Smart",
    title: "Doors",
    img: "/assets/Automation18.webp",
    desc: "IoTrenetics transforms your entryway into a secure, responsive gateway that locks and unlocks in perfect harmony with your movements.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12V6a1 1 0 0 1 .293-.707l3-3A1 1 0 0 1 7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a1 1 0 0 1-.707-.293l-3-3A1 1 0 0 1 3 18v-2" />
        <circle cx="14" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

/* ─── Reusable Sub-components ───────────────────────────────────────────── */

const EyebrowLabel = ({ children }) => (
  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-3">
    {children}
  </p>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
    {children}
  </h2>
);

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-0" />
);

/* ─── Main Component ─────────────────────────────────────────────────────── */

const HomeAutomation = () => {
  /* Minimal scroll-reveal using IntersectionObserver (no external dep) */
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ha-visible");
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll(".ha-reveal").forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Scroll reveal */
        .ha-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .ha-reveal.ha-visible { opacity: 1; transform: none; }
        .ha-delay-1 { transition-delay: 0.1s; }
        .ha-delay-2 { transition-delay: 0.2s; }
        .ha-delay-3 { transition-delay: 0.3s; }
        .ha-delay-4 { transition-delay: 0.4s; }
        .ha-delay-5 { transition-delay: 0.5s; }

        /* Why card hover */
        .why-card {
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .why-card:hover {
          border-color: #bfdbfe;
          box-shadow: 0 8px 32px rgba(37,99,235,0.07);
          transform: translateY(-4px);
        }

        /* Mode card hover */
        .mode-card {
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .mode-card:hover {
          border-color: #bfdbfe;
          box-shadow: 0 12px 40px rgba(37,99,235,0.09);
          transform: translateY(-4px);
        }

        /* Automation card hover */
        .auto-card {
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .auto-card:hover {
          border-color: #bfdbfe;
          box-shadow: 0 8px 32px rgba(37,99,235,0.08);
          transform: translateY(-3px);
        }

        /* Hero text fade-in */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-text { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-sub  { animation: heroFadeUp 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-btn  { animation: heroFadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) both; }

        /* Subtle pulse on icon wrappers */
        @keyframes iconFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .icon-float { animation: iconFloat 3s ease-in-out infinite; }

        /* Feature image subtle zoom */
        .feature-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .feature-img:hover { transform: scale(1.02); }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[url('/assets/MainHomeAutomation.webp')] bg-cover bg-center min-h-[90vh] flex items-center justify-center text-center overflow-hidden">
        {/* Premium dark veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/55 to-gray-900/75" />

        {/* Subtle grid overlay for fintech texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="hero-text inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Home Automation · IoTrenetics
          </div>

          <h1 className="hero-sub text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] leading-tight [text-shadow:0_4px_30px_rgba(0,0,0,0.4)]">
            Command Your Comfort.
            <br />
            <span className="text-blue-300">Powered by Intelligence.</span>
          </h1>

          <p className="hero-sub text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
            India's most trusted home automation platform — where precision
            engineering meets effortless living.
          </p>

          <div className="hero-btn flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/contact"
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200 hover:shadow-[0_0_24px_rgba(59,130,246,0.45)] hover:scale-[1.03]"
            >
              Explore Features
            </Link>
            <Link
              to="/coming-soon"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-sm px-7 py-3 rounded-full transition-all duration-200"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Feature 1 — App Control ───────────────────────────────────────── */}
      <section className="bg-white py-24 px-5 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-16 flex-col lg:flex-row">
            {/* Text */}
            <div className="w-full lg:w-[45%] ha-reveal">
              <EyebrowLabel>Smart Control</EyebrowLabel>
              <SectionHeading>
                Your Home Features
                <br />
                <span className="text-blue-600">At Your Fingertips</span>
              </SectionHeading>
              <p className="mt-6 text-gray-500 text-base leading-relaxed">
                A comprehensive solution for seamless household management. Our
                representative will guide you through every feature of our app
                and how it supports your lifestyle.
              </p>

              {/* Inline feature pills */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Single App Control",
                  "Voice Ready",
                  "Offline Support",
                  "Easy Setup",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-[55%] ha-reveal ha-delay-2">
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-[0_24px_64px_rgba(0,0,0,0.08)]">
                <img
                  src="/assets/Automation1.webp"
                  alt="Home Automation App"
                  loading="lazy"
                  className="w-full feature-img block"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white icon-float">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      System Status
                    </p>
                    <p className="text-xs font-bold text-gray-900">
                      All Devices Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Feature 2 — Living Experience ────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-5 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-16 flex-col lg:flex-row-reverse">
            {/* Text */}
            <div className="w-full lg:w-[45%] ha-reveal">
              <EyebrowLabel>Premium Living</EyebrowLabel>
              <SectionHeading>
                Redefine Your
                <br />
                <span className="text-blue-600">Living Experience</span>
              </SectionHeading>
              <p className="mt-6 text-gray-500 text-base leading-relaxed">
                Experience India's premier home automation, tailored to your
                rhythm. From mood-based lighting and intelligent climate control
                to one-tap scene setting — we don't just automate your home; we
                elevate your lifestyle.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { label: "Effortless", sub: "Setup" },
                  { label: "Intuitive", sub: "Interface" },
                  { label: "Energy", sub: "Efficient" },
                ].map(({ label, sub }) => (
                  <div
                    key={label}
                    className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:border-blue-100 hover:shadow-md transition-all duration-200"
                  >
                    <p className="text-sm font-bold text-blue-600">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-[55%] ha-reveal ha-delay-2">
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-[0_24px_64px_rgba(0,0,0,0.07)]">
                <img
                  src="/assets/Automation2.webp"
                  alt="Home Automation"
                  loading="lazy"
                  className="w-full feature-img block"
                />
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 icon-float">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      Energy Saved
                    </p>
                    <p className="text-xs font-bold text-gray-900">
                      This Month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Why IoTrenetics ───────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 ha-reveal">
            <EyebrowLabel>Why Choose Us</EyebrowLabel>
            <SectionHeading>
              The Gold Standard for
              <br />
              <span className="text-blue-600">Home Automation in India</span>
            </SectionHeading>
          </div>

          {/* Grid with gap-px trick */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {whyCards.map((card, i) => (
              <div
                key={i}
                className={`why-card bg-white p-8 flex flex-col gap-4 border-transparent border ha-reveal ha-delay-${(i % 3) + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    {card.icon}
                  </div>
                  <h4 className="text-base font-bold text-gray-900 leading-snug">
                    <span className="text-blue-600">{card.accent}</span>{" "}
                    {card.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Modes ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 ha-reveal">
            <EyebrowLabel>Intelligent Scenes</EyebrowLabel>
            <SectionHeading>
              Multiple Operation
              <br />
              <span className="text-blue-600">Modes Available</span>
            </SectionHeading>
            <p className="mt-4 text-gray-400 text-sm max-w-lg mx-auto">
              Pre-configured intelligent scenes that adapt to every moment of
              your day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modes.map((mode, i) => (
              <div
                key={i}
                className={`mode-card bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col ha-reveal ha-delay-${(i % 2) + 1}`}
              >
                {/* Image */}
                <div className="w-full aspect-[16/7] overflow-hidden">
                  <img
                    src={mode.img}
                    alt={`${mode.accent} ${mode.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover feature-img"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      {mode.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      <span className="text-blue-600">{mode.accent}</span>{" "}
                      {mode.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {mode.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Automations ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 ha-reveal">
            <EyebrowLabel>Core Automations</EyebrowLabel>
            <SectionHeading>
              Built-in <span className="text-blue-600">Smart Automations</span>
            </SectionHeading>
            <p className="mt-4 text-gray-400 text-sm max-w-lg mx-auto">
              Every device in your home, working in perfect harmony —
              automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((auto, i) => (
              <div
                key={i}
                className={`auto-card bg-white border border-gray-100 rounded-2xl p-7 flex items-center gap-6 ha-reveal ha-delay-${(i % 2) + 1} max-md:flex-col max-md:text-center`}
              >
                {/* Image */}
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <img
                    src={auto.img}
                    alt={`${auto.accent} ${auto.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover feature-img"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 max-md:justify-center">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      {auto.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      <span className="text-blue-600">{auto.accent}</span>{" "}
                      {auto.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {auto.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <SmartHomePage />

      <CTASection />
    </>
  );
};

export default HomeAutomation;
