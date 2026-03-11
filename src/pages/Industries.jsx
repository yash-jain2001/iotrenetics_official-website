import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import SectionTitle from '../components/SectionTitle';

const industries = [
  {
    icon: '/assets/Icon1.webp', title: 'Healthcare & MedTech', gif: '/assets/Gif1.gif',
    desc: 'AI-driven healthcare systems for smarter, safer patient care.',
    items: ['Smart patient monitoring & real-time alerts.', 'Medical video analytics for ICUs, OTs & facilities.', 'AI assistants for clinicians, operations & compliance.'],
    solutions: [{ label: 'HealNet', to: '/healnet' }, { label: 'VisiAI', to:"/coming-soon" }, { label: 'Agentra', to:"/coming-soon" }],
  },
  {
    icon: '/assets/Icon2.webp', title: 'Industrial Automation', gif: '/assets/Gif2.gif',
    desc: 'Connected factories powered by real-time intelligence and AI.',
    items: ['Equipment health monitoring & predictive maintenance.', 'Workplace safety & surveillance analytics.', 'Operational dashboards for factories & plants.'],
    solutions: [{ label: 'HealNet', to: '/healnet' }, { label: 'VisiAI', to:"/coming-soon" }, { label: 'Agentra', to:"/coming-soon" }],
  },
  {
    icon: '/assets/Icon3.webp', title: 'Smart Cities', gif: '/assets/Gif3.gif',
    desc: 'Building safer, sustainable and data-driven urban ecosystems.',
    items: ['Traffic, crowd & public safety analytics.', 'Smart lighting, utilities & infrastructure monitoring.', 'City-wide real-time alerts & insights.'],
    solutions: [{ label: 'Enerlytix', to:"/coming-soon" }, { label: 'VisiAI', to:"/coming-soon" }, { label: 'AquaMind', to:"/coming-soon" }],
  },
  {
    icon: '/assets/Icon4.webp', title: 'Energy & Utilities', gif: '/assets/Gif4.gif',
    desc: 'Optimizing energy and water resources through AI-powered insights.',
    items: ['Smart energy monitoring & consumption optimization.', 'Water usage analytics & leak detection.', 'Demand forecasting & sustainability reporting.'],
    solutions: [{ label: 'Enerlytix', to:"/coming-soon" }, { label: 'AquaMind', to:"/coming-soon" }],
  },
  {
    icon: '/assets/Icon5.webp', title: 'Education & Training', gif: '/assets/Gif5.gif',
    desc: 'Smarter learning environments with AI and immersive technologies.',
    items: ['Smart classrooms & campus automation.', 'AI teaching assistants & knowledge bots.', 'AR/VR-based skill training & simulations.'],
    solutions: [{ label: 'Agentra', to:"/coming-soon" }, { label: 'Virtura', to:"/coming-soon" }, { label: 'NeuraLinka', to:"/coming-soon" }],
  },
  {
    icon: '/assets/Icon6.webp', title: 'Enterprises & Corporates', gif: '/assets/Gif6.gif',
    desc: 'AI teammates and automation for modern digital enterprises.',
    items: ['Internal AI copilots for email, HR, CRM & support.', 'Secure private LLM deployments.', 'Workflow automation & productivity intelligence.'],
    solutions: [{ label: 'Agentra', to:"/coming-soon" }, { label: 'Privora', to:"/coming-soon" }],
  },
  {
    icon: '/assets/Icon7.webp', title: 'Real Estate & Smart Buildings', gif: '/assets/Gif7.gif',
    desc: 'Intelligent buildings with seamless automation and analytics.',
    items: ['Smart home & building automation systems.', 'Energy optimization & consumption insights.', 'Security, access control & video intelligence.'],
    solutions: [{ label: 'Enerlytix', to:"/coming-soon" }, { label: 'VisiAI', to:"/coming-soon" }, { label: 'IoT Automation', to:"/coming-soon" }],
  },
];

const IndustryBlock = ({ industry }) => (
  <div className="mt-16" data-aos="fade-up">
    <div className="flex items-center justify-between gap-10 max-md:flex-col">
      <div className="w-full md:w-[55%]">
        <div className="flex items-center gap-4 max-md:justify-center">
          <img src={industry.icon} alt="" loading="lazy" className="w-14" />
          <h3 className="text-3xl md:text-4xl font-bold">{industry.title}</h3>
        </div>
        <br />
        <div className="bg-gray-100 p-8 md:p-10 rounded-lg transition-all duration-300 hover:bg-white hover:-translate-y-1.5 hover:shadow-xl max-md:text-center">
          <p className="text-xl leading-relaxed mb-5">{industry.desc}</p>
          <ul className="pl-5 list-disc max-md:pl-0 max-md:list-inside">
            {industry.items.map((item, i) => (
              <li key={i} className="text-lg mb-3">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-[45%]">
        <img src={industry.gif} alt={industry.title} loading="lazy" className="w-full rounded-md" />
      </div>
    </div>

    <h3 className="text-center text-2xl md:text-3xl font-bold mt-16 mb-8"><span className="text-accent">Sol</span>utions</h3>
    <div className="flex justify-center gap-8 flex-wrap">
      {industry.solutions.map((sol, i) => (
        sol.to ? (
          <Link key={i} to={sol.to}>
            <button className="bg-accent text-white border-none py-4 px-12 text-lg rounded cursor-pointer hover:bg-accent-dark transition-colors">{sol.label}</button>
          </Link>
        ) : (
          <button key={i} className="bg-accent text-white border-none py-4 px-12 text-lg rounded cursor-pointer hover:bg-accent-dark transition-colors">{sol.label}</button>
        )
      ))}
    </div>
  </div>
);

const Industries = () => {
  return (
    <>
      <section className="py-16 max-w-[1200px] mx-auto px-5" data-aos="fade-up">
        <SectionTitle accent="Ind" postText="ustries We Serve" className="text-4xl" />
        <p className="text-center text-lg mt-2 text-gray-700">Transforming industries with intelligent IoT, AI &amp; automation solutions</p>

        {industries.map((industry, i) => (
          <IndustryBlock key={i} industry={industry} />
        ))}
      </section>

      <div className="py-16 text-center" data-aos="fade-up">
        <SectionTitle preText="Explore " accent="Home" postText=" Automation" />
        <div className="flex justify-center mt-4">
          <Link to="/automation">
            <button className="bg-accent text-white border-none py-4 px-12 text-lg rounded cursor-pointer hover:bg-accent-dark transition-colors">Click Here</button>
          </Link>
        </div>
      </div>

      <CTASection />
    </>
  );
};

export default Industries;
