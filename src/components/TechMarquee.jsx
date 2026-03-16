import React from 'react';
import { motion } from 'framer-motion';

const TechMarquee = ({direction}) => {
  const techLogos = [
    "AWS IoT Core", "Microsoft Azure", "Google Cloud IoT", "MQTT Protocol", 
    "Edge Analytics", "5G Connectivity", "LoRaWAN", "Digital Twins", 
    "TensorFlow AI", "Computer Vision"
  ];

  // Duplicate to ensure seamless scroll even on large monitors
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <div className='flex w-full overflow-hidden'>
      <motion.div 
        initial={{ x: direction === 'right' ? '0' : '-50%' }} 
        animate={{ x: direction === 'right' ? '-50%' : '0' }} 
        transition={{ ease: 'linear', duration: 15, repeat: Infinity }} 
        className='flex flex-shrink-0'
      >
        <div className='flex items-center gap-10 py-6 border-none shrink-0'>
          {duplicatedLogos.map((url, i) => (
            <p key={i} className='text-2xl font-bold whitespace-nowrap'>{url}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechMarquee;
