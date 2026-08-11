import React, { useState, useRef, useEffect } from "react";

/* ---------- tokens & constants ---------- */
const T = {
  bg: "#0c0e15",
  bgElevated: "#12151e",
  card: "#161922",
  cardBorder: "#232736",
  ink: "#ffffff",
  sub: "#9aa1b1",
  dim: "#5c6376",
  orange: "#f97316",
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#a855f7",
  grad: "linear-gradient(135deg, #ff5c12 0%, #f5382c 100%)",
};

const SEED = [
  { id: 1, type: "debit", amount: 160, category: "groceries", person: "ZEPTO", date: "Today", time: "09:31 AM", paymentMode: "UPI", note: "" },
  { id: 2, type: "debit", amount: 2500, category: "food", person: "RESTAURANT", date: "Yesterday", time: "04:26 PM", paymentMode: "Cash", note: "Dinner out" },
  { id: 3, type: "debit", amount: 200, category: "other", person: "GIFT SHOP", date: "Yesterday", time: "11:07 AM", paymentMode: "Card One", note: "Gift" },
  { id: 4, type: "debit", amount: 2500, category: "investment", person: "SIP", date: "Yesterday", time: "10:00 AM", paymentMode: "Net Banking", note: "" },
  { id: 5, type: "debit", amount: 340, category: "transport", person: "UBER", date: "2 days ago", time: "08:12 PM", paymentMode: "UPI", note: "" },
];

const CHIPS = ["Spent 500 on food", "Paid 200 to Rohan", "Got 2 lakh from client", "Spent 1200 on shopping"];

/* ---------- icons matching the design screenshot ---------- */
const Ic = {
  Menu: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" {...p}>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  ),
  Card: (p) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa1b1" strokeWidth="2" {...p}>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  Bolt: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" {...p}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  Sun: (p) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa1b1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Sync: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#052e16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  ),
  WeatherCloud: () => (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <circle cx="11" cy="11" r="4.5" fill="#f59e0b" />
      <path d="M9 19c-2.8 0-5-2.2-5-5 0-2.5 1.8-4.6 4.3-4.9C9.1 6.8 11.4 5 14 5c3.3 0 6 2.7 6 6 2.3.3 4 2.3 4 4.6 0 2.5-2 4.4-4.5 4.4H9z" fill="#94a3b8" />
      <path d="M10 22l-1.2 2.5M14 22l-1.2 2.5M18 22l-1.2 2.5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Analytics: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="12" width="4" height="9" rx="1.5" fill="#ec4899" />
      <rect x="10" y="6" width="4" height="15" rx="1.5" fill="#3b82f6" />
      <rect x="17" y="3" width="4" height="18" rx="1.5" fill="#10b981" />
    </svg>
  ),
  Reports: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" fill="#f59e0b" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#f59e0b" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="#f59e0b" />
    </svg>
  ),
  Groups: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#a855f7">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  Goals: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2" fill="#f43f5e" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" />
    </svg>
  ),
  Home: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Ledger: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Mic: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  ),
  Insights: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 3 20h18L12 3z" />
    </svg>
  ),
  Settings: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  X: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Send: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
};

const CSS = `
.fdm-wrap { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; }
.fdm-phone {
  width: 340px;
  max-width: 100%;
  background: linear-gradient(180deg, #1d202a, #0c0e14);
  border-radius: 46px;
  padding: 10px;
  box-shadow: 0 45px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06);
  position: relative;
}
.fdm-screen {
  background: ${T.bg};
  border-radius: 38px;
  overflow: hidden;
  height: 680px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.fdm-scroll {
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.fdm-scroll::-webkit-scrollbar { display: none; }
.fdm-top-btn {
  width: 32px; height: 32px;
  border-radius: 10px;
  background: ${T.card};
  border: 1px solid ${T.cardBorder};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: ${T.sub};
  transition: all 0.2s ease;
}
.fdm-top-btn:hover { border-color: ${T.orange}; color: ${T.orange}; }
.fdm-action-card {
  background: ${T.card};
  border: 1px solid ${T.cardBorder};
  border-radius: 16px;
  padding: 12px 4px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.fdm-action-card:hover {
  transform: translateY(-2px);
  border-color: rgba(249, 115, 22, 0.4);
}
@keyframes fdmMicPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.5), 0 6px 20px rgba(249,115,22,0.4); }
  50% { box-shadow: 0 0 0 12px rgba(249,115,22,0), 0 8px 24px rgba(249,115,22,0.6); }
}
.fdm-mic-btn {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: ${T.grad};
  border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.45);
  animation: fdmMicPulse 2.5s ease-in-out infinite;
  transition: transform 0.15s ease;
  margin-top: -14px;
}
.fdm-mic-btn:active { transform: scale(0.94); }
.fdm-nav-item {
  flex: 1;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  background: none; border: none; cursor: pointer;
  padding: 8px 0 6px;
  color: ${T.dim};
  transition: color 0.15s ease;
}
.fdm-nav-item.active { color: ${T.orange}; font-weight: 700; }
.fdm-chip {
  font-size: 11px; padding: 6px 12px; border-radius: 99px;
  background: ${T.card}; border: 1px solid ${T.cardBorder}; color: ${T.sub};
  cursor: pointer; white-space: nowrap; transition: 0.15s; flex-shrink: 0;
}
.fdm-chip:hover { border-color: ${T.orange}; color: ${T.orange}; }
`;

export default function FinexoLiveDemo() {
  const [nav, setNav] = useState("home");
  const [txs, setTxs] = useState(SEED);
  const [showAmounts, setShowAmounts] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceMsg, setVoiceMsg] = useState("");

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [nav]);

  const fmt = (n) => (showAmounts ? `INR ${Math.round(n).toLocaleString("en-IN")}` : "••••••••");

  const handleMicClick = () => {
    setListening(true);
    const sample = CHIPS[Math.floor(Math.random() * CHIPS.length)];
    setVoiceMsg(`Listening... "${sample}"`);
    setTimeout(() => {
      setListening(false);
      setVoiceMsg(`Added: "${sample}"`);
      setTxs((prev) => [
        { id: Date.now(), type: "debit", amount: 500, category: "food", person: "AI EXPENSE", date: "Just now", time: "", paymentMode: "UPI", note: sample },
        ...prev,
      ]);
      setTimeout(() => setVoiceMsg(""), 2500);
    }, 1500);
  };

  return (
    <div className="fdm-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 0", background: "transparent" }}>
      <style>{CSS}</style>

      {/* ============ PHONE CONTAINER ============ */}
      <div className="fdm-phone">
        <div className="fdm-screen">

          {/* ---- HEADER ROW ---- */}
          <div style={{ padding: "16px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Menu Icon in Orange Box */}
              <button
                onClick={() => setDrawer(!drawer)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "transparent",
                  border: "1.5px solid #f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Ic.Menu />
              </button>

              {/* Title & Greeting */}
              <div>
                <h1 style={{ fontSize: 18, fontWeight: 800, color: "#f97316", margin: 0, lineHeight: 1.1, fontFamily: "'DM Serif Display', serif" }}>
                  Finexo
                </h1>
                <p style={{ fontSize: 11, color: "#5c6376", margin: "2px 0 0 0", fontWeight: 500 }}>
                  Hi there!
                </p>
              </div>
            </div>

            {/* Right Action Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button className="fdm-top-btn" onClick={() => setShowAmounts(!showAmounts)}>
                <Ic.Card />
              </button>
              <button
                className="fdm-top-btn"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  borderColor: "transparent",
                  boxShadow: "0 0 10px rgba(249,115,22,0.4)",
                }}
                onClick={handleMicClick}
              >
                <Ic.Bolt />
              </button>
              <button className="fdm-top-btn" onClick={() => setNav("settings")}>
                <Ic.Sun />
              </button>
            </div>
          </div>

          {/* ---- GREEN LIVE RATES BANNER ---- */}
          <div
            style={{
              background: "#22c55e",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <div className="animate-spin" style={{ display: "inline-flex" }}>
              <Ic.Sync />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#042f1a", letterSpacing: ".01em" }}>
              Live rates updated 10:20 pm
            </span>
          </div>

          {/* ---- MAIN SCROLL AREA ---- */}
          <div ref={scrollRef} className="fdm-scroll" style={{ padding: "14px" }}>

            {voiceMsg && (
              <div style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 12, padding: "8px 12px", marginBottom: 12, textAlign: "center" }}>
                <p style={{ fontSize: 11, color: "#f97316", fontWeight: 600, textAlign: "center", margin: 0 }}>{voiceMsg}</p>
              </div>
            )}

            {nav === "home" && (
              <div>
                {/* ---- TOTAL BALANCE CARD ---- */}
                <div
                  style={{
                    background: T.grad,
                    borderRadius: 22,
                    padding: "18px 20px",
                    color: "#ffffff",
                    marginBottom: 14,
                    boxShadow: "0 12px 28px rgba(249,115,22,0.35)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>Total Balance</span>
                    <span
                      style={{
                        background: "rgba(255,255,255,0.22)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      👑 Premium
                    </span>
                  </div>

                  <div style={{ fontSize: 30, fontWeight: 800, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
                    {fmt(48507)}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16, borderTop: "1px solid rgba(255,255,255,0.25)", paddingTop: 12 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10.5, opacity: 0.8, margin: 0 }}>This month in</p>
                      <p style={{ fontSize: 14, fontWeight: 700, margin: "2px 0 0 0" }}>+INR 0</p>
                    </div>
                    <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.25)" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 10.5, opacity: 0.8, margin: 0 }}>This month out</p>
                      <p style={{ fontSize: 14, fontWeight: 700, margin: "2px 0 0 0" }}>-INR 19,493</p>
                    </div>
                  </div>
                </div>

                {/* ---- WEATHER WIDGET ---- */}
                <div
                  style={{
                    background: T.card,
                    border: `1px solid ${T.cardBorder}`,
                    borderRadius: 18,
                    padding: "14px 16px",
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <Ic.WeatherCloud />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff" }}>29°C</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: T.sub }}>Drizzle</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#5c6376", margin: "2px 0 3px", display: "flex", alignItems: "center", gap: 4 }}>
                      Ghaziabad · 💨 10 km/h
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#f97316", margin: 0 }}>
                      • AQI 104 · Unhealthy (Sensitive)
                    </p>
                  </div>
                </div>

                {/* ---- 4 QUICK ACTION GRID CARDS ---- */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
                  <div className="fdm-action-card" onClick={() => setNav("analytics")}>
                    <Ic.Analytics />
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.sub }}>Analytics</span>
                  </div>
                  <div className="fdm-action-card" onClick={() => setNav("reports")}>
                    <Ic.Reports />
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.sub }}>Reports</span>
                  </div>
                  <div className="fdm-action-card" onClick={() => setNav("groups")}>
                    <Ic.Groups />
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.sub }}>Groups</span>
                  </div>
                  <div className="fdm-action-card" onClick={() => setNav("goals")}>
                    <Ic.Goals />
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.sub }}>Goals</span>
                  </div>
                </div>

                {/* ---- FINANCIAL HEALTH CARD ---- */}
                <div
                  style={{
                    background: T.card,
                    border: `1px solid ${T.cardBorder}`,
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#ffffff" }}>Financial Health</span>
                    <span
                      style={{
                        background: "rgba(239, 68, 68, 0.18)",
                        color: "#ef4444",
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 99,
                        padding: "3px 10px",
                      }}
                    >
                      At Risk
                    </span>
                  </div>

                  {/* Segmented Dashed Progress Bar */}
                  <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 6,
                          borderRadius: 4,
                          background: i < 3 ? "#ef4444" : "#262b38",
                        }}
                      />
                    ))}
                  </div>

                  <p style={{ fontSize: 11, color: "#5c6376", margin: 0, fontWeight: 500 }}>
                    Savings rate: -5.0% · Aim for 20%+
                  </p>
                </div>
              </div>
            )}

            {nav === "ledger" && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.ink, marginBottom: 10 }}>Transactions</p>
                {txs.map((t) => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "10px 12px", marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 600, color: T.ink, margin: 0 }}>{t.person}</p>
                      <p style={{ fontSize: 10, color: T.dim, margin: "2px 0 0 0" }}>{t.category} · {t.date}</p>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: T.red, margin: 0 }}>-{fmt(t.amount)}</p>
                  </div>
                ))}
              </div>
            )}

            {(nav === "insights" || nav === "analytics" || nav === "reports" || nav === "groups" || nav === "goals" || nav === "settings") && (
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 18, textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.ink, textTransform: "capitalize" }}>{nav}</p>
                <p style={{ fontSize: 12, color: T.dim, marginTop: 4 }}>Detailed {nav} interactive view inside Finexo.</p>
                <button
                  onClick={() => setNav("home")}
                  style={{ marginTop: 12, background: T.orange, color: "#fff", border: "none", borderRadius: 10, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  Back to Home
                </button>
              </div>
            )}

          </div>

          {/* ---- BOTTOM NAVIGATION BAR WITH FLOATING MIC BUTTON ---- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              background: "#0c0e14",
              borderTop: `1px solid ${T.cardBorder}`,
              height: 64,
              padding: "0 6px",
              flexShrink: 0,
            }}
          >
            {/* 1. Home */}
            <button className={`fdm-nav-item ${nav === "home" ? "active" : ""}`} onClick={() => setNav("home")}>
              <Ic.Home />
              <span style={{ fontSize: 10 }}>Home</span>
            </button>

            {/* 2. Ledger */}
            <button className={`fdm-nav-item ${nav === "ledger" ? "active" : ""}`} onClick={() => setNav("ledger")}>
              <Ic.Ledger />
              <span style={{ fontSize: 10 }}>Ledger</span>
            </button>

            {/* 3. CENTER FLOATING MIC BUTTON */}
            <button className={`fdm-mic-btn ${listening ? "scale-105" : ""}`} onClick={handleMicClick} title="Voice Assistant">
              <Ic.Mic />
            </button>

            {/* 4. Insights */}
            <button className={`fdm-nav-item ${nav === "insights" ? "active" : ""}`} onClick={() => setNav("insights")}>
              <Ic.Insights />
              <span style={{ fontSize: 10 }}>Insights</span>
            </button>

            {/* 5. Settings */}
            <button className={`fdm-nav-item ${nav === "settings" ? "active" : ""}`} onClick={() => setNav("settings")}>
              <Ic.Settings />
              <span style={{ fontSize: 10 }}>Settings</span>
            </button>
          </div>

          {/* ---- DRAWER MENU MODAL ---- */}
          {drawer && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 50,
                display: "flex",
              }}
              onClick={() => setDrawer(false)}
            >
              <div
                style={{
                  width: "75%",
                  background: T.bgElevated,
                  height: "100%",
                  padding: 20,
                  overflowY: "auto",
                  borderRight: `1px solid ${T.cardBorder}`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: T.orange }}>Finexo Menu</span>
                  <button className="fdm-top-btn" onClick={() => setDrawer(false)}>
                    <Ic.X />
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Dashboard", "Transactions", "Analytics", "Reports", "Groups", "Goals", "Settings"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setNav(item.toLowerCase());
                        setDrawer(false);
                      }}
                      style={{
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        color: T.ink,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "8px 0",
                        borderBottom: `1px solid ${T.cardBorder}`,
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

