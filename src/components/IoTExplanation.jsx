import React from 'react';
import SectionTitle from './SectionTitle';

const IoTExplanation = () => {
  return (
    <section className="py-10 px-5 bg-gray-50" data-aos="fade-up">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <SectionTitle accent="Understanding" postText=" IoT & Automation" />
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            The Internet of Things (IoT) is a network of interconnected devices that communicate and exchange data seamlessly. By embedding sensors, software, and advanced communication protocols into everyday objects, we enable infrastructure to think, adapt, and respond in real-time.
          </p>
          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Seamless Connectivity</h4>
                <p className="text-gray-600">Devices connect via cloud platforms to share continuous streams of data, ensuring accurate real-time monitoring of environments and systems.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Intelligent Automation</h4>
                <p className="text-gray-600">AI algorithms process incoming sensor data to automatically trigger actions without human intervention, dramatically improving operational efficiency.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand/50 to-accent/50 mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
             <img src="/assets/main 1.webp" alt="IoT Connectivity Diagram" className="w-full h-[450px] object-fit scale-105 group-hover:scale-100 transition-transform duration-700" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center z-20">
                <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IoTExplanation;
