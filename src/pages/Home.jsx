import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";
import Marquee from "../components/Marquee";
import StatsCounter from "../components/StatsCounter";
import TechMarquee from "../components/TechMarquee";
import IoTExplanation from "../components/IoTExplanation";
import LatestInsights from "../components/LatestInsights";

const coreFocusItems = [
  { img: "/assets/core 1.webp", label: "IoT-Driven Automation" },
  { img: "/assets/core 2.webp", label: "AI & Generative AI Solutions" },
  { img: "/assets/core 3.webp", label: "Video Analytics & Computer Vision" },
  { img: "/assets/core 4.webp", label: "AR/VR & Immersive Technologies" },
  { img: "/assets/core 5.webp", label: "Digital Transformation Systems" },
];

const industriesItems = [
  { img: "/assets/core 6.webp", label: "Healthcare & MedTech" },
  { img: "/assets/core 7.webp", label: "Industrial Automation" },
  { img: "/assets/core 8.webp", label: "Video Analytics & Computer Vision" },
  { img: "/assets/core 9.webp", label: "AR/VR & Immersive Technologies" },
  { img: "/assets/core 10.webp", label: "Digital Transformation Systems" },
];

const heroHeadings = [
  "Smart IoT Solutions for Connected Environments",
  "Building Intelligent Infrastructure Through IoT",
  "Advanced Automation for Modern Systems",
];

const NetworkBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Network lines and nodes */}
    <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="networkBg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="white" />
          <circle cx="50" cy="50" r="3" fill="white" />
          <circle cx="90" cy="20" r="2" fill="white" />
          <path d="M10,10 L50,50 L90,20" stroke="white" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#networkBg)" />
    </svg>
    {/* Animated glowing orbs */}
    <motion.div
      animate={{
        y: [0, -50, 0],
        x: [0, 30, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[20%] left-[15%] w-64 h-64 bg-white/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        y: [0, 60, 0],
        x: [0, -40, 0],
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-white/10 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        y: [0, -30, 0],
        x: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[40%] right-[40%] w-40 h-40 bg-white/10 rounded-full blur-2xl"
    />
  </div>
);

// const products = [
//   {name:"Enerlytix - Smart Energy Management", link: "/coming-soon"},
//   {name:"AquaMind - AI-Powered Water System", link: "/coming-soon"},
//   {name:"Agentra - AI Teammates for Business", link: "/coming-soon"},
//   {name:"Privora - Private LLM Platform", link: "/coming-soon"},
//   {name:"VisiAI - Smart Video Analytics", link: "/coming-soon"},
// ];

const missionCards = [
  {
    icon: "🌍",
    title: "Sustainability",
    desc: "Building eco-friendly and energy-efficient technologies for a better tomorrow.",
  },
  {
    icon: "🤖",
    title: "Innovation",
    desc: "Creating smart systems that learn, adapt, and transform industries through AI and IoT.",
  },
  {
    icon: "💼",
    title: "Collaboration",
    desc: "Partnering with enterprises to bring digital transformation to life.",
  },
];

const partnerCards = [
  {
    icon: "🏫",
    title: "Academic Collaboration",
    desc: "Joint research and innovation initiatives with universities and technology institutes to advance IoT–AI integration.",
  },
  {
    icon: "🏭",
    title: "Industry Alliances",
    desc: "Collaborating with manufacturing, healthcare, and automation sectors to develop scalable smart solutions.",
  },
  {
    icon: "🌐",
    title: "Innovation Ecosystem",
    desc: "Partnering with startups and R&D labs to foster digital transformation across India and Nepal.",
  },
];

const FocusGrid = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
    {items.map((item, i) => (
      <div
        key={i}
        className="text-center"
        data-aos="fade-up"
        data-aos-delay={i * 100}
      >
        <img
          src={item.img}
          alt={item.label}
          loading="lazy"
          className="w-full h-64 rounded-lg"
        />
        <div className="bg-gray-100 p-6 rounded-xl text-center font-medium shadow-sm mt-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
          {item.label}
        </div>
      </div>
    ))}
  </div>
);

const Home = () => {
  const [currentHeading, setCurrentHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % heroHeadings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-gradient-to-br from-brand to-brand-dark text-white text-center py-32 px-5 max-md:py-20 overflow-hidden"
      >
        <NetworkBackground />
        <div className="max-w-[900px] mx-auto relative z-10" data-aos="fade-up">
          <div className="min-h-[140px] md:min-h-[120px] flex items-end justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentHeading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
              >
                {heroHeadings[currentHeading]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="text-lg md:text-xl mb-10 max-md:text-base opacity-90 max-w-[700px] mx-auto font-light">
            Bridging the gap between the physical and digital worlds through
            IoT, AI, and continuous automation.
          </p>
          <Link
            to="/industries"
            className="bg-white text-brand py-4 px-10 rounded-full font-bold text-lg shadow-xl shadow-black/10 transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-1 no-underline inline-block"
          >
            Explore Solutions
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-5 px-5 md:px-20 bg-white" data-aos="fade-up">
        <div className="flex items-center justify-between gap-10 max-lg:flex-col max-lg:text-center">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-5">
              About <span className="text-accent">Us</span>
            </h3>
            <p className="bg-gray-100 text-lg p-8 rounded-2xl leading-relaxed max-w-[800px] mx-auto text-center shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:bg-white">
              IoTrenetics Solutions Pvt. Ltd. is an innovative technology
              startup working at the intersection of IoT, AI, Generative AI,
              AR/VR, and Digital Transformation. Our mission is to build
              intelligent, connected, and sustainable systems that empower
              industries and communities to make smarter decisions.
            </p>
            <Link to="/about">
              <button className="py-3.5 px-8 rounded-full border-none bg-gray-100 text-lg cursor-pointer mt-5 mx-auto block transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-lg">
                Learn <span className="text-accent font-bold">More</span>
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <img
              src="/assets/main 1.webp"
              alt="IoTrenetics Illustration"
              loading="lazy"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
        <h2 className="text-center mt-16 mb-6 text-2xl md:text-3xl font-bold">
          Empowering Innovation Through Technology
        </h2>
        <Marquee direction="left"/>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Core Focus */}
      <section className="py-3 px-5 mb-12" data-aos="fade-up">
        <SectionTitle accent="Core" postText=" Focus Areas" />
        <FocusGrid items={coreFocusItems} />
      </section>

      {/* IoT Explanation */}
      <IoTExplanation />

      {/* Industries */}
      <section className="py-20 px-5" data-aos="fade-up">
        <SectionTitle accent="Ind" postText="ustries We Serve" />
        <FocusGrid items={industriesItems} />
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* Mission */}
      {/* <section className="py-16 px-5">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle accent="Pro" postText="duct Portfolio" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-8">
            {products.map((item, i) => (
              <Link to={item.link}>
                <div
                  key={i}
                  className="bg-gray-100 h-32 p-6 rounded-xl text-center font-medium shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Mission */}
      <section className="bg-gray-50 py-16 px-5" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle accent="Our" postText=" Mission" />
          <p className="text-center max-w-[800px] mx-auto mb-8 text-lg">
            To empower businesses and communities by delivering cutting-edge IoT
            and AI-driven solutions that make the world smarter, safer, and more
            connected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {missionCards.map((card, i) => (
              <InfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                description={card.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-gray-50 py-16 px-5 text-center" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle accent="Our" postText=" Vision" />
          <p className="max-w-[900px] mx-auto mb-10 text-base leading-relaxed text-gray-700">
            IoTrenetics was founded with the vision of building intelligent systems that seamlessly connect the physical and digital worlds. We aim to create smarter environments powered by automation, AI, and connected devices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerCards.map((card, i) => (
              <InfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                description={card.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <LatestInsights />

      <CTASection />
    </>
  );
};

export default Home;
