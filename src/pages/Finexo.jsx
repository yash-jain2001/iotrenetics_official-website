import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CTASection from "../components/CTASection";

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ink:     #0a0a0f;
    --ink-2:   #1c1c27;
    --ink-3:   #3a3a4a;
    --sub:     #7a7a8c;
    --dim:     #b0b0c0;
    --line:    rgba(0,0,0,0.07);
    --line-s:  rgba(0,0,0,0.12);
    --bg:      #f9f9fb;
    --bg2:     #f2f2f6;
    --white:   #ffffff;
    --accent:  #1a56db;
    --accent-l:#e8effe;
    --accent-m:#c3d5fd;
    --gold:    #c47f17;
    --gold-l:  #fdf6e8;
    --gold-m:  #fde9b0;
    --green:   #0a7c3e;
    --green-l: #e6f7ee;
    --red:     #c7292a;
    --r: 12px;
    --r-lg: 20px;
    --r-xl: 28px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fx { font-family: 'DM Sans', sans-serif; color: var(--ink); -webkit-font-smoothing: antialiased; }
  .serif { font-family: 'DM Serif Display', serif; }
  .serif-i { font-family: 'DM Serif Display', serif; font-style: italic; }

  /* ── fade-up ── */
  .fu { opacity: 0; transform: translateY(22px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .fuv { opacity: 1; transform: translateY(0); }
  .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s}

  /* ── layout ── */
  .sec { padding: 100px 24px; }
  .inner { max-width: 1120px; margin: 0 auto; }
  @media(max-width:768px){ .sec { padding: 64px 20px; } }

  /* ── label pill ── */
  .label {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: var(--accent);
    background: var(--accent-l); border: 1px solid var(--accent-m);
    border-radius: 99px; padding: 4px 14px;
  }
  .label-gold { color: var(--gold); background: var(--gold-l); border-color: var(--gold-m); }
  .label-green { color: var(--green); background: var(--green-l); border-color: #b3e6ce; }

  /* ── cards ── */
  .card {
    background: var(--white); border: 1px solid var(--line-s);
    border-radius: var(--r-lg);
  }
  .card-hover {
    transition: border-color .25s, box-shadow .25s, transform .25s;
  }
  .card-hover:hover {
    border-color: var(--accent-m);
    box-shadow: 0 16px 48px rgba(26,86,219,.08);
    transform: translateY(-3px);
  }

  /* ── icon ring ── */
  .ring {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--accent-l); color: var(--accent); border: 1px solid var(--accent-m);
  }
  .ring-gold { background: var(--gold-l); color: var(--gold); border-color: var(--gold-m); }
  .ring-sm { width: 36px; height: 36px; border-radius: 10px; }

  /* ── buttons ── */
  .btn-p {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--ink); color: #fff;
    border: none; border-radius: 99px; padding: 14px 30px;
    font-size: 15px; font-weight: 600; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: -.01em;
    transition: background .2s, transform .18s, box-shadow .2s;
  }
  .btn-p:hover { background: var(--ink-2); box-shadow: 0 8px 32px rgba(10,10,15,.22); transform: scale(1.022); }

  .btn-s {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--ink-3);
    border: 1.5px solid var(--line-s); border-radius: 99px; padding: 13px 26px;
    font-size: 14px; font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: border-color .2s, color .2s;
  }
  .btn-s:hover { border-color: var(--accent); color: var(--accent); }

  /* ── divider ── */
  .div { height: 1px; background: linear-gradient(90deg, transparent, var(--line-s), transparent); }

  /* ── hero gradient ── */
  .hero-bg {
    background:
      radial-gradient(ellipse 60% 55% at 70% 0%, #e8effe 0%, transparent 60%),
      radial-gradient(ellipse 30% 30% at 5% 80%, #fdf6e8 0%, transparent 55%),
      var(--white);
  }

  /* ── float anim ── */
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  .float { animation: floatY 6s ease-in-out infinite; }

  /* ── ticker ── */
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .tick-inner { display: flex; animation: ticker 28s linear infinite; width: max-content; }
  .tick-wrap { overflow: hidden; }

  /* ── stat bars ── */
  @keyframes growW { from{width:0} to{width:var(--w)} }
  .bar { height: 6px; border-radius: 4px; animation: growW 1.2s cubic-bezier(.16,1,.3,1) forwards; }

  /* ── feature grid ── */
  .feat-grid { display: grid; gap: 14px; }
  .fg-3 { grid-template-columns: 1fr 1fr 1fr; }
  .fg-2 { grid-template-columns: 1fr 1fr; }
  .span2 { grid-column: span 2; }
  @media(max-width:780px){
    .fg-3, .fg-2 { grid-template-columns: 1fr; }
    .span2 { grid-column: span 1; }
  }

  /* ── big number ── */
  .big-num { font-family: 'DM Serif Display', serif; font-size: 2.2rem; color: var(--ink); letter-spacing: -.02em; line-height: 1.1; }

  /* ── step line ── */
  .step-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 5px; position: relative; z-index: 1; }
  .step-line { position: absolute; left: 4px; top: 15px; bottom: -20px; width: 2px; background: linear-gradient(to bottom, var(--accent-m), transparent); }

  /* ── voice wave ── */
  @keyframes wave { 0%,100%{transform:scaleY(.35)} 50%{transform:scaleY(1)} }
  .wv { width: 3px; border-radius: 3px; background: var(--accent); }
  .wv:nth-child(1){animation:wave 1.1s ease-in-out infinite 0s;}
  .wv:nth-child(2){animation:wave 1.1s ease-in-out infinite .12s;}
  .wv:nth-child(3){animation:wave 1.1s ease-in-out infinite .24s;}
  .wv:nth-child(4){animation:wave 1.1s ease-in-out infinite .36s;}
  .wv:nth-child(5){animation:wave 1.1s ease-in-out infinite .24s;}
  .wv:nth-child(6){animation:wave 1.1s ease-in-out infinite .12s;}
  .wv:nth-child(7){animation:wave 1.1s ease-in-out infinite 0s;}

  /* ── chat bubbles ── */
  .bub { background: var(--bg); border: 1px solid var(--line-s); border-radius: 16px 16px 16px 4px; padding: 10px 14px; font-size: 13px; color: var(--ink-3); max-width: 220px; }
  .bub-ai { background: var(--ink); color: #fff; border-color: transparent; border-radius: 16px 16px 4px 16px; }

  /* ── converter widget ── */
  .conv-input {
    background: var(--bg); border: 1.5px solid var(--line-s); border-radius: var(--r);
    padding: 12px 16px; font-size: 22px; font-family: 'DM Serif Display', serif;
    color: var(--ink); width: 100%; outline: none;
    transition: border-color .2s;
  }
  .conv-input:focus { border-color: var(--accent); }

  .conv-select {
    background: var(--white); border: 1.5px solid var(--line-s); border-radius: var(--r);
    padding: 10px 12px; font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: var(--ink); outline: none; cursor: pointer; width: 100%;
    transition: border-color .2s;
  }
  .conv-select:focus { border-color: var(--accent); }

  /* ── dark section ── */
  .dark-sec {
    background: var(--ink);
    position: relative; overflow: hidden;
  }
  .dark-sec::before {
    content: ''; position: absolute; width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(26,86,219,.12) 0%, transparent 68%);
    top: -250px; right: -150px; pointer-events: none;
  }
  .dark-sec::after {
    content: ''; position: absolute; width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(196,127,23,.08) 0%, transparent 65%);
    bottom: -120px; left: 80px; pointer-events: none;
  }

  /* ── asset row ── */
  .asset-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line); }
  .asset-row:last-child { border-bottom: none; }

  /* ── number anim ── */
  @keyframes countUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .cnt { animation: countUp .5s ease forwards; }

  /* ── section tag ── */
  .sec-num { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 60px; color: var(--accent-l); line-height: 1; user-select: none; }

  /* ── testimonial ── */
  .stars { color: #f59e0b; font-size: 14px; letter-spacing: 1px; }

  /* ── marquee rate chips ── */
  .rate-chip {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 18px; border-radius: 99px; white-space: nowrap;
    background: var(--white); border: 1px solid var(--line-s);
    font-size: 13px; margin-right: 10px;
  }
  .rate-up { color: var(--green); font-size: 11px; font-weight: 600; }
  .rate-down { color: var(--red); font-size: 11px; font-weight: 600; }
`;

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("fuv");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, className = "", style }) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className={`fu ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ─── ICONS ──────────────────────────────────────────────────────────────── */
const I = {
  Mic: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  ),
  Globe: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  ),
  Users: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Home: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  TrendUp: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Brain: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  ),
  Shield: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  BarChart: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
  Check: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  RefreshCw: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Swap: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Gold: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Car: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
};

/* ─── CURRENCY RATES ─────────────────────────────────────────────────────── */
const RATES = [
  { from: "USD", to: "INR", rate: 83.92, dir: 1 },
  { from: "EUR", to: "INR", rate: 91.45, dir: -1 },
  { from: "GBP", to: "INR", rate: 107.3, dir: 1 },
  { from: "AED", to: "INR", rate: 22.84, dir: 1 },
  { from: "JPY", to: "INR", rate: 0.562, dir: -1 },
  { from: "SGD", to: "INR", rate: 62.18, dir: 1 },
  { from: "AUD", to: "INR", rate: 54.73, dir: -1 },
  { from: "CHF", to: "INR", rate: 95.21, dir: 1 },
  { from: "CAD", to: "INR", rate: 61.47, dir: -1 },
  { from: "KWD", to: "INR", rate: 273.5, dir: 1 },
];

const Ticker = () => {
  const items = [...RATES, ...RATES];
  return (
    <div className="tick-wrap">
      <div className="tick-inner">
        {items.map((r, i) => (
          <div key={i} className="rate-chip">
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>
              {r.from}/INR
            </span>
            <span style={{ color: "var(--sub)" }}>₹{r.rate}</span>
            <span className={r.dir > 0 ? "rate-up" : "rate-down"}>
              {r.dir > 0 ? "▲" : "▼"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── LIVE CONVERTER ─────────────────────────────────────────────────────── */
const CONV_RATES = {
  USD: 83.92,
  EUR: 91.45,
  GBP: 107.3,
  AED: 22.84,
  JPY: 0.562,
  SGD: 62.18,
  AUD: 54.73,
  CHF: 95.21,
  CAD: 61.47,
  KWD: 273.5,
  INR: 1,
};
const CUR_LIST = Object.keys(CONV_RATES);

function LiveConverter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amt, setAmt] = useState("1000");
  const result = amt
    ? ((parseFloat(amt) * CONV_RATES[from]) / CONV_RATES[to]).toFixed(2)
    : "—";

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div
      className="card"
      style={{
        padding: "28px 28px",
        boxShadow: "0 8px 40px rgba(26,86,219,.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div className="ring">
          <I.Globe />
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>
            Live Converter
          </p>
          <p style={{ fontSize: 12, color: "var(--sub)" }}>
            Real-time rates · in-app
          </p>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "var(--green)",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--green)",
              display: "inline-block",
            }}
          />
          LIVE
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* From */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input
            className="conv-input"
            type="number"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            placeholder="0"
          />
          <select
            className="conv-select"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{ width: 90 }}
          >
            {CUR_LIST.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "var(--line-s)" }} />
          <button
            onClick={swap}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid var(--line-s)",
              background: "var(--white)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              transition: "background .15s",
            }}
          >
            <I.Swap />
          </button>
          <div style={{ flex: 1, height: 1, background: "var(--line-s)" }} />
        </div>

        {/* To */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            className="conv-input"
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--accent-l)",
              border: "1.5px solid var(--accent-m)",
              color: "var(--accent)",
              cursor: "default",
            }}
          >
            {result}
          </div>
          <select
            className="conv-select"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={{ width: 90 }}
          >
            {CUR_LIST.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <p
          style={{
            fontSize: 12,
            color: "var(--sub)",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          1 {from} = ₹{CONV_RATES[from].toLocaleString()} · 1 {to} = ₹
          {CONV_RATES[to].toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* ─── NET WORTH VIZ ──────────────────────────────────────────────────────── */
const ASSETS = [
  {
    label: "Bank Accounts",
    icon: <I.TrendUp />,
    color: "var(--accent)",
    pct: 56,
    amount: "₹1,12,000",
    tag: "digital",
  },
  {
    label: "Physical Gold",
    icon: <I.Gold />,
    color: "var(--gold)",
    pct: 44,
    amount: "₹88,000",
    tag: "210g",
  },
  {
    label: "Vehicle",
    icon: <I.Car />,
    color: "#7c5cbf",
    pct: 30,
    amount: "₹60,000",
    tag: "est. value",
  },
  {
    label: "Cash in Hand",
    icon: <I.Shield />,
    color: "#0a7c3e",
    pct: 18,
    amount: "₹36,000",
    tag: "multi-currency",
  },
  {
    label: "Property Share",
    icon: <I.Home />,
    color: "#c47f17",
    pct: 24,
    amount: "₹48,000",
    tag: "partial",
  },
];

function NetWorthCard() {
  return (
    <div className="card" style={{ padding: "28px 28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <span className="label label-gold">
            <I.Gold /> Physical Assets
          </span>
          <p className="big-num" style={{ marginTop: 10 }}>
            ₹3,44,000
          </p>
          <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 3 }}>
            Total net worth across all asset classes
          </p>
        </div>
        <div
          style={{
            background: "var(--green-l)",
            color: "var(--green)",
            borderRadius: 99,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          +12.3%
        </div>
      </div>
      <div>
        {ASSETS.map((a, i) => (
          <div className="asset-row" key={i}>
            <div
              className="ring ring-sm"
              style={{
                background: a.color + "18",
                color: a.color,
                border: `1px solid ${a.color}30`,
                flexShrink: 0,
              }}
            >
              {a.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span
                  style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}
                >
                  {a.label}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}
                >
                  {a.amount}
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  borderRadius: 99,
                  background: "var(--bg2)",
                  overflow: "hidden",
                }}
              >
                <div
                  className="bar"
                  style={{ "--w": a.pct + "%", background: a.color }}
                />
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                color: a.color,
                fontWeight: 700,
                background: a.color + "15",
                borderRadius: 99,
                padding: "2px 8px",
                marginLeft: 8,
                flexShrink: 0,
              }}
            >
              {a.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── BILL SPLIT ─────────────────────────────────────────────────────────── */
const SPLIT_PEOPLE = [
  { name: "You", init: "Y", color: "#1a56db", paid: true, share: "₹600" },
  { name: "Simran", init: "S", color: "#d14b8f", paid: true, share: "₹600" },
  { name: "Hardik", init: "H", color: "#f59e0b", paid: false, share: "₹600" },
  { name: "Amit", init: "A", color: "#0a7c3e", paid: false, share: "₹600" },
];

function SplitWidget() {
  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <div style={{ display: "flex" }}>
          {SPLIT_PEOPLE.map((p, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: p.color,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: i > 0 ? -8 : 0,
                border: "2px solid var(--white)",
                zIndex: 4 - i,
                position: "relative",
              }}
            >
              {p.init}
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>
            Weekend Getaway
          </p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>₹2,400 · 4 people</p>
        </div>
      </div>
      <div style={{ height: 1, background: "var(--line)", margin: "14px 0" }} />
      {SPLIT_PEOPLE.map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: i < 3 ? 10 : 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: p.color,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.init}
            </div>
            <span
              style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}
            >
              {p.name}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{p.share}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 9px",
                borderRadius: 99,
                background: p.paid ? "var(--green-l)" : "#fff8e1",
                color: p.paid ? "var(--green)" : "#b45309",
              }}
            >
              {p.paid ? "Settled" : "Owes"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── VOICE WAVE ─────────────────────────────────────────────────────────── */
const VoiceWave = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 4, height: 28 }}>
    {[16, 26, 20, 30, 20, 26, 16].map((h, i) => (
      <div key={i} className="wv" style={{ height: h }} />
    ))}
  </div>
);

/* ─── CHECKMARK ITEM ─────────────────────────────────────────────────────── */
const CheckItem = ({ children }) => (
  <li
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      fontSize: 15,
      color: "var(--ink-3)",
      fontWeight: 400,
      lineHeight: 1.5,
    }}
  >
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "var(--accent-l)",
        color: "var(--accent)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <I.Check />
    </span>
    {children}
  </li>
);

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
const Finexo = () => (
  <div className="fx" style={{ overflowX: "hidden" }}>
    <style>{STYLES}</style>

    {/* ══ HERO ════════════════════════════════════════════════════════════ */}
    <section className="sec hero-bg" style={{ paddingBottom: 64 }}>
      <div className="inner">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 72,
            flexWrap: "wrap",
          }}
        >
          {/* LEFT */}
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <FadeUp>
              <span className="label">
                <I.Mic /> Voice-first finance
              </span>
            </FadeUp>

            <FadeUp className="d1">
              <h1
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontWeight: 400,
                  fontSize: "clamp(2.8rem,5.5vw,4.6rem)",
                  lineHeight: 1.06,
                  color: "var(--ink)",
                  margin: "20px 0 24px",
                  letterSpacing: "-.02em",
                }}
              >
                Your finances,
                <br />
                <span style={{ fontStyle: "italic" }}>finally clear.</span>
              </h1>
            </FadeUp>

            <FadeUp className="d2">
              <p
                style={{
                  fontSize: 17,
                  color: "var(--sub)",
                  lineHeight: 1.75,
                  maxWidth: 460,
                  marginBottom: 36,
                  fontWeight: 400,
                }}
              >
                Speak your expenses. Track physical assets. Split bills. Convert
                currencies live. Finexo understands money the way you talk about
                it.
              </p>
            </FadeUp>

            <FadeUp className="d3">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 40,
                }}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.iotrenetics.finexo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-p">
                    <I.Play />
                    Get on Play Store
                  </button>
                </a>
                <Link to="/privacy-policy-finexo">
                  <button className="btn-s">Privacy Policy</button>
                </Link>
              </div>
            </FadeUp>

            {/* Stats row */}
            <FadeUp className="d4">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[
                  { val: "10+", label: "Currencies" },
                  { val: "5", label: "Asset classes" },
                  { val: "0", label: "Ads. Ever." },
                ].map((s, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: "1.9rem",
                        color: "var(--ink)",
                        letterSpacing: "-.02em",
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--sub)",
                        marginTop: 3,
                        fontWeight: 500,
                        letterSpacing: ".04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT */}
          <div
            style={{
              flex: "1 1 340px",
              minWidth: 0,
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Decorative rings */}
            {[460, 340].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: s,
                  height: s,
                  borderRadius: "50%",
                  border: `1px solid ${i === 0 ? "var(--accent-l)" : "var(--accent-m)"}`,
                  opacity: 0.6,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  pointerEvents: "none",
                }}
              />
            ))}

            <img
              src="/assets/finexo1.webp"
              alt="Finexo App"
              loading="eager"
              className="float"
              style={{
                width: "100%",
                maxWidth: 320,
                position: "relative",
                zIndex: 2,
                filter: "drop-shadow(0 32px 56px rgba(26,86,219,.14))",
              }}
            />

            {/* Voice badge */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "20%",
                zIndex: 10,
                background: "var(--white)",
                border: "1px solid var(--line-s)",
                borderRadius: 14,
                padding: "10px 14px",
                boxShadow: "0 8px 24px rgba(0,0,0,.07)",
                minWidth: 140,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--sub)",
                  marginBottom: 6,
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                }}
              >
                Listening…
              </p>
              <VoiceWave />
            </div>

            {/* Currency badge */}
            <div
              style={{
                position: "absolute",
                right: -8,
                top: "36%",
                zIndex: 10,
                background: "var(--white)",
                border: "1px solid var(--line-s)",
                borderRadius: 12,
                padding: "10px 14px",
                boxShadow: "0 8px 24px rgba(0,0,0,.07)",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--sub)",
                  fontWeight: 600,
                  marginBottom: 2,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                }}
              >
                USD → INR
              </p>
              <p
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: 20,
                  color: "var(--ink)",
                }}
              >
                ₹83.92
              </p>
              <p
                style={{ fontSize: 11, color: "var(--green)", fontWeight: 600 }}
              >
                ▲ 0.12% today
              </p>
            </div>

            {/* Net worth badge */}
            <div
              style={{
                position: "absolute",
                right: -4,
                bottom: "14%",
                zIndex: 10,
                background: "var(--ink)",
                borderRadius: 12,
                padding: "12px 18px",
                minWidth: 152,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,.5)",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                NET WORTH
              </p>
              <p
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: 22,
                  color: "#fff",
                }}
              >
                ₹3.44L
              </p>
              <p style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>
                ▲ 12.3% this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ LIVE RATES TICKER ══════════════════════════════════════════════ */}
    <div
      style={{
        background: "var(--white)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            padding: "12px 24px",
            background: "var(--ink)",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            flexShrink: 0,
            alignSelf: "stretch",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#4ade80",
            }}
          />
          Live Rates
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Ticker />
        </div>
      </div>
    </div>

    {/* ══ FEATURES — BENTO ══════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <FadeUp style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <span className="label">Features</span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: "clamp(2rem,3.8vw,3rem)",
                  color: "var(--ink)",
                  margin: "14px 0 0",
                  letterSpacing: "-.02em",
                  lineHeight: 1.1,
                }}
              >
                One app.
                <br />
                <span style={{ fontStyle: "italic" }}>No spreadsheets.</span>
              </h2>
            </div>
            <p
              style={{
                fontSize: 15,
                color: "var(--sub)",
                maxWidth: 340,
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              From daily chai to foreign trips — track, convert, split, and
              understand every rupee.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: 3 equal cards */}
        <div className="feat-grid fg-3" style={{ marginBottom: 14 }}>
          {[
            {
              icon: <I.Mic />,
              tag: "Hands-free",
              title: "Voice Expense Logging",
              body: 'Say "Paid ₹350 for Uber" and Finexo instantly logs, categorizes and timestamps — no typing, no app-opening.',
            },
            {
              icon: <I.Globe />,
              tag: "Real-time",
              title: "Live Currency Conversion",
              body: "Check live rates and save transactions in any currency. Auto-converts to your base currency using real-time data.",
            },
            {
              icon: <I.Users />,
              tag: "Group finance",
              title: "Bill Splitting",
              body: "Split any bill among any group voice-first. Track who settled and who owes with one clear screen.",
            },
          ].map((f, i) => (
            <FadeUp key={i} className={`d${i + 1}`}>
              <div
                className="card card-hover"
                style={{ padding: "28px", height: "100%" }}
              >
                <div className="ring" style={{ marginBottom: 16 }}>
                  {f.icon}
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "var(--accent-l)",
                    borderRadius: 99,
                    padding: "3px 10px",
                  }}
                >
                  {f.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--ink)",
                    margin: "10px 0 8px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--sub)",
                    lineHeight: 1.7,
                  }}
                >
                  {f.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Row 2: Wide net worth + narrow AI */}
        <div className="feat-grid fg-2" style={{ marginBottom: 14 }}>
          <FadeUp className="span2 d1">
            <NetWorthCard />
          </FadeUp>
          <FadeUp className="d2" style={{ display: "none" }}>
            {/* Hidden — spans are handled by span2 */}
          </FadeUp>
        </div>

        {/* Row 3: Converter wide + split */}
        <div className="feat-grid fg-2">
          <FadeUp className="d1">
            <LiveConverter />
          </FadeUp>
          <FadeUp className="d2">
            <SplitWidget />
          </FadeUp>
        </div>

        {/* Row 4: 3 small utility cards */}
        <div className="feat-grid fg-3" style={{ marginTop: 14 }}>
          {[
            {
              icon: <I.BarChart />,
              title: "Visual Reports",
              body: "Auto-generated weekly and monthly breakdowns with intuitive charts.",
            },
            {
              icon: <I.Shield />,
              title: "Private by Design",
              body: "No ads, no data selling. Your financial data stays entirely yours.",
            },
            {
              icon: <I.Brain />,
              title: "Ask Finexo AI",
              body: '"What\'s my biggest expense this month?" — get intelligent plain-language answers.',
            },
          ].map((f, i) => (
            <FadeUp key={i} className={`d${i + 1}`}>
              <div
                className="card card-hover"
                style={{ padding: "22px 24px", height: "100%" }}
              >
                <div className="ring ring-sm" style={{ marginBottom: 12 }}>
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--ink)",
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--sub)",
                    lineHeight: 1.65,
                  }}
                >
                  {f.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    <div className="div" />

    {/* ══ HOW IT WORKS ═══════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--white)" }}>
      <div className="inner">
        <div
          style={{
            display: "flex",
            gap: 72,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FadeUp style={{ flex: "1 1 360px", minWidth: 0 }}>
            <span className="label">
              <I.Mic /> Voice-first
            </span>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                color: "var(--ink)",
                margin: "16px 0 14px",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
              }}
            >
              Speak once.
              <br />
              <span style={{ fontStyle: "italic" }}>
                Finexo handles the rest.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--sub)",
                lineHeight: 1.75,
                maxWidth: 420,
                marginBottom: 36,
              }}
            >
              No tapping into categories, no manual currency selection. Just say
              what happened and Finexo understands.
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                "Voice input logs category, amount & currency automatically",
                "Say who you're splitting with and the bill is created",
                "Ask for a report anytime — no charts to build",
                "Works even while traveling across currencies",
              ].map((item, i) => (
                <CheckItem key={i}>{item}</CheckItem>
              ))}
            </ul>
          </FadeUp>

          <FadeUp className="d2" style={{ flex: "1 1 320px", minWidth: 0 }}>
            {/* Step cards */}
            {[
              {
                n: "01",
                title: "Say it",
                body: '"Paid ₹180 for coffee"',
                accent: "var(--accent)",
              },
              {
                n: "02",
                title: "Confirm or auto-save",
                body: "Finexo categorizes and records instantly.",
                accent: "var(--gold)",
              },
              {
                n: "03",
                title: "Insights arrive",
                body: "Weekly summaries and AI answers — always ready.",
                accent: "var(--green)",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  marginBottom: i < 2 ? 20 : 0,
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: s.accent + "15",
                      color: s.accent,
                      border: `1px solid ${s.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Serif Display',serif",
                      fontSize: 15,
                      fontStyle: "italic",
                    }}
                  >
                    {s.n}
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 20,
                        top: 46,
                        width: 2,
                        height: 26,
                        background: "var(--line-s)",
                      }}
                    />
                  )}
                </div>
                <div className="card" style={{ flex: 1, padding: "14px 18px" }}>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      color: "var(--ink)",
                      marginBottom: 3,
                    }}
                  >
                    {s.title}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--sub)" }}>{s.body}</p>
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>

    <div className="div" />

    {/* ══ PHYSICAL ASSETS ════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <div
          style={{
            display: "flex",
            gap: 72,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FadeUp
            style={{
              flex: "1 1 320px",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/finexo2.webp"
              alt="Net Worth"
              loading="lazy"
              className="float"
              style={{
                width: "100%",
                maxWidth: 380,
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,.09))",
              }}
            />
          </FadeUp>

          <FadeUp className="d1" style={{ flex: "1 1 380px", minWidth: 0 }}>
            <span className="label label-gold">
              <I.Gold /> Physical Assets
            </span>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                color: "var(--ink)",
                margin: "16px 0 14px",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
              }}
            >
              Your wealth isn't
              <br />
              <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
                only in your bank.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--sub)",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 28,
              }}
            >
              Most finance apps stop at your bank balance. Finexo goes further —
              add gold, vehicles, property shares, and cash holdings for a true
              picture of what you own.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                {
                  icon: <I.Gold />,
                  label: "Physical Gold",
                  sub: "Grams, coins, jewellery",
                  c: "var(--gold)",
                },
                {
                  icon: <I.Car />,
                  label: "Vehicles",
                  sub: "Estimated market value",
                  c: "#7c5cbf",
                },
                {
                  icon: <I.Home />,
                  label: "Property",
                  sub: "Partial or full share",
                  c: "var(--accent)",
                },
                {
                  icon: <I.Shield />,
                  label: "Cash Holdings",
                  sub: "Any currency",
                  c: "var(--green)",
                },
              ].map((a, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: a.c,
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "var(--ink)",
                        marginBottom: 2,
                      }}
                    >
                      {a.label}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--sub)" }}>{a.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    <div className="div" />

    {/* ══ AI ASSISTANT ═══════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--white)" }}>
      <div className="inner">
        <div
          style={{
            display: "flex",
            gap: 72,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FadeUp style={{ flex: "1 1 400px", minWidth: 0 }}>
            <span className="label">
              <I.Brain /> Ask Finexo
            </span>
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                color: "var(--ink)",
                margin: "16px 0 14px",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
              }}
            >
              Ask anything.
              <br />
              <span style={{ fontStyle: "italic" }}>Get straight answers.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--sub)",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 28,
              }}
            >
              Finexo knows your entire financial history — every voice entry,
              every split, every currency transaction — and answers in plain
              language.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "How much did I spend on food last month?",
                "What is my total net worth right now?",
                "How much does Rohan owe me in total?",
                "Convert my USD savings to INR at today's rate",
              ].map((q, i) => (
                <div
                  key={i}
                  className="card card-hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      color: "var(--ink-3)",
                      fontWeight: 400,
                    }}
                  >
                    {q}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp
            className="d2"
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
              <img
                src="/assets/finexo3.webp"
                alt="Finexo AI"
                loading="lazy"
                className="float"
                style={{
                  width: "100%",
                  filter: "drop-shadow(0 24px 48px rgba(26,86,219,.11))",
                }}
              />
              {/* Chat overlay */}
              <div
                className="bub"
                style={{ position: "absolute", left: -20, top: "18%" }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--sub)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 3,
                  }}
                >
                  You
                </span>
                What's my balance?
              </div>
              <div
                className="bub bub-ai"
                style={{ position: "absolute", right: -12, bottom: "24%" }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,.5)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 3,
                  }}
                >
                  Finexo AI
                </span>
                ₹1,12,000 across 3 accounts
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* ══ SCREENSHOTS ════════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <FadeUp style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="label">App Preview</span>
          <h2
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(1.9rem,3.5vw,2.6rem)",
              color: "var(--ink)",
              margin: "14px 0 0",
              letterSpacing: "-.02em",
            }}
          >
            Clean. Fast.{" "}
            <span style={{ fontStyle: "italic" }}>Intelligent.</span>
          </h2>
        </FadeUp>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {["/assets/finexo4.webp", "/assets/finexo5.webp"].map((src, i) => (
            <FadeUp key={i} className={`d${i + 1}`}>
              <div
                className="card"
                style={{ overflow: "hidden", borderRadius: "var(--r-xl)" }}
              >
                <img
                  src={src}
                  alt={`Finexo screenshot ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* ══ DARK CTA ═══════════════════════════════════════════════════════ */}
    <section className="dark-sec" style={{ padding: "104px 24px" }}>
      <div
        className="inner"
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <FadeUp>
          <span
            className="label"
            style={{
              background: "rgba(26,86,219,.2)",
              borderColor: "rgba(99,147,253,.25)",
              color: "#93b4fd",
            }}
          >
            <I.Play />
            Available on Android
          </span>
          <h2
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontWeight: 400,
              fontSize: "clamp(2.4rem,5vw,3.8rem)",
              color: "#fff",
              margin: "22px 0 18px",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
            }}
          >
            Start knowing
            <br />
            <span style={{ fontStyle: "italic", color: "#93b4fd" }}>
              exactly where you stand.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,.55)",
              maxWidth: 420,
              margin: "0 auto 40px",
              lineHeight: 1.75,
              fontWeight: 400,
            }}
          >
            Voice tracking, physical asset net worth, group splits, live
            currency conversion — all in one beautifully simple app.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.iotrenetics.finexo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn-p"
              style={{
                background: "#fff",
                color: "var(--ink)",
                padding: "16px 38px",
                fontSize: 16,
              }}
            >
              <I.Play />
              Download on Play Store
            </button>
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 28,
              marginTop: 28,
            }}
          >
            <Link to="/privacy-policy-finexo">
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.4)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  cursor: "pointer",
                }}
              >
                Privacy Policy
              </span>
            </Link>
            <Link to="/delete-account-policy-finexo">
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.4)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  cursor: "pointer",
                }}
              >
                Delete Account Policy
              </span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>

    <CTASection />
  </div>
);

export default Finexo;
