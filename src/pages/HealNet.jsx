import CTASection from '../components/CTASection';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

  :root {
    --ink:      #070d14; 
    --ink-2:    #111b27;
    --ink-3:    #2e3d4f;
    --sub:      #637080;
    --dim:      #9baab8;
    --line:     rgba(10,30,55,0.07);
    --line-s:   rgba(10,30,55,0.12);
    --bg:       #f4f7fb;
    --bg2:      #eaf0f8;
    --white:    #ffffff;
    --teal:     #0b7c6e;
    --teal-d:   #075e53;
    --teal-l:   #e6f5f3;
    --teal-m:   #b2e0da;
    --sky:      #1a7bbf;
    --sky-l:    #e8f4fd;
    --sky-m:    #b5d9f5;
    --rose:     #c0394b;
    --rose-l:   #fdedf0;
    --amber:    #b06010;
    --amber-l:  #fef6ea;
    --green:    #1a7a4a;
    --green-l:  #e8f7ef;
    --r:        12px;
    --r-lg:     20px;
    --r-xl:     28px;
    --shadow:   0 4px 24px rgba(7,13,20,0.07);
    --shadow-h: 0 16px 56px rgba(11,124,110,0.10);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ht { font-family: 'Sora', sans-serif; color: var(--ink); -webkit-font-smoothing: antialiased; }
  .lora { font-family: 'Lora', serif; }
  .lora-i { font-family: 'Lora', serif; font-style: italic; }

  /* ── fade-up ── */
  .fu { opacity: 0; transform: translateY(22px); transition: opacity .72s cubic-bezier(.16,1,.3,1), transform .72s cubic-bezier(.16,1,.3,1); }
  .fuv { opacity: 1; transform: translateY(0); }
  .d1{transition-delay:.08s} .d2{transition-delay:.17s} .d3{transition-delay:.26s} .d4{transition-delay:.35s}

  /* ── layout ── */
  .sec { padding: 100px 24px; }
  .inner { max-width: 1120px; margin: 0 auto; }
  @media(max-width:768px){ .sec { padding: 64px 20px; } }

  /* ── label pill ── */
  .lbl {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: var(--teal);
    background: var(--teal-l); border: 1px solid var(--teal-m);
    border-radius: 99px; padding: 4px 14px;
  }
  .lbl-sky  { color: var(--sky);   background: var(--sky-l);   border-color: var(--sky-m); }
  .lbl-rose { color: var(--rose);  background: var(--rose-l);  border-color: #f5b8c2; }
  .lbl-amber{ color: var(--amber); background: var(--amber-l); border-color: #f5d8ae; }

  /* ── cards ── */
  .card {
    background: var(--white);
    border: 1px solid var(--line-s);
    border-radius: var(--r-lg);
  }
  .card-h {
    transition: border-color .25s, box-shadow .25s, transform .25s;
  }
  .card-h:hover {
    border-color: var(--teal-m);
    box-shadow: var(--shadow-h);
    transform: translateY(-3px);
  }

  /* ── icon ring ── */
  .ring {
    width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--teal-l); color: var(--teal); border: 1px solid var(--teal-m);
  }
  .ring-sky   { background: var(--sky-l);   color: var(--sky);   border-color: var(--sky-m); }
  .ring-rose  { background: var(--rose-l);  color: var(--rose);  border-color: #f5b8c2; }
  .ring-amber { background: var(--amber-l); color: var(--amber); border-color: #f5d8ae; }
  .ring-sm { width: 38px; height: 38px; border-radius: 10px; }

  /* ── buttons ── */
  .btn-p {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--teal); color: #fff;
    border: none; border-radius: 99px; padding: 14px 30px;
    font-size: 15px; font-weight: 600; cursor: pointer;
    font-family: 'Sora', sans-serif; letter-spacing: -.01em;
    transition: background .2s, transform .18s, box-shadow .2s;
  }
  .btn-p:hover { background: var(--teal-d); box-shadow: 0 8px 32px rgba(11,124,110,.24); transform: scale(1.022); }

  .btn-s {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--ink-3);
    border: 1.5px solid var(--line-s); border-radius: 99px; padding: 13px 26px;
    font-size: 14px; font-weight: 500; cursor: pointer;
    font-family: 'Sora', sans-serif;
    transition: border-color .2s, color .2s;
  }
  .btn-s:hover { border-color: var(--teal); color: var(--teal); }

  /* ── divider ── */
  .div { height: 1px; background: linear-gradient(90deg, transparent, var(--line-s), transparent); }

  /* ── hero bg ── */
  .hero-bg {
    background:
      radial-gradient(ellipse 65% 55% at 68% -8%, #d4ece9 0%, transparent 60%),
      radial-gradient(ellipse 30% 28% at 4% 88%, #e8f4fd 0%, transparent 55%),
      var(--white);
  }

  /* ── float ── */
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .float { animation: floatY 6s ease-in-out infinite; }

  /* ── pulse ring ── */
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
  .pulse-dot { position:relative; width:10px; height:10px; }
  .pulse-dot::before {
    content:''; position:absolute; inset:0; border-radius:50%;
    background:var(--teal); animation:pulse-ring 1.8s ease-out infinite;
  }
  .pulse-dot-inner { width:10px; height:10px; border-radius:50%; background:var(--teal); position:relative; z-index:1; }

  /* ── grid ── */
  .fg { display: grid; gap: 14px; }
  .fg2 { grid-template-columns: 1fr 1fr; }
  .fg3 { grid-template-columns: 1fr 1fr 1fr; }
  .span2 { grid-column: span 2; }
  @media(max-width:780px){
    .fg2,.fg3 { grid-template-columns: 1fr; }
    .span2 { grid-column: span 1; }
  }

  /* ── scan upload widget ── */
  .upload-zone {
    border: 2px dashed var(--teal-m); border-radius: var(--r-lg);
    padding: 28px; text-align: center; cursor: pointer;
    transition: border-color .2s, background .2s;
    background: var(--teal-l);
  }
  .upload-zone:hover { border-color: var(--teal); background: #d4ece9; }

  /* ── heartbeat line ── */
  @keyframes ecg-draw {
    0% { stroke-dashoffset: 500; }
    100% { stroke-dashoffset: 0; }
  }
  .ecg-line { stroke-dasharray: 500; stroke-dashoffset: 500; animation: ecg-draw 2.5s ease forwards infinite; }

  /* ── risk score arc ── */
  @keyframes arcGrow { from{stroke-dashoffset:220} to{stroke-dashoffset:var(--offset)} }
  .risk-arc { animation: arcGrow 1.4s cubic-bezier(.16,1,.3,1) forwards; }

  /* ── data bar ── */
  @keyframes growW { from{width:0} to{width:var(--w)} }
  .dbar { height: 6px; border-radius: 4px; animation: growW 1.2s cubic-bezier(.16,1,.3,1) forwards; }

  /* ── dark band ── */
  .dark-band {
    background: linear-gradient(145deg, #070d14 0%, #0d2035 100%);
    position: relative; overflow: hidden;
  }
  .dark-band::before {
    content:''; position:absolute; width:700px; height:700px;
    background: radial-gradient(circle, rgba(11,124,110,.14) 0%, transparent 68%);
    top:-250px; right:-120px; pointer-events:none;
  }
  .dark-band::after {
    content:''; position:absolute; width:400px; height:400px;
    background: radial-gradient(circle, rgba(26,123,191,.10) 0%, transparent 65%);
    bottom:-100px; left:60px; pointer-events:none;
  }

  /* ── check item ── */
  .chk-item { display:flex; align-items:flex-start; gap:10px; font-size:15px; color:var(--ink-3); line-height:1.6; }
  .chk-dot { width:20px; height:20px; border-radius:50%; background:var(--teal-l); color:var(--teal); display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }

  /* ── use-case tab ── */
  .uc-tab {
    padding: 10px 18px; border-radius: 99px; font-size: 13px; font-weight: 600;
    cursor: pointer; border: 1.5px solid var(--line-s); background: transparent;
    font-family: 'Sora', sans-serif; color: var(--sub);
    transition: all .2s;
  }
  .uc-tab.active { background: var(--teal); color: #fff; border-color: var(--teal); }
  .uc-tab:hover:not(.active) { border-color: var(--teal); color: var(--teal); }

  .big-num { font-family: 'Lora', serif; font-size: 2.4rem; color: var(--ink); letter-spacing: -.02em; line-height: 1.1; }
`;

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("fuv"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function FadeUp({ children, className = "", style }) {
  const ref = useFadeUp();
  return <div ref={ref} className={`fu ${className}`} style={style}>{children}</div>;
}

/* ─── ICONS ──────────────────────────────────────────────────────────────── */
const I = {
  Eye:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Heart:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Scan:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  Brain:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>,
  Upload:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Alert:    () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Check:    () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowR:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Lung:     () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="M6.343 9.657A8 8 0 1 0 17.657 9.657"/><path d="M9 10a3 3 0 1 0 6 0"/></svg>,
  Dna:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-3.333 5.702-3.333 7.5 0"/><path d="M2 9c6.667 6 13.333 0 20 6"/><path d="M9 2c1.798 3.333 5.702 3.333 7.5 0"/><path d="M2 12h20"/></svg>,
  Stethoscope: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  Shield:   () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Play:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>,
};

/* ─── HEARTBEAT SVG ──────────────────────────────────────────────────────── */
const HeartbeatLine = () => (
  <svg viewBox="0 0 260 60" width="260" height="60" style={{ overflow: "visible" }}>
    <path
      className="ecg-line"
      d="M0,30 L30,30 L40,30 L45,10 L50,50 L55,10 L60,30 L70,30 L80,30 L90,30 L95,18 L100,42 L105,18 L110,30 L130,30 L140,30 L150,30 L155,5 L162,55 L167,5 L172,30 L190,30 L210,30 L220,30 L226,20 L232,40 L238,20 L244,30 L260,30"
      fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

/* ─── RISK SCORE WIDGET ──────────────────────────────────────────────────── */
function RiskMeter({ score = 34, label = "Low Risk", color = "var(--teal)" }) {
  const circ = 2 * Math.PI * 36;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="36" fill="none" stroke="var(--bg2)" strokeWidth="8" />
        <circle
          cx="48" cy="48" r="36" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ}
          style={{ strokeDashoffset: offset, transform: "rotate(-90deg)", transformOrigin: "48px 48px", transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)" }}
        />
        <text x="48" y="44" textAnchor="middle" fontFamily="'Lora',serif" fontSize="20" fontWeight="600" fill="var(--ink)">{score}</text>
        <text x="48" y="58" textAnchor="middle" fontFamily="'Sora',sans-serif" fontSize="9" fontWeight="600" fill="var(--sub)" letterSpacing="1">SCORE</text>
      </svg>
      <span style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

/* ─── VITALS STRIP ───────────────────────────────────────────────────────── */
const VITALS = [
  { label: "Heart Rate", val: "72", unit: "bpm", pct: 62, color: "var(--rose)", ok: true },
  { label: "SpO₂", val: "98", unit: "%", pct: 88, color: "var(--sky)", ok: true },
  { label: "Pupil Response", val: "3.2", unit: "mm", pct: 55, color: "var(--teal)", ok: true },
  { label: "Resp. Rate", val: "16", unit: "/min", pct: 48, color: "var(--amber)", ok: true },
];

function VitalsCard() {
  return (
    <div className="card" style={{ padding: "26px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <div className="ring ring-sm ring-sky"><I.Activity /></div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>Live Vitals Monitor</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>Real-time sensor data</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--teal)", fontWeight: 700 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)", display: "inline-block", animation: "pulse-ring 1.8s ease-out infinite" }} />
          LIVE
        </div>
      </div>
      {VITALS.map((v, i) => (
        <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500 }}>{v.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{v.val} <span style={{ fontSize: 11, fontWeight: 500, color: "var(--dim)" }}>{v.unit}</span></span>
          </div>
          <div style={{ height: 5, borderRadius: 99, background: "var(--bg2)", overflow: "hidden" }}>
            <div className="dbar" style={{ "--w": v.pct + "%", background: v.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── SCAN UPLOAD WIDGET ─────────────────────────────────────────────────── */
function ScanUploadWidget() {
  const [state, setState] = useState("idle"); // idle | analyzing | done
  const SCAN_TYPES = ["Chest X-Ray", "MRI Brain", "ECG Report", "Retinal Scan", "CT Scan", "Blood Panel"];
  const [selected, setSelected] = useState("Chest X-Ray");

  const analyze = () => {
    setState("analyzing");
    setTimeout(() => setState("done"), 2200);
  };

  return (
    <div className="card" style={{ padding: "26px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div className="ring ring-sm"><I.Scan /></div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>Scan Analysis</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>Upload any medical scan</p>
        </div>
      </div>

      {/* Scan type picker */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {SCAN_TYPES.map(t => (
          <button key={t} onClick={() => setSelected(t)} style={{
            fontSize: 11, fontWeight: 600, padding: "4px 11px", borderRadius: 99, cursor: "pointer",
            border: `1px solid ${selected === t ? "var(--teal)" : "var(--line-s)"}`,
            background: selected === t ? "var(--teal-l)" : "transparent",
            color: selected === t ? "var(--teal)" : "var(--sub)",
            fontFamily: "'Sora',sans-serif", transition: "all .15s"
          }}>{t}</button>
        ))}
      </div>

      {state === "idle" && (
        <div className="upload-zone" onClick={analyze}>
          <div style={{ color: "var(--teal)", marginBottom: 8, display: "flex", justifyContent: "center" }}><I.Upload /></div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--teal)", marginBottom: 3 }}>Drop your {selected} here</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>JPEG, PNG, PDF, DICOM · click to demo</p>
        </div>
      )}

      {state === "analyzing" && (
        <div style={{ padding: "24px 0", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <HeartbeatLine />
          </div>
          <p style={{ fontSize: 13, color: "var(--teal)", fontWeight: 600 }}>AI analyzing {selected}…</p>
          <p style={{ fontSize: 11, color: "var(--sub)", marginTop: 4 }}>Cross-referencing 4.2M clinical patterns</p>
        </div>
      )}

      {state === "done" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal)", background: "var(--teal-l)", padding: "3px 12px", borderRadius: 99 }}>Analysis Complete</span>
            <button onClick={() => setState("idle")} style={{ fontSize: 11, color: "var(--sub)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>↺ Reset</button>
          </div>
          {[
            { label: "Findings", val: "No critical anomalies detected", ok: true },
            { label: "Confidence", val: "94.7%", ok: true },
            { label: "Pattern match", val: "Normal tissue density", ok: true },
            { label: "Action", val: "Routine follow-up in 6 months", ok: null },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
              <span style={{ fontSize: 12, color: "var(--sub)" }}>{r.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: r.ok === true ? "var(--teal)" : r.ok === false ? "var(--rose)" : "var(--ink)" }}>{r.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PUPIL DILATION WIDGET ──────────────────────────────────────────────── */
function PupilWidget() {
  const [dilation, setDilation] = useState(3.2);
  const status = dilation < 2.5 ? { label: "Miosis — possible opioid/Horner's", color: "var(--rose)" }
    : dilation > 5.5 ? { label: "Mydriasis — check for stimulants/trauma", color: "var(--amber)" }
    : { label: "Normal range", color: "var(--teal)" };

  return (
    <div className="card" style={{ padding: "26px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div className="ring ring-sm"><I.Eye /></div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>Pupil Dilation Monitor</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>Neurological indicator</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginBottom: 22, padding: "16px 0" }}>
        {["Left Eye", "Right Eye"].map((eye, i) => {
          const sz = Math.max(14, Math.min(46, dilation * 9 + (i === 1 ? 1 : 0)));
          return (
            <div key={eye} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #3a3a6e", position: "relative", overflow: "hidden" }}>
                {/* Iris */}
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #6b8fcf, #2a5298, #0d1b3e)", position: "absolute" }} />
                {/* Pupil */}
                <div style={{ width: sz, height: sz, borderRadius: "50%", background: "#000", position: "relative", zIndex: 2, transition: "width .3s, height .3s", boxShadow: "0 0 8px rgba(0,0,0,.8)" }} />
              </div>
              <span style={{ fontSize: 11, color: "var(--sub)", fontWeight: 600 }}>{eye}</span>
              <span style={{ fontFamily: "'Lora',serif", fontSize: 15, color: "var(--ink)" }}>{(dilation + (i === 1 ? 0.1 : 0)).toFixed(1)} mm</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 600 }}>Dilation: {dilation.toFixed(1)} mm</label>
          <span style={{ fontSize: 11, color: "var(--dim)" }}>Normal: 2.5–5.5 mm</span>
        </div>
        <input type="range" min="1" max="8" step="0.1" value={dilation}
          onChange={e => setDilation(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: "var(--teal)" }}
        />
      </div>

      <div style={{ background: status.color === "var(--teal)" ? "var(--teal-l)" : status.color === "var(--rose)" ? "var(--rose-l)" : "var(--amber-l)", borderRadius: "var(--r)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: status.color, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: status.color }}>{status.label}</span>
      </div>
    </div>
  );
}

/* ─── DIAGNOSIS CARD ─────────────────────────────────────────────────────── */
function DiagnosisCard() {
  const conditions = [
    { name: "Hypertensive Heart Disease", prob: 78, risk: "High", riskColor: "var(--rose)" },
    { name: "Sleep Apnea (Moderate)", prob: 61, risk: "Moderate", riskColor: "var(--amber)" },
    { name: "Type 2 Diabetes Risk", prob: 44, risk: "Elevated", riskColor: "var(--amber)" },
    { name: "Retinal Strain", prob: 29, risk: "Low", riskColor: "var(--teal)" },
  ];
  return (
    <div className="card" style={{ padding: "26px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div className="ring ring-sm ring-rose"><I.Brain /></div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>AI Diagnosis Report</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>Confidence-scored conditions</p>
        </div>
      </div>
      {conditions.map((c, i) => (
        <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-3)" }}>{c.name}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.riskColor, background: c.riskColor === "var(--rose)" ? "var(--rose-l)" : c.riskColor === "var(--amber)" ? "var(--amber-l)" : "var(--teal-l)", borderRadius: 99, padding: "2px 9px" }}>{c.risk}</span>
          </div>
          <div style={{ height: 5, borderRadius: 99, background: "var(--bg2)", overflow: "hidden" }}>
            <div className="dbar" style={{ "--w": c.prob + "%", background: c.riskColor }} />
          </div>
          <span style={{ fontSize: 10, color: "var(--dim)", marginTop: 2, display: "block" }}>{c.prob}% confidence</span>
        </div>
      ))}
    </div>
  );
}

/* ─── ACTION PLAN CARD ────────────────────────────────────────────────────── */
function ActionPlanCard() {
  const steps = [
    { icon: <I.Alert />, color: "var(--rose)", text: "Schedule cardiology consult within 2 weeks" },
    { icon: <I.Activity />, color: "var(--sky)", text: "Begin 24-hr Holter monitor for arrhythmia screening" },
    { icon: <I.Stethoscope />, color: "var(--teal)", text: "Reduce sodium intake; target BP < 130/80" },
    { icon: <I.Check />, color: "var(--teal)", text: "Sleep study referral for apnea confirmation" },
  ];
  return (
    <div className="card" style={{ padding: "26px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div className="ring ring-sm ring-amber"><I.Stethoscope /></div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>Best Course of Action</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>Personalised next steps</p>
        </div>
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 3 ? 14 : 0 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: s.color + "18", color: s.color, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${s.color}30` }}>{s.icon}</div>
            {i < 3 && <div style={{ position: "absolute", left: 14, top: 34, width: 2, height: 16, background: "var(--line-s)" }} />}
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.6, paddingTop: 5 }}>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── USE CASES ──────────────────────────────────────────────────────────── */
const USE_CASES = [
  {
    tab: "Personal Health",
    label: "lbl",
    heading: "Know what your body is telling you — before a doctor visit.",
    body: "Upload your latest scan, log your vitals, and HealTech gives you a plain-language breakdown of what's normal, what needs attention, and exactly what to do next. Not a replacement for a doctor — a smarter starting point.",
    checks: [
      "Understand any scan or test result in plain language",
      "Know if your vitals suggest a real concern",
      "Get a prioritised action list before your appointment",
      "Track changes over weeks and months",
    ],
  },
  {
    tab: "Chronic Care",
    label: "lbl-sky",
    heading: "Stay ahead of conditions that don't announce themselves.",
    body: "Diabetes, hypertension, COPD — conditions that silently worsen. HealTech watches long-term trends and flags deviations before they become emergencies, giving patients and care teams an early warning they'd otherwise miss.",
    checks: [
      "Long-term trend tracking for chronic condition markers",
      "Personalised threshold alerts for your condition",
      "Evidence-based guidance on lifestyle adjustments",
      "Shareable reports for your care team",
    ],
  },
  {
    tab: "Post-Surgery",
    label: "lbl-amber",
    heading: "Recovery shouldn't mean uncertainty at home.",
    body: "Discharged but not quite well. HealTech monitors recovery vitals remotely, detects early signs of complications, and keeps your care team informed — closing the dangerous gap between hospital and home.",
    checks: [
      "Continuous remote vital monitoring post-discharge",
      "Automatic complication risk scoring",
      "Direct alert to care team on critical deviation",
      "Progress milestones and recovery timeline",
    ],
  },
];

function UseCases() {
  const [active, setActive] = useState(0);
  const uc = USE_CASES[active];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {USE_CASES.map((u, i) => (
          <button key={i} className={`uc-tab ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>{u.tab}</button>
        ))}
      </div>
      <div className="card" style={{ padding: "32px 32px", transition: "all .3s" }}>
        <span className={`lbl ${uc.label}`} style={{ marginBottom: 16, display: "inline-flex" }}>{uc.tab}</span>
        <h3 style={{ fontFamily: "'Lora',serif", fontSize: "1.35rem", color: "var(--ink)", marginBottom: 12, lineHeight: 1.4, letterSpacing: "-.01em" }}>{uc.heading}</h3>
        <p style={{ fontSize: 14.5, color: "var(--sub)", lineHeight: 1.75, marginBottom: 20 }}>{uc.body}</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {uc.checks.map((c, i) => (
            <li key={i} className="chk-item">
              <span className="chk-dot"><I.Check /></span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
const HealTech = () => (
  <div className="ht" style={{ overflowX: "hidden" }}>
    <style>{STYLES}</style>

    {/* ══ HERO ════════════════════════════════════════════════════════════ */}
    <section className="sec hero-bg" style={{ paddingBottom: 72 }}>
      <div className="inner">
        <div style={{ display: "flex", gap: 72, alignItems: "center", flexWrap: "wrap" }}>

          {/* LEFT */}
          <div style={{ flex: "1 1 430px", minWidth: 0 }}>
            <FadeUp>
              <span className="lbl"><I.Brain /> Clinical AI · Diagnostic Intelligence</span>
            </FadeUp>
            <FadeUp className="d1">
              <h1 style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: "clamp(2.7rem,5.5vw,4.4rem)", lineHeight: 1.08, color: "var(--ink)", margin: "20px 0 24px", letterSpacing: "-.025em" }}>
                Know what's wrong.<br />
                <span style={{ fontStyle: "italic", color: "var(--teal)" }}>Know what to do.</span>
              </h1>
            </FadeUp>
            <FadeUp className="d2">
              <p style={{ fontSize: 17, color: "var(--sub)", lineHeight: 1.78, maxWidth: 460, marginBottom: 36, fontWeight: 400 }}>
                Upload scans. Monitor vitals. Track pupil response and heart rate in real time. HealTech turns raw health data into clear answers — and a precise path forward.
              </p>
            </FadeUp>
            <FadeUp className="d3">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                <Link to="/contact">
                  <button className="btn-p"><I.Play />Request a Demo</button>
                </Link>
                <button className="btn-s">View Capabilities <I.ArrowR /></button>
              </div>
            </FadeUp>
            <FadeUp className="d4">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[
                  { val: "12+", label: "Diagnostic inputs" },
                  { val: "94%", label: "Accuracy rate" },
                  { val: "< 30s", label: "Scan analysis" },
                ].map((s, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "'Lora',serif", fontSize: "1.85rem", color: "var(--ink)", letterSpacing: "-.02em", lineHeight: 1 }}>{s.val}</p>
                    <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 3, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — stacked mini-dashboard */}
          <div style={{ flex: "1 1 340px", minWidth: 0, position: "relative" }}>
            {/* Decorative ring */}
            <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", border: "1px solid var(--teal-l)", opacity: .8, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

            <FadeUp className="d1">
              <img src="/assets/heal1.webp" alt="HealTech Dashboard" loading="eager" className="float"
                style={{ width: "100%", maxWidth: 340, display: "block", margin: "0 auto", position: "relative", zIndex: 2, filter: "drop-shadow(0 28px 52px rgba(11,124,110,.13))" }}
              />
            </FadeUp>

            {/* Floating badge — heartbeat */}
            <div style={{ position: "absolute", left: -16, top: "22%", zIndex: 10, background: "var(--white)", border: "1px solid var(--line-s)", borderRadius: 14, padding: "10px 16px", boxShadow: "0 8px 28px rgba(0,0,0,.07)" }}>
              <p style={{ fontSize: 10, color: "var(--sub)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>Heart Rate</p>
              <HeartbeatLine />
              <p style={{ fontFamily: "'Lora',serif", fontSize: 20, color: "var(--ink)", marginTop: 4 }}>72 <span style={{ fontSize: 11, fontWeight: 500, color: "var(--sub)", fontFamily: "'Sora',sans-serif" }}>bpm</span></p>
            </div>

            {/* Floating badge — risk score */}
            <div style={{ position: "absolute", right: -10, bottom: "16%", zIndex: 10, background: "var(--ink)", borderRadius: 14, padding: "14px 18px" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,.45)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Risk Score</p>
              <RiskMeter score={34} label="Low Risk" color="#0b7c6e" />
            </div>

            {/* Floating badge — SpO2 */}
            <div style={{ position: "absolute", right: -4, top: "15%", zIndex: 10, background: "var(--sky-l)", border: "1px solid var(--sky-m)", borderRadius: 12, padding: "10px 14px" }}>
              <p style={{ fontSize: 10, color: "var(--sky)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 2 }}>SpO₂</p>
              <p style={{ fontFamily: "'Lora',serif", fontSize: 22, color: "var(--sky)" }}>98<span style={{ fontSize: 13 }}>%</span></p>
              <p style={{ fontSize: 10, color: "var(--sky)", fontWeight: 600, marginTop: 2 }}>Normal</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ PROBLEM STATEMENT ═════════════════════════════════════════════ */}
    <div style={{ background: "var(--teal)", padding: "20px 24px" }}>
      <div className="inner" style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "space-between" }}>
        {[
          { stat: "72%", text: "of serious conditions are missed at first check-up due to lack of continuous data" },
          { stat: "3.2 days", text: "average delay between symptom onset and accurate diagnosis" },
          { stat: "1 in 3", text: "people don't act on symptoms because they can't assess severity themselves" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", flex: "1 1 220px" }}>
            <p style={{ fontFamily: "'Lora',serif", fontSize: "2rem", color: "#fff", letterSpacing: "-.02em", lineHeight: 1, flexShrink: 0 }}>{s.stat}</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.65, paddingTop: 4 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ══ FEATURE BENTO ════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <FadeUp style={{ marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span className="lbl">Capabilities</span>
              <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(2rem,3.8vw,3rem)", color: "var(--ink)", margin: "14px 0 0", letterSpacing: "-.02em", lineHeight: 1.12 }}>
                Every diagnostic signal,<br /><span style={{ fontStyle: "italic" }}>in one place.</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "var(--sub)", maxWidth: 360, lineHeight: 1.75 }}>
              From a retinal scan to a resting heart rate — HealTech connects the dots your doctor doesn't have time to.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: vitals + scan upload */}
        <div className="fg fg2" style={{ marginBottom: 14 }}>
          <FadeUp className="d1"><VitalsCard /></FadeUp>
          <FadeUp className="d2"><ScanUploadWidget /></FadeUp>
        </div>

        {/* Row 2: pupil + diagnosis */}
        <div className="fg fg2" style={{ marginBottom: 14 }}>
          <FadeUp className="d1"><PupilWidget /></FadeUp>
          <FadeUp className="d2"><DiagnosisCard /></FadeUp>
        </div>

        {/* Row 3: action plan full-width */}
        <FadeUp className="d1">
          <div className="fg fg2">
            <ActionPlanCard />
            {/* What HealTech does summary */}
            <div className="card" style={{ padding: "26px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div className="ring ring-sm ring-sky"><I.Dna /></div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>HealTech Intelligence Stack</p>
                  <p style={{ fontSize: 11, color: "var(--sub)" }}>How the analysis works</p>
                </div>
              </div>
              {[
                { icon: <I.Scan />, label: "Ingests", desc: "Scans, vitals, sensor streams, uploaded reports" },
                { icon: <I.Brain />, label: "Analyses", desc: "AI cross-references 4.2M+ clinical patterns" },
                { icon: <I.Alert />, label: "Flags", desc: "Confidence-scored risk conditions per individual" },
                { icon: <I.Stethoscope />, label: "Guides", desc: "Plain-language action plan and specialist routing" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 3 ? 14 : 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--teal-l)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>{s.label}</p>
                    <p style={{ fontSize: 12, color: "var(--sub)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Row 4: 3 pillars */}
        <div className="fg fg3" style={{ marginTop: 14 }}>
          {[
            { icon: <I.Activity />, title: "Real-Time Monitoring", body: "Heart rate, SpO₂, pupil response, respiratory rate — all tracked continuously and flagged against clinical thresholds.", tag: "lbl" },
            { icon: <I.Scan />, title: "Scan & Report Analysis", body: "X-rays, MRIs, CT scans, retinal images, ECG reports, blood panels — uploaded and returned with AI interpretation in under 30 seconds.", tag: "lbl-sky" },
            { icon: <I.Shield />, title: "Privacy & Clinical Grade", body: "Your data is never sold or profiled. Analysis runs on encrypted, HIPAA-aligned infrastructure. You own your health data.", tag: "lbl-amber" },
          ].map((f, i) => (
            <FadeUp key={i} className={`d${i + 1}`}>
              <div className="card card-h" style={{ padding: "24px 26px", height: "100%" }}>
                <div className="ring ring-sm" style={{ marginBottom: 14 }}>{f.icon}</div>
                <span className={`lbl ${f.tag}`} style={{ marginBottom: 10, display: "inline-flex" }}>{f.title}</span>
                <p style={{ fontSize: 13.5, color: "var(--sub)", lineHeight: 1.7 }}>{f.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    <div className="div" />

    {/* ══ USE CASES ════════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--white)" }}>
      <div className="inner">
        <div style={{ display: "flex", gap: 72, flexWrap: "wrap", alignItems: "flex-start" }}>
          <FadeUp style={{ flex: "1 1 360px", minWidth: 0 }}>
            <span className="lbl">Who it's for</span>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "var(--ink)", margin: "16px 0 14px", lineHeight: 1.1, letterSpacing: "-.02em" }}>
              Healthcare intelligence<br />
              <span style={{ fontStyle: "italic" }}>for real people.</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--sub)", lineHeight: 1.78, maxWidth: 420, marginBottom: 32 }}>
              Whether you're managing a diagnosis, recovering from surgery, or just worried about something — HealTech gives you clarity, not more confusion.
            </p>
            <img src="/assets/heal2.webp" alt="HealTech in use" loading="lazy"
              style={{ width: "100%", maxWidth: 400, borderRadius: "var(--r-xl)", filter: "drop-shadow(0 16px 40px rgba(0,0,0,.09))" }}
            />
          </FadeUp>

          <FadeUp className="d2" style={{ flex: "1 1 360px", minWidth: 0 }}>
            <UseCases />
          </FadeUp>
        </div>
      </div>
    </section>

    <div className="div" />

    {/* ══ WHAT HEALTECH DOES ════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="lbl">The gap we close</span>
          <h2 style={{ fontFamily: "'Lora',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", color: "var(--ink)", margin: "14px 0 12px", letterSpacing: "-.02em", lineHeight: 1.1 }}>
            From raw data to <span style={{ fontStyle: "italic", color: "var(--teal)" }}>clinical clarity.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--sub)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            Most people have data but no interpretation. HealTech bridges the gap between sensor readings and actionable health understanding.
          </p>
        </FadeUp>

        <div className="fg fg3">
          {[
            {
              before: "Raw wearable data streams in — numbers with no context.",
              after: "AI applies clinical logic: trend detection, anomaly scoring, threshold analysis.",
              icon: <I.Activity />, accent: "var(--sky)",
            },
            {
              before: "Scan results arrive — often unread or misunderstood for weeks.",
              after: "Upload in seconds. AI returns plain-language findings with confidence scores.",
              icon: <I.Scan />, accent: "var(--teal)",
            },
            {
              before: "Symptoms are felt but severity is unknown — people wait or worry.",
              after: "HealTech scores real risk and routes to the right action immediately.",
              icon: <I.Brain />, accent: "var(--rose)",
            },
          ].map((item, i) => (
            <FadeUp key={i} className={`d${i + 1}`}>
              <div className="card card-h" style={{ padding: "28px 26px", height: "100%" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: item.accent + "18", color: item.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--dim)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>Before</div>
                <p style={{ fontSize: 14, color: "var(--sub)", lineHeight: 1.65, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>{item.before}</p>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.accent, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>With HealTech</div>
                <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.65 }}>{item.after}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Large dashboard screenshot */}
        <FadeUp className="d1" style={{ marginTop: 28 }}>
          <div className="card" style={{ overflow: "hidden", borderRadius: "var(--r-xl)" }}>
            <img src="/assets/heal9.webp" alt="HealTech Dashboard" loading="lazy" style={{ width: "100%", display: "block" }} />
          </div>
        </FadeUp>
      </div>
    </section>

    {/* ══ DARK CTA ═════════════════════════════════════════════════════ */}
    <section className="dark-band" style={{ padding: "104px 24px" }}>
      <div className="inner" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <span className="lbl" style={{ background: "rgba(11,124,110,.2)", borderColor: "rgba(178,224,218,.25)", color: "#7fd9d0" }}>
            <I.Brain />Clinical AI · Available Now
          </span>
          <h2 style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: "clamp(2.4rem,5vw,3.8rem)", color: "#fff", margin: "22px 0 18px", lineHeight: 1.1, letterSpacing: "-.025em" }}>
            Stop guessing about<br />
            <span style={{ fontStyle: "italic", color: "#7fd9d0" }}>your own health.</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.52)", maxWidth: 460, margin: "0 auto 40px", lineHeight: 1.78 }}>
            Upload a scan. Track your vitals. Ask HealTech what it means. Get a clear answer and a clear path — in under a minute.
          </p>
          <Link to="/contact">
            <button className="btn-p" style={{ background: "var(--teal)", padding: "16px 40px", fontSize: 16, boxShadow: "0 8px 40px rgba(11,124,110,.35)" }}>
              <I.Play />Talk to Us
            </button>
          </Link>
        </FadeUp>
      </div>
    </section>

    <CTASection />
  </div>
);

export default HealTech;
