import { useEffect, useRef } from 'react';
import SmartifyClone from '../components/SmartifyClone';

/* ─── Data ──────────────────────────────────────────────────────────────── */

const features = [
  {
    title: 'Smart Room Control',
    desc: 'Lighting, AC, curtains, and scenes — all unified under one guest-facing interface.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Central Dashboard',
    desc: 'Every room, every floor, every system — monitored from a single operations screen.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    title: 'Energy Management',
    desc: 'Occupancy-triggered power modes cut utility costs without affecting guest comfort.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'Guest Experience',
    desc: 'Personalized room scenes activated on check-in — remembered on every return visit.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Security & Access',
    desc: 'Smart locks, keyless entry, and access logs — security that never sleeps.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Housekeeping',
    desc: 'Live room status — occupied, vacant, DND, make-up room — pushed straight to staff.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
];

const useCases = [
  {
    title: 'Smart Hotel Rooms',
    eyebrow: 'In-Room Intelligence',
    img: '/assets/hotel1.png',
    desc: 'From the moment a guest opens the door, the room knows them. Lighting shifts to their saved scene, the AC is at their preferred temperature, and curtains respond to the time of day — all without touching a switch.',
    points: ['Scene-based lighting automation', 'Smart curtains & ambient control', 'Occupancy-based AC scheduling', 'DND / Make My Room control'],
    reverse: false,
  },
  {
    title: 'Luxury Suites & Resorts',
    eyebrow: 'Signature Guest Moments',
    img: '/assets/hotel2.png',
    desc: 'In luxury, the smallest details define the experience. Voice-enabled controls, outdoor lighting choreography, and personalized mood scenes make every suite feel exclusively designed for the guest inside.',
    points: ['Mood lighting scene presets', 'Voice-enabled room control', 'Outdoor & pool automation', 'Returning guest preference recall'],
    reverse: true,
  },
  {
    title: 'Operations & Backend',
    eyebrow: 'Staff & Management Tools',
    img: '/assets/hotel3.png',
    desc: 'Behind every seamless guest experience is an operations team with perfect visibility. Real-time room status, instant housekeeping alerts, and a single management dashboard eliminate guesswork from every shift.',
    points: ['Live housekeeping tracking', 'Room occupancy monitoring', 'Centralized management dashboard', 'Instant staff alert system'],
    reverse: false,
  },
];

const steps = [
  {
    num: '01',
    title: 'Guest Check-In',
    desc: 'Room profile activates the moment the guest arrives — no manual setup required.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Smart Room Activation',
    desc: 'Lighting, climate, and scenes switch to the guest\'s saved preferences instantly.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Central Monitoring',
    desc: 'Operations sees every room in real time — occupancy, energy, housekeeping status.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Energy Optimization',
    desc: 'Vacant room modes, smart AC scheduling, and power analytics run automatically.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
);

const EyebrowLabel = ({ children, light = false }) => (
  <p className={`text-[11px] font-bold tracking-[0.18em] uppercase mb-3 ${light ? 'text-amber-300' : 'text-amber-600'}`}>
    {children}
  </p>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */

const HotelAutomation = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('ha2-visible');
            observerRef.current.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.ha2-reveal').forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Reveal ── */
        .ha2-reveal {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .ha2-reveal.ha2-visible { opacity:1; transform:none; }
        .ha2-d1{transition-delay:0.08s} .ha2-d2{transition-delay:0.16s}
        .ha2-d3{transition-delay:0.24s} .ha2-d4{transition-delay:0.32s}
        .ha2-d5{transition-delay:0.40s} .ha2-d6{transition-delay:0.48s}

        /* ── Hero ── */
        @keyframes ha2HeroUp {
          from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none}
        }
        .ha2-h1{animation:ha2HeroUp 1s 0.1s cubic-bezier(0.16,1,0.3,1) both}
        .ha2-h2{animation:ha2HeroUp 1s 0.28s cubic-bezier(0.16,1,0.3,1) both}
        .ha2-h3{animation:ha2HeroUp 1s 0.44s cubic-bezier(0.16,1,0.3,1) both}
        .ha2-h4{animation:ha2HeroUp 1s 0.58s cubic-bezier(0.16,1,0.3,1) both}

        /* ── Cards ── */
        .ha2-feat-card {
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .ha2-feat-card:hover {
          border-color: #fde68a;
          box-shadow: 0 10px 36px rgba(217,119,6,0.09);
          transform: translateY(-4px);
        }
        .ha2-feat-card:hover .ha2-icon {
          background: #d97706; border-color: #d97706; color: #fff;
        }
        .ha2-icon { transition: background 0.22s, border-color 0.22s, color 0.22s; }

        .ha2-use-card { transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s; }
        .ha2-use-card:hover { border-color: #fde68a; box-shadow: 0 14px 48px rgba(217,119,6,0.08); transform:translateY(-3px); }

        .ha2-img img { transition: transform 0.55s cubic-bezier(0.16,1,0.3,1); }
        .ha2-use-card:hover .ha2-img img { transform: scale(1.04); }

        .ha2-step-card { transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s; }
        .ha2-step-card:hover { border-color: #fde68a; box-shadow: 0 8px 28px rgba(217,119,6,0.1); transform: translateY(-3px); }
        .ha2-step-card:hover .ha2-step-num { color: #d97706; }
        .ha2-step-num { transition: color 0.22s; }

        /* ── Pulse dot ── */
        @keyframes ha2Pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .ha2-pulse { animation: ha2Pulse 2.2s ease-in-out infinite; }

        /* ── Badge slide ── */
        @keyframes ha2Badge { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:none} }
        .ha2-badge { animation: ha2Badge 1s 0.85s cubic-bezier(0.16,1,0.3,1) both; }

        /* ── Gold shimmer on dark section ── */
        @keyframes ha2Shimmer {
          0%{background-position:-200% center} 100%{background-position:200% center}
        }
        .ha2-shimmer {
          background: linear-gradient(90deg, #78350f 0%, #d97706 40%, #fbbf24 50%, #d97706 60%, #78350f 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: ha2Shimmer 4s linear infinite;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center min-h-[92vh] flex items-center justify-center text-center overflow-hidden">
        {/* Solid dark base — essential for bright daytime resort images */}
        <div className="absolute inset-0 bg-black/72" />
        {/* Warm directional tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/55 via-transparent to-stone-950/40" />

        {/* Fine mesh texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />

        {/* Warm amber glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-amber-500/8 blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center gap-7">
          {/* Tier pill */}
          <div className="ha2-h1 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 text-white text-[11px] font-bold tracking-[0.18em] uppercase">
            <span className="ha2-pulse w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Smart Hospitality · IoTrenetics
          </div>

          {/* Headline */}
          <h1 className="ha2-h2 text-white text-4xl sm:text-5xl md:text-[3.6rem] font-bold tracking-[-0.03em] leading-[1.1] [text-shadow:0_4px_20px_rgba(0,0,0,1)]">
            Elevating Guest Experiences<br />
            <span className="text-amber-400" style={{textShadow:'0 4px 20px rgba(0,0,0,1)'}}>Through Hotel Automation</span>
          </h1>

          <p className="ha2-h3 text-white text-base sm:text-lg max-w-xl leading-relaxed" style={{textShadow:'0 2px 12px rgba(0,0,0,0.9)'}}>
            Seamless comfort, personalized control, and operational efficiency — unified in one intelligent platform built for hospitality.
          </p>

          <div className="ha2-h4 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/50 rounded-full px-5 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">Luxury Meets Intelligence</span>
          </div>

          <div className="ha2-h4 flex items-center gap-4 flex-wrap justify-center">
            <button className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_0_28px_rgba(217,119,6,0.5)] hover:scale-[1.03] tracking-wide">
              Request a Demo
            </button>
            <button className="bg-white/8 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 tracking-wide">
              Download Deck
            </button>
          </div>
        </div>

        {/* Floating status badge */}
        <div className="ha2-badge absolute bottom-8 right-8 hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-5 py-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <div className="text-left">
            <p className="text-white text-xs font-bold">5-Star Guest Experience</p>
            <p className="text-white/45 text-[10px]">Automation that guests notice & remember</p>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <section className="bg-stone-950 border-b border-white/5 py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {['Boutique Hotels', 'Luxury Resorts', 'Business Hotels', 'Heritage Properties', 'Hotel Chains'].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-white/45 text-[10px] font-bold tracking-[0.18em] uppercase">
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── VALUE PROPOSITION ────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 rounded-3xl overflow-hidden relative ha2-reveal">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-600/15 blur-[100px] pointer-events-none" />
            <div className="relative z-10 px-10 sm:px-16 py-14 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <EyebrowLabel light>The Business Case</EyebrowLabel>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-white leading-tight">
                  Transform Every Room<br />
                  <span className="text-amber-300">into a Smart Experience</span>
                </h2>
                <p className="mt-5 text-white/50 text-sm leading-relaxed max-w-md">
                  Hotels that automate their guest experience don't just reduce costs — they create loyalty. Guests remember the room that felt like it was designed for them.
                </p>
              </div>
              <div className="flex-shrink-0 w-full lg:w-64 flex flex-col gap-4">
                {[
                  { label: 'Guest Satisfaction', value: 'Higher', icon: '★' },
                  { label: 'Energy Costs', value: 'Lower', icon: '↓' },
                  { label: 'Staff Efficiency', value: 'Smarter', icon: '↑' },
                ].map(({ label, value, icon }, i) => (
                  <div key={i} className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 transition-colors duration-200">
                    <span className="text-amber-400 text-xl font-bold w-7 text-center flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-white text-sm font-bold">{value}</p>
                      <p className="text-white/35 text-[10px] font-semibold uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── CORE FEATURES ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 ha2-reveal">
            <EyebrowLabel>Platform Capabilities</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
              Core <span className="text-amber-600">Features</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm max-w-md mx-auto">
              Every feature designed around one goal — a guest who checks out and immediately books again.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {features.map((f, i) => (
              <div
                key={i}
                className={`ha2-feat-card bg-white border border-transparent p-8 flex flex-col gap-4 ha2-reveal ha2-d${(i % 3) + 1}`}
              >
                <div className="ha2-icon w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{f.title}</h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── USE CASES ────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 ha2-reveal">
            <EyebrowLabel>Deployment Scenarios</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
              Built for Every<br /><span className="text-amber-600">Hospitality Format</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {useCases.map((item, i) => (
              <div
                key={i}
                className={`ha2-use-card bg-white border border-gray-100 rounded-3xl overflow-hidden flex max-lg:flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} ha2-reveal ha2-d${(i % 3) + 1}`}
              >
                {/* Image */}
                <div className="ha2-img w-full lg:w-[46%] min-h-[280px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-9 flex flex-col justify-center gap-5">
                  <div>
                    <EyebrowLabel>{item.eyebrow}</EyebrowLabel>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 ha2-reveal">
            <EyebrowLabel>The Guest Journey</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight">
              How Smart Hotel<br /><span className="text-amber-600">Automation Works</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm max-w-lg mx-auto">
              A unified system that runs invisibly — impressing guests and simplifying operations simultaneously.
            </p>
          </div>

          {/* Steps — connected timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`ha2-step-card bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4 relative ha2-reveal ha2-d${i + 1}`}
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[2.35rem] left-[calc(100%+1px)] w-6 h-px bg-gray-200 z-10" />
                )}
                <div className="flex items-center gap-3">
                  <div className="ha2-icon w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                    {step.icon}
                  </div>
                  <span className="ha2-step-num text-2xl font-bold text-gray-100 tracking-tight">{step.num}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── WHY HOTEL OWNERS NEED THIS ───────────────────────────────────── */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 ha2-reveal">
            <EyebrowLabel>The Owner's Perspective</EyebrowLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900">
              Why Every Hotel Owner<br />
              <span className="text-amber-600">Needs This Today</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
              The gap between a 3-star and a 5-star experience is no longer about decor — it's about intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 ha2-reveal">
            {[
              {
                title: 'Guest Retention',
                desc: 'Guests who experience smart rooms return more, rate higher, and recommend widely. Automation becomes your best marketing.',
                icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>,
              },
              {
                title: 'Operational Savings',
                desc: 'Occupancy-based energy modes, automated housekeeping alerts, and central dashboards reduce operating costs from day one.',
                icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
              },
              {
                title: 'Competitive Edge',
                desc: 'In a market where guests compare everything — a room that adapts to them is not an amenity, it\'s an expectation.',
                icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
              },
            ].map(({ title, desc, icon }, i) => (
              <div key={i} className="bg-white p-8 flex flex-col gap-4 hover:border-amber-100 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{title}</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <SmartifyClone />
    </>
  );
};

export default HotelAutomation;
