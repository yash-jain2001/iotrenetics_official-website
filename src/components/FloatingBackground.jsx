import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  LightBulbIcon, 
  DevicePhoneMobileIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  CameraIcon, 
  CpuChipIcon, 
  CloudIcon, 
  HomeIcon,
  WifiIcon,
  SignalIcon,
  UserIcon,
  LockClosedIcon,
  ServerIcon,
  TvIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Blob = ({ color, size, top, left, delay, duration, scrollSpeed }) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  
  const y = useTransform(smoothScrollY, [0, 5000], [0, scrollSpeed]);
  const scale = useTransform(smoothScrollY, [0, 5000], [1, 1.3]);

  return (
    <motion.div
      style={{
        top,
        left,
        width: size,
        height: size,
        backgroundColor: color,
        y,
        scale,
        willChange: "transform",
      }}
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -30, 30, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute rounded-full blur-[120px] opacity-[0.15] pointer-events-none"
    />
  );
};

const Particle = ({ Icon, color, size, top, left, scrollSpeed, duration, rotationDir }) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 120 });
  
  const y = useTransform(smoothScrollY, [0, 5000], [0, scrollSpeed]);
  const scale = useTransform(smoothScrollY, [0, 2000], [0.8, 1.4]);
  const rotateScroll = useTransform(smoothScrollY, [0, 5000], [0, 360 * rotationDir]);

  return (
    <motion.div
      style={{
        top,
        left,
        width: size,
        height: size,
        color,
        y,
        scale,
        rotate: rotateScroll,
        willChange: "transform",
      }}
      animate={{
        y: [0, -60, 0],
        x: [0, 40, 0],
        opacity: [0.05, 0.2, 0.05],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none"
    >
      <Icon className="w-full h-full opacity-60" />
    </motion.div>
  );
};

const IOT_ICONS = [
  LightBulbIcon, DevicePhoneMobileIcon, ShieldCheckIcon, BoltIcon, 
  CameraIcon, CpuChipIcon, CloudIcon, HomeIcon, WifiIcon, SignalIcon,
  UserIcon, LockClosedIcon, ServerIcon, TvIcon, SpeakerWaveIcon,
  VideoCameraIcon, BeakerIcon, ChartBarIcon
];

const STATIC_PARTICLES = [...Array(35)].map((_, i) => ({
  Icon: IOT_ICONS[i % IOT_ICONS.length],
  color: i % 3 === 0 ? "#0067b8" : i % 3 === 1 ? "#e53935" : "#002e5d",
  size: Math.random() * 80 + 60, // Larger size
  top: `${Math.random() * 400}vh`,
  left: `${Math.random() * 100}vw`,
  scrollSpeed: -(Math.random() * 1500 + 800),
  duration: Math.random() * 12 + 8,
  rotationDir: Math.random() > 0.5 ? 1 : -1,
}));

const FloatingBackground = () => {

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Large Blobs */}
      <Blob 
        color="#0067b8" 
        size="40vw" 
        top="-10%" 
        left="-5%" 
        delay={0} 
        duration={15} 
        scrollSpeed={-300} 
      />
      <Blob 
        color="#e53935" 
        size="30vw" 
        top="40%" 
        right="-10%" 
        delay={2} 
        duration={20} 
        scrollSpeed={-500} 
      />
      <Blob 
        color="#0067b8" 
        size="50vw" 
        bottom="-20%" 
        left="20%" 
        delay={5} 
        duration={18} 
        scrollSpeed={-800} 
      />

      {/* Decorative Particles */}
      {STATIC_PARTICLES.map((p, i) => (
        <Particle
          key={i}
          Icon={p.Icon}
          color={p.color}
          size={p.size}
          top={p.top}
          left={p.left}
          scrollSpeed={p.scrollSpeed}
          duration={p.duration}
          rotationDir={p.rotationDir}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
