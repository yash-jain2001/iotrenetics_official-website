import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";
import StatsCounter from "../components/StatsCounter";
import IoTExplanation from "../components/IoTExplanation";
import LatestInsights from "../components/LatestInsights";
import NewsTicker from "../components/NewsTicker";

const coreFocusItems = [
  { img: "/assets/core 0.jpeg", label: "Home Automation", link: "/automation" },
  { img: "/assets/core 1.webp.jpeg", label: "IoT-Driven Automation", link: "/iot-driven-automation" },
  { img: "/assets/core 2.webp", label: "AI & Generative AI Solutions", link: "/ai-and-genrative-solutions" },
  { img: "/assets/core 3.webp", label: "Video Analytics & Computer Vision", link: "/video-analytics-and-computer-vision" },
  { img: "/assets/core 4.webp", label: "AR/VR & Immersive Technologies", link: "/arvr-and-immersive-technologies" },
  { img: "/assets/core 5.webp", label: "Digital Transformation Systems", link: "/digital-transformation-systems" },
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

// const NetworkBackground = () => (
//   <div className="absolute inset-0 overflow-hidden pointer-events-none">
//     {/* Network lines and nodes */}
//     <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <pattern id="networkBg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//           <circle cx="10" cy="10" r="2" fill="white" />
//           <circle cx="50" cy="50" r="3" fill="white" />
//           <circle cx="90" cy="20" r="2" fill="white" />
//           <path d="M10,10 L50,50 L90,20" stroke="white" strokeWidth="0.5" fill="none" />
//         </pattern>
//       </defs>
//       <rect x="0" y="0" width="100%" height="100%" fill="url(#networkBg)" />
//     </svg>
//     {/* Animated glowing orbs */}
//     <motion.div
//       animate={{
//         y: [0, -50, 0],
//         x: [0, 30, 0],
//         scale: [1, 1.2, 1],
//         opacity: [0.3, 0.5, 0.3],
//       }}
//       transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       className="absolute top-[20%] left-[15%] w-64 h-64 bg-white/20 rounded-full blur-3xl"
//     />
//     <motion.div
//       animate={{
//         y: [0, 60, 0],
//         x: [0, -40, 0],
//         scale: [1, 1.5, 1],
//         opacity: [0.2, 0.4, 0.2],
//       }}
//       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-white/10 rounded-full blur-3xl"
//     />
//     <motion.div
//       animate={{
//         y: [0, -30, 0],
//         x: [0, -20, 0],
//         opacity: [0.3, 0.6, 0.3],
//       }}
//       transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       className="absolute top-[40%] right-[40%] w-40 h-40 bg-white/10 rounded-full blur-2xl"
//     />
//   </div>
// );

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
  <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto">
    {items.map((item, i) => {
      const wrapperClassName = "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm block no-underline text-inherit";
      const innerContent = (
        <div className="text-center rounded-xl border overflow-hidden h-full flex flex-col">
          <img
            src={item.img}
            alt={item.label}
            loading="lazy"
            className="w-full object-cover h-64 rounded-lg flex-shrink-0"
          />
          <div className="bg-gray-100 p-6 rounded-xl text-center font-medium shadow-sm mt-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex-grow">
            {item.label}
          </div>
        </div>
      );

      return item.link ? (
        <Link
          to={item.link}
          key={i}
          className={wrapperClassName}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          {innerContent}
        </Link>
      ) : (
        <div
          key={i}
          className={wrapperClassName}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          {innerContent}
        </div>
      );
    })}
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
      {/* 2. Running News / Updates Ticker */}
      <NewsTicker />

      {/* 3. Hero Banner Section */}
      <section
        className="relative bg-gradient-to-br from-brand to-brand-dark text-white text-center h-[90vh] md:h-screen items-center justify-center flex px-5 max-md:py-20 overflow-hidden"
      >
        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source
            src="/assets/Smart_home_transition_202603221919.mp4"
            type="video/mp4"
          />
        </video>
        {/* <NetworkBackground /> */}
        <div className="max-w-[900px] mx-auto relative backdrop-blur-sm p-5 rounded-lg z-10" data-aos="fade-up">
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

      {/* 4. About Us Section (Text Only) */}
      <section className="py-10 px-5 border md:px-20 bg-gray-50 text-center" data-aos="fade-up">
        <div className="w-full mx-auto flex flex-col items-center justify-center gap-5">
          <h3 className="text-3xl md:text-4xl font-bold">
            About <span className="text-accent">Us</span>
          </h3>
          <p className="bg-white text-lg md:text-xl p-10 rounded-3xl leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand/5 border border-gray-100">
            IoTrenetics Solutions Pvt. Ltd. is an innovative technology
            startup working at the intersection of IoT, AI, Generative AI,
            AR/VR, and Digital Transformation. Our mission is to build
            intelligent, connected, and sustainable systems that empower
            industries and communities to make smarter decisions.
          </p>
          <Link to="/about">
            <button className="py-4 px-10 rounded-full border border-gray-200 bg-white text-lg font-bold cursor-pointer mx-auto block transition-all duration-300 hover:bg-brand hover:text-white hover:-translate-y-1 hover:border-brand shadow-sm">
              Learn <span className="text-accent group-hover:text-white">More</span>
            </button>
          </Link>
        </div>
      </section>

      {/* 7. Core Focus Areas Section */}
      <section className="py-16 px-5 bg-gray-50" data-aos="fade-up">
        <SectionTitle accent="Core" postText=" Focus Areas" />
        <FocusGrid items={coreFocusItems} />
      </section>

      {/* 8. Additional Sections */}
      <IoTExplanation />
      
      {/* <StatsCounter /> */}

      <section className="py-10 px-5 bg-white" data-aos="fade-up">
        <SectionTitle accent="Ind" postText="ustries We Serve" />
        <FocusGrid items={industriesItems} />
      </section>


      <section className="bg-gray-50 border-b py-20 px-5" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle accent="Our" postText=" Mission" />
          <p className="text-center max-w-[800px] mx-auto mb-12 text-xl opacity-90 leading-relaxed font-light">
            To empower businesses and communities by delivering cutting-edge IoT
            and AI-driven solutions that make the world smarter, safer, and more
            connected.
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 mt-8">
            {missionCards.map((card, i) => (
              <InfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                description={card.desc}
                className="flex-1 min-w-[280px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-5 text-center" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle accent="Our" postText=" Vision" />
          <p className="max-w-[900px] mx-auto mb-16 text-lg md:text-xl leading-relaxed text-gray-700 font-light">
            IoTrenetics was founded with the vision of building intelligent systems that seamlessly connect the physical and digital worlds. We aim to create smarter environments powered by automation, AI, and connected devices.
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
            {partnerCards.map((card, i) => (
              <InfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                description={card.desc}
                className="flex-1 min-w-[280px]"
              />
            ))}
          </div>
        </div>
      </section>

      <LatestInsights />

      <CTASection />
    </>
  );
};

export default Home;
