import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  .contact-bg {
    background-color: #f8fafc;
    position: relative;
  }

  /* Dot pattern sits behind everything via pseudo-element */
  .contact-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
    background-size: 28px 28px;
    z-index: 0;
    pointer-events: none;
  }

  /* All direct children sit above the dot layer */
  .contact-bg > * {
    position: relative;
    z-index: 1;
  }

  /* Glowing form card */
  .form-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    transition: box-shadow 0.4s, border-color 0.4s;
  }
  .form-card:focus-within {
    box-shadow: 0 0 0 4px rgba(59,130,246,0.07), 0 20px 60px -12px rgba(59,130,246,0.12);
    border-color: #bfdbfe;
  }

  /* Floating label inputs */
  .field-wrap { position: relative; }
  .field-wrap input,
  .field-wrap textarea {
    width: 100%;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    padding: 18px 40px 6px 16px;
    font-size: 15px;
    color: #0f172a;
    outline: none;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    resize: none;
    font-family: inherit;
    line-height: 1.5;
  }
  .field-wrap textarea {
    padding-top: 24px;
    padding-bottom: 10px;
    height: 120px;
  }
  .field-wrap input:focus,
  .field-wrap textarea:focus {
    border-color: #3b82f6;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
  }
  .field-label {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #94a3b8;
    pointer-events: none;
    transition: top 0.22s cubic-bezier(.22,.68,0,1.1),
                font-size 0.22s, color 0.22s, transform 0.22s;
  }
  .field-wrap textarea ~ .field-label {
    top: 20px;
    transform: none;
  }
  .field-wrap input:focus ~ .field-label,
  .field-wrap input.has-val ~ .field-label,
  .field-wrap textarea:focus ~ .field-label,
  .field-wrap textarea.has-val ~ .field-label {
    top: 8px;
    transform: none;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #3b82f6;
  }
  .req-star { color: #ef4444; margin-left: 1px; }

  /* Validation tick */
  .field-tick {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%) scale(0);
    opacity: 0;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.4), opacity 0.3s;
  }
  .field-tick.show {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
  .field-wrap textarea ~ .field-tick {
    top: 18px;
    transform: scale(0);
  }
  .field-wrap textarea.has-val ~ .field-tick.show {
    transform: scale(1);
  }

  /* Submit button */
  .submit-btn {
    position: relative;
    overflow: hidden;
    background: #1d4ed8;
    color: #fff;
    border: none;
    border-radius: 9999px;
    padding: 13px 36px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 60%);
    pointer-events: none;
  }
  .submit-btn:hover {
    background: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -6px rgba(29,78,216,0.42);
  }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn.loading { pointer-events: none; background: #3b82f6; }

  /* Left panel — solid background so dots don't bleed through */
  .left-panel {
    background: #eef5ff;
    border: 1px solid #dbeafe;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
  }
  .left-panel::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    background: radial-gradient(circle, rgba(96,165,250,0.22) 0%, transparent 70%);
    pointer-events: none;
  }
  .left-panel::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -40px;
    width: 160px; height: 160px;
    background: radial-gradient(circle, rgba(147,197,253,0.16) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Benefit row hover */
  .benefit-row {
    border-radius: 10px;
    cursor: default;
    transition: background 0.2s, transform 0.2s;
  }
  .benefit-row:hover {
    background: rgba(59,130,246,0.06);
    transform: translateX(4px);
  }

  /* Benefit entrance */
  @keyframes benefitIn {
    from { opacity:0; transform: translateX(-12px); }
    to   { opacity:1; transform: translateX(0); }
  }
  .benefit-item { animation: benefitIn 0.45s cubic-bezier(.22,.68,0,1.1) both; }

  /* Pulse ring on contact icons */
  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: 0.5; }
    100% { transform: scale(1.75); opacity: 0; }
  }
  .pulse-ring { position: relative; }
  .pulse-ring::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    border: 1.5px solid #93c5fd;
    animation: pulseRing 2.2s ease-out infinite;
  }

  /* Progress bar */
  .progress-track {
    background: #e2e8f0;
    border-radius: 9999px;
    height: 4px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    border-radius: 9999px;
    transition: width 0.4s cubic-bezier(.22,.68,0,1.1);
  }

  /* Live dot */
  @keyframes dotPulse {
    0%,100% { opacity:0.4; transform:scale(1); }
    50%      { opacity:1;   transform:scale(1.6); }
  }
  .dot-live { animation: dotPulse 2.6s ease-in-out infinite; }

  /* Success check */
  @keyframes checkDraw {
    from { stroke-dashoffset: 40; }
    to   { stroke-dashoffset: 0; }
  }
  .check-path {
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
    animation: checkDraw 0.5s 0.1s ease forwards;
  }

  /* Fade-up on mount */
  .fade-up {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.6s cubic-bezier(.22,.68,0,1.1),
                transform 0.6s cubic-bezier(.22,.68,0,1.1);
  }
  .fade-up.visible { opacity:1; transform:translateY(0); }

  /* Trust strip */
  .trust-strip {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
  }
  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }
  .trust-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: #eff6ff;
    border: 1px solid #dbeafe;
    display: flex; align-items: center; justify-content: center;
    color: #3b82f6;
    flex-shrink: 0;
  }
`;

// ── SVG Icon library ──────────────────────────────────────────────────────────
const icons = {
  check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-4 h-4"
    >
      <polyline
        points="20 6 9 17 4 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  phone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-4 h-4"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-4 h-4"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  pin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-4 h-4"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  arrow: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-4 h-4"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  spinner: (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        strokeLinecap="round"
      />
    </svg>
  ),
  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-3.5 h-3.5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  zap: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-3.5 h-3.5"
    >
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  globe: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-3.5 h-3.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  ),
  cpu: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className="w-4 h-4 text-blue-500"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  ),
  layers: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className="w-4 h-4 text-blue-500"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  trending: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className="w-4 h-4 text-blue-500"
    >
      <polyline
        points="23 6 13.5 15.5 8.5 10.5 1 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="17 6 23 6 23 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  message: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className="w-4 h-4 text-blue-500"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  lock: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      className="w-4 h-4 text-blue-500"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: icons.cpu,
    text: "Smart, reliable tech solutions tailored to your business needs.",
  },
  {
    icon: icons.layers,
    text: "End-to-end support from concept to live deployment.",
  },
  {
    icon: icons.trending,
    text: "Efficiency and growth through modern digital innovation.",
  },
  {
    icon: icons.message,
    text: "Clear communication and rapid response, always.",
  },
  {
    icon: icons.lock,
    text: "Secure, scalable technologies built for long-term performance.",
  },
];

const contactInfo = [
  { icon: icons.phone, label: "Call us", value: "+91 73036 77709" },
  { icon: icons.mail, label: "Email us", value: "sales@iotrenetics.com" },
  { icon: icons.pin, label: "Based in", value: "India" },
];

const trustItems = [
  { icon: icons.shield, label: "Secure & private" },
  { icon: icons.globe, label: "India-based team" },
  { icon: icons.zap, label: "Fast response" },
];

// ── Field ─────────────────────────────────────────────────────────────────────
const Field = ({ id, name, label, type = "text", required, as }) => {
  const [val, setVal] = useState("");
  const [touched, setTouched] = useState(false);
  const isTextarea = as === "textarea";
  const valid =
    val.trim().length > (type === "email" ? 5 : type === "number" ? 9 : 1);

  const sharedClass = val ? "has-val" : "";

  return (
    <div className="field-wrap">
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={() => setTouched(true)}
          className={sharedClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={() => setTouched(true)}
          className={sharedClass}
          autoComplete="off"
        />
      )}
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="req-star">*</span>}
      </label>
      <span className={`field-tick ${valid && touched ? "show" : ""}`}>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="w-4 h-4"
          stroke="#22c55e"
          strokeWidth={2.5}
        >
          <polyline
            points="4 10 8 14 16 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const Contact = () => {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleFormChange = (e) => {
    const fields = e.currentTarget.querySelectorAll(
      "input[required], textarea[required]",
    );
    let filled = 0;
    fields.forEach((f) => {
      if (f.value.trim().length > 0) filled++;
    });
    setProgress(Math.round((filled / fields.length) * 100));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(e.target),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>{css}</style>

      <section className="contact-bg py-20 px-5 md:px-10 min-h-screen flex items-center">
        <div
          ref={sectionRef}
          className="fade-up max-w-[1100px] mx-auto w-full flex flex-col lg:flex-row gap-7 items-stretch"
        >
          {/* ── Left panel ── */}
          <div className="left-panel flex-1 p-8 md:p-10 flex flex-col gap-8">
            {/* Heading */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 mb-3">
                Get in Touch
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 leading-tight mb-3">
                Let's build something
                <br />
                <span className="text-blue-600">intelligent together.</span>
              </h1>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Tell us what you're working on and we'll show you exactly how we
                can help.
              </p>
            </div>

            {/* Benefits */}
            <ul className="flex flex-col gap-1">
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="benefit-item benefit-row flex items-start gap-3 px-3 py-2.5"
                  style={{ animationDelay: `${0.08 + i * 0.08}s` }}
                >
                  <span className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-white border border-blue-100 flex items-center justify-center">
                    {b.icon}
                  </span>
                  <span className="text-gray-600 text-sm leading-relaxed">
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="pulse-ring w-8 h-8 rounded-full bg-white border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-400">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Help link */}
            <p className="text-xs text-gray-400 mt-auto">
              Need support?{" "}
              <a
                href="#"
                className="text-blue-500 underline hover:text-blue-700 transition-colors"
              >
                Visit our help centre
              </a>
            </p>
          </div>

          {/* ── Right — Form ── */}
          <div className="flex-[1.3] flex flex-col gap-4">
            <div className="form-card p-8 md:p-10 flex flex-col gap-5">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-1">
                <div className="progress-track flex-1">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-blue-500 tabular-nums w-8 text-right">
                  {progress}%
                </span>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="w-8 h-8"
                      stroke="#16a34a"
                      strokeWidth={2.5}
                    >
                      <polyline
                        className="check-path"
                        points="8 20 16 28 32 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Message received!
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Our team will get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setProgress(0);
                    }}
                    className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  onChange={handleFormChange}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="5b6c798b-e407-4391-8eeb-83adb2332c6b"
                  />

                  <div className="flex gap-4 flex-col sm:flex-row">
                    <Field
                      id="fname"
                      name="first_name"
                      label="First name"
                      required
                    />
                    <Field id="lname" name="last_name" label="Last name" />
                  </div>

                  <Field
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    required
                  />
                  <Field
                    id="phone"
                    name="phone_number"
                    label="Phone number"
                    type="number"
                    required
                  />
                  <Field
                    id="msg"
                    name="message"
                    label="How can we help you?"
                    as="textarea"
                  />

                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    By submitting, I agree to the{" "}
                    <Link
                      to="/terms-and-conditions"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      IoTrenetics terms &amp; conditions
                    </Link>
                    . Fields marked{" "}
                    <span className="text-red-400 font-bold">*</span> are
                    required.
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-1">
                    <button
                      type="submit"
                      className={`submit-btn ${status === "loading" ? "loading" : ""}`}
                    >
                      {status === "loading" ? (
                        <>{icons.spinner} Sending…</>
                      ) : (
                        <>Send message {icons.arrow}</>
                      )}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="dot-live inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                      Replies within 24h
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Trust strip */}
            <div className="trust-strip flex items-center justify-center gap-6 px-5 py-3 flex-wrap">
              {trustItems.map((t, i) => (
                <div key={i} className="trust-item">
                  <div className="trust-icon">{t.icon}</div>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Contact;
