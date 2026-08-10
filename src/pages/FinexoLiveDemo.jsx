import React, { useState, useMemo, useRef, useEffect } from "react";

/* ---------- tokens ---------- */
const T = {
  bg: "#0b0d13",
  bgElevated: "#12151d",
  card: "#171a24",
  cardBorder: "#262b38",
  ink: "#f4f5f7",
  sub: "#9aa1b1",
  dim: "#5c6376",
  orange: "#f97316",
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#a855f7",
  grad: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
};

const CATS = {
  food: { emoji: "🍔" },
  groceries: { emoji: "🛒" },
  shopping: { emoji: "🛍️" },
  bills: { emoji: "💡" },
  entertainment: { emoji: "🎬" },
  salary: { emoji: "💰" },
  investment: { emoji: "📈" },
  health: { emoji: "🏥" },
  transport: { emoji: "🚗" },
  travel: { emoji: "✈️" },
  other: { emoji: "📦" },
};
const CAT_KEYWORDS = {
  food: ["food", "lunch", "dinner", "breakfast", "restaurant", "zomato", "swiggy", "pizza", "burger", "chai", "coffee"],
  groceries: ["grocery", "groceries", "zepto", "blinkit", "vegetables"],
  shopping: ["shopping", "clothes", "amazon", "flipkart", "shoes", "myntra"],
  bills: ["bill", "electricity", "recharge", "internet", "mobile", "wifi", "rent"],
  entertainment: ["movie", "netflix", "spotify", "game"],
  salary: ["salary", "income", "wage"],
  investment: ["sip", "mutual fund", "invest", "stock"],
  health: ["doctor", "medicine", "hospital", "pharmacy"],
  transport: ["uber", "ola", "taxi", "petrol", "fuel", "bus", "metro", "cab"],
  travel: ["flight", "hotel", "trip", "travel"],
};
function detectCategory(text) {
  const l = text.toLowerCase();
  for (const [cat, kws] of Object.entries(CAT_KEYWORDS)) {
    if (kws.some((k) => l.includes(k))) return cat;
  }
  return "other";
}
function parseLine(raw) {
  const text = raw.toLowerCase().trim();
  if (!text) return null;
  const creditWords = ["got", "received", "earned", "salary", "income", "credited", "refund", "bonus"];
  const debitWords = ["spent", "paid", "bought", "gave", "sent", "purchased"];
  let type = "debit";
  if (creditWords.some((w) => text.includes(w)) && !debitWords.some((w) => text.includes(w))) type = "credit";

  let amount = 0;
  const lakh = text.match(/(\d+(\.\d+)?)\s*(lakh|lac)/);
  const k = text.match(/(\d+(\.\d+)?)\s*k\b/);
  const plain = text.match(/(\d+(,\d{3})*(\.\d+)?)/);
  if (lakh) amount = parseFloat(lakh[1]) * 100000;
  else if (k) amount = parseFloat(k[1]) * 1000;
  else if (plain) amount = parseFloat(plain[1].replace(/,/g, ""));
  if (amount <= 0) return null;

  let category = detectCategory(text);
  if (type === "credit" && category === "other") category = "salary";

  let person = type === "debit" ? "EXPENSE" : "INCOME";
  const to = text.match(/to\s+([a-z]+)/);
  const from = text.match(/from\s+([a-z]+)/);
  if (to) person = to[1].toUpperCase();
  else if (from && !creditWords.includes(from[1])) person = from[1].toUpperCase();

  const modes = ["Card One", "Card Two", "UPI", "Cash", "Net Banking"];
  const paymentMode = modes[Math.floor(Math.random() * modes.length)];

  return {
    id: Date.now() + Math.random(), type, amount, category, person, raw,
    date: "Today", time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    paymentMode, note: "",
  };
}

/* ---------- demo data ---------- */
const STARTING_BALANCE = 68000;
const SEED = [
  { id: 1, type: "debit", amount: 160, category: "groceries", person: "ZEPTO", date: "Today", time: "09:31 AM", paymentMode: "UPI", note: "" },
  { id: 2, type: "debit", amount: 2500, category: "food", person: "RESTAURANT", date: "Yesterday", time: "04:26 PM", paymentMode: "Cash", note: "Dinner out" },
  { id: 3, type: "debit", amount: 200, category: "other", person: "GIFT SHOP", date: "Yesterday", time: "11:07 AM", paymentMode: "Card One", note: "Gift" },
  { id: 4, type: "debit", amount: 2500, category: "investment", person: "SIP", date: "Yesterday", time: "10:00 AM", paymentMode: "Net Banking", note: "" },
  { id: 5, type: "debit", amount: 340, category: "transport", person: "UBER", date: "2 days ago", time: "08:12 PM", paymentMode: "UPI", note: "" },
  { id: 6, type: "debit", amount: 1850, category: "bills", person: "ELECTRICITY BOARD", date: "3 days ago", time: "06:40 PM", paymentMode: "Net Banking", note: "" },
  { id: 7, type: "debit", amount: 649, category: "entertainment", person: "NETFLIX", date: "4 days ago", time: "12:01 AM", paymentMode: "Card Two", note: "" },
  { id: 8, type: "debit", amount: 3200, category: "shopping", person: "AMAZON", date: "5 days ago", time: "02:15 PM", paymentMode: "Card One", note: "" },
];

const CHIPS = ["Spent 500 on food", "Paid 200 to Rohan", "Got 2 lakh from client", "Spent 1200 on shopping"];
const ASK_CHIPS = ["What's my balance?", "How much did I spend on food?", "What was my biggest expense?"];

const DRAWER_GROUPS = [
  { icon: "📊", label: "Dashboard", items: ["Home", "Analytics & Insights", "Net Worth"] },
  { icon: "💸", label: "Money", items: ["Transactions", "SettleUp", "Split & Settle", "Groups"] },
  { icon: "🎯", label: "Planning", items: ["Budget Limits", "Financial Goals", "EMI & Credit Cards"] },
  { icon: "📋", label: "Reports", items: ["Reports & Schedules"] },
  { icon: "⚙️", label: "Account", items: ["Profile", "Settings", "Refer & Earn"] },
];

/* ---------- icons ---------- */
const Ic = {
  Home: (p) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  List: (p) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
  Triangle: (p) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3 3 20h18L12 3z" /></svg>,
  Mic: (p) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="8" y1="22" x2="16" y2="22" /></svg>,
  Send: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  X: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Eye: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  Menu: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  Keyboard: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="6" y1="9" x2="6" y2="9.01" /><line x1="10" y1="9" x2="10" y2="9.01" /><line x1="14" y1="9" x2="14" y2="9.01" /><line x1="18" y1="9" x2="18" y2="9.01" /><line x1="6" y1="13" x2="18" y2="13" /></svg>,
  Bolt: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>,
  Sun: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
};

/* ---------- scoped styles ---------- */
const CSS = `
.fdemo-wrap{font-family:'DM Sans',system-ui,sans-serif;}
.fdemo-phone{width:336px;max-width:100%;background:linear-gradient(180deg,#1b1e27,#0c0e14);border-radius:44px;padding:11px;box-shadow:0 50px 100px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.04);position:relative;}
.fdemo-notch{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:116px;height:24px;background:#0c0e14;border-radius:0 0 16px 16px;z-index:20;}
.fdemo-screen{background:${T.bg};border-radius:34px;overflow:hidden;height:668px;display:flex;flex-direction:column;position:relative;}
.fdemo-scroll{flex:1;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none;}
.fdemo-scroll::-webkit-scrollbar{display:none;}
.fdemo-navbtn{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:9px 0 7px;font-family:inherit;}
.fdemo-chip{font-size:11.5px;padding:7px 12px;border-radius:99px;background:${T.card};border:1px solid ${T.cardBorder};color:${T.sub};cursor:pointer;white-space:nowrap;transition:.15s;font-family:inherit;flex-shrink:0;}
.fdemo-chip:hover{border-color:${T.orange};color:${T.orange};}
.fdemo-iconbtn{background:${T.card};border:1px solid ${T.cardBorder};border-radius:10px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:${T.sub};cursor:pointer;flex-shrink:0;}
.fdemo-iconbtn:hover{color:${T.orange};border-color:${T.orange};}
@keyframes fdemoMicPulse{0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,.45)}50%{box-shadow:0 0 0 14px rgba(249,115,22,0)}}
.fdemo-mic-live{animation:fdemoMicPulse 1.3s ease-in-out infinite;}
@keyframes fdemoSlideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.fdemo-slide{animation:fdemoSlideUp .35s cubic-bezier(.16,1,.3,1);}
@keyframes fdemoDrawer{from{transform:translateX(-100%)}to{transform:translateX(0)}}
.fdemo-drawer{animation:fdemoDrawer .3s cubic-bezier(.16,1,.3,1);}
@keyframes fdemoSheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
.fdemo-sheet{animation:fdemoSheet .3s cubic-bezier(.16,1,.3,1);}
@keyframes fdemoWave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
.fdemo-wv{width:3px;border-radius:3px;background:#fff;}
`;

function Wave() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 20 }}>
      {[10, 16, 12, 18, 12, 16, 10].map((h, i) => (
        <div key={i} className="fdemo-wv" style={{ height: h, animation: `fdemoWave 1s ease-in-out infinite ${i * 0.1}s` }} />
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return <p style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 10, letterSpacing: ".01em" }}>{children}</p>;
}

const WEATHER = { temp: 29, desc: "Drizzle", emoji: "🌦️", city: "Ghaziabad", wind: 10, aqi: 104, aqiLabel: "Unhealthy (Sensitive)", aqiColor: "#f97316" };

export default function FinexoLiveDemo() {
  const [nav, setNav] = useState("home");
  const [txs, setTxs] = useState(SEED);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState("");
  const [inputMode, setInputMode] = useState("voice");
  const [drawer, setDrawer] = useState(false);
  const [chat, setChat] = useState(false);
  const [showAmounts, setShowAmounts] = useState(true);
  const [question, setQuestion] = useState("");
  const [thread, setThread] = useState([{ from: "ai", text: "Ask me anything about your demo transactions." }]);

  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [nav]);

  const totalDebit = useMemo(() => txs.reduce((s, t) => s + (t.type === "debit" ? t.amount : 0), 0), [txs]);
  const totalCredit = useMemo(() => txs.reduce((s, t) => s + (t.type === "credit" ? t.amount : 0), 0), [txs]);
  const balance = STARTING_BALANCE - totalDebit + totalCredit;
  const monthIn = totalCredit;
  const monthOut = totalDebit;
  const savingsRate = monthIn > 0 ? ((monthIn - monthOut) / monthIn) * 100 : (monthOut > 0 ? -5 : 0);
  const healthLabel = savingsRate >= 20 ? "Healthy" : savingsRate >= 10 ? "Fair" : "At Risk";
  const healthColor = savingsRate >= 20 ? T.green : savingsRate >= 10 ? T.orange : T.red;

  const fmt = (n) => (showAmounts ? `INR ${Math.round(n).toLocaleString("en-IN")}` : "\u2022\u2022\u2022\u2022\u2022\u2022");

  const commit = (parsed) => setTxs((p) => [parsed, ...p]);
  const handleSubmit = (text) => {
    const parsed = parseLine(text);
    if (!parsed) { setHint('Couldn\u2019t find an amount — try "Spent 500 on food"'); setTimeout(() => setHint(""), 2200); return; }
    commit(parsed); setInput(""); setHint("");
  };
  const handleMic = () => {
    if (listening) return;
    setListening(true);
    const sample = CHIPS[Math.floor(Math.random() * CHIPS.length)];
    setTimeout(() => { setListening(false); handleSubmit(sample); }, 1300);
  };
  const answerQuestion = (q) => {
    const l = q.toLowerCase();
    if (l.includes("balance") || l.includes("have")) return `Your demo balance is ${fmt(balance)} right now.`;
    if (l.includes("food")) {
      const t = txs.filter((x) => x.category === "food" && x.type === "debit").reduce((s, x) => s + x.amount, 0);
      return t > 0 ? `You've spent INR ${t.toLocaleString("en-IN")} on food in this demo.` : `No food expenses yet — try "Spent 300 on lunch".`;
    }
    if (l.includes("biggest") || l.includes("largest")) {
      const d = txs.filter((x) => x.type === "debit").sort((a, b) => b.amount - a.amount);
      return d.length ? `Your biggest demo expense is INR ${d[0].amount.toLocaleString("en-IN")} — ${d[0].person} (${d[0].category}).` : "No expenses logged yet.";
    }
    if (l.includes("spent") || l.includes("spending")) return `You've spent INR ${monthOut.toLocaleString("en-IN")} so far in this demo.`;
    return "Ask about your balance, food spending, or biggest expense!";
  };
  const handleAsk = (q) => {
    const text = q || question;
    if (!text.trim()) return;
    setThread((p) => [...p, { from: "user", text }]);
    setTimeout(() => setThread((p) => [...p, { from: "ai", text: answerQuestion(text) }]), 350);
    setQuestion("");
  };

  const openDrawerItem = (item) => {
    setDrawer(false);
    if (item === "Home") setNav("home");
    else if (item === "Transactions") setNav("ledger");
    else if (item === "Analytics & Insights" || item === "Net Worth") setNav("insights");
  };

  return (
    <div className="fdemo-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 0", background: "transparent" }}>
      <style>{CSS}</style>

      {/* ============ PHONE ============ */}
      <div className="fdemo-phone">
        <div className="fdemo-notch" />
        <div className="fdemo-screen">

          {/* ---- top bar ---- */}
          <div style={{ padding: "30px 16px 12px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button className="fdemo-iconbtn" onClick={() => setDrawer(true)}><Ic.Menu /></button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: T.ink, lineHeight: 1.1 }}>Finexo</p>
              <p style={{ fontSize: 10, color: T.dim }}>Voice Finance Manager</p>
            </div>
            <button className="fdemo-iconbtn" onClick={() => setShowAmounts(!showAmounts)}><Ic.Eye /></button>
          </div>

          {/* ---- scroll body ---- */}
          <div ref={scrollRef} className="fdemo-scroll" style={{ padding: "0 16px 16px" }}>
            {nav === "home" && (
              <div>
                {/* Weather card */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 14, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 11, color: T.sub, fontWeight: 600 }}>{WEATHER.city}</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: T.ink, margin: "2px 0" }}>{WEATHER.temp}°C <span style={{ fontSize: 14 }}>{WEATHER.emoji}</span></p>
                    <p style={{ fontSize: 10, color: T.dim }}>AQI {WEATHER.aqi} · {WEATHER.aqiLabel}</p>
                  </div>
                  <span style={{ fontSize: 24 }}>{WEATHER.emoji}</span>
                </div>

                {/* Balance gradient card */}
                <div style={{ background: T.grad, borderRadius: 22, padding: 18, color: "#fff", marginBottom: 14, boxShadow: "0 10px 24px rgba(249,115,22,.3)" }}>
                  <p style={{ fontSize: 11, opacity: 0.8, fontWeight: 600, letterSpacing: ".06em" }}>TOTAL BALANCE</p>
                  <p style={{ fontSize: 28, fontWeight: 800, margin: "4px 0 12px" }}>{fmt(balance)}</p>
                  <div style={{ display: "flex", gap: 12, borderTop: "1px solid rgba(255,255,255,.2)", paddingTop: 10 }}>
                    <div>
                      <p style={{ fontSize: 10, opacity: 0.8 }}>MONTH IN</p>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>+{fmt(monthIn)}</p>
                    </div>
                    <div style={{ width: 1, background: "rgba(255,255,255,.2)" }} />
                    <div>
                      <p style={{ fontSize: 10, opacity: 0.8 }}>MONTH OUT</p>
                      <p style={{ fontSize: 13, fontWeight: 700 }}>-{fmt(monthOut)}</p>
                    </div>
                  </div>
                </div>

                {/* Health Score */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 14, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>Financial Health</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: healthColor }}>{healthLabel} ({savingsRate.toFixed(0)}%)</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: T.cardBorder, overflow: "hidden" }}>
                    <div style={{ width: `${Math.max(10, Math.min(100, savingsRate + 20))}%`, height: "100%", background: healthColor, borderRadius: 99 }} />
                  </div>
                </div>

                {/* Transactions list */}
                <SectionLabel>Recent Activity</SectionLabel>
                {txs.slice(0, 5).map((t) => (
                  <div key={t.id} className="fdemo-slide" style={{ display: "flex", alignItems: "center", gap: 10, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "10px 12px", marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>{CATS[t.category]?.emoji || "📦"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{t.person}</p>
                      <p style={{ fontSize: 10, color: T.dim }}>{t.category} · {t.date}</p>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: t.type === "debit" ? T.red : T.green }}>
                      {t.type === "debit" ? "-" : "+"}{fmt(t.amount)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {nav === "ledger" && (
              <div>
                <SectionLabel>All Transactions ({txs.length})</SectionLabel>
                {txs.map((t) => (
                  <div key={t.id} className="fdemo-slide" style={{ display: "flex", alignItems: "center", gap: 10, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "10px 12px", marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>{CATS[t.category]?.emoji || "📦"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{t.person}</p>
                      <p style={{ fontSize: 10, color: T.dim }}>{t.category} · {t.date} {t.time}</p>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: t.type === "debit" ? T.red : T.green }}>
                      {t.type === "debit" ? "-" : "+"}{fmt(t.amount)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {nav === "insights" && (
              <div>
                <SectionLabel>Overview</SectionLabel>
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
                  <p style={{ fontSize: 11, color: T.dim }}>TOTAL SPENT</p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: T.red, margin: "4px 0" }}>{fmt(totalDebit)}</p>
                  <p style={{ fontSize: 11, color: T.sub }}>Across {txs.filter(t => t.type === 'debit').length} expense entries</p>
                </div>
              </div>
            )}
          </div>

          {/* ---- input / voice bar ---- */}
          <div style={{ padding: "8px 14px 12px", background: T.card, borderTop: `1px solid ${T.cardBorder}`, flexShrink: 0 }}>
            {hint && <p style={{ fontSize: 11, color: T.orange, marginBottom: 4, textAlign: "center" }}>{hint}</p>}
            
            {inputMode === "voice" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={handleMic}
                  className={`fdemo-mic-live`}
                  style={{ width: 42, height: 42, borderRadius: "50%", background: T.grad, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                >
                  <Ic.Mic />
                </button>
                <div style={{ flex: 1, overflowX: "auto", display: "flex", gap: 6 }}>
                  {CHIPS.map((c) => (
                    <button key={c} className="fdemo-chip" onClick={() => handleSubmit(c)}>{c}</button>
                  ))}
                </div>
                <button className="fdemo-iconbtn" onClick={() => setInputMode("text")}><Ic.Keyboard /></button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(input); }}
                  placeholder='e.g. "Spent 500 on food"'
                  style={{ flex: 1, background: T.bg, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: "8px 12px", color: T.ink, fontSize: 12, outline: "none" }}
                />
                <button onClick={() => handleSubmit(input)} style={{ width: 34, height: 34, borderRadius: 10, background: T.orange, border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Ic.Send /></button>
                <button className="fdemo-iconbtn" onClick={() => setInputMode("voice")}><Ic.Mic style={{ width: 16, height: 16 }} /></button>
              </div>
            )}
          </div>

          {/* ---- bottom nav ---- */}
          <div style={{ display: "flex", background: T.bgElevated, borderTop: `1px solid ${T.cardBorder}`, flexShrink: 0 }}>
            {[
              { id: "home", label: "Home", icon: Ic.Home },
              { id: "ledger", label: "Ledger", icon: Ic.List },
              { id: "insights", label: "Insights", icon: Ic.Triangle },
            ].map((m) => {
              const Icon = m.icon;
              const active = nav === m.id;
              return (
                <button key={m.id} className="fdemo-navbtn" onClick={() => setNav(m.id)} style={{ color: active ? T.orange : T.dim }}>
                  <Icon />
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* ---- drawer modal ---- */}
          {drawer && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 40, display: "flex" }}>
              <div className="fdemo-drawer" style={{ width: "80%", background: T.bgElevated, height: "100%", padding: 18, overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: T.ink }}>Finexo Menu</p>
                  <button className="fdemo-iconbtn" onClick={() => setDrawer(false)}><Ic.X /></button>
                </div>
                {DRAWER_GROUPS.map((g) => (
                  <div key={g.label} style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: T.dim, marginBottom: 8 }}>{g.icon} {g.label}</p>
                    {g.items.map((it) => (
                      <button key={it} onClick={() => openDrawerItem(it)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "6px 0", color: T.sub, fontSize: 13, cursor: "pointer" }}>
                        {it}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Ask Finexo drawer ---- */}
          {chat && (
            <div style={{ position: "absolute", inset: 0, background: T.bgElevated, zIndex: 45, display: "flex", flexDirection: "column", padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>Ask Finexo AI 💬</p>
                <button className="fdemo-iconbtn" onClick={() => setChat(false)}><Ic.X /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                {thread.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.from === "user" ? "flex-end" : "flex-start", background: msg.from === "user" ? T.orange : T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "8px 12px", color: T.ink, fontSize: 12, maxWidth: "85%" }}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 8 }}>
                {ASK_CHIPS.map((c) => (
                  <button key={c} className="fdemo-chip" onClick={() => handleAsk(c)}>{c}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAsk(); }}
                  placeholder="Ask something..."
                  style={{ flex: 1, background: T.bg, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: "8px 12px", color: T.ink, fontSize: 12, outline: "none" }}
                />
                <button onClick={() => handleAsk()} style={{ width: 34, height: 34, borderRadius: 10, background: T.purple, border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Ic.Send /></button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
