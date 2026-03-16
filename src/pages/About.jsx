import CTASection from '../components/CTASection';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import TechMarquee from '../components/TechMarquee';



const testimonials = [
  { quote: 'Smart Home Automation Control lighting, appliances, and environments intelligently.'},
  { quote: 'AI-Powered Systems Smart analytics and automation powered by artificial intelligence.'},
  { quote: 'Intelligent Software Platforms Scalable software products designed for modern businesses.'},
  { quote: 'IoT Device Integration Connecting devices to create smart ecosystems.'},
  { quote: 'IoT Device Integration Connecting devices to create smart ecosystems.'},
  { quote: 'IoT Device Integration Connecting devices to create smart ecosystems.'},
];

const timelineData = [
  { year: "1999", title: "The Concept Born", desc: "The term 'Internet of Things' was coined, conceptualizing a world where objects could communicate without human interaction." },
  { year: "2010", title: "Rise of Connected Devices", desc: "Smartphones catalyzed the growth of smart devices, bringing basic automation into consumer homes and personal spaces." },
  { year: "2015", title: "Industrial IoT Expansion", desc: "Heavy industries began adopting sensors and analytics en masse for predictive maintenance and real-time tracking." },
  { year: "2020", title: "AI & IoT Convergence", desc: "Machine learning algorithms integrated directly with edge devices, creating highly intelligent, autonomous systems." },
  { year: "Present", title: "The Generative Era / Agentic Era", desc: "Advanced AI models working alongside IoT grids to continuously self-optimize city infrastructure and industrial plants." }
];

const teamCards = [
  { highlight: 'Clean', title: '& Professional', desc: 'Our team brings together IoT engineers, AI experts, and automation specialists committed to building intelligent, connected, and scalable solutions for modern businesses.' },
  { highlight: 'Simple', title: '& Minimal', desc: 'A multidisciplinary team of innovators dedicated to shaping the future with smart, efficient, and reliable technology.' },
  { highlight: 'Story', title: '-Based', desc: 'Behind every solution we build is a team of passionate creators who believe in solving real-world problems.' },
];

const About = () => {
  return (
    <>
      {/* Mini Hero */}
      <section className="max-w-[1200px] mx-auto px-5 flex items-center justify-between gap-10 py-20 overflow-hidden max-md:flex-col max-md:text-center" data-aos="fade-up">
        <div className="max-w-[480px]">
          <h1 className="text-3xl font-bold"><span className="text-accent"> IoT</span>renetics Solutions Pvt. Ltd.</h1>
          <p className="mt-3.5 leading-relaxed max-w-[420px]">IoTrenetics Solutions Pvt. Ltd. is an innovative technology startup working at the intersection of IoT, AI, Generative AI, AR/VR, and Digital Transformation.</p>
          <button className="mt-5 py-2.5 px-6 border-none bg-gray-200 rounded-full cursor-pointer font-medium transition-colors duration-200 hover:bg-gray-300">
            <span className="text-accent">Explore</span> Our Vision
          </button>
        </div>
        <div className="flex-shrink-0">
          <img src="/assets/display.webp" alt="About" loading="lazy" className="w-[360px] max-w-full opacity-90 max-md:w-[280px] max-md:mt-8" />
        </div>
      </section>

      {/* Vision, Mission, Focus */}
      <section className="max-w-[1200px] mx-auto px-5 py-12 text-center" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-brand text-white rounded-2xl shadow-xl transition-all hover:-translate-y-2 hover:shadow-brand/30">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="leading-relaxed opacity-90">To build intelligent, predictive, and self-optimizing environments that seamlessly connect the physical and digital worlds for a smarter future.</p>
          </div>
          <div className="p-8 bg-accent text-white rounded-2xl shadow-xl transition-all hover:-translate-y-2 hover:shadow-accent/30">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="leading-relaxed opacity-90">Empowering businesses and communities by delivering cutting-edge IoT and AI-driven solutions that improve sustainability, efficiency, and safety.</p>
          </div>
          <div className="p-8 bg-gray-900 text-white rounded-2xl shadow-xl transition-all hover:-translate-y-2 hover:shadow-gray-900/30">
            <h3 className="text-2xl font-bold mb-4">Our Focus</h3>
            <p className="leading-relaxed opacity-90">Innovating across Industrial IoT, AI/GenAI integration, smart city infrastructure, and deep technological automation systems.</p>
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="max-w-[1000px] mx-auto px-5 py-20" data-aos="fade-up">
        <div className="text-center mb-16">
          <SectionTitle accent="Evolution" postText=" of Connected Tech" />
        </div>
        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-brand before:via-accent before:to-gray-300">
          {timelineData.map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 last:mb-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                <span className="w-3 h-3 bg-white rounded-full"></span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <h4 className="font-bold text-xl text-gray-800">{item.title}</h4>
                  <span className="bg-brand/10 text-brand text-sm font-bold px-4 py-1.5 rounded-full inline-block w-fit">{item.year}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="max-w-[1200px] mx-auto px-5 mt-16 text-center" data-aos="fade-up">
        <SectionTitle accent="Technology" postText=" We Specialize In" />
        <p className="max-w-[750px] mx-auto mb-10 leading-relaxed">
          We use cutting-edge engineering and AI-driven intelligence to build future-ready systems.
          Our technology stack includes IoT, Machine Learning, Computer Vision, and Robotics.
        </p>
      </section>
        <FeatureCard direction="right" />
        <TechMarquee direction="right" />

      {/* Impact */}
      <section className="max-w-[1200px] mx-auto px-5 mt-10 text-center" data-aos="fade-up">
        <SectionTitle accent="Our" postText=" Impact" className="mb-12" />
        <div className="flex flex-col md:flex-row gap-5 md:gap-5">
          <div className="bg-gray-100 h-[200px] p-10 rounded-md text-lg leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg justify-self-start">
            <p>🏬<br />Companies achieve <span className="text-accent font-bold">30%+</span> improvement in efficiency using our automated systems.</p>
          </div>
          <div className="bg-gray-100 h-[200px] p-10 rounded-md text-lg leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg justify-self-end">
            <p>🖥️<br />Real-time monitoring reduces downtime and enhances decision-making.</p>
          </div>
          <div className="bg-gray-100 h-[200px] p-10 rounded-md text-lg leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg justify-self-center">
            <p>🧠<br />Intelligent automation enables faster, safer, and more scalable workflows.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1200px] mx-auto px-5 py-20 text-center" data-aos="fade-up">
        <SectionTitle accent="What " postText=" We Do" className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-100 p-10 text-left rounded-md leading-relaxed text-lg shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" data-aos="fade-up" data-aos-delay={i * 100}>
              <p dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }} />
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1200px] mx-auto px-5 py-20 text-center" data-aos="fade-up">
        <SectionTitle accent="Our" postText=" Team" className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamCards.map((card, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-md flex items-stretch transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="bg-white p-8 rounded flex flex-col text-center flex-1 leading-relaxed">
                <h3 className="text-xl font-bold mb-4"><span className="text-accent">{card.highlight}</span> {card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;
