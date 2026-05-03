import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────────── */
const FooterStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    /* ── Footer link underline ── */
    .footer-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s ease;
      color: rgba(255,255,255,0.45);
      font-size: 13.5px;
      text-decoration: none;
    }
    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -1px; left: 0;
      height: 1px; width: 0;
      background: linear-gradient(90deg, #60a5fa, #34d399);
      transition: width 0.28s cubic-bezier(.16,1,.3,1);
      border-radius: 1px;
    }
    .footer-link:hover::after { width: 100%; }
    .footer-link:hover { color: #93c5fd; }

    /* ── Social button ── */
    .social-btn {
      position: relative;
      width: 38px; height: 38px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.45);
      transition: all 0.25s cubic-bezier(.16,1,.3,1);
      overflow: hidden;
      text-decoration: none;
    }
    .social-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #1d4ed8, #0891b2);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .social-btn:hover {
      color: white;
      border-color: transparent;
      transform: translateY(-3px);
      box-shadow: 0 8px 22px rgba(29,78,216,0.38);
    }
    .social-btn:hover::before { opacity: 1; }
    .social-btn svg { position: relative; z-index: 1; }

    /* ── Newsletter input ── */
    .newsletter-input {
      transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    }
    .newsletter-input:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96,165,250,0.15);
      background: rgba(255,255,255,0.1);
    }

    /* ── Footer glow pulse ── */
    @keyframes footerGlow {
      0%, 100% { opacity: .35; transform: scale(1); }
      50%       { opacity: .6;  transform: scale(1.04); }
    }
    .footer-glow { animation: footerGlow 5s ease-in-out infinite; }

    /* ── Column reveal stagger ── */
    @keyframes colIn {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: none; }
    }
    .col-reveal { opacity: 0; }
    .col-reveal.visible { animation: colIn 0.55s cubic-bezier(.16,1,.3,1) both; }
    .col-reveal.visible:nth-child(1) { animation-delay: 0.04s; }
    .col-reveal.visible:nth-child(2) { animation-delay: 0.10s; }
    .col-reveal.visible:nth-child(3) { animation-delay: 0.16s; }
    .col-reveal.visible:nth-child(4) { animation-delay: 0.22s; }
    .col-reveal.visible:nth-child(5) { animation-delay: 0.28s; }

    /* ── Logo backdrop (ensures visibility on dark bg) ── */
    .logo-wrap {
      display: inline-flex;
      align-items: center;
      padding: 6px 10px 6px 6px;
      border-radius: 12px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.09);
      transition: background 0.25s, border-color 0.25s;
    }
    .logo-wrap:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.15);
    }

    /* ── Bottom bar separator ── */
    .bottom-sep {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
      height: 1px;
    }

    /* ── Hover row item ── */
    .nav-item {
      transition: transform 0.2s cubic-bezier(.34,1.56,.64,1);
    }
    .nav-item:hover { transform: translateX(3px); }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const footerLinks = {
  Company: [
    { label: "About Us",   to: "/about" },
    { label: "Solutions",  to: "/solutions" },
    { label: "Industries", to: "/industries" },
    { label: "Contact",    to: "/contact" },
  ],
  Products: [
    { label: "Finexo",  to: "/finexo" },
    { label: "HealNet", to: "/healnet" },
    { label: "Agentra", to: "/agentra" },
  ],
  Automation: [
    { label: "Home Automation",       to: "/home-automation" },
    { label: "Commercial Automation", to: "/office-automation" },
    { label: "Hotel Automation",      to: "/hotel-automation" },
  ],
  Legal: [
    { label: "Terms & Conditions",       to: "/terms-and-conditions" },
    { label: "Privacy Policy",           to: "/privacy-policy-finexo" },
    { label: "Delete Account (Finexo)",  to: "/delete-account-policy-finexo" },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const gridRef = useRef(null);

  /* Reveal columns on scroll */
  useEffect(() => {
    const cols = gridRef.current?.querySelectorAll(".col-reveal");
    if (!cols) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          cols.forEach((c) => c.classList.add("visible"));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

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
        {/* ── Background dot grid ── */}
        <div className="absolute inset-0 opacity-[.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />

        {/* ── Glow blobs ── */}
        <div className="footer-glow absolute top-0 left-1/4 w-[550px] h-[320px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(29,78,216,.18), transparent 70%)", filter: "blur(50px)" }} />
        <div className="footer-glow absolute bottom-0 right-1/4 w-[420px] h-[260px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(8,145,178,.1), transparent 70%)", filter: "blur(55px)", animationDelay: "2.5s" }} />
        <div className="footer-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(96,165,250,.04), transparent 70%)", filter: "blur(40px)", animationDelay: "4s" }} />

        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10">

          {/* ── Newsletter ── */}
          <div className="pt-14 pb-12 border-b border-white/[.055]">
            <div
              className="relative rounded-2xl px-8 sm:px-12 py-10 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(29,78,216,.22), rgba(8,145,178,.12))",
                border: "1px solid rgba(96,165,250,.18)",
              }}
            >
              {/* Inner grid pattern */}
              <div className="absolute inset-0 opacity-[.055] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }} />

              {/* Top-right orb */}
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(96,165,250,.1), transparent 70%)", filter: "blur(20px)", transform: "translate(20%,-20%)" }} />

              <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="max-w-[380px]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/15 border border-blue-400/20 rounded-full mb-4">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-cyan-300"
                      style={{ fontFamily: "'Syne', sans-serif" }}>Stay updated</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    Subscribe for Updates
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
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
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="newsletter-input flex-1 bg-white/[.07] border border-white/[.11] rounded-full px-5 py-3.5 text-white text-sm placeholder:text-white/30 transition-all duration-200"
                      />
                      <button type="submit"
                        className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/35 shrink-0"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Subscribe
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* ── Main grid ── */}
          <div ref={gridRef}
            className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-white/[.055]">

            {/* ── Brand column ── */}
            <div className="col-span-2 md:col-span-1 col-reveal">
              {/* Logo with backdrop for visibility */}
              <Link to="/" className="logo-wrap inline-block mb-5 no-underline">
                <img
                  src="/assets/IOT.webp"
                  alt="IoTrenetics"
                  className="h-16 w-auto"
                  style={{
                    filter: "brightness(1.15) drop-shadow(0 0 6px rgba(255,255,255,0.08))",
                    opacity: 1,
                  }}
                />
              </Link>

              <p className="text-white/38 text-[13px] leading-relaxed mb-6 max-w-[200px]">
                Intelligent IoT &amp; AI solutions for connected environments across India.
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5">
                <a href="https://www.linkedin.com/in/iotrenetics-solutions-private-limited-962504377"
                  target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/iotrenetics_solutions/"
                  target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="mailto:support@iotrenetics.com"
                  className="social-btn" aria-label="Email">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7l-10 7L2 7"/>
                  </svg>
                </a>
              </div>

              {/* Live status */}
              <div className="flex items-center gap-2 mt-6">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/28 text-[11px]">All systems operational</span>
              </div>
            </div>

            {/* ── Link columns ── */}
            {Object.entries(footerLinks).map(([section, links], si) => (
              <div key={section} className="col-reveal">
                <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/28 mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {section}
                </h4>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {links.map(({ label, to }) => (
                    <li key={to} className="nav-item">
                      <Link to={to} className="footer-link">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} IoTrenetics Solutions Pvt. Ltd. — Intelligence in Motion.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/terms-and-conditions"
                className="text-white/25 text-xs hover:text-white/50 transition-colors no-underline">
                Terms
              </Link>
              <div className="w-px h-3 bg-white/10" />
              <Link to="/privacy-policy-finexo"
                className="text-white/25 text-xs hover:text-white/50 transition-colors no-underline">
                Privacy
              </Link>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-white/20 text-xs">Made in India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
