import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";
import FeatureCard from "../components/FeatureCard";

const whyCards = [
  {
    img: "/assets/Automation3.webp",
    accent: "All-in-One",
    title: "Control",
    desc: "Manage lights, curtains, and appliances from a single app.",
  },
  {
    img: "/assets/Automation4.webp",
    accent: "Secure",
    title: "& Local",
    desc: "Your data stays safe on Indian servers—zero leaks, total privacy.",
  },
  {
    img: "/assets/Automation5.webp",
    accent: "Voice",
    title: "Assistant",
    desc: "Seamlessly integrates with Alexa. Your voice is now your remote control.",
  },
  {
    img: "/assets/Automation6.webp",
    accent: "Zero",
    title: "Latency",
    desc: "High-speed response times so lights turn on instantly.",
  },
  {
    img: "/assets/Automation8.webp",
    accent: "Seamless",
    title: "Integration",
    desc: "Integrate your regular switches and appliances effortlessly.",
  },
  {
    img: "/assets/Automation7.webp",
    accent: "10-Year",
    title: "Warranty",
    desc: "We don't just sell products; we build relationships.",
  },
];

const modes = [
  {
    accent: "Good",
    title: "Morning Mode",
    img: "/assets/Automation9.webp",
    desc: "• Experience the luxury of a home that understands your routine. As the morning light gently enters your space, the curtains open automatically, welcoming the day with warmth and elegance. Soft ambient lighting adjusts to a refreshing brightness, creating a calm and uplifting atmosphere throughout your home.",
  },
  {
    accent: "Movie",
    title: "Mode",
    img: "/assets/Automation10.webp",
    desc: "• Experience the ultimate home theater with IoTrenetics Solutions. As you settle in for your favorite film, the curtains close automatically, blocking out distractions and setting the stage for cinematic immersion. Warm, ambient lighting adjusts to the perfect glow, creating a cozy and elegant atmosphere.",
  },
  {
    accent: "Good",
    title: "Night Mode",
    img: "/assets/Automation11.webp",
    desc: "• Experience the ultimate comfort and tranquility with IoTrenetics Solutions. As evening falls, your lights dim gently, casting a serene glow that calms the mind and soothes the senses. Curtains draw automatically, creating a private sanctuary where you can truly unwind after a long day.",
  },
  {
    accent: "Guest",
    title: "Mode",
    img: "/assets/Automation12.webp",
    desc: "• Welcome your guests in style with IoTrenetics Solutions. As visitors enter, the hallway lights illuminate sequentially, guiding them with a warm, inviting glow. The chandelier gradually brightens, setting an elegant, premium tone, while subtle background music fills the space.",
  },
  {
    accent: "Away",
    title: "Mode",
    img: "/assets/Automation13.webp",
    desc: "Experience peace of mind like never before with IoTrenetics Solutions. When you step out, your home automatically secures itself—lights turn off, appliances enter energy-saving mode, and smart locks engage to protect every corner. Sensors monitor your space, creating a vigilant guardian that works silently in the background.",
  },
  {
    accent: "Care",
    title: "Mode",
    img: "/assets/Automation14.webp",
    desc: "Experience total peace of mind with IoTrenetics. Our Care Mode protects babies and seniors by maintaining stable temperatures, soft lighting, and motion alerts. When you leave, the home automatically secures itself, engaging smart locks and energy-saving modes. It is a vigilant, silent guardian ensuring safety for your entire family.",
  },
];

const automations = [
  {
    accent: "Smart",
    title: "Lights & Fans",
    img: "/assets/Automation15.webp",
    desc: "Transform your living space with intuitive lighting and airflow that automatically adjust to your presence and the time of day.",
  },
  {
    accent: "Smart",
    title: "Curtains",
    img: "/assets/Automation16.webp",
    desc: "Experience the ultimate convenience as your curtains automatically adapt to the time of day for the perfect blend of natural light and evening privacy.",
  },
  {
    accent: "Motion",
    title: "Detection",
    img: "/assets/Automation17.webp",
    desc: "Enjoy a responsive home that illuminates your path the moment motion is detected, ensuring safety and a warm welcome in every room.",
  },
  {
    accent: "Smart",
    title: "Doors",
    img: "/assets/Automation18.webp",
    desc: "IoTrenetics transforms your entryway into a secure, responsive gateway that locks and unlocks in perfect harmony with your movements.",
  },
];

const ModeCard = ({ accent, title, img, desc }) => (
  <div
    className="bg-gray-400 p-6 rounded-3xl w-full md:w-[calc(50%-20px)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    data-aos="fade-up"
  >
    <h3 className="text-2xl font-bold mb-4 text-center">
      <span className="text-accent">{accent}</span> {title}
    </h3>
    <img
      src={img}
      alt={`${accent} ${title}`}
      loading="lazy"
      className="w-full rounded-2xl mb-4"
    />
    <p className="text-base leading-relaxed text-black text-justify">{desc}</p>
  </div>
);

const AutomationCard = ({ accent, title, img, desc }) => (
  <div
    className="bg-white p-6 rounded-2xl w-full md:w-[calc(50%-20px)] shadow-[0_12px_25px_rgba(255,0,0,0.15)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(255,0,0,0.25)]"
    data-aos="fade-up"
  >
    <h3 className="text-2xl font-bold mb-5 text-center">
      <span className="text-accent">{accent}</span> {title}
    </h3>
    <div className="flex items-center gap-6 max-md:flex-col max-md:text-center">
      <img
        src={img}
        alt={`${accent} ${title}`}
        loading="lazy"
        className="w-[140px] object-contain"
      />
      <p className="text-base leading-relaxed text-black text-left max-md:text-center">
        {desc}
      </p>
    </div>
  </div>
);

const Automation = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-fill z-0 pointer-events-none"
        >
          <source
            src="/assets/Smart_home_transition_202603221919.mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-snug [text-shadow:0_4px_15px_rgba(0,0,0,0.7)]">
            Command Your Comfort. Powered by
            <br />
            <span className="text-accent">Home Automation</span>
          </h1>
        </div>
      </section>

      {/* Feature 1 */}
      <section className="bg-gray-100 py-20 px-5 md:px-16" data-aos="fade-up">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold">
          <span className="text-accent">YOUR</span> HOME FEATURE IN YOUR FINGER
        </h2>
        <h3 className="text-center mt-2.5 text-xl tracking-widest">
          EASY TO MAINTAIN
        </h3>
        <div className="flex items-center gap-16 mt-16 max-lg:flex-col">
          <div className="bg-white p-10 rounded-3xl w-full lg:w-[45%] shadow-lg transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl">
            <p className="text-xl leading-relaxed text-gray-800 mb-6 text-left">
              A comprehensive solution for seamless household management.
            </p>
            <p className="text-xl leading-relaxed text-gray-800 text-left">
              Our representative will guide you for the feature of our app and
              how it will support you.
            </p>
          </div>
          <div className="w-full lg:w-[55%]">
            <img
              src="/assets/Automation1.webp"
              alt="Home Automation App"
              loading="lazy"
              className="w-full rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Feature 2 */}
      <section className="bg-gray-100 py-20 px-5 md:px-16" data-aos="fade-up">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold">
          <span className="text-accent">Redefine</span> Your Living Experience
        </h2>
        <div className="flex items-center gap-16 mt-16 max-lg:flex-col">
          <div className="bg-white p-10 rounded-3xl w-full lg:w-[45%] shadow-lg transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl">
            <p className="text-xl leading-relaxed text-gray-800 text-left">
              Experience India's premier home automation, tailored to your
              rhythm. From mood-based lighting and intelligent climate control
              to one-tap scene setting—we don't just automate your home; we
              elevate your lifestyle. Effortless. Intuitive. Energy-efficient.
            </p>
          </div>
          <div className="w-full lg:w-[55%]">
            <img
              src="/assets/Automation2.webp"
              alt="Home Automation"
              loading="lazy"
              className="w-full rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-gray-200 py-20 px-5" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold">
            Why <span className="text-accent">IoTrenetics</span> Solutions Pvt.
            Ltd.?
          </h2>
          <h3 className="text-center text-xl md:text-2xl font-semibold mt-2.5">
            – The Gold Standard for Home Automation in India.
          </h3>
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {whyCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <img
                  src={card.img}
                  alt=""
                  loading="lazy"
                  className="w-14 mb-4 mx-auto"
                />
                <h4 className="text-xl font-bold">
                  <span className="text-accent">{card.accent}</span>{" "}
                  {card.title}
                </h4>
                <p className="text-sm leading-relaxed mt-2">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="bg-gray-300 py-20 px-5" data-aos="fade-up">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-16">
          Multiple operation modes available
        </h2>
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-10">
          {modes.map((mode, i) => (
            <ModeCard key={i} {...mode} />
          ))}
        </div>
      </section>

      {/* Automations */}
      <section className="bg-gray-300 py-20 px-5" data-aos="fade-up">
        <h2 className="text-center text-3xl font-extrabold text-black mb-16 tracking-wide">
          <span className="text-accent">AUTO</span>MATIONS
        </h2>
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-10">
          {automations.map((auto, i) => (
            <AutomationCard key={i} {...auto} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Automation;
