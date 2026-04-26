import CTASection from "../components/CTASection";

const features = [
  { icon: "control-panel.png", title: "Centralized Control", desc: "Unified system control" },
  { icon: "building.png", title: "BMS", desc: "Full building automation" },
  { icon: "security-checked.png", title: "Security", desc: "Enterprise-grade safety" },
  { icon: "lightning-bolt.png", title: "Energy", desc: "Optimized consumption" },
  { icon: "speed.png", title: "Zero Latency", desc: "Instant response" },
  { icon: "network.png", title: "Scalable", desc: "Grows with infra" },
  { icon: "monitor.png", title: "Monitoring", desc: "Real-time tracking" },
  { icon: "settings.png", title: "Custom", desc: "Tailored automation" },
];

const useCases = [
  {
    title: "SMART OFFICE",
    img: "./assets/commercial1.png",
    points: ["Dimmable lights", "AC automation", "Meeting automation", "Director lock"],
  },
  {
    title: "RETAIL / SHOWROOM",
    img: "./assets/commercial2.png",
    points: ["Scene lighting", "Sound automation", "Smart triggers"],
  },
  {
    title: "BMS SYSTEM",
    img: "./assets/commercial3.png",
    points: ["Outdoor lighting", "Fire system integration", "STP / ETP automation", "Pump control systems"],
  },
  {
    title: "SECURITY",
    img: "./assets/commercial5.png",
    points: ["Magnetic locks", "Fingerprint / Face unlock", "Access logs"],
  },
  {
    title: "CONFERENCE ROOM",
    img: "/assets/commercial4.png",
    points: ["Projector automation", "Motorized screen", "Audio sync system"],
  },
];

const FeatureCard = ({ icon, title, desc }) => (
  <div className="w-[calc(50%-16px)] md:w-[calc(25%-24px)] bg-white rounded-2xl p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <img
      src={`https://img.icons8.com/ios-filled/50/00c3ff/${icon}`}
      alt={title}
      className="mx-auto mb-4 w-12"
    />
    <h4 className="text-lg font-bold">{title}</h4>
    <p className="text-sm mt-2 text-gray-600">{desc}</p>
  </div>
);

const UseCaseCard = ({ title, img, points }) => (
  <div className="flex items-center gap-16 max-lg:flex-col bg-white p-10 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <div className="w-full lg:w-[50%]">
      <img src={img} alt={title} className="w-full rounded-2xl" />
    </div>
    <div className="w-full lg:w-[50%]">
      <h3 className="text-2xl font-bold mb-4 text-accent">{title}</h3>
      <ul className="space-y-2 text-gray-700">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>
  </div>
);

const OfficeAutomation = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[url('/assets/MainOfficeAutomation.jpg')] bg-cover bg-center h-[90vh] flex items-center justify-center text-center">
        <div className="relative z-10">
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-snug">
            POWERING INTELLIGENT <br />
            <span className="text-accent">COMMERCIAL SPACES</span>
          </h1>
          <p className="text-white mt-4 max-w-2xl mx-auto">
            From offices to large-scale facilities — automate, monitor, and control everything seamlessly.
          </p>
          {/* <div className="mt-6 flex gap-4 justify-center flex-wrap">
            <button className="bg-accent text-white px-6 py-3 rounded-full font-semibold">
              Schedule a Demo
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold">
              Download Capability Deck
            </button>
          </div> */}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-gray-100 py-10 text-center">
        <p className="text-lg font-semibold">
          Trusted for Smart Infrastructure & Enterprise Automation
        </p>
        <span className="text-gray-600">
          Offices | Retail | Buildings | Institutions
        </span>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-200 py-20 px-5">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
          Core <span className="text-accent">Features</span>
        </h2>
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-gray-100 py-20 px-5">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {useCases.map((item, i) => (
            <UseCaseCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="bg-gray-200 py-20 text-center px-5">
        <h2 className="text-3xl font-bold mb-4">
          Transform Your Commercial Space into an Intelligent Ecosystem
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Scalable automation that enhances efficiency, control, and operational intelligence.
        </p>
      </section>

      {/* RESULTS */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-[900px] mx-auto flex justify-around text-center">
          <div>
            <h2 className="text-4xl font-bold text-accent">30+</h2>
            <p>Energy Savings</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-accent">100%</h2>
            <p>Control</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-accent">100%</h2>
            <p>Monitoring</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
};

export default OfficeAutomation;