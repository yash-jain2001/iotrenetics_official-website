import CTASection from '../components/CTASection';
import SectionTitle from '../components/SectionTitle';
import { Link } from 'react-router-dom';

const capabilities = [
  { icon: '/assets/heal3.webp', title: 'Clinical Risk Prediction', items: ['Cardiac, respiratory, sleep, body status.', 'Confidence scores with clinical reasoning.'] },
  { icon: '/assets/heal4.webp', title: 'Real-Time Monitoring', items: ['Heart rate, SpO₂, sleep, activity tracking.', 'Time-series analysis using influxDB.'] },
  { icon: '/assets/heal5.webp', title: 'Intelligent Alerts', items: ['Real-time critical alerts.', 'Trend-based early warnings.', 'Daily health summaries.'] },
];

const healthActions = [
  { icon: '/assets/heal6.webp', title: 'Preventive healthcare monitoring', items: ['Continuous vital trend analysis for early risk detection.', 'AI-driven anomaly alerts before symptom escalation.', 'Personalized daily health summaries and risk insights.'] },
  { icon: '/assets/heal7.webp', title: 'Post-Hospital Recovery Tracking', items: ['Remote monitoring of recovery vitals and activity patterns.', 'Early detection of complications or abnormal trends.', 'Clinician-friendly recovery progress insights.'] },
  { icon: '/assets/heal8.webp', title: 'Chronic Condition Monitoring', items: ['AI-based trend evaluation to prevent deterioration.', 'Long-term tracking of condition specific health markers.', 'Actionable alerts supporting ongoing care management.'] },
];

const CapabilityCard = ({ icon, title, items, border = true }) => (
  <div className={`flex-1 text-left p-5 transition-all duration-300 hover:bg-white hover:rounded-2xl hover:-translate-y-2 hover:shadow-lg ${border ? 'border-r border-gray-300 last:border-r-0 max-lg:border-r-0 max-lg:border-b max-lg:last:border-b-0' : ''}`}>
    <div className="flex items-center gap-4 mb-5">
      <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center">
        <img src={icon} alt="" loading="lazy" className="w-8 h-8 object-contain" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
    </div>
    <ul className="pl-5 list-disc">
      {items.map((item, i) => (
        <li key={i} className="text-lg mb-2.5">{item}</li>
      ))}
    </ul>
  </div>
);

const HealNet = () => {
  return (
    <>
      {/* Top */}
      <section className="py-16 px-5 md:px-20" data-aos="fade-up">
        <div className="max-w-[1100px] mb-16 text-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold"><span className="text-accent">Heal</span>Net</h1>
          <br />
          <h1 className="text-3xl md:text-4xl font-bold mb-5"><span className="text-accent">AI</span>-Powered Clinical Health Intelligence &amp; Early Diagnosis Platform</h1>
          <p className="text-lg leading-relaxed max-w-[900px] mx-auto"><span className="text-accent">HealNet</span> transforms wearable and sensor data into real-time clinical insights, risk prediction, and early health alerts for preventive care and medical decision support.</p>
        </div>

        <div className="flex items-center gap-16 max-lg:flex-col max-lg:text-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Why Continuous <span className="text-accent">Health</span> Monitoring<br />Needs Intelligence?</h2>
            <p className="text-base leading-relaxed mb-5 text-left max-lg:text-center">Wearables produce continuous streams of physiological data, but raw measurements lack clinical intelligence. Without AI-driven analysis, subtle trend shifts and early risk indicators remain invisible.</p>
            <p className="text-base leading-relaxed mb-5 text-left max-lg:text-center">This delay in interpretation means health issues are often recognized only after symptoms escalate — limiting the window for preventive care.</p>
            <div className="mt-8 flex gap-5 max-lg:justify-center">
             <Link to="/contact"> <button className="py-3.5 px-8 text-base rounded-xl border-none cursor-pointer bg-gray-300 transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1 hover:shadow-lg"><b>Request <span className="text-accent">Demo</span></b></button></Link>
              <button className="py-3.5 px-8 text-base rounded-xl border-none cursor-pointer bg-gray-300 font-semibold transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1 hover:shadow-lg"><b>View <span className="text-accent">Capabilities</span></b></button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/assets/heal1.webp" alt="HealNet Dashboard" loading="lazy" className="w-full max-w-[520px]" />
          </div>
        </div>
      </section>

      {/* What HealNet Does */}
      <section className="py-10 px-5 md:px-20 bg-white" data-aos="fade-up">
        <div className="flex items-center justify-between gap-20 max-lg:flex-col max-lg:text-center">
          <div className="flex-1 flex justify-center">
            <img src="/assets/heal2.webp" alt="HealNet" loading="lazy" className="w-full max-w-[600px] rounded-2xl shadow-lg transition-all duration-400 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What <span className="text-accent">HealNet</span> Does?</h2>
            {[
              'Ingests real-time wearable and sensor data — Wearable data lacks clinical context and relevance.',
              'Analyzes trends using AI and clinical logic — Critical health events go unnoticed until symptoms appear.',
              'Predicts health risks before escalation — Data is overwhelming and lacks clinical interpretation.',
            ].map((item, i) => (
              <p key={i} className="text-xl leading-relaxed mb-8 text-left max-lg:text-center">• {item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-10 px-5 md:px-20 text-center" data-aos="fade-up">
        <SectionTitle accent="Key" postText=" Capabilities" className="text-4xl mb-10" />
        <div className="bg-gray-100 rounded-3xl flex max-lg:flex-col p-10 gap-8">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={i} {...cap} />
          ))}
        </div>
      </section>

      {/* Health Intelligence in Action */}
      <section className="py-16 px-5 md:px-20 text-center" data-aos="fade-up">
        <SectionTitle accent="Health" postText=" Intelligence in Action" className="text-3xl md:text-4xl mb-10" />
        <div className="bg-gray-100 rounded-3xl flex max-lg:flex-col p-10 gap-8 mb-16">
          {healthActions.map((action, i) => (
            <CapabilityCard key={i} icon={action.icon} title={action.title} items={action.items} />
          ))}
        </div>

        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Turn <span className="text-accent">Health</span> Data into Clinical Intelligence</h2>
          <p className="text-xl max-w-[900px] mx-auto"><span className="text-accent font-bold">Heal</span>Net transforms continuous physiological signals into actionable clinical insights enabling preventive care, early intervention, and smarter decision support.</p>
        </div>

        <img src="/assets/heal9.webp" alt="Dashboard" loading="lazy" className="w-full max-w-[1000px] mx-auto rounded-2xl my-8 transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl" />

        <div className="mt-8">
          <Link to="/contact" className="inline-block bg-gray-300 py-5 px-20 rounded-2xl no-underline text-2xl font-bold text-black transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-xl">TALK TO US</Link>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default HealNet;
