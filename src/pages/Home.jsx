import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";
import InfoCard from "../components/InfoCard";

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

const products = [
  {name:"Enerlytix - Smart Energy Management", link: "/coming-soon"},
  {name:"AquaMind - AI-Powered Water System", link: "/coming-soon"},
  {name:"Agentra - AI Teammates for Business", link: "/coming-soon"},
  {name:"Privora - Private LLM Platform", link: "/coming-soon"},
  {name:"VisiAI - Smart Video Analytics", link: "/coming-soon"},
];

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
  return (
    <>
      {/* Hero */}
      <section
        className="bg-gradient-to-br from-brand to-brand-dark text-white text-center py-24 px-5 max-md:py-16"
        data-aos="fade-up"
      >
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligence in Motion.
          </h1>
          <p className="text-lg mb-6 max-md:text-base">
            Bridging the gap between the physical and digital worlds through
            IoT, AI, and automation.
          </p>
          <Link
            to="/industries"
            className="bg-white text-brand py-3 px-7 rounded-full font-bold transition-colors duration-300 hover:bg-gray-200 no-underline inline-block"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-5 md:px-20 bg-white" data-aos="fade-up">
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
        <h2 className="text-center mt-16 text-2xl md:text-3xl font-bold">
          Empowering Innovation Through Technology
        </h2>
      </section>

      {/* Core Focus */}
      <section className="py-12 px-5" data-aos="fade-up">
        <SectionTitle accent="Core" postText=" Focus Areas" />
        <FocusGrid items={coreFocusItems} />
      </section>

      {/* Industries */}
      <section className="py-12 px-5" data-aos="fade-up">
        <SectionTitle accent="Ind" postText="ustries We Serve" />
        <FocusGrid items={industriesItems} />
      </section>

      {/* Products */}
      <section className="py-16 px-5">
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
      </section>

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
          <SectionTitle accent="Our" postText=" Partners" />
          <p className="max-w-[900px] mx-auto mb-10 text-base leading-relaxed text-gray-700">
            At <strong>IoTrenetics Solutions Pvt. Ltd.</strong>, we believe
            innovation thrives through collaboration. We work closely with
            leading{" "}
            <strong>
              academic institutions, research labs, and industry partners
            </strong>{" "}
            to co-develop intelligent, sustainable, and real-time digital
            solutions.
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

      <CTASection />
    </>
  );
};

export default Home;
