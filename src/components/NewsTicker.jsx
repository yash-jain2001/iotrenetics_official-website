import React from 'react';
import { motion } from 'framer-motion';

const NewsTicker = () => {
  const newsItems = [
    "Industrial IoT enables predictive maintenance and reduces downtime across global operations",
    "AI Video Analytics powers real-time safety, surveillance, and smart monitoring",
    "Agentra brings Agentic AI for autonomous workflows like intelligent email classification and response ",
    " VisiAI leverages computer vision for PPE detection and intrusion monitoring",
    " HealNet uses wearable data and AI for health insights and risk prediction",
    "Virtura delivers immersive AR/VR training and simulation for next-gen workforce development",
    " Smart automation improves energy efficiency and drives sustainable connected environments"
  ];

  return (
    <div className="bg-brand text-white md:bg-gray-900 border-b border-brand-dark/20 w-full overflow-hidden text-sm md:text-xs">
      <div className="flex items-center">
        {/* Static 'Latest Updates' label (Optional, can hide on very small screens) */}
        <div className="bg-accent text-white font-bold px-4 py-2 hidden md:flex items-center gap-2 whitespace-nowrap z-10 shadow-[4px_0_10px_rgba(0,0,0,0.2)]">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> */}
          LATEST UPDATES
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden relative flex items-center pr-2 py-2 md:py-0">
          <motion.div 
            initial={{ x: 0 }} 
            animate={{ x: '-50%' }} 
            transition={{ ease: 'linear', duration: 35, repeat: Infinity }} 
            className="flex flex-shrink-0"
          >
            {/* First Set */}
            <div className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16">
              {newsItems.map((news, i) => (
                <div key={i} className="flex items-center gap-2 font-medium tracking-wide whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-accent animate-pulse"></span>
                  {news}
                </div>
              ))}
            </div>
            {/* Duplicate Set for Seamless Loop */}
            <div className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16">
              {newsItems.map((news, i) => (
                <div key={'dup-' + i} className="flex items-center gap-2 font-medium tracking-wide whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-accent animate-pulse"></span>
                  {news}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
