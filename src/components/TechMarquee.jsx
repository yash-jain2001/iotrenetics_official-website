import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = () => {
  const techLogos = [
    "AWS IoT Core", "Microsoft Azure", "Google Cloud IoT", "MQTT Protocol", 
    "Edge Analytics", "5G Connectivity", "LoRaWAN", "Digital Twins", 
    "TensorFlow AI", "Computer Vision"
  ];

  return (
    <div className="py-12 bg-gray-50 border-y border-gray-200 overflow-hidden flex w-full" data-aos="fade-up">
      <motion.div 
        initial={{ x: 0 }} 
        animate={{ x: '-50%' }} 
        transition={{ ease: 'linear', duration: 30, repeat: Infinity }} 
        className="flex flex-shrink-0"
      >
        <div className="flex items-center gap-20 pr-20 border-l-0">
          {techLogos.map((tech, i) => (
            <div key={i} className="flex items-center justify-center px-6 py-3 bg-white shadow-sm rounded-xl grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 cursor-default hover:-translate-y-1">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-20 pr-20 border-l-0">
          {techLogos.map((tech, i) => (
            <div key={'dup-' + i} className="flex items-center justify-center px-6 py-3 bg-white shadow-sm rounded-xl grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 cursor-default hover:-translate-y-1">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechMarquee;
