import React, { useState, useMemo, useRef, useEffect } from "react";

/* ============================================================================
   FINEXO — LIVE APP DEMO v3
   Matches the real app's screens (dark navy UI, orange/red balance gradient,
   weather+AQI card, financial-health bar, payment-mode breakdown, hamburger
   drawer, Ask Finexo chat, Goals, Budget, EMI & Credit Cards, Reports
   scheduling, Insights filters/stats/weekday chart). All data below is
   generic placeholder demo data — no real transactions, balances, or account
   details. Self-contained — no Tailwind, no external deps.

   USAGE: import FinexoLiveDemo from "./FinexoLiveDemo";
          render <FinexoLiveDemo /> inside the #try-demo section of Finexo.jsx
   ============================================================================ */

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

/* ---------- demo data — illustrative only, no real account data ---------- */
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
  { id: 9, type: "debit", amount: 800, category: "health", person: "PHARMACY", date: "6 days ago", time: "05:30 PM", paymentMode: "Cash", note: "" },
  { id: 10, type: "debit", amount: 7294, category: "bills", person: "RENT", date: "8 days ago", time: "09:00 AM", paymentMode: "Net Banking", note: "" },
];

const CHIPS = ["Spent 500 on food", "Paid 200 to Rohan", "Got 2 lakh from client", "Spent 1200 on shopping"];
const ASK_CHIPS = ["What's my balance?", "How much did I spend on food?", "What was my biggest expense?"];
const QUICK_TEMPLATES = [
  { name: "Aditya Birla Sun Life PSU Equity Fund", tag: "Expense: INR 1000 · investment" },
  { name: "Nippon India Power & Infra Fund", tag: "Expense: INR 2500 · investment" },
  { name: "SBI Nifty 500 Index Fund", tag: "Expense: INR 1000 · investment" },
  { name: "ICICI Prudential Silver ETF EOF", tag: "Expense: INR 500 · investment" },
  { name: "Parag Parikh Flexi Cap Fund", tag: "Expense: INR 2500 · investment" },
  { name: "Motilal Oswal Midcap Fund", tag: "Expense: INR 1500 · investment" },
];
const EMI_CARDS = [
  { name: "Card 1", outstanding: 0, limit: 155000, paid: false },
  { name: "Card 2", outstanding: 8800, limit: 76000, paid: true },
];
const EMI_SUMMARY = [
  { name: "Card A", out: 0, limit: 70000 },
  { name: "Card B", out: 6350, limit: 70000 },
  { name: "Card C", out: 0, limit: 155000 },
  { name: "Card D", out: 9100, limit: 76000 },
];
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
  Gear: (p) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  Mic: (p) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="8" y1="22" x2="16" y2="22" /></svg>,
  Send: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  X: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Eye: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  Search: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  Menu: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  Keyboard: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="6" y1="9" x2="6" y2="9.01" /><line x1="10" y1="9" x2="10" y2="9.01" /><line x1="14" y1="9" x2="14" y2="9.01" /><line x1="18" y1="9" x2="18" y2="9.01" /><line x1="6" y1="13" x2="18" y2="13" /></svg>,
  Bolt: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>,
  Sun: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  Download: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  Upload: (p) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
  Edit: (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></svg>,
  Trash: (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
  Copy: (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
  ChevronLeft: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="15 18 9 12 15 6" /></svg>,
  Car: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>,
  Link: (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  Bell: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  Calendar: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
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
.fdemo-switch{width:38px;height:22px;border-radius:99px;position:relative;cursor:pointer;transition:.2s;flex-shrink:0;border:none;}
.fdemo-switch::after{content:'';position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.2s;}
.fdemo-switch.on::after{transform:translateX(16px);}
.fdemo-input::placeholder{color:${T.dim};}
.fdemo-bar{height:100%;border-radius:99px;transition:width .6s cubic-bezier(.16,1,.3,1);}
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

/* ---------- weather (illustrative demo data — real app pulls live GPS weather) ---------- */
const WEATHER = { temp: 29, desc: "Drizzle", emoji: "🌦️", city: "Ghaziabad", wind: 10, aqi: 104, aqiLabel: "Unhealthy (Sensitive)", aqiColor: "#f97316" };

export default function FinexoLiveDemo() {
  const [nav, setNav] = useState("home");
  const [txs, setTxs] = useState(SEED);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState("");
  const [inputMode, setInputMode] = useState("voice");
  const [darkMode, setDarkMode] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [quickAdd, setQuickAdd] = useState(false);
  const [chat, setChat] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const [showAmounts, setShowAmounts] = useState(true);
  const [question, setQuestion] = useState("");
  const [thread, setThread] = useState([{ from: "ai", text: "Ask me anything about your demo transactions." }]);
  const [goalSaved, setGoalSaved] = useState(0);
  const [budgetLimits, setBudgetLimits] = useState({ daily: 1000, weekly: 7000, monthly: 30000, enabled: true });
  const [insightsRange, setInsightsRange] = useState("Last Month");

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
  const filledSegments = Math.max(0, Math.min(10, Math.round(((savingsRate + 5) / 25) * 10)));

  const todaySpent = useMemo(() => txs.filter((t) => t.date === "Today" && t.type === "debit").reduce((s, t) => s + t.amount, 0), [txs]);
  const monthlyPct = Math.min((monthOut / budgetLimits.monthly) * 100, 100);

  const categoryTotals = useMemo(() => {
    const m = {};
    txs.filter((t) => t.type === "debit").forEach((t) => { m[t.category] = (m[t.category] || 0) + t.amount; });
    const total = Object.values(m).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(m).map(([cat, amt]) => ({ cat, amt, pct: (amt / total) * 100 })).sort((a, b) => b.amt - a.amt);
  }, [txs]);

  const modeTotals = useMemo(() => {
    const m = {};
    txs.filter((t) => t.type === "debit").forEach((t) => { m[t.paymentMode] = (m[t.paymentMode] || 0) + t.amount; });
    return Object.entries(m).map(([mode, amt]) => ({ mode, amt })).sort((a, b) => b.amt - a.amt).slice(0, 5);
  }, [txs]);

  const balanceTrend = useMemo(() => {
    let running = STARTING_BALANCE;
    const pts = [running];
    [...txs].reverse().forEach((t) => { running += t.type === "credit" ? t.amount : -t.amount; pts.push(running); });
    return pts;
  }, [txs]);

  const fmt = (n) => (showAmounts ? `INR ${Math.round(n).toLocaleString("en-IN")}` : "\u2022\u2022\u2022\u2022\u2022\u2022");
  const modeIcon = (m) => (m.toLowerCase().includes("cash") ? "💵" : "💰");
  const catLabel = (c) => c.charAt(0).toUpperCase() + c.slice(1);

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
    return "In the real app this is answered instantly from your actual transactions. Try a sample question, or download Finexo to ask about your real money.";
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
    else if (item === "Budget Limits") setBudgetOpen(true);
    else if (item === "Financial Goals") setGoalsOpen(true);
    else if (item === "EMI & Credit Cards") setEmiOpen(true);
    else if (item === "Reports & Schedules") setReportsOpen(true);
    else if (item === "Settings") { /* no-op in demo */ }
  };

  return (
    <div className="fdemo-wrap" style={{ display: "flex", justifyContent: "center" }}>
      <style>{CSS}</style>

      {/* ============ PHONE ============ */}
      <div className="fdemo-phone">
        <div className="fdemo-notch" />
        <div className="fdemo-screen">

          {/* ---- top bar ---- */}
          <div style={{ padding: "30px 16px 12px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button className="fdemo-iconbtn" onClick={() => setDrawer(true)}><Ic.Menu /></button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 17, color: T.orange, lineHeight: 1 }}>Finexo</p>
              <p style={{ fontSize: 10.5, color: T.dim, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Hi there!</p>
            </div>
            <button className="fdemo-iconbtn" onClick={() => setInputMode((m) => (m === "voice" ? "text" : "voice"))} title="Toggle input">
              {inputMode === "voice" ? <Ic.Keyboard /> : <Ic.Mic style={{ width: 15, height: 15 }} />}
            </button>
            <button className="fdemo-iconbtn" style={{ color: T.orange, borderColor: "#f9731655" }} onClick={() => setQuickAdd(true)} title="Quick Add"><Ic.Bolt /></button>
            <button className="fdemo-iconbtn" onClick={() => setDarkMode((d) => !d)} title="Theme"><Ic.Sun /></button>
          </div>

          {/* ---- live rates banner ---- */}
          <div style={{ background: T.green, color: "#06210f", fontSize: 11, fontWeight: 700, textAlign: "center", padding: "6px 0", flexShrink: 0 }}>
            💱 Live rates updated {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </div>

          <div ref={scrollRef} className="fdemo-scroll" style={{ padding: "0 16px 100px" }}>

            {/* ============ HOME ============ */}
            {nav === "home" && (
              <div className="fdemo-slide" style={{ paddingTop: 14 }}>
                {/* balance card */}
                <div style={{ background: T.grad, borderRadius: 22, padding: "22px 20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>Total Balance</p>
                    <span style={{ background: "rgba(255,255,255,.22)", color: "#fff", fontSize: 10.5, fontWeight: 700, borderRadius: 99, padding: "3px 10px" }}>👑 Premium</span>
                  </div>
                  <p style={{ fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: "4px 0 16px" }}>{fmt(balance)}</p>
                  <div style={{ display: "flex", gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,.7)" }}>This month in</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>+{fmt(monthIn)}</p>
                    </div>
                    <div style={{ width: 1, background: "rgba(255,255,255,.3)" }} />
                    <div>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,.7)" }}>This month out</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>-{fmt(monthOut)}</p>
                    </div>
                  </div>
                </div>

                {/* weather + AQI */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 30 }}>{WEATHER.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: T.ink }}>{WEATHER.temp}°C <span style={{ fontSize: 11, fontWeight: 500, color: T.sub }}>{WEATHER.desc}</span></p>
                    <p style={{ fontSize: 10.5, color: T.dim }}>{WEATHER.city} · 💨 {WEATHER.wind} km/h</p>
                    <p style={{ fontSize: 10.5, fontWeight: 700, color: WEATHER.aqiColor, marginTop: 2 }}>● AQI {WEATHER.aqi} · {WEATHER.aqiLabel}</p>
                  </div>
                </div>

                {/* quick actions */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
                  {[["📊", "Analytics", () => setNav("insights")], ["📋", "Reports", () => setReportsOpen(true)], ["👥", "Groups", () => setDrawer(true)], ["🎯", "Goals", () => setGoalsOpen(true)]].map(([e, l, fn]) => (
                    <button key={l} onClick={fn} style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "12px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                      <span style={{ fontSize: 18 }}>{e}</span>
                      <span style={{ fontSize: 9.5, color: T.sub, fontWeight: 500 }}>{l}</span>
                    </button>
                  ))}
                </div>

                {/* financial health */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <p style={{ fontWeight: 700, fontSize: 13.5, color: T.ink }}>Financial Health</p>
                    <span style={{ background: healthColor + "22", color: healthColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{healthLabel}</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                    {[...Array(10)].map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < filledSegments ? healthColor : T.cardBorder }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 11.5, color: T.dim }}>Savings rate: {savingsRate.toFixed(1)}% {savingsRate < 20 && "· Aim for 20%+"}</p>
                </div>

                {/* today's budget */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <p style={{ fontWeight: 700, fontSize: 13.5, color: T.ink }}>Today's Budget</p>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: budgetLimits.daily - todaySpent >= 0 ? T.green : T.red }}>
                      INR {Math.abs(budgetLimits.daily - todaySpent).toLocaleString("en-IN")} {budgetLimits.daily - todaySpent >= 0 ? "left" : "over"}
                    </span>
                  </div>
                  <div style={{ height: 6, background: T.cardBorder, borderRadius: 99, overflow: "hidden" }}>
                    <div className="fdemo-bar" style={{ width: `${Math.min((todaySpent / budgetLimits.daily) * 100, 100)}%`, background: todaySpent > budgetLimits.daily ? T.red : T.green }} />
                  </div>
                  <p style={{ fontSize: 10.5, color: T.dim, marginTop: 6 }}>INR {todaySpent.toLocaleString("en-IN")} of INR {budgetLimits.daily.toLocaleString("en-IN")} spent</p>
                </div>

                {/* payment mode breakdown */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <SectionLabel>This Month by Payment Mode</SectionLabel>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {modeTotals.map(({ mode, amt }) => (
                      <div key={mode} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{modeIcon(mode)}</span>
                        <span style={{ flex: 1, fontSize: 12.5, color: T.sub }}>{mode}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{fmt(amt)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* recent */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <SectionLabel>Recent</SectionLabel>
                  <button onClick={() => setNav("ledger")} style={{ background: "none", border: "none", color: T.orange, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>See all</button>
                </div>
                {txs.slice(0, 4).map((t) => <TxRow key={t.id} t={t} fmt={fmt} />)}
              </div>
            )}

            {/* ============ LEDGER ============ */}
            {nav === "ledger" && (
              <div className="fdemo-slide" style={{ paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div>
                    <p style={{ fontSize: 19, fontWeight: 700, color: T.ink }}>Transactions</p>
                    <p style={{ fontSize: 11, color: T.dim, marginTop: 2 }}>{txs.length} total · {txs.filter((t) => t.type === "debit").length} expenses · {txs.filter((t) => t.type === "credit").length} income</p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="fdemo-iconbtn" onClick={() => setShowAmounts((s) => !s)}><Ic.Eye /></button>
                    <button className="fdemo-iconbtn"><Ic.Search /></button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, margin: "12px 0 14px" }}>
                  {[["Select", null, "#6366f1"], ["Export", <Ic.Download />, T.green], ["Import", <Ic.Upload />, T.blue]].map(([label, icon, col]) => (
                    <button key={label} onClick={() => { setHint(`${label} works in the full app`); setTimeout(() => setHint(""), 1800); }}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: col, color: "#fff", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
                {hint && <p style={{ fontSize: 11, color: T.orange, marginBottom: 8, textAlign: "center" }}>{hint}</p>}
                {txs.map((t) => <TxRow key={t.id} t={t} fmt={fmt} detailed />)}
              </div>
            )}

            {/* ============ INSIGHTS ============ */}
            {nav === "insights" && (
              <div className="fdemo-slide" style={{ paddingTop: 14 }}>
                {/* time-range filter chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {["All Time", "Last 7 Days", "Last Month", "3 Months", "6 Months", "Year"].map((label) => (
                    <button key={label} onClick={() => setInsightsRange(label)}
                      style={{ background: insightsRange === label ? T.orange : T.card, color: insightsRange === label ? "#fff" : T.sub, border: `1px solid ${insightsRange === label ? T.orange : T.cardBorder}`, borderRadius: 10, padding: "8px 12px", fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* health score circle */}
                <div style={{ background: "linear-gradient(135deg,#7c3aed,#4338ca)", borderRadius: 18, padding: "18px 20px", marginBottom: 14, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 70, height: 70, borderRadius: "50%", border: "5px solid rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{Math.max(0, Math.min(100, Math.round(60 + savingsRate)))}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>💪 Financial Health Score</p>
                    <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.85)", marginTop: 2 }}>{healthLabel === "Healthy" ? "Excellent! 🎉" : healthLabel}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2 }}>Savings rate: {savingsRate.toFixed(1)}%</p>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {savingsRate >= 10 && <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 20, padding: "3px 8px" }}>✅ Good Savings</span>}
                      {monthIn >= monthOut && <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 20, padding: "3px 8px" }}>✅ Income &gt; Expenses</span>}
                    </div>
                  </div>
                </div>

                {/* stat grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[
                    ["Total Debit", `INR ${monthOut.toLocaleString("en-IN")}`, T.red, `${txs.filter((t) => t.type === "debit").length} transactions`],
                    ["Total Credit", `INR ${monthIn.toLocaleString("en-IN")}`, T.green, "Income sources"],
                    ["Balance", fmt(balance), T.green, null],
                    ["Daily Avg", `INR ${Math.round(monthOut / 7).toLocaleString("en-IN")}`, T.blue, null],
                  ].map(([label, val, col, sub]) => (
                    <div key={label} style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "12px 14px" }}>
                      <p style={{ fontSize: 10.5, color: T.dim, marginBottom: 4 }}>{label}</p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: col }}>{val}</p>
                      {sub && <p style={{ fontSize: 9.5, color: T.dim, marginTop: 2 }}>{sub}</p>}
                    </div>
                  ))}
                </div>

                {/* top categories */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <SectionLabel>Top Categories</SectionLabel>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <Donut segments={categoryTotals.slice(0, 6)} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                      {categoryTotals.slice(0, 5).map((c, i) => (
                        <div key={c.cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 2, background: DONUT_COLORS[i % DONUT_COLORS.length], flexShrink: 0 }} />
                          <span style={{ fontSize: 10.5, color: T.sub, flex: 1 }}>{catLabel(c.cat)}</span>
                          <span style={{ fontSize: 10.5, fontWeight: 700, color: T.ink }}>{c.pct.toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* monthly budget gauge */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <SectionLabel>Monthly Budget</SectionLabel>
                  <Gauge pct={monthlyPct} />
                  <p style={{ textAlign: "center", fontSize: 11.5, color: T.dim, marginTop: 4 }}>INR {monthOut.toLocaleString("en-IN")} / INR {budgetLimits.monthly.toLocaleString("en-IN")}</p>
                </div>

                {/* balance trend */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <SectionLabel>Balance Trend</SectionLabel>
                  <TrendChart points={balanceTrend} />
                </div>

                {/* spending by weekday */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <SectionLabel>Spending by Weekday</SectionLabel>
                  <WeekdayChart txs={txs} />
                </div>

                {/* payment modes pie */}
                <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
                  <SectionLabel>Payment Modes</SectionLabel>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Donut segments={modeTotals.map((m) => ({ cat: m.mode, amt: m.amt }))} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---- ledger input dock ---- */}
          {nav === "ledger" && (
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 78, padding: "0 16px" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, overflowX: "auto" }}>
                {CHIPS.map((c) => <button key={c} className="fdemo-chip" onClick={() => handleSubmit(c)}>{c}</button>)}
              </div>
              {inputMode === "text" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <input className="fdemo-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit(input)}
                    placeholder='Type: "Spent 500 on food"' style={{ flex: 1, background: T.card, border: `1.5px solid ${T.cardBorder}`, borderRadius: 99, padding: "10px 15px", fontSize: 12.5, color: T.ink, outline: "none" }} />
                  <button onClick={() => handleSubmit(input)} style={{ background: T.grad, border: "none", borderRadius: 99, padding: "0 16px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Add</button>
                </div>
              ) : (
                <p style={{ fontSize: 10.5, color: T.dim, textAlign: "center" }}>Tap the mic below and speak a transaction</p>
              )}
            </div>
          )}

          {/* ---- bottom nav ---- */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: T.bgElevated, borderTop: `1px solid ${T.cardBorder}`, display: "flex", alignItems: "flex-end", height: 74 }}>
            {[["home", Ic.Home, "Home"], ["ledger", Ic.List, "Ledger"]].map(([id, Icon, label]) => (
              <button key={id} className="fdemo-navbtn" onClick={() => setNav(id)} style={{ color: nav === id ? T.orange : T.dim }}>
                <Icon /><span style={{ fontSize: 9.5, fontWeight: nav === id ? 700 : 500 }}>{label}</span>
              </button>
            ))}
            <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center" }}>
              <button onClick={() => (inputMode === "text" ? setNav("ledger") : handleMic())} className={listening ? "fdemo-mic-live" : ""}
                style={{ position: "absolute", bottom: 14, width: 58, height: 58, borderRadius: "50%", border: "3px solid " + T.bgElevated, background: listening ? T.red : T.grad, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 20px rgba(249,115,22,.4)" }}>
                {inputMode === "text" ? <Ic.Keyboard style={{ color: "#fff" }} /> : <Ic.Mic />}
              </button>
            </div>
            {[["insights", Ic.Triangle, "Insights"], ["settings", Ic.Gear, "Settings"]].map(([id, Icon, label]) => (
              <button key={id} className="fdemo-navbtn" onClick={() => (id === "settings" ? setBudgetOpen(true) : setNav(id))} style={{ color: nav === id ? T.orange : T.dim }}>
                <Icon /><span style={{ fontSize: 9.5, fontWeight: nav === id ? 700 : 500 }}>{label}</span>
              </button>
            ))}
          </div>

          {/* ---- listening overlay ---- */}
          {listening && (
            <div style={{ position: "absolute", left: "50%", bottom: 100, transform: "translateX(-50%)", background: T.bgElevated, border: `1px solid ${T.cardBorder}`, borderRadius: 99, padding: "8px 16px", display: "flex", alignItems: "center", gap: 10, zIndex: 30 }}>
              <Wave /><span style={{ fontSize: 11, color: T.sub }}>Listening…</span>
            </div>
          )}

          {/* ---- hamburger drawer ---- */}
          {drawer && (
            <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)" }} onClick={() => setDrawer(false)} />
              <div className="fdemo-drawer" style={{ position: "relative", width: "80%", background: T.bgElevated, borderRight: `1px solid ${T.cardBorder}`, padding: "26px 16px", overflowY: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, paddingBottom: 16, borderBottom: `1px solid ${T.cardBorder}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.orange, color: "#fff", fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>F</div>
                  <div><p style={{ fontWeight: 700, fontSize: 14.5, color: T.ink }}>Demo User</p><p style={{ fontSize: 11, color: T.dim }}>👑 Premium</p></div>
                </div>
                {DRAWER_GROUPS.map((g) => (
                  <div key={g.label} style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 700, color: T.sub, display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span>{g.icon}</span>{g.label}</p>
                    {g.items.map((it) => (
                      <button key={it} onClick={() => openDrawerItem(it)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: T.ink, fontSize: 12.5, padding: "7px 10px 7px 26px", borderRadius: 8, cursor: "pointer" }}>{it}</button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- quick add ---- */}
          {quickAdd && (
            <Sheet title="⚡ Quick Add" onClose={() => setQuickAdd(false)}>
              {QUICK_TEMPLATES.map((tpl) => (
                <div key={tpl.name} style={{ display: "flex", alignItems: "center", gap: 10, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0f1720", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 13 }}>📈</span></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: T.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tpl.name}</p>
                    <p style={{ fontSize: 10, color: T.dim }}>{tpl.tag}</p>
                  </div>
                  <button onClick={() => { handleSubmit(tpl.tag.replace("Expense: INR", "Spent") + " on investment"); setQuickAdd(false); }}
                    style={{ background: T.orange, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" }}>Use</button>
                </div>
              ))}
            </Sheet>
          )}

          {/* ---- goals ---- */}
          {goalsOpen && (
            <Sheet
              title="Financial Goals"
              subtitle="Track progress toward what matters"
              onClose={() => setGoalsOpen(false)}
              action={{ label: "+ New Goal", onClick: () => { setHint("Add-goal flow works in the full app"); setTimeout(() => setHint(""), 1800); } }}
            >
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Ic.Car style={{ color: T.red }} />
                    <div><p style={{ fontWeight: 700, fontSize: 14, color: T.ink }}>Car</p><p style={{ fontSize: 10.5, color: T.dim }}>Target: INR 10,00,000 · 235 days left</p></div>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, background: T.green + "22", color: T.green, fontSize: 10.5, fontWeight: 700, borderRadius: 8, padding: "5px 8px" }}><Ic.Link />Auto</span>
                </div>
                {(() => {
                  const saved = Math.max(0, balance) + goalSaved;
                  const target = 1000000;
                  const pct = Math.min((saved / target) * 100, 100);
                  return (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, color: T.ink }}>INR {saved.toLocaleString("en-IN")} saved</span>
                        <span style={{ color: T.dim }}>{pct.toFixed(0)}%</span>
                      </div>
                      <div style={{ height: 10, background: T.cardBorder, borderRadius: 99, overflow: "hidden", marginBottom: 12 }}>
                        <div className="fdemo-bar" style={{ width: `${Math.max(pct, 3)}%`, background: T.dim }} />
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input id="goalAdd" placeholder="Add amount saved (INR)" style={{ flex: 1, background: "#0f1720", border: `1px solid ${T.cardBorder}`, borderRadius: 10, padding: "9px 12px", fontSize: 12, color: T.ink, outline: "none" }} />
                        <button onClick={() => { const el = document.getElementById("goalAdd"); const v = parseFloat(el.value) || 0; if (v > 0) setGoalSaved((s) => s + v); if (el) el.value = ""; }}
                          style={{ background: T.green, color: "#fff", border: "none", borderRadius: 10, padding: "0 16px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>+ Add</button>
                      </div>
                      <p style={{ fontSize: 11, color: T.dim, marginTop: 10 }}>🚀 Every rupee counts! Need INR {Math.max(0, target - saved).toLocaleString("en-IN")} more.</p>
                    </>
                  );
                })()}
              </div>
            </Sheet>
          )}

          {/* ---- budget ---- */}
          {budgetOpen && (
            <Sheet title="Budget Limits" subtitle="Set spending limits and get smart alerts" onClose={() => setBudgetOpen(false)}>
              <div style={{ background: T.card, border: `1.5px solid ${T.green}`, borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: T.ink }}>🐷 Budget Tracking</p>
                    <p style={{ fontSize: 10.5, color: T.dim }}>{budgetLimits.enabled ? "Active — monitoring your spending" : "Get alerts when you exceed limits"}</p>
                  </div>
                  <button className={"fdemo-switch" + (budgetLimits.enabled ? " on" : "")} onClick={() => setBudgetLimits((b) => ({ ...b, enabled: !b.enabled }))} style={{ background: budgetLimits.enabled ? T.green : "#333949" }} />
                </div>
                {[["Daily Limit", "daily", T.blue], ["Weekly Limit", "weekly", T.purple], ["Monthly Limit", "monthly", T.orange]].map(([label, key, col]) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 10.5, fontWeight: 700, color: col, marginBottom: 4 }}>{label}</p>
                    <input type="number" value={budgetLimits[key]} onChange={(e) => setBudgetLimits((b) => ({ ...b, [key]: parseFloat(e.target.value) || 0 }))}
                      style={{ width: "100%", background: "#0f1720", border: `1.5px solid ${T.cardBorder}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, fontWeight: 700, color: T.ink, outline: "none" }} />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8, background: "#0f1720", borderRadius: 10, padding: 10, marginTop: 8 }}>
                  <Ic.Bell style={{ color: T.blue, flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 10.5, color: T.sub, lineHeight: 1.5 }}>You'll get notified at 25%, 10%, 5% and 1% of your limit remaining.</p>
                </div>
              </div>
            </Sheet>
          )}

          {/* ---- EMI & Credit Cards ---- */}
          {emiOpen && (
            <Sheet title="EMI & Credit Cards" subtitle="Track every loan and card in one place" onClose={() => setEmiOpen(false)}>
              {EMI_CARDS.map((c) => {
                const pct = Math.min((c.outstanding / c.limit) * 100, 100);
                return (
                  <div key={c.name} style={{ background: T.grad, borderRadius: 16, padding: "16px 18px", marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{c.name}</p>
                        <p style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 4 }}>INR {c.outstanding.toLocaleString("en-IN")}</p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,.75)" }}>of INR {c.limit.toLocaleString("en-IN")}</p>
                      </div>
                      <span style={{ background: "rgba(255,255,255,.22)", color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "5px 12px" }}>
                        {c.paid ? "✅ Paid" : "Mark Paid"}
                      </span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,.25)", borderRadius: 99, marginTop: 12, overflow: "hidden" }}>
                      <div className="fdemo-bar" style={{ width: `${pct}%`, background: "#fff" }} />
                    </div>
                  </div>
                );
              })}

              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "14px 16px", marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <p style={{ fontWeight: 700, fontSize: 13.5, color: T.ink }}>📋 Credit Card Summary</p>
                  <button onClick={() => { setHint("Download works in the full app"); setTimeout(() => setHint(""), 1800); }}
                    style={{ background: T.green, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Ic.Download /> Download
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 0.6fr", fontSize: 10.5, color: T.dim, fontWeight: 700, paddingBottom: 8, borderBottom: `1px solid ${T.cardBorder}` }}>
                  <span>Card</span><span>Outstanding</span><span>Limit</span><span>Util%</span>
                </div>
                {EMI_SUMMARY.map((r) => (
                  <div key={r.name} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 0.6fr", fontSize: 11.5, color: T.ink, padding: "9px 0", borderBottom: `1px solid ${T.cardBorder}` }}>
                    <span>{r.name}</span>
                    <span>INR {r.out.toLocaleString("en-IN")}</span>
                    <span>INR {r.limit.toLocaleString("en-IN")}</span>
                    <span>{Math.round((r.out / r.limit) * 100)}%</span>
                  </div>
                ))}
              </div>
            </Sheet>
          )}

          {/* ---- reports ---- */}
          {reportsOpen && (
            <Sheet title="Schedule Report Reminders" subtitle="Get notifications to remind you to download reports" onClose={() => setReportsOpen(false)}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
                <Ic.Bell style={{ color: T.orange }} />
                <div style={{ flex: 1 }}><p style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>Enable Scheduled Reminders</p><p style={{ fontSize: 10.5, color: "#666" }}>Get notified to download reports</p></div>
                <div className="fdemo-switch on" style={{ background: T.orange }} />
              </div>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: T.dim, marginBottom: 6 }}>Report Frequency</p>
              <div style={{ background: T.card, border: `1px solid ${T.orange}`, borderRadius: 10, padding: "10px 12px", color: T.ink, fontSize: 13, marginBottom: 12 }}>Daily</div>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: T.dim, marginBottom: 6 }}>Reminder Time</p>
              <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 10, padding: "10px 12px", color: T.ink, fontSize: 13, marginBottom: 14 }}>09:00</div>
              <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Ic.Calendar style={{ color: T.red }} />
                <div>
                  <p style={{ fontSize: 10, color: "#666", fontWeight: 600 }}>Next Reminder:</p>
                  <p style={{ fontSize: 12.5, color: "#111", fontWeight: 700 }}>
                    {new Date(Date.now() + 86400000).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}, 09:00 AM
                  </p>
                </div>
              </div>
              <button onClick={() => { setReportsOpen(false); setHint("Reminder set — full scheduling in the app"); }} style={{ width: "100%", background: T.purple, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>🔔 Send Test Notification</button>
            </Sheet>
          )}

          {/* ---- Ask Finexo chat overlay ---- */}
          {chat && (
            <div style={{ position: "absolute", inset: 0, zIndex: 60, background: T.bg, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "30px 18px 14px", borderBottom: `1px solid ${T.cardBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>💬</span>
                <p style={{ flex: 1, fontWeight: 700, fontSize: 14.5, color: T.ink }}>Ask Finexo</p>
                <button onClick={() => setChat(false)} style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 9, width: 28, height: 28, color: T.sub, cursor: "pointer" }}><Ic.X /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {thread.map((m, i) => (
                  <div key={i} className="fdemo-slide" style={{ maxWidth: "82%", alignSelf: m.from === "ai" ? "flex-start" : "flex-end", background: m.from === "ai" ? T.card : T.purple, color: m.from === "ai" ? T.ink : "#fff", border: m.from === "ai" ? `1px solid ${T.cardBorder}` : "none", borderRadius: m.from === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", padding: "10px 13px", fontSize: 12.5, lineHeight: 1.5 }}>{m.text}</div>
                ))}
              </div>
              <div style={{ padding: "14px 16px 18px", borderTop: `1px solid ${T.cardBorder}` }}>
                <div style={{ display: "flex", alignItems: "center", background: T.card, border: `1.5px solid ${T.cardBorder}`, borderRadius: 14, padding: "6px 6px 6px 14px", marginBottom: 10 }}>
                  <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAsk()} placeholder="Type or speak your question…"
                    style={{ flex: 1, background: "transparent", border: "none", fontSize: 12.5, color: T.ink, outline: "none" }} />
                  <button onClick={() => handleAsk()} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: T.orange, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic.Mic style={{ width: 15, height: 15 }} /></button>
                </div>
                <button onClick={() => handleAsk()} style={{ width: "100%", background: T.purple, color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 12 }}>Ask</button>
                <p style={{ fontSize: 11, fontWeight: 700, color: T.sub, marginBottom: 6 }}>💡 Try asking:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {ASK_CHIPS.map((c) => (
                    <button key={c} onClick={() => handleAsk(c)} style={{ background: "none", border: "none", textAlign: "left", color: T.dim, fontSize: 11.5, padding: "2px 0", cursor: "pointer" }}>
                      • "{c}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* floating Ask Finexo bubble on Insights tab */}
          {nav === "insights" && !chat && (
            <button onClick={() => setChat(true)} style={{ position: "absolute", right: 16, bottom: 92, width: 52, height: 52, borderRadius: "50%", background: T.purple, border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(168,85,247,.45)", cursor: "pointer", zIndex: 25 }}>
              <span style={{ fontSize: 22 }}>💬</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- sub components ---------- */
const DONUT_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"];

function Donut({ segments }) {
  const total = segments.reduce((s, x) => s + x.amt, 0) || 1;
  let acc = 0;
  const stops = segments.map((s, i) => {
    const start = (acc / total) * 100;
    acc += s.amt;
    const end = (acc / total) * 100;
    return `${DONUT_COLORS[i % DONUT_COLORS.length]} ${start}% ${end}%`;
  });
  return (
    <div style={{ width: 84, height: 84, borderRadius: "50%", background: `conic-gradient(${stops.join(",")})`, flexShrink: 0, position: "relative" }}>
      <div style={{ position: "absolute", inset: 14, borderRadius: "50%", background: T.card }} />
    </div>
  );
}

function Gauge({ pct }) {
  const angle = Math.min(pct, 100) * 1.8; // 0-180deg
  const color = pct > 90 ? T.red : pct > 70 ? T.orange : T.green;
  return (
    <div style={{ position: "relative", width: "100%", height: 74, display: "flex", justifyContent: "center" }}>
      <svg width="160" height="80" viewBox="0 0 160 80">
        <path d="M10 78 A70 70 0 0 1 150 78" fill="none" stroke={T.cardBorder} strokeWidth="12" strokeLinecap="round" />
        <path d="M10 78 A70 70 0 0 1 150 78" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 220} 220`} />
      </svg>
      <span style={{ position: "absolute", bottom: 0, fontSize: 20, fontWeight: 700, color: T.ink }}>{pct.toFixed(0)}%</span>
    </div>
  );
}

function TrendChart({ points }) {
  const w = 280, h = 90, pad = 4;
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const step = (w - pad * 2) / (points.length - 1 || 1);
  const coords = points.map((p, i) => [pad + i * step, h - pad - ((p - min) / range) * (h - pad * 2)]);
  const line = coords.map((c, i) => (i === 0 ? `M${c[0]},${c[1]}` : `L${c[0]},${c[1]}`)).join(" ");
  const area = `${line} L${coords[coords.length - 1][0]},${h} L${coords[0][0]},${h} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id="fdTrendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.blue} stopOpacity="0.5" />
          <stop offset="100%" stopColor={T.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#fdTrendGrad)" />
      <path d={line} fill="none" stroke={T.blue} strokeWidth="2" />
    </svg>
  );
}

function WeekdayChart({ txs }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const buckets = days.map(() => 0);
  txs.filter((t) => t.type === "debit").forEach((t, i) => { buckets[i % 7] += t.amount; });
  const max = Math.max(...buckets, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
      {days.map((d, i) => (
        <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: "100%", height: 70, display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: `${(buckets[i] / max) * 100}%`, background: T.orange, borderRadius: "4px 4px 0 0", minHeight: 2 }} />
          </div>
          <span style={{ fontSize: 9.5, color: T.dim }}>{d}</span>
        </div>
      ))}
    </div>
  );
}

function Sheet({ title, subtitle, onClose, action, children }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "flex-end", zIndex: 45 }}>
      <div className="fdemo-sheet" style={{ width: "100%", maxHeight: "88%", overflowY: "auto", background: T.bgElevated, borderRadius: "24px 24px 0 0", padding: 20, borderTop: `1px solid ${T.cardBorder}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: subtitle ? 4 : 14, gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: T.ink }}>{title}</p>
            {subtitle && <p style={{ fontSize: 11, color: T.dim, marginTop: 4 }}>{subtitle}</p>}
          </div>
          {action && (
            <button onClick={action.onClick} style={{ background: T.orange, border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
              {action.label}
            </button>
          )}
          <button onClick={onClose} style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 9, width: 28, height: 28, color: T.sub, cursor: "pointer", flexShrink: 0 }}><Ic.X /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function TxRow({ t, fmt, detailed }) {
  return (
    <div className="fdemo-slide" style={{ display: "flex", alignItems: "flex-start", gap: 11, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 15, padding: "11px 13px", marginBottom: 9 }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, background: t.type === "debit" ? "rgba(239,68,68,.12)" : "rgba(34,197,94,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
        {CATS[t.category]?.emoji || "📦"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{t.person}</p>
        <p style={{ fontSize: 10.5, color: T.dim, textTransform: "capitalize" }}>{t.category} · {t.date} {t.time}</p>
        {detailed && t.note && <p style={{ fontSize: 10.5, color: T.blue, fontStyle: "italic", marginTop: 2 }}>{t.note}</p>}
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontSize: 13.5, fontWeight: 700, color: t.type === "debit" ? T.red : T.green }}>{t.type === "debit" ? "-" : "+"}{fmt(t.amount)}</p>
        {detailed && (
          <div style={{ display: "flex", gap: 4, marginTop: 6, justifyContent: "flex-end" }}>
            {[[Ic.Copy, T.green], [Ic.Edit, T.blue], [Ic.Trash, T.red]].map(([Icon, col], i) => (
              <span key={i} style={{ width: 20, height: 20, borderRadius: 5, background: col, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Icon /></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
