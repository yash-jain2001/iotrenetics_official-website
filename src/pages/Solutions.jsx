import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import SectionTitle from "../components/SectionTitle";
import SolutionBlock from "../components/SolutionBlock";

const solutions = [
  {
    title: (
      <>
        <span className="text-accent">Real-Time</span> System Monitoring
      </>
    ),
    description:
      "This use case focuses on real-time data acquisition and analysis to continuously monitor system health and performance. The solution enables automated alerts, predictive insights, and rapid fault detection, ensuring system stability and optimized operational efficiency.",
    image: "/assets/System.webp",
    reverse: false,
  },
  {
    title: (
      <>
        <span className="text-accent">IoT</span> Data Control & Automation
      </>
    ),
    description:
      "This use case supports bidirectional communication with IoT endpoints, allowing remote control, rule-based automation, and secure data transmission for scalable and efficient IoT deployments.",
    image: "/assets/Data.webp",
    reverse: true,
  },
  {
    title: (
      <>
        <span className="text-accent">Industrial</span> Equipment Monitoring
      </>
    ),
    description:
      "The solution enables real-time monitoring of industrial machines using sensor data to track operational parameters, detect anomalies, and reduce unplanned downtime through data-driven insights.",
    image: "/assets/industrial.webp",
    reverse: false,
  },
  {
    title: (
      <>
        <span className="text-accent">Process </span>Optimization & Automation
      </>
    ),
    description:
      "AI models continuously learn from operational data to optimize workflows, reduce energy consumption, and automate decision-making for improved industrial efficiency.",
    image: "/assets/Automation.webp",
    reverse: true,
  },
];

const sol = [
  { label: "HealNet", to: "/healnet" },
  // { label: "VisiAI", to: "/coming-soon" },
  // { label: "Agentra", to: "/coming-soon" },
];

const Solutions = () => {
  return (
    <>
      <section className="py-24 bg-white max-md:py-16" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-20">
            <SectionTitle accent="Our" postText=" Solutions" />
            <p className="mt-3 text-base text-gray-600">
              Explore how we can help you to achieve your goals.
            </p>
          </div>

          <div className="flex flex-col gap-20">
            {solutions.map((sol, i) => (
              <SolutionBlock
                key={i}
                title={sol.title}
                description={sol.description}
                image={sol.image}
                reverse={sol.reverse}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="text-center mb-20">
        <SectionTitle accent="Sol" postText="utions" />
      <div className="flex justify-center gap-8 mb-16 flex-wrap">
        {sol.map((item, idx) => (
          <Link key={idx} to={item.to}>
            <button className="bg-accent text-white border-none py-4 px-12 text-lg rounded cursor-pointer hover:bg-accent-dark transition-colors">
              {item.label}
            </button>
          </Link>
        ))}
      </div>
      </div>

      <CTASection />
    </>
  );
};

export default Solutions;
