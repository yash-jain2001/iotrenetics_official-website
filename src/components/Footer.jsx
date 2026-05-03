import { useState } from "react";
import { Link } from "react-router-dom";

const FooterStyles = () => (
  <style>{`
    .footer-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -1px; left: 0;
      height: 1px;
      width: 0;
      background: linear-gradient(90deg, #60a5fa, #34d399);
      transition: width 0.25s cubic-bezier(.16,1,.3,1);
      border-radius: 1px;
    }
    .footer-link:hover::after { width: 100%; }
    .footer-link:hover { color: #60a5fa !important; }

    .social-btn {
      position: relative;
      width: 40px; height: 40px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.5);
      transition: all 0.25s cubic-bezier(.16,1,.3,1);
      overflow: hidden;
    }
    .social-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #0067b8, #00a8e8);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .social-btn:hover {
      color: white;
      border-color: transparent;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,103,184,0.35);
    }
    .social-btn:hover::before { opacity: 1; }
    .social-btn svg { position: relative; z-index: 1; }

    .newsletter-input:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96,165,250,0.15);
    }

    @keyframes footerGlow {
      0%, 100% { opacity: .4; }
      50% { opacity: .7; }
    }
    .footer-glow { animation: footerGlow 4s ease-in-out infinite; }

    .footer-grid-line {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    }
  `}</style>
);

const footerLinks = {
  Company: [
    { label: "About Us",    to: "/about" },
    { label: "Solutions",   to: "/solutions" },
    { label: "Industries",  to: "/industries" },
    { label: "Contact",     to: "/contact" },
  ],
  Products: [
    { label: "Finexo",   to: "/finexo" },
    { label: "HealNet",  to: "/healnet" },
    { label: "Agentra",  to: "/agentra" },
  ],
  Automation: [
    { label: "Home Automation",       to: "/home-automation" },
    { label: "Commercial Automation", to: "/office-automation" },
    { label: "Hotel Automation",      to: "/hotel-automation" },
  ],
  Legal: [
    { label: "Terms & Conditions",     to: "/terms-and-conditions" },
    { label: "Privacy Policy",         to: "/privacy-policy-finexo" },
    { label: "Delete Account (Finexo)",to: "/delete-account-policy-finexo" },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <>
      <FooterStyles />
      <footer
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(160deg, #020b18 0%, #041428 40%, #020b18 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background dot grid */}
        <div className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />

        {/* Glow blobs */}
        <div className="footer-glow absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,103,184,.15), transparent 70%)", filter: "blur(40px)" }} />
        <div className="footer-glow absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,168,232,.08), transparent 70%)", filter: "blur(50px)", animationDelay: "2s" }} />

        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10">

          {/* ── Newsletter ─────────────────────────────────────────────────── */}
          <div className="py-14 border-b border-white/[.06]">
            <div
              className="relative rounded-2xl px-8 sm:px-12 py-10 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(0,103,184,.2), rgba(0,168,232,.1))", border: "1px solid rgba(96,165,250,.15)" }}
            >
              {/* Inner grid */}
              <div className="absolute inset-0 opacity-[.06]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }} />

              <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="max-w-[400px]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/15 border border-blue-400/20 rounded-full mb-4">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-cyan-300"
                      style={{ fontFamily: "'Syne', sans-serif" }}>Stay updated</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    Subscribe for Updates
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Latest IoT trends, automation developments, and company announcements.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2.5 w-full md:w-auto md:min-w-[380px]">
                  {submitted ? (
                    <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-emerald-500/15 border border-emerald-400/25 rounded-full">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-emerald-300 text-sm font-medium">You're subscribed!</span>
                    </div>
                  ) : (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="newsletter-input flex-1 bg-white/8 border border-white/12 rounded-full px-5 py-3.5 text-white text-sm placeholder:text-white/35 transition-all duration-200"
                      />
                      <button type="submit"
                        className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 shrink-0"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Subscribe
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* ── Main footer grid ────────────────────────────────────────────── */}
          <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-white/[.06]">

            {/* Brand col */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-5">
                <img src="/assets/IOT.webp" alt="IoTrenetics" className="h-20 brightness-[2] opacity-90" />
              </Link>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Intelligent IoT & AI solutions for connected environments across India.
              </p>
              {/* Social */}
              <div className="flex gap-2.5">
                <a href="https://www.linkedin.com/in/iotrenetics-solutions-private-limited-962504377"
                  target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/iotrenetics_solutions/"
                  target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="mailto:support@iotrenetics.com"
                  className="social-btn" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7l-10 7L2 7"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/30 mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {section}
                </h4>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {links.map(({ label, to }) => (
                    <li key={to}>
                      <Link to={to} className="footer-link text-sm text-white/50 no-underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────────────── */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center sm:text-left">
              © 2026 IoTrenetics Solutions Pvt. Ltd. — Intelligence in Motion.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/25 text-xs">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
