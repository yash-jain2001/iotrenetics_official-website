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

const Blob = ({ color, size, top, left, right, bottom, delay, duration, scrollSpeed }) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const y = useTransform(smoothScrollY, [0, 5000], [0, scrollSpeed]);
  const scale = useTransform(smoothScrollY, [0, 5000], [1, 1.3]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        y,
        scale,
        willChange: "transform",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color,
          borderRadius: "9999px",
          filter: isMobile ? "blur(60px)" : "blur(100px)",
          opacity: isMobile ? 0.2 : 0.35,
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
      />
    </motion.div>
  );
};

const Particle = ({ Icon, color, size, top, left, scrollSpeed, duration, rotationDir, opacity }) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 120 });
  
  const y = useTransform(smoothScrollY, [0, 5000], [0, scrollSpeed]);
  const rotateScroll = useTransform(smoothScrollY, [0, 5000], [0, 360 * rotationDir]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        y,
        rotate: rotateScroll,
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          opacity: [opacity * 0.5, opacity, opacity * 0.5],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ color, width: "100%", height: "100%" }}
      >
        <Icon style={{ width: "100%", height: "100%" }} />
      </motion.div>
    </motion.div>
  );
};

const IOT_ICONS = [
  LightBulbIcon, DevicePhoneMobileIcon, ShieldCheckIcon, BoltIcon, 
  CameraIcon, CpuChipIcon, CloudIcon, HomeIcon, WifiIcon, SignalIcon,
  UserIcon, LockClosedIcon, ServerIcon, TvIcon, SpeakerWaveIcon,
  VideoCameraIcon, BeakerIcon, ChartBarIcon
];

// Position particles WITHIN the viewport (0-95%) since container is fixed
const STATIC_PARTICLES = [...Array(15)].map((_, i) => ({
  Icon: IOT_ICONS[i % IOT_ICONS.length],
  color: i % 3 === 0 ? "#0067b8" : i % 3 === 1 ? "#e53935" : "#002e5d",
  size: Math.floor(Math.random() * 40 + 40), // Smaller particles (40-80px)
  top: `${Math.floor(Math.random() * 90 + 5)}%`,
  left: `${Math.floor(Math.random() * 85 + 5)}%`, // Keep more away from edges
  scrollSpeed: -(Math.random() * 200 + 50), // Slower scroll
  duration: Math.random() * 10 + 8,
  rotationDir: Math.random() > 0.5 ? 1 : -1,
  opacity: Math.random() * 0.1 + 0.1, // Lower opacity for mobile (0.1 - 0.2)
}));

const FloatingBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Large Blobs - Adjusted sizes for mobile/desktop */}
      <Blob 
        color="#0067b8" 
        size="60vw" 
        top="-5%" 
        left="-15%" 
        delay={0} 
        duration={15} 
        scrollSpeed={-150} 
      />
      <Blob 
        color="#e53935" 
        size="50vw" 
        top="25%" 
        right="-20%" 
        delay={2} 
        duration={20} 
        scrollSpeed={-300} 
      />
      <Blob 
        color="#0067b8" 
        size="70vw" 
        bottom="-10%" 
        left="5%" 
        delay={5} 
        duration={18} 
        scrollSpeed={-200} 
      />

      {/* Decorative IoT Icon Particles */}
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
          opacity={p.opacity}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
