import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import SEO from "../components/SEO";
import CTASection from "../components/CTASection";
import truVisitLogo from "../../public/assets/TruVisitLogo.png"

/* ─── STYLES — pulled from TruVisit's own app.css tokens ─────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .tv {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #111827;
    -webkit-font-smoothing: antialiased;
  }

  .tv-sec { padding: 88px 24px; }
  .tv-inner { max-width: 1120px; margin: 0 auto; }
  @media(max-width:768px){ .tv-sec { padding: 56px 20px; } }

  .tv-fu { opacity: 0; transform: translateY(20px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
  .tv-fuv { opacity: 1; transform: translateY(0); }
  .tv-d1{transition-delay:.08s} .tv-d2{transition-delay:.16s} .tv-d3{transition-delay:.24s}

  .tv-label {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    color: #2563eb; background: #eff6ff; border: 1px solid #dbeafe;
    border-radius: 999px; padding: 4px 14px;
  }
  .tv-label-green { color: #16a34a; background: #f0fdf4; border-color: #bbf7d0; }
  .tv-label-amber { color: #d97706; background: #fffbeb; border-color: #fde68a; }

  .tv-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06); }
  .tv-card-hover { transition: box-shadow .2s, transform .2s, border-color .2s; }
  .tv-card-hover:hover { box-shadow: 0 10px 30px -6px rgb(37 99 235 / 0.15); transform: translateY(-2px); border-color: #c3d5fd; }

  .tv-ring { width: 44px; height: 44px; border-radius: 12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:#eff6ff; color:#2563eb; border:1px solid #dbeafe; }
  .tv-ring-green { background:#f0fdf4; color:#16a34a; border-color:#bbf7d0; }
  .tv-ring-amber { background:#fffbeb; color:#d97706; border-color:#fde68a; }
  .tv-ring-sm { width:36px; height:36px; border-radius:10px; }

  .tv-btn-p {
    display:inline-flex; align-items:center; gap:8px;
    background:#2563eb; color:#fff; border:none; border-radius:12px;
    padding:14px 28px; font-size:15px; font-weight:700; cursor:pointer;
    font-family:'Inter',sans-serif; box-shadow: 0 4px 12px rgb(37 99 235 / 0.25);
    transition: background .15s, box-shadow .15s, transform .1s;
  }
  .tv-btn-p:hover { background:#1d4ed8; box-shadow: 0 6px 18px rgb(37 99 235 / 0.35); }

  .tv-btn-s {
    display:inline-flex; align-items:center; gap:8px;
    background:#f3f4f6; color:#374151; border:none; border-radius:12px;
    padding:13px 24px; font-size:14px; font-weight:600; cursor:pointer;
    font-family:'Inter',sans-serif; transition: background .15s;
  }
  .tv-btn-s:hover { background:#e5e7eb; }

  .tv-div { height:1px; background:#e5e7eb; }

  .tv-hero-bg {
    background: radial-gradient(ellipse 60% 55% at 75% 0%, #eff6ff 0%, transparent 60%),
                radial-gradient(ellipse 30% 30% at 5% 85%, #f0fdf4 0%, transparent 55%), #fff;
  }

  @keyframes tvFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .tv-float { animation: tvFloat 5.5s ease-in-out infinite; }

  @keyframes tvPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .tv-pulse { animation: tvPulse 1.6s ease-in-out infinite; }

  .tv-feat-grid { display:grid; gap:14px; }
  .tv-fg-3 { grid-template-columns:1fr 1fr 1fr; }
  .tv-fg-2 { grid-template-columns:1fr 1fr; }
  .tv-span2 { grid-column:span 2; }
  @media(max-width:780px){ .tv-fg-3, .tv-fg-2 { grid-template-columns:1fr; } .tv-span2 { grid-column:span 1; } }

  .tv-big-num { font-size:2rem; font-weight:800; color:#111827; letter-spacing:-.02em; line-height:1.1; }

  .tv-dark-sec { background:#111827; position:relative; overflow:hidden; }
  .tv-dark-sec::before { content:''; position:absolute; width:640px; height:640px; background:radial-gradient(circle, rgba(37,99,235,.16) 0%, transparent 68%); top:-220px; right:-140px; pointer-events:none; }
  .tv-dark-sec::after { content:''; position:absolute; width:380px; height:380px; background:radial-gradient(circle, rgba(22,163,74,.12) 0%, transparent 65%); bottom:-100px; left:60px; pointer-events:none; }

  .tv-row { display:flex; align-items:center; gap:12px; padding:11px 0; border-bottom:1px solid #f3f4f6; }
  .tv-row:last-child { border-bottom:none; }

  .tv-badge { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:999px; font-size:11.5px; font-weight:700; }
  .tv-badge-green { background:#f0fdf4; color:#16a34a; }
  .tv-badge-blue { background:#eff6ff; color:#2563eb; }
  .tv-badge-amber { background:#fffbeb; color:#d97706; }
`;

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("tv-fuv"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function FadeUp({ children, className = "", style }) {
  const ref = useFadeUp();
  return <div ref={ref} className={`tv-fu ${className}`} style={style}>{children}</div>;
}

const I = {
  MapPin: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
  ScanFace: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>),
  Wifi: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.05a6 6 0 0 1 7 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>),
  Users: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  BarChart: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>),
  FileText: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>),
  ShieldCheck: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>),
  Bell: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>),
  UploadCloud: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16l-4-4-4 4M12 12v9" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>),
  Play: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z" /></svg>),
  Check: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
};

const CheckItem = ({ children }) => (
  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, color: "#374151", lineHeight: 1.5 }}>
    <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#eff6ff", color: "#2563eb", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
      <I.Check />
    </span>
    {children}
  </li>
);

const TruVisit = () => {
  const softwareSchema = {
    "@type": "SoftwareApplication",
    "@id": "https://iotrenetics.com/truvisit/#software",
    "name": "TruVisit",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Android",
    "description": "TruVisit by IoTrenetics is a field workforce visit-tracking app with GPS verification, face-match check-ins, and manager dashboards.",
    "provider": { "@id": "https://iotrenetics.com/#organization" }
  };

  return (
    <div className="tv" style={{ overflowX: "hidden" }}>
      <SEO
        title="TruVisit — Field Visit Tracking | IoTrenetics"
        description="TruVisit by IoTrenetics verifies field visits with GPS and face-match check-ins, works offline, and gives managers a live dashboard."
        url="/truvisit"
        schema={softwareSchema}
      />
      <style>{STYLES}</style>

      {/* ══ HERO ══ */}
      <section className="tv-sec tv-hero-bg" style={{ paddingBottom: 56 }}>
        <div className="tv-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <FadeUp><span className="tv-label"><I.MapPin /> Field workforce tracking</span></FadeUp>
              <FadeUp className="tv-d1">
                <h1 style={{ fontWeight: 800, fontSize: "clamp(2.4rem,5vw,3.8rem)", lineHeight: 1.1, color: "#111827", margin: "18px 0 20px", letterSpacing: "-.02em" }}>
                  Know every visit
                  <br />
                  <span style={{ color: "#2563eb" }}>really happened.</span>
                </h1>
              </FadeUp>
              <FadeUp className="tv-d2">
                <p style={{ fontSize: 16.5, color: "#6b7280", lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
                  GPS-verified check-ins, face-match selfies, and offline-first sync — so your field team's visit reports hold up, even without signal.
                </p>
              </FadeUp>
              <FadeUp className="tv-d3">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                  <a href="https://play.google.com/store/apps/details?id=com.iotrenetics.truvisit" target="_blank" rel="noopener noreferrer">
                    <button className="tv-btn-p"><I.Play />Get on Play Store</button>
                  </a>
                  <Link to="/privacy-policy-truvisit"><button className="tv-btn-s">Privacy Policy</button></Link>
                </div>
              </FadeUp>
              <FadeUp className="tv-d3">
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {[{ v: "GPS", l: "Verified check-ins" }, { v: "Offline", l: "Works without signal" }, { v: "0", l: "Ads. Ever." }].map((s, i) => (
                    <div key={i}>
                      <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111827", letterSpacing: "-.02em" }}>{s.v}</p>
                      <p style={{ fontSize: 11.5, color: "#6b7280", marginTop: 3, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase" }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            <div style={{ flex: "1 1 320px", minWidth: 0, position: "relative", display: "flex", justifyContent: "center" }}>
              {[440, 320].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `1px solid ${i === 0 ? "#eff6ff" : "#dbeafe"}`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
              ))}
              <img src={truVisitLogo} alt="TruVisit App" loading="eager" className="tv-float rounded-full"
                style={{ width: "100%", maxWidth: 300, position: "relative", zIndex: 2, filter: "drop-shadow(0 28px 48px rgba(37,99,235,.16))" }} />

              <div style={{ position: "absolute", left: -4, top: "18%", zIndex: 10, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
                  <span className="tv-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a" }} />
                  GPS Verified
                </div>
              </div>

              <div style={{ position: "absolute", right: -6, top: "38%", zIndex: 10, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,.07)" }}>
                <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, marginBottom: 2, textTransform: "uppercase" }}>Face Match</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>96% score</p>
              </div>

              <div style={{ position: "absolute", right: -4, bottom: "12%", zIndex: 10, background: "#111827", borderRadius: 12, padding: "12px 18px", minWidth: 150 }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)", fontWeight: 700, marginBottom: 2 }}>TODAY'S VISITS</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>12 / 14</p>
                <p style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>2 in progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="tv-sec" style={{ background: "#f9fafb" }}>
        <div className="tv-inner">
          <FadeUp style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <span className="tv-label">Features</span>
                <h2 style={{ fontSize: "clamp(1.9rem,3.6vw,2.7rem)", fontWeight: 800, color: "#111827", margin: "14px 0 0", letterSpacing: "-.02em" }}>
                  Built for field teams.<br />Trusted by managers.
                </h2>
              </div>
              <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 340, lineHeight: 1.7 }}>
                From check-in to report — every visit is verified, timestamped, and synced automatically.
              </p>
            </div>
          </FadeUp>

          <div className="tv-feat-grid tv-fg-3" style={{ marginBottom: 14 }}>
            {[
              { icon: <I.MapPin />, tag: "Precise", title: "GPS Visit Verification", body: "Multi-sample GPS averaging confirms a worker was actually on-site — down to the metre — at check-in and check-out." },
              { icon: <I.ScanFace />, tag: "On-device", title: "Face-Match Check-In", body: "Arrival selfies are compared on-device against a reference photo, flagging mismatches before they reach the report." },
              { icon: <I.Wifi />, tag: "Offline-first", title: "Works Without Signal", body: "Visits queue locally in low-connectivity areas and sync automatically the moment the network returns." },
            ].map((f, i) => (
              <FadeUp key={i} className={`tv-d${i + 1}`}>
                <div className="tv-card tv-card-hover" style={{ padding: 26, height: "100%" }}>
                  <div className="tv-ring" style={{ marginBottom: 16 }}>{f.icon}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#2563eb", background: "#eff6ff", borderRadius: 999, padding: "3px 10px" }}>{f.tag}</span>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827", margin: "10px 0 8px" }}>{f.title}</h3>
                  <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.7 }}>{f.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="tv-feat-grid tv-fg-2">
            <FadeUp className="tv-d1">
              <div className="tv-card" style={{ padding: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div className="tv-ring tv-ring-green"><I.BarChart /></div>
                  <div><p style={{ fontWeight: 700, fontSize: 15 }}>Manager Dashboard</p><p style={{ fontSize: 12, color: "#6b7280" }}>Live team overview</p></div>
                </div>
                {[
                  { l: "Rahul — 4 visits today", v: "3 completed", c: "green" },
                  { l: "Priya — 5 visits today", v: "1 flagged", c: "amber" },
                  { l: "Amit — 3 visits today", v: "on schedule", c: "blue" },
                ].map((r, i) => (
                  <div className="tv-row" key={i}>
                    <span style={{ fontSize: 13, color: "#111827", fontWeight: 500, flex: 1 }}>{r.l}</span>
                    <span className={`tv-badge tv-badge-${r.c}`}>{r.v}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp className="tv-d2">
              <div className="tv-card" style={{ padding: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <div className="tv-ring tv-ring-amber"><I.FileText /></div>
                  <div><p style={{ fontWeight: 700, fontSize: 15 }}>Premium PDF Reports</p><p style={{ fontSize: 12, color: "#6b7280" }}>Auto-generated per visit</p></div>
                </div>
                <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.7 }}>
                  Every completed visit generates a report number, GPS trail, photo sequence, and audit log — ready to export or share.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="tv-feat-grid tv-fg-3" style={{ marginTop: 14 }}>
            {[
              { icon: <I.UploadCloud />, title: "Bulk Import", body: "Managers can bulk-import customer lists and assignments in seconds." },
              { icon: <I.ShieldCheck />, title: "Audit Log", body: "Every action is timestamped and logged for accountability." },
              { icon: <I.Bell />, title: "Push Alerts", body: "Workers and managers get real-time updates on visit status changes." },
            ].map((f, i) => (
              <FadeUp key={i} className={`tv-d${i + 1}`}>
                <div className="tv-card tv-card-hover" style={{ padding: "20px 22px", height: "100%" }}>
                  <div className="tv-ring tv-ring-sm" style={{ marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}>{f.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="tv-div" />

      {/* ══ HOW IT WORKS ══ */}
      <section className="tv-sec" style={{ background: "#fff" }}>
        <div className="tv-inner">
          <div style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
            <FadeUp style={{ flex: "1 1 360px", minWidth: 0 }}>
              <span className="tv-label"><I.MapPin /> How it works</span>
              <h2 style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)", fontWeight: 800, color: "#111827", margin: "16px 0 14px", lineHeight: 1.15 }}>
                From check-in to<br />verified report.
              </h2>
              <p style={{ fontSize: 15.5, color: "#6b7280", lineHeight: 1.75, maxWidth: 420, marginBottom: 30 }}>
                No paperwork, no guesswork. Every step is captured automatically as the worker moves through the visit.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 13 }}>
                {[
                  "Worker checks in — GPS and face-match run automatically",
                  "Photos and notes are captured on-site, even offline",
                  "Visit syncs the moment connectivity returns",
                  "Manager reviews flagged visits and approves reports",
                ].map((t, i) => <CheckItem key={i}>{t}</CheckItem>)}
              </ul>
            </FadeUp>

            <FadeUp className="tv-d2" style={{ flex: "1 1 320px", minWidth: 0 }}>
              {[
                { n: "01", title: "Check in", body: "GPS + face-match confirm the worker is on-site.", c: "#2563eb" },
                { n: "02", title: "Complete the visit", body: "Photos, notes, and signatures captured on-device.", c: "#d97706" },
                { n: "03", title: "Auto-sync & report", body: "Data syncs when online; a PDF report is generated.", c: "#16a34a" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: i < 2 ? 18 : 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.c + "18", color: s.c, border: `1px solid ${s.c}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                  <div className="tv-card" style={{ flex: 1, padding: "13px 16px" }}>
                    <p style={{ fontWeight: 700, fontSize: 14.5, color: "#111827", marginBottom: 3 }}>{s.title}</p>
                    <p style={{ fontSize: 13, color: "#6b7280" }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ SCREENSHOTS ══ */}
      {/* <section className="tv-sec" style={{ background: "#f9fafb" }}>
        <div className="tv-inner">
          <FadeUp style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="tv-label">App Preview</span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.2vw,2.4rem)", fontWeight: 800, color: "#111827", margin: "14px 0 0" }}>Clean. Fast. Verified.</h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {["/assets/truvisit2.webp", "/assets/truvisit3.webp"].map((src, i) => (
              <FadeUp key={i} className={`tv-d${i + 1}`}>
                <div className="tv-card" style={{ overflow: "hidden", borderRadius: 20 }}>
                  <img src={src} alt={`TruVisit screenshot ${i + 1}`} loading="lazy" style={{ width: "100%", display: "block" }} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══ DARK CTA ══ */}
      <section className="tv-dark-sec" style={{ padding: "96px 24px" }}>
        <div className="tv-inner" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <span className="tv-label" style={{ background: "rgba(37,99,235,.2)", borderColor: "rgba(99,147,253,.25)", color: "#93b4fd" }}>
              <I.Play />Available on Android
            </span>
            <h2 style={{ fontWeight: 800, fontSize: "clamp(2.1rem,4.6vw,3.4rem)", color: "#fff", margin: "20px 0 16px", lineHeight: 1.1 }}>
              Stop guessing<br /><span style={{ color: "#93b4fd" }}>if the visit happened.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.55)", maxWidth: 420, margin: "0 auto 36px", lineHeight: 1.75 }}>
              GPS verification, face-match check-ins, offline sync, and manager dashboards — all in one app.
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.iotrenetics.truvisit" target="_blank" rel="noopener noreferrer">
              <button className="tv-btn-p" style={{ background: "#fff", color: "#111827", padding: "15px 34px", fontSize: 15.5 }}><I.Play />Download on Play Store</button>
            </a>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 26 }}>
              <Link to="/privacy-policy-truvisit"><span style={{ fontSize: 13, color: "rgba(255,255,255,.4)", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>Privacy Policy</span></Link>
              <Link to="/delete-account-policy-truvisit"><span style={{ fontSize: 13, color: "rgba(255,255,255,.4)", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>Delete Account Policy</span></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default TruVisit;