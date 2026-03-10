import CTASection from '../components/CTASection';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';

const technologies = [
  { img: '/assets/T1.webp', title: 'IoT & Embedded Systems' },
  { img: '/assets/T2.webp', title: 'AI and Machine Learning' },
  { img: '/assets/T3.webp', title: 'Computer Vision' },
  { img: '/assets/T4.webp', title: 'Digital Transformation' },
];

const testimonials = [
  { quote: 'The automation pipelines built by <span class="text-accent font-semibold">IoTrenetics</span> reduced our manual workload by 60%. Highly reliable and innovative team.', author: '— CTO, Nova Engineering' },
  { quote: '<span class="text-accent font-semibold">IoTrenetics</span> helped us achieve real-time visibility across all manufacturing units. Their IoT + AI solutions drastically improved our efficiency.', author: '— Operations Head, PrimeTech Industries' },
  { quote: 'Smart, scalable, and future-ready solutions. Our monitoring system is now 24/7 intelligent and predictive.', author: '— Managing Director, Zenith Automation' },
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

      {/* Story */}
      <section className="max-w-[1200px] mx-auto px-5 mt-8 text-center" data-aos="fade-up">
        <SectionTitle accent="About" postText=" - Story" />
        <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-8">
          <div>
            <h3 className="text-xl font-bold">The Challenge</h3>
            <p className="mt-2.5 leading-relaxed max-w-[330px] mx-auto">Industries today struggle with disconnected systems, inefficient processes, and lack of real-time info.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Approach</h3>
            <p className="mt-2.5 leading-relaxed max-w-[330px] mx-auto">We blend IoT + AI + Automation to create intelligent, predictive &amp; self-optimizing environments.</p>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="max-w-[1200px] mx-auto px-5 mt-16 text-center" data-aos="fade-up">
        <SectionTitle accent="Technology" postText=" We Specialize In" />
        <p className="max-w-[750px] mx-auto mb-10 leading-relaxed">
          We use cutting-edge engineering and AI-driven intelligence to build future-ready systems.
          Our technology stack includes IoT, Machine Learning, Computer Vision, and Robotics.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, i) => (
            <FeatureCard key={i} image={tech.img} title={tech.title} />
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="max-w-[1200px] mx-auto px-5 mt-20 text-center" data-aos="fade-up">
        <SectionTitle accent="Our" postText=" Impact" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="bg-gray-100 p-10 rounded-md text-lg leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg justify-self-start">
            <p>🏬<br />Companies achieve <span className="text-accent font-bold">30%+</span> improvement in efficiency using our automated systems.</p>
          </div>
          <div className="bg-gray-100 p-10 rounded-md text-lg leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg justify-self-end">
            <p>🖥️<br />Real-time monitoring reduces downtime and enhances decision-making.</p>
          </div>
          <div className="bg-gray-100 p-10 rounded-md text-lg leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg md:col-span-2 justify-self-center max-w-[460px] mt-8">
            <p>🧠<br />Intelligent automation enables faster, safer, and more scalable workflows.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-[1200px] mx-auto px-5 py-20 text-center" data-aos="fade-up">
        <SectionTitle accent="Test" postText="imonials" className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-100 p-10 text-left rounded-md leading-relaxed text-lg shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" data-aos="fade-up" data-aos-delay={i * 100}>
              <p dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }} />
              <h4 className="mt-6 text-base font-medium">{t.author}</h4>
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
