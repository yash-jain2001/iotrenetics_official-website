import React from 'react';
import { Link } from 'react-router-dom';

const Healnet = () => {
  return (
    <div className="pt-1 pb-1 min-h-screen bg-slate-50 font-sans">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header Hero Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-14 mb-1 transition-all hover:shadow-md relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold text-teal-600 uppercase tracking-widest mb-6 border border-teal-100 bg-teal-50/50 px-4 py-1.5 rounded-full">
              <span>Clinical Risk Prediction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
              <span>Real-Time Monitoring</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 hidden sm:block"></span>
              <span className="hidden sm:block">Intelligent Early Alerts</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              HEALNET
            </h1>
            <p className="text-2xl md:text-3xl text-teal-600 font-bold leading-relaxed mb-4 max-w-4xl">
              AI-Powered Clinical Health Intelligence & Early Diagnosis Platform
            </p>
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-3xl">
              Transforming wearable and sensor data into real-time clinical insights, risk prediction, and early health alerts for preventive care and medical decision support.
            </p>
            
            <div className="inline-flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 11V9h2v2H9z" /></svg>
                Preventive Care Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-14">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">The Clinical Gap That HealNet Was Built to Close</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The global wearable health market has produced a generation of devices capable of capturing physiological data with remarkable precision. Heart rate, blood oxygen saturation, sleep architecture, respiratory patterns, activity levels, skin temperature — modern wearables measure all of these continuously, around the clock, for hundreds of millions of people.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              And yet, the majority of this data delivers no clinical value. It is collected, displayed on a screen, and forgotten — because <strong>raw physiological measurements are not clinical intelligence.</strong> A heart rate reading of 98 bpm means nothing in isolation. In the context of a patient's baseline, their recent activity, their sleep quality, their medication history, and a trend analysis of the preceding seventy-two hours — it may mean something clinically significant.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Without AI-driven interpretation, that context is invisible. Subtle trend shifts that precede cardiac events, respiratory deterioration that develops gradually over days, sleep disruptions that correlate with inflammatory markers — none of these are detectable by looking at a number on a smartwatch. They require continuous, intelligent, clinically-informed analysis of the data stream as a whole.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              The consequence is a structural delay in healthcare that the system can ill afford. By the time a patient presents with symptoms significant enough to prompt clinical attention, the window for low-cost preventive intervention has typically already closed. The condition has progressed. The treatment is more complex. The outcome is worse than it needed to be.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100">
                <span className="block text-4xl font-black text-rose-600 mb-2">80%</span>
                <p className="text-slate-700 leading-relaxed">
                  of serious cardiac events occur in patients with no prior documented diagnosis — detected only after escalation.
                </p>
              </div>
              <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                <span className="block text-4xl font-black text-amber-600 mb-2">72 hrs</span>
                <p className="text-slate-700 leading-relaxed">
                  is the average lead time between detectable physiological deviation and symptom presentation — a window that current monitoring systems miss entirely.
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              HealNet was designed to occupy that window. Not as a consumer wellness app, and not as a replacement for clinical judgment — but as the intelligent layer between continuous wearable data and the clinicians, care systems, and individuals who need to act on it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">What HealNet Is: Clinical Intelligence, Not Just Monitoring</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              HealNet is an AI-powered clinical health intelligence platform that ingests continuous physiological data from wearables and medical-grade sensors, applies AI-driven analytical models informed by clinical logic, and produces three categories of output: real-time critical alerts when immediate attention is warranted, trend-based early warnings when physiological signals are moving in concerning directions, and daily health summaries that give clinicians and individuals a synthesised, interpretable picture of health status.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              The distinction between HealNet and conventional health monitoring tools is not incremental — it is architectural. Conventional monitoring tools display data. HealNet interprets it. Conventional tools alert when a threshold is crossed. HealNet alerts when trends suggest a threshold will be crossed — and provides the clinical reasoning behind that prediction with a confidence score.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              For clinicians, this means decision support that is genuinely useful rather than merely informative: risk predictions with clinical context, not just raw readings. For patients and individuals, it means early awareness of health changes that would otherwise go unnoticed until they become undeniable. For healthcare systems, it means the ability to extend clinical oversight beyond the walls of the facility — to patients at home, in recovery, or managing long-term conditions — without proportionally increasing clinical staff time.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed font-semibold">
              HealNet does not replace clinical expertise. It amplifies it — by ensuring that the physiological intelligence buried in continuous data streams is extracted, interpreted, and delivered to the right person, in the right format, at the right time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight border-b pb-4">Core Capabilities: What HealNet Delivers</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-50/50 rounded-2xl p-6 border border-teal-100 transition-all hover:bg-teal-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  Clinical Risk Prediction
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  HealNet's risk prediction engine analyses continuous physiological data streams across four primary clinical domains: cardiac health, respiratory function, sleep quality and architecture, and overall body status. By evaluating current readings against personal baselines, it identifies trends that match known clinical risk patterns.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="flex gap-2 text-slate-700"><span className="text-teal-600">•</span> Cardiac risk assessment (arrhythmia patterns, HRV trends)</li>
                  <li className="flex gap-2 text-slate-700"><span className="text-teal-600">•</span> Respiratory monitoring (SpO2 trend analysis)</li>
                  <li className="flex gap-2 text-slate-700"><span className="text-teal-600">•</span> Sleep intelligence (architecture disruption)</li>
                </ul>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  Generates confidence-scored predictions with transparent clinical reasoning for each risk assessment.
                </p>
              </div>
              
              <div className="bg-teal-50/50 rounded-2xl p-6 border border-teal-100 transition-all hover:bg-teal-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  Real-Time Continuous Monitoring
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  HealNet ingests live data streams, processing physiological signals in real time using time-series analysis powered by InfluxDB. Heart rate, SpO2, sleep state, and activity data are processed continuously, with anomaly detection running against each data stream as it arrives.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This architecture means there is no lag between a physiological event and HealNet's awareness of it. Critical alerts are generated in real time, not retrospectively after a daily sync.
                </p>
              </div>

              <div className="bg-teal-50/50 rounded-2xl p-6 border border-teal-100 transition-all hover:bg-teal-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  Intelligent Alert System
                </h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Not every data point warrants attention, but every clinically significant signal must reach the right person without delay. Our three-tier architecture reflects this:
                </p>
                <ul className="space-y-2">
                  <li className="text-slate-700"><strong className="text-slate-900">Real-time alerts</strong> — For prompt clinical attention without delay.</li>
                  <li className="text-slate-700"><strong className="text-slate-900">Trend warnings</strong> — Advance notice enabling preventive intervention.</li>
                  <li className="text-slate-700"><strong className="text-slate-900">Daily summaries</strong> — Synthesised reports translating data into narratives.</li>
                </ul>
              </div>

              <div className="bg-teal-50/50 rounded-2xl p-6 border border-teal-100 transition-all hover:bg-teal-50">
                <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Report Upload & Document Intelligence
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Beyond wearable data, HealNet supports the upload of clinical reports — laboratory results, imaging summaries, and discharge letters. Our document intelligence layer extracts relevant info and integrates it with continuous monitoring data, enabling a more complete clinical assessment that spans real-time signals and historical context.
                </p>
              </div>

            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight border-b pb-4">HealNet in Practice: Where It Makes the Difference</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-teal-600">Preventive Healthcare and Proactive Wellness</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  The most significant opportunity in modern healthcare is detecting the precursors to disease early enough that treatment is simple, inexpensive, and highly effective. HealNet provides the intelligence layer that consumer wearables cannot: not just a step count or a resting heart rate, but an ongoing assessment against health risks.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  From anomaly alerts that identify concerning patterns before symptoms develop to personalised daily summaries that build health awareness, HealNet offers the infrastructure required for proactive health management.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-teal-600">Post-Hospital Recovery Monitoring</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  The post-discharge period is among the highest-risk phases in a patient's care journey. Complications frequently develop at home and are detected only when the patient returns to the emergency department.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  HealNet extends clinical oversight into the home by continuously monitoring recovery vitals and activity patterns. It detects early signs of complications like infection or respiratory deterioration, providing clinicians with remote visibility into recovery progress without requiring physical follow-up appointments.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-teal-600">Chronic Condition Management</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  For patients living with chronic conditions — cardiac disease, diabetes, COPD, hypertension — the primary clinical challenge is not diagnosis but preventing episodic deteriorations and acute events.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  HealNet's AI-based trend evaluation tracks condition-specific health markers over months and years. It identifies the subtle drift patterns that precede acute events, generating actionable deterioration alerts that give clinical teams the opportunity to intervene before a crisis.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 tracking-tight border-b pb-4">Why HealNet Matters: The Shift from Reactive to Predictive Healthcare</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Healthcare systems globally are facing a structural challenge that is not solvable by adding more clinical capacity. The only viable path to sustainable healthcare is a fundamental shift from reactive treatment of established disease to proactive identification and management of emerging risk.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              This shift requires clinical intelligence infrastructure that does not currently exist at scale. Not consumer wearables without interpretation. Not traditional remote monitoring tools alerting on static thresholds. But a platform capable of handling physiological data streams, applying genuine clinical reasoning, and surfacing actionable intelligence.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-transparent border border-teal-100/50">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <strong className="text-slate-900">Intelligence that closes the detection gap</strong> — The 72-hour window between physiological deviation and symptom presentation represents an enormous opportunity. HealNet operates precisely here, enabling meaningful preventive action.
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-transparent border border-teal-100/50">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <strong className="text-slate-900">Scalable clinical oversight</strong> — Enables providers to extend oversight to patients at home without proportionally increasing staff burden, directing their attention to cases that genuinely require it.
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-transparent border border-teal-100/50">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <strong className="text-slate-900">Preventive care economics</strong> — Every acute hospitalisation prevented is a significant cost saving to the healthcare system and an avoided harm to the patient. Continuous AI-powered monitoring is a fraction of the cost of acute events.
                </div>
              </li>
            </ul>

            <div className="bg-teal-50 rounded-2xl p-6 text-center border border-teal-100">
              <p className="text-lg text-teal-800 font-medium italic">
                HealNet transforms continuous physiological signals into actionable clinical intelligence — enabling smarter medical decision support for clinicians, health systems, and individuals who understand that the best time to address a health risk is before it becomes an event.
              </p>
            </div>
          </section>

          {/* Footer Card */}
          <div className="bg-slate-900 rounded-3xl p-8 flex flex-col justify-center items-center  md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-teal-500 opacity-20 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-slate-500 opacity-20 blur-2xl"></div>
            
            <h3 className="text-3xl font-extrabold mb-2 tracking-tight">HEALNET</h3>
            <p className="text-teal-400 text-lg mb-6 font-medium">Turning Data Into the Future of Preventive Care</p>
            
            <div className="bg-white/10 border border-white/20 rounded-xl py-3 px-6 inline-flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium">
              <span>Hospitals & Healthcare</span>
              <span className="opacity-50">•</span>
              <span>Clinical Teams</span>
              <span className="opacity-50">•</span>
              <span>Individuals</span>
            </div>
            
            {/* <p className="text-xl font-semibold mb-6">
              Request a demo and explore our capabilities.
            </p> */}

            <Link to="/coming-soon" className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] border border-teal-400">
              Visit healnet.io
            </Link>
          </div>

        </article>
      </div>
    </div>
  );
};

export default Healnet;