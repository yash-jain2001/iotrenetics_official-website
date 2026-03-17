import React, { useEffect, useState, useRef } from "react";

const Counter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(target.toString().replace(/,/g, ""), 10);
    if (start === end) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const stats = [
  { id: 1, label: "Connected Devices", value: 15000, suffix: "+" },
  { id: 2, label: "Smart Systems Deployed", value: 350, suffix: "+" },
  { id: 3, label: "Automation Efficiency", value: 40, suffix: "%" },
  { id: 4, label: "Cities Transformed", value: 12, suffix: "" },
];

const StatsCounter = () => {
  return (
    <section className="py-16 px-5 bg-gradient-to-r from-brand to-brand-dark text-white relative overflow-hidden" data-aos="fade-up">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <svg className="absolute w-[200px] h-[200px] top-[-50px] left-[-50px] animate-spin-slow" viewBox="0 0 100 100">
           <polygon points="50,0 100,50 50,100 0,50" fill="white" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-8 text-center relative z-10">
        {stats.map((stat) => (
          <div key={stat.id} className="w-[calc(50%-2rem)] md:flex-1 min-w-[150px] p-6 transition-all duration-300 hover:-translate-y-2 hover:drop-shadow-2xl">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-white drop-shadow-md">
              <Counter target={stat.value} suffix={stat.suffix} />
            </h3>
            <p className="text-sm md:text-lg lg:text-xl font-medium opacity-90 tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
