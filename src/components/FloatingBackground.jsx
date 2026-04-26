import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; // eslint-disable-line no-unused-vars
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
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Blob = ({
  color,
  size,
  top,
  left,
  right,
  bottom,
  delay,
  duration,
  scrollSpeed,
}) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100 });

  const y = useTransform(smoothScrollY, [0, 5000], [0, scrollSpeed]);
  const scale = useTransform(smoothScrollY, [0, 5000], [1, 1.3]);

  return (
    <motion.div
      style={{
        position: "absolute",
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
          filter: "blur(100px)",
          opacity: 0.35,
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

const Particle = ({
  Icon, // eslint-disable-line no-unused-vars
  color,
  size,
  top,
  left,
  scrollSpeed,
  duration,
  rotationDir,
  opacity,
}) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 120 });

  const y = useTransform(smoothScrollY, [0, 5000], [0, scrollSpeed]);
  const rotateScroll = useTransform(
    smoothScrollY,
    [0, 5000],
    [0, 360 * rotationDir]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
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
  ChartBarIcon,
];

// Fewer, smaller particles that stay well within viewport boundaries
const STATIC_PARTICLES = [...Array(12)].map((_, i) => ({
  Icon: IOT_ICONS[i % IOT_ICONS.length],
  color: i % 3 === 0 ? "#0067b8" : i % 3 === 1 ? "#e53935" : "#002e5d",
  size: Math.floor(Math.random() * 30 + 30), // 30-60px (much smaller)
  top: `${Math.floor(Math.random() * 80 + 10)}%`,
  left: `${Math.floor(Math.random() * 80 + 10)}%`, // Keep 10% away from edges
  scrollSpeed: -(Math.random() * 200 + 50),
  duration: Math.random() * 10 + 8,
  rotationDir: Math.random() > 0.5 ? 1 : -1,
  opacity: Math.random() * 0.08 + 0.05, // Very subtle: 0.05 – 0.13
}));

const FloatingBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Large Blobs */}
      <Blob
        color="#0067b8"
        size="40vw"
        top="-10%"
        left="-5%"
        delay={0}
        duration={15}
        scrollSpeed={-200}
      />
      <Blob
        color="#e53935"
        size="30vw"
        top="30%"
        right="-10%"
        delay={2}
        duration={20}
        scrollSpeed={-400}
      />
      <Blob
        color="#0067b8"
        size="45vw"
        bottom="-15%"
        left="15%"
        delay={5}
        duration={18}
        scrollSpeed={-300}
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
