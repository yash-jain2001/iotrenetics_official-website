import CTASection from "../components/CTASection";
import { useEffect, useRef, useState } from "react";

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700;800;900&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');

  :root {
    --bg:       #08080f;
    --bg2:      #0e0e1a;
    --bg3:      #141420;
    --surface:  #1a1a2a;
    --border:   rgba(255,255,255,0.07);
    --border-h: rgba(255,255,255,0.14);
    --white:    #ffffff;
    --off:      #f0f0f8;
    --sub:      rgba(255,255,255,0.55);
    --dim:      rgba(255,255,255,0.3);
    --violet:   #7c3aed;
    --violet-d: #5b21b6;
    --violet-l: rgba(124,58,237,0.12);
    --violet-m: rgba(124,58,237,0.25);
    --indigo:   #4f46e5;
    --cyan:     #06b6d4;
    --cyan-l:   rgba(6,182,212,0.1);
    --amber:    #f59e0b;
    --amber-l:  rgba(245,158,11,0.1);
    --green:    #10b981;
    --green-l:  rgba(16,185,129,0.1);
    --red:      #ef4444;
    --red-l:    rgba(239,68,68,0.1);
    --r:        10px;
    --r-lg:     16px;
    --r-xl:     22px;
  }

  * { box-sizing:border-box; margin:0; padding:0; }

  .ag { font-family:'Bricolage Grotesque',sans-serif; color:var(--white); background:var(--bg); -webkit-font-smoothing:antialiased; }
  .cab { font-family:'Cabinet Grotesk',sans-serif; }
  .mono { font-family:'SF Mono','Fira Code',monospace; }

  /* ── fade ── */
  .fu { opacity:0; transform:translateY(20px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .fuv { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.08s} .d2{transition-delay:.17s} .d3{transition-delay:.26s} .d4{transition-delay:.36s}

  /* ── layout ── */
  .sec { padding:100px 24px; }
  .inner { max-width:1120px; margin:0 auto; }
  @media(max-width:768px){ .sec { padding:64px 20px; } }

  /* ── label ── */
  .lbl {
    display:inline-flex; align-items:center; gap:6px;
    font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
    color:var(--violet); background:var(--violet-l); border:1px solid var(--violet-m);
    border-radius:99px; padding:4px 14px;
  }
  .lbl-cyan  { color:var(--cyan);  background:var(--cyan-l);  border-color:rgba(6,182,212,.3); }
  .lbl-amber { color:var(--amber); background:var(--amber-l); border-color:rgba(245,158,11,.3); }
  .lbl-green { color:var(--green); background:var(--green-l); border-color:rgba(16,185,129,.3); }

  /* ── cards ── */
  .card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:var(--r-lg);
  }
  .card-h { transition:border-color .25s, box-shadow .25s, transform .25s; }
  .card-h:hover {
    border-color:var(--border-h);
    box-shadow:0 0 0 1px var(--violet-m), 0 20px 60px rgba(124,58,237,.12);
    transform:translateY(-3px);
  }

  /* ── icon ring ── */
  .ring {
    width:42px; height:42px; border-radius:11px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    background:var(--violet-l); color:var(--violet); border:1px solid var(--violet-m);
  }
  .ring-cyan  { background:var(--cyan-l);  color:var(--cyan);  border-color:rgba(6,182,212,.3); }
  .ring-amber { background:var(--amber-l); color:var(--amber); border-color:rgba(245,158,11,.3); }
  .ring-green { background:var(--green-l); color:var(--green); border-color:rgba(16,185,129,.3); }
  .ring-sm { width:34px; height:34px; border-radius:9px; }

  /* ── buttons ── */
  .btn-p {
    display:inline-flex; align-items:center; gap:8px;
    background:var(--violet); color:#fff;
    border:none; border-radius:99px; padding:14px 30px;
    font-size:15px; font-weight:700; cursor:pointer;
    font-family:'Bricolage Grotesque',sans-serif; letter-spacing:-.01em;
    transition:background .2s, transform .18s, box-shadow .2s;
  }
  .btn-p:hover { background:var(--violet-d); box-shadow:0 0 32px rgba(124,58,237,.4); transform:scale(1.022); }

  .btn-s {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:var(--sub);
    border:1px solid var(--border-h); border-radius:99px; padding:13px 26px;
    font-size:14px; font-weight:500; cursor:pointer;
    font-family:'Bricolage Grotesque',sans-serif;
    transition:border-color .2s, color .2s;
  }
  .btn-s:hover { border-color:var(--violet); color:var(--white); }

  /* ── divider ── */
  .div { height:1px; background:var(--border); }

  /* ── hero bg ── */
  .hero-bg {
    background:
      radial-gradient(ellipse 55% 50% at 60% -10%, rgba(124,58,237,.2) 0%, transparent 60%),
      radial-gradient(ellipse 35% 30% at 95% 90%, rgba(79,70,229,.12) 0%, transparent 55%),
      radial-gradient(ellipse 25% 25% at 5% 80%, rgba(6,182,212,.07) 0%, transparent 55%),
      var(--bg);
  }

  /* ── float ── */
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .float { animation:floatY 6s ease-in-out infinite; }

  /* ── grid ── */
  .fg { display:grid; gap:12px; }
  .fg2 { grid-template-columns:1fr 1fr; }
  .fg3 { grid-template-columns:1fr 1fr 1fr; }
  .span2 { grid-column:span 2; }
  @media(max-width:780px){
    .fg2,.fg3 { grid-template-columns:1fr; }
    .span2 { grid-column:span 1; }
  }

  /* ── inbox live feed ── */
  @keyframes slideIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
  .inbox-row { animation:slideIn .4s ease forwards; }

  /* ── typing cursor ── */
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .cursor { display:inline-block; width:2px; height:1em; background:var(--violet); margin-left:2px; animation:blink 1s step-end infinite; vertical-align:text-bottom; }

  /* ── stat bar ── */
  @keyframes growW { from{width:0} to{width:var(--w)} }
  .sbar { height:5px; border-radius:3px; animation:growW 1.1s cubic-bezier(.16,1,.3,1) forwards; }

  /* ── glow lines background ── */
  .glow-grid {
    position:relative;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size:48px 48px;
  }
  .glow-grid::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,.06) 0%, transparent 70%);
    pointer-events:none;
  }

  /* ── ticker ── */
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .tick-inner { display:flex; animation:ticker 30s linear infinite; width:max-content; }
  .tick-wrap { overflow:hidden; }

  /* ── mode toggle ── */
  .mode-btn {
    flex:1; padding:11px 0; text-align:center; font-size:13px; font-weight:700;
    border-radius:99px; cursor:pointer; border:none;
    font-family:'Bricolage Grotesque',sans-serif;
    transition:all .2s;
  }
  .mode-btn.fast { background:var(--amber-l); color:var(--amber); }
  .mode-btn.safe { background:var(--green-l); color:var(--green); }
  .mode-btn.off  { background:transparent; color:var(--dim); }

  /* ── check ── */
  .chk-item { display:flex; align-items:flex-start; gap:10px; font-size:14.5px; color:var(--sub); line-height:1.6; }
  .chk-dot { width:18px; height:18px; border-radius:50%; background:var(--violet-l); color:var(--violet); display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:3px; border:1px solid var(--violet-m); }

  /* ── code badge ── */
  .code-badge {
    font-family:'SF Mono','Fira Code',monospace; font-size:11px;
    background:rgba(255,255,255,.05); border:1px solid var(--border-h);
    border-radius:6px; padding:2px 8px; color:var(--dim);
  }

  /* ── pipeline step ── */
  .pipe-connector { width:2px; height:28px; background:linear-gradient(to bottom, var(--violet-m), transparent); margin:0 auto; }
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
  Mail: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Zap: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Brain: () => (
    <svg
      width="17"
      height="17"
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
  Reply: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  ),
  Bell: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Shield: () => (
    <svg
      width="17"
      height="17"
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
  Check: () => (
    <svg
      width="10"
      height="10"
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
  ArrowR: () => (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Play: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
  Inbox: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  Filter: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Star: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  Tag: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
};

/* ─── LIVE INBOX WIDGET ──────────────────────────────────────────────────── */
const EMAILS = [
  {
    from: "Priya Sharma",
    subj: "Q3 Report — Action Required",
    tag: "Important",
    tagC: "var(--amber)",
    time: "2m ago",
    avatar: "PS",
  },
  {
    from: "Noreply@offers.com",
    subj: "50% OFF — Today Only!",
    tag: "Spam",
    tagC: "var(--red)",
    time: "5m ago",
    avatar: "NO",
  },
  {
    from: "Rohan Mehta",
    subj: "Re: Project timeline update",
    tag: "Important",
    tagC: "var(--violet)",
    time: "11m ago",
    avatar: "RM",
  },
  {
    from: "newsletter@techdigest",
    subj: "This week in AI: GPT-5, Sora…",
    tag: "Promo",
    tagC: "var(--cyan)",
    time: "18m ago",
    avatar: "TD",
  },
  {
    from: "hr@company.com",
    subj: "Leave approval confirmed",
    tag: "General",
    tagC: "var(--dim)",
    time: "34m ago",
    avatar: "HR",
  },
];

const AVATAR_COLORS = ["#7c3aed", "#4f46e5", "#0891b2", "#059669", "#b45309"];

function LiveInbox() {
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const t = setInterval(
      () => setVisible((v) => Math.min(v + 1, EMAILS.length)),
      1400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="card" style={{ padding: "22px 24px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <div className="ring ring-sm">
          <I.Inbox />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 14 }}>Inbox</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>Gmail · live sync</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            color: "var(--green)",
            fontWeight: 700,
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
          Connected
        </div>
      </div>

      {EMAILS.slice(0, visible).map((e, i) => (
        <div
          key={i}
          className="inbox-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 0",
            borderBottom: i < visible - 1 ? "1px solid var(--border)" : "none",
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: AVATAR_COLORS[i % AVATAR_COLORS.length],
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {e.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--white)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {e.from}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--sub)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {e.subj}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: e.tagC,
                background: e.tagC + "20",
                borderRadius: 99,
                padding: "2px 8px",
              }}
            >
              {e.tag}
            </span>
            <span style={{ fontSize: 10, color: "var(--dim)" }}>{e.time}</span>
          </div>
        </div>
      ))}

      {visible >= EMAILS.length && (
        <p
          style={{
            fontSize: 11,
            color: "var(--dim)",
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          <span className="mono">5 emails classified</span> ·{" "}
          <span style={{ color: "var(--green)" }}>All processed</span>
        </p>
      )}
    </div>
  );
}

/* ─── AUTO REPLY WIDGET ──────────────────────────────────────────────────── */
function AutoReplyWidget() {
  const [mode, setMode] = useState("fast");
  const [typing, setTyping] = useState(true);

  const REPLY_TEXT =
    "Hi Priya, thank you for sending over the Q3 report. I've reviewed the key figures and will share my feedback by EOD. The projections on slide 7 look particularly strong — let's discuss in our 3pm call.";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!typing) return;
    if (shown >= REPLY_TEXT.length) {
      setTyping(false);
      return;
    }
    const t = setTimeout(() => setShown((s) => s + 1), 22);
    return () => clearTimeout(t);
  }, [shown, typing]);

  return (
    <div className="card" style={{ padding: "22px 24px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div className="ring ring-sm ring-cyan">
          <I.Reply />
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>Auto Reply</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>
            Context-aware · Mistral AI
          </p>
        </div>
      </div>

      {/* Mode toggle */}
      <div
        style={{
          display: "flex",
          gap: 6,
          background: "var(--bg2)",
          borderRadius: 99,
          padding: 4,
          marginBottom: 16,
        }}
      >
        <button
          className={`mode-btn ${mode === "fast" ? "fast" : "off"}`}
          onClick={() => setMode("fast")}
        >
          ⚡ Fast Mode
        </button>
        <button
          className={`mode-btn ${mode === "safe" ? "safe" : "off"}`}
          onClick={() => setMode("safe")}
        >
          🛡 Safe Mode
        </button>
      </div>

      {/* Original email snippet */}
      <div
        style={{
          background: "var(--bg2)",
          borderRadius: "var(--r)",
          padding: "10px 14px",
          marginBottom: 12,
          borderLeft: "2px solid var(--violet)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "var(--violet)",
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Original · Priya Sharma
        </p>
        <p style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.6 }}>
          Please review the Q3 report attached and share your feedback before
          the 3pm call today…
        </p>
      </div>

      {/* AI typing reply */}
      <div
        style={{
          background: "rgba(124,58,237,.06)",
          border: "1px solid var(--violet-m)",
          borderRadius: "var(--r)",
          padding: "12px 14px",
          minHeight: 90,
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "var(--violet)",
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          AI Draft
        </p>
        <p style={{ fontSize: 12.5, color: "var(--off)", lineHeight: 1.7 }}>
          {REPLY_TEXT.slice(0, shown)}
          {typing && <span className="cursor" />}
        </p>
      </div>

      {!typing && (
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "var(--r)",
              border: "1px solid var(--border-h)",
              background: "transparent",
              color: "var(--sub)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Bricolage Grotesque',sans-serif",
            }}
          >
            Edit
          </button>
          <button
            style={{
              flex: 2,
              padding: "8px",
              borderRadius: "var(--r)",
              border: "none",
              background: mode === "fast" ? "var(--amber)" : "var(--green)",
              color: "#000",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Bricolage Grotesque',sans-serif",
            }}
          >
            {mode === "fast" ? "⚡ Sending…" : "✓ Send for Approval"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── CLASSIFICATION WIDGET ──────────────────────────────────────────────── */
const CLASS_DATA = [
  { label: "Important", count: 24, pct: 32, color: "var(--violet)" },
  { label: "General", count: 31, pct: 41, color: "var(--cyan)" },
  { label: "Promotional", count: 12, pct: 16, color: "var(--amber)" },
  { label: "Spam", count: 8, pct: 11, color: "var(--red)" },
];

function ClassificationWidget() {
  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <div className="ring ring-sm ring-amber">
          <I.Filter />
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>Classification Engine</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>
            Today · 75 emails processed
          </p>
        </div>
      </div>
      {CLASS_DATA.map((c, i) => (
        <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <span
              style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500 }}
            >
              {c.label}
            </span>
            <span
              style={{ fontSize: 12, fontWeight: 700, color: "var(--white)" }}
            >
              {c.count}{" "}
              <span
                style={{ fontSize: 10, color: "var(--dim)", fontWeight: 400 }}
              >
                ({c.pct}%)
              </span>
            </span>
          </div>
          <div
            style={{
              height: 5,
              borderRadius: 3,
              background: "var(--bg2)",
              overflow: "hidden",
            }}
          >
            <div
              className="sbar"
              style={{ "--w": c.pct + "%", background: c.color }}
            />
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          background: "var(--green-l)",
          borderRadius: "var(--r)",
          border: "1px solid rgba(16,185,129,.2)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--green)",
            flexShrink: 0,
          }}
        />
        <p style={{ fontSize: 12, color: "var(--green)", fontWeight: 600 }}>
          8 spam emails auto-archived · 0 false positives
        </p>
      </div>
    </div>
  );
}

/* ─── NOTIFICATION WIDGET ────────────────────────────────────────────────── */
function NotificationsWidget() {
  const alerts = [
    {
      type: "Urgent",
      msg: "Legal team needs response on NDA by 5pm",
      color: "var(--red)",
      icon: "!",
    },
    {
      type: "Trending",
      msg: "3 follow-ups from the same sender — flagged",
      color: "var(--amber)",
      icon: "↑",
    },
    {
      type: "Summary",
      msg: "Daily digest ready — 12 important, 4 pending",
      color: "var(--cyan)",
      icon: "✦",
    },
  ];
  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <div className="ring ring-sm ring-green">
          <I.Bell />
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>Smart Alerts</p>
          <p style={{ fontSize: 11, color: "var(--sub)" }}>
            Priority-aware notifications
          </p>
        </div>
      </div>
      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginBottom: i < 2 ? 12 : 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: a.color + "20",
              color: a.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 800,
              flexShrink: 0,
              border: `1px solid ${a.color}40`,
            }}
          >
            {a.icon}
          </div>
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: a.color,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              {a.type}
            </p>
            <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.5 }}>
              {a.msg}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── PIPELINE VIZ ───────────────────────────────────────────────────────── */
const PIPELINE = [
  {
    icon: <I.Inbox />,
    label: "Email Arrives",
    sub: "Gmail API ingestion",
    color: "var(--violet)",
  },
  {
    icon: <I.Brain />,
    label: "AI Classifies",
    sub: "Mistral · confidence score",
    color: "var(--cyan)",
  },
  {
    icon: <I.Tag />,
    label: "Tagged & Routed",
    sub: "4 categories + priority",
    color: "var(--amber)",
  },
  {
    icon: <I.Reply />,
    label: "Reply Generated",
    sub: "Context-aware draft",
    color: "var(--green)",
  },
  {
    icon: <I.Zap />,
    label: "Action Taken",
    sub: "Send, archive, alert",
    color: "var(--violet)",
  },
];

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
const Agentra = () => (
  <div className="ag" style={{ overflowX: "hidden" }}>
    <style>{STYLES}</style>

    {/* ══ HERO ════════════════════════════════════════════════════════════ */}
    <section className="sec hero-bg" style={{ paddingBottom: 72 }}>
      <div className="inner">
        <div
          style={{
            display: "flex",
            gap: 72,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT */}
          <div style={{ flex: "1 1 430px", minWidth: 0 }}>
            <FadeUp>
              <span className="lbl">
                <I.Brain /> AI Email Automation · Mistral-Powered
              </span>
            </FadeUp>
            <FadeUp className="d1">
              <h1
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.8rem,5.5vw,4.8rem)",
                  lineHeight: 1.02,
                  color: "var(--white)",
                  margin: "20px 0 24px",
                  letterSpacing: "-.03em",
                }}
              >
                Your inbox,
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  on autopilot.
                </span>
              </h1>
            </FadeUp>
            <FadeUp className="d2">
              <p
                style={{
                  fontSize: 17,
                  color: "var(--sub)",
                  lineHeight: 1.78,
                  maxWidth: 460,
                  marginBottom: 36,
                }}
              >
                AgentraMailSense classifies every email, drafts context-aware
                replies, and takes action — in seconds. Stop managing email.
                Start ignoring it.
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
                <button className="btn-p">
                  <I.Play />
                  Get Started Free
                </button>
                <button className="btn-s">
                  View Demo <I.ArrowR />
                </button>
              </div>
            </FadeUp>
            <FadeUp className="d4">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[
                  { val: "< 2s", label: "Classification time" },
                  { val: "4", label: "Smart categories" },
                  { val: "94%", label: "Reply accuracy" },
                ].map((s, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: "'Cabinet Grotesk',sans-serif",
                        fontWeight: 900,
                        fontSize: "1.9rem",
                        color: "var(--white)",
                        letterSpacing: "-.02em",
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "var(--sub)",
                        marginTop: 3,
                        fontWeight: 600,
                        letterSpacing: ".07em",
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

          {/* RIGHT — live inbox preview */}
          <div style={{ flex: "1 1 340px", minWidth: 0, position: "relative" }}>
            {/* Glow ring */}
            <div
              style={{
                position: "absolute",
                width: 380,
                height: 380,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(124,58,237,.12) 0%, transparent 70%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                pointerEvents: "none",
              }}
            />

            <FadeUp className="d1">
              <img
                src="/assets/agentra img 1.jpeg"
                alt="Agentra"
                loading="eager"
                className="float"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "var(--r-xl)",
                  position: "relative",
                  zIndex: 2,
                  border: "1px solid var(--border-h)",
                  boxShadow: "0 32px 80px rgba(124,58,237,.15)",
                }}
              />
            </FadeUp>

            {/* Badge — classification */}
            <div
              style={{
                position: "absolute",
                left: -20,
                top: "20%",
                zIndex: 10,
                background: "var(--bg3)",
                border: "1px solid var(--border-h)",
                borderRadius: "var(--r-lg)",
                padding: "10px 14px",
                boxShadow: "0 12px 40px rgba(0,0,0,.4)",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "var(--sub)",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                AI Tag
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  { label: "Important", c: "var(--violet)" },
                  { label: "Spam", c: "var(--red)" },
                  { label: "Promo", c: "var(--cyan)" },
                ].map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: t.c,
                      background: t.c + "20",
                      borderRadius: 99,
                      padding: "2px 9px",
                      display: "inline-block",
                    }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Badge — reply sent */}
            <div
              style={{
                position: "absolute",
                right: -8,
                bottom: "15%",
                zIndex: 10,
                background: "var(--bg3)",
                border: "1px solid rgba(16,185,129,.3)",
                borderRadius: "var(--r-lg)",
                padding: "12px 16px",
                minWidth: 150,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: "var(--green)",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Reply Sent
              </p>
              <p
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "var(--green)",
                }}
              >
                ⚡ Auto
              </p>
              <p style={{ fontSize: 10, color: "var(--sub)", marginTop: 2 }}>
                0.8s · Fast Mode
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ LIVE STATS BAR ═══════════════════════════════════════════════ */}
    <div
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 24px",
      }}
    >
      <div className="inner">
        <div
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {[
            { val: "2.4M+", label: "Emails processed", color: "var(--violet)" },
            { val: "99.1%", label: "Uptime", color: "var(--green)" },
            { val: "< 2s", label: "Avg classification", color: "var(--cyan)" },
            { val: "0 data", label: "Sold or shared", color: "var(--amber)" },
          ].map((s, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              <p
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  color: s.color,
                  letterSpacing: "-.02em",
                }}
              >
                {s.val}
              </p>
              <p style={{ fontSize: 12, color: "var(--dim)", fontWeight: 500 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ══ BENTO FEATURES ═══════════════════════════════════════════════ */}
    <section className="sec glow-grid" style={{ background: "var(--bg2)" }}>
      <div className="inner" style={{ position: "relative", zIndex: 1 }}>
        <FadeUp style={{ marginBottom: 52 }}>
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
              <span className="lbl">Core capabilities</span>
              <h2
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem,3.8vw,3rem)",
                  color: "var(--white)",
                  margin: "14px 0 0",
                  letterSpacing: "-.03em",
                }}
              >
                Every email.
                <br />
                Handled.
              </h2>
            </div>
            <p
              style={{
                fontSize: 15,
                color: "var(--sub)",
                maxWidth: 360,
                lineHeight: 1.75,
              }}
            >
              Classify, reply, alert — all without you lifting a finger.
              AgentraMailSense runs your inbox so you don't have to.
            </p>
          </div>
        </FadeUp>

        {/* Row 1: inbox + reply */}
        <div className="fg fg2" style={{ marginBottom: 12 }}>
          <FadeUp className="d1">
            <LiveInbox />
          </FadeUp>
          <FadeUp className="d2">
            <AutoReplyWidget />
          </FadeUp>
        </div>

        {/* Row 2: classification + alerts */}
        <div className="fg fg2" style={{ marginBottom: 12 }}>
          <FadeUp className="d1">
            <ClassificationWidget />
          </FadeUp>
          <FadeUp className="d2">
            <NotificationsWidget />
          </FadeUp>
        </div>

        {/* Row 3: 3 utility cards */}
        <div className="fg fg3">
          {[
            {
              icon: <I.Zap />,
              ring: "",
              title: "Fully Autonomous",
              body: "Set it and forget it. Agentra handles ingestion, analysis, reply, and archiving end-to-end with zero manual input.",
            },
            {
              icon: <I.Layers />,
              ring: "ring-cyan",
              title: "Template Learning",
              body: "The more you use it, the sharper it gets. Agentra learns your tone, preferences, and communication style over time.",
            },
            {
              icon: <I.Shield />,
              ring: "ring-amber",
              title: "Privacy-First",
              body: "Your emails stay yours. No data sold, no models trained on your inbox. Encrypted throughout.",
            },
          ].map((f, i) => (
            <FadeUp key={i} className={`d${i + 1}`}>
              <div
                className="card card-h"
                style={{ padding: "22px 24px", height: "100%" }}
              >
                <div
                  className={`ring ring-sm ${f.ring}`}
                  style={{ marginBottom: 14 }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--white)",
                    marginBottom: 7,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.7 }}
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

    {/* ══ HOW IT WORKS — PIPELINE ═══════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg)" }}>
      <div className="inner">
        <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="lbl">Under the hood</span>
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem,3.5vw,2.8rem)",
              color: "var(--white)",
              margin: "14px 0 12px",
              letterSpacing: "-.03em",
            }}
          >
            Email in. Action out.
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--sub)",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            A five-step autonomous pipeline runs every time a new email lands —
            in under two seconds.
          </p>
        </FadeUp>

        {/* Pipeline steps */}
        <div
          style={{
            display: "flex",
            gap: 0,
            alignItems: "stretch",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {PIPELINE.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                flex: "1 1 160px",
                minWidth: 0,
              }}
            >
              <FadeUp className={`d${(i % 4) + 1}`} style={{ width: "100%" }}>
                <div
                  className="card card-h"
                  style={{ padding: "22px 20px", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: step.color + "18",
                      color: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                      border: `1px solid ${step.color}40`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "var(--white)",
                      marginBottom: 5,
                    }}
                  >
                    {step.label}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--sub)" }}>
                    {step.sub}
                  </p>
                  <span
                    style={{
                      marginTop: 10,
                      display: "inline-block",
                      fontSize: 10,
                      color: step.color,
                      fontWeight: 700,
                      background: step.color + "15",
                      borderRadius: 99,
                      padding: "2px 9px",
                    }}
                  >
                    Step {i + 1}
                  </span>
                </div>
              </FadeUp>
              {i < PIPELINE.length - 1 && (
                <div
                  style={{
                    width: 20,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 1,
                      background:
                        "linear-gradient(to right, var(--violet-m), var(--cyan-l))",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="div" />

    {/* ══ AGENT MODES ══════════════════════════════════════════════════ */}
    <section className="sec" style={{ background: "var(--bg2)" }}>
      <div className="inner">
        <div
          style={{
            display: "flex",
            gap: 72,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FadeUp style={{ flex: "1 1 380px", minWidth: 0 }}>
            <span className="lbl">Agent Modes</span>
            <h2
              style={{
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                color: "var(--white)",
                margin: "16px 0 14px",
                letterSpacing: "-.03em",
              }}
            >
              Full auto or
              <br />
              human-in-the-loop.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--sub)",
                lineHeight: 1.78,
                maxWidth: 420,
                marginBottom: 32,
              }}
            >
              Your inbox, your rules. Toggle between full automation and a
              draft-first flow depending on what's at stake.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Fast Mode */}
              <div
                className="card"
                style={{
                  padding: "22px 24px",
                  borderLeft: "3px solid var(--amber)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 20 }}>⚡</span>
                  <p
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "var(--amber)",
                    }}
                  >
                    Fast Mode
                  </p>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--amber)",
                      background: "var(--amber-l)",
                      borderRadius: 99,
                      padding: "2px 9px",
                      marginLeft: "auto",
                    }}
                  >
                    Full Auto
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {[
                    "Instant replies without any approval",
                    "Fully automated end-to-end workflow",
                    "Best for newsletters, support tickets, routine queries",
                  ].map((t, i) => (
                    <li key={i} className="chk-item" style={{ fontSize: 13 }}>
                      <span
                        className="chk-dot"
                        style={{
                          background: "var(--amber-l)",
                          color: "var(--amber)",
                          borderColor: "rgba(245,158,11,.3)",
                        }}
                      >
                        <I.Check />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Mode */}
              <div
                className="card"
                style={{
                  padding: "22px 24px",
                  borderLeft: "3px solid var(--green)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 20 }}>🛡</span>
                  <p
                    style={{
                      fontFamily: "'Cabinet Grotesk',sans-serif",
                      fontWeight: 800,
                      fontSize: 16,
                      color: "var(--green)",
                    }}
                  >
                    Safe Mode
                  </p>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--green)",
                      background: "var(--green-l)",
                      borderRadius: 99,
                      padding: "2px 9px",
                      marginLeft: "auto",
                    }}
                  >
                    Draft First
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {[
                    "AI drafts, you approve before sending",
                    "Edit tone, content, or recipients easily",
                    "Essential for client, legal, and sensitive emails",
                  ].map((t, i) => (
                    <li key={i} className="chk-item" style={{ fontSize: 13 }}>
                      <span
                        className="chk-dot"
                        style={{
                          background: "var(--green-l)",
                          color: "var(--green)",
                          borderColor: "rgba(16,185,129,.3)",
                        }}
                      >
                        <I.Check />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>

          {/* Right — image */}
          <FadeUp className="d2" style={{ flex: "1 1 320px", minWidth: 0 }}>
            <div style={{ position: "relative" }}>
              <img
                src="/assets/agentra img 2.jpeg"
                alt="Agentra modes"
                loading="lazy"
                style={{
                  width: "100%",
                  borderRadius: "var(--r-xl)",
                  border: "1px solid var(--border-h)",
                  boxShadow: "0 24px 72px rgba(0,0,0,.4)",
                }}
              />
              <img
                src="/assets/agentra img 3.jpeg"
                alt="Agentra reply"
                loading="lazy"
                style={{
                  width: "75%",
                  borderRadius: "var(--r-xl)",
                  border: "1px solid var(--border-h)",
                  boxShadow: "0 24px 72px rgba(0,0,0,.4)",
                  position: "absolute",
                  bottom: -30,
                  right: -20,
                  zIndex: 2,
                }}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* ══ DARK CTA ═════════════════════════════════════════════════════ */}
    <section
      style={{
        padding: "104px 24px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="inner"
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <FadeUp>
          <span className="lbl">
            <I.Zap />
            Start in 60 seconds
          </span>
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem,5vw,4rem)",
              color: "var(--white)",
              margin: "22px 0 18px",
              lineHeight: 1.02,
              letterSpacing: "-.03em",
            }}
          >
            Turn inbox chaos
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              into clarity.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--sub)",
              maxWidth: 440,
              margin: "0 auto 40px",
              lineHeight: 1.78,
            }}
          >
            Connect Gmail. Pick a mode. Watch Agentra take over — classifying,
            replying, and keeping only what matters front and center.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-p"
              style={{ padding: "16px 40px", fontSize: 16 }}
            >
              <I.Play />
              Get Started Free
            </button>
            <button
              className="btn-s"
              style={{ padding: "15px 28px", fontSize: 15 }}
            >
              Read the Docs
            </button>
          </div>
          <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 20 }}>
            Gmail integration · No credit card · Free tier available
          </p>
        </FadeUp>
      </div>
    </section>

    <CTASection />
  </div>
);

export default Agentra;
