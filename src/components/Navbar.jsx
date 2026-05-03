import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

/* ─── Inline styles injected once ──────────────────────────────────────────── */
const NavStyles = () => (
  <style>{`
    /* ── Magnetic cursor glow on nav links ── */
    .nav-link-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    /* Underline morph */
    .nav-underline {
      position: absolute;
      bottom: -2px; left: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(90deg, #0067b8, #00a8e8);
      border-radius: 2px;
      transition: width 0.3s cubic-bezier(.16,1,.3,1);
    }
    .nav-link-wrap:hover .nav-underline,
    .nav-link-wrap.active .nav-underline { width: 100%; }

    /* Dropdown panel */
    .dropdown-panel {
      position: absolute;
      top: calc(100% + 16px);
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.22s ease, transform 0.22s cubic-bezier(.16,1,.3,1);
      z-index: 2000;
    }
    .dropdown-trigger:hover .dropdown-panel,
    .dropdown-panel:hover {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }

    /* Dropdown arrow */
    .dropdown-arrow {
      transition: transform 0.25s cubic-bezier(.16,1,.3,1);
      display: inline-block;
    }
    .dropdown-trigger:hover .dropdown-arrow { transform: rotate(180deg); }

    /* Dropdown item hover bar */
    .dd-item {
      position: relative;
      overflow: hidden;
    }
    .dd-item::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #0067b8, #00a8e8);
      transform: scaleY(0);
      transform-origin: top;
      border-radius: 0 2px 2px 0;
      transition: transform 0.22s cubic-bezier(.16,1,.3,1);
    }
    .dd-item:hover::before { transform: scaleY(1); }

    /* Dropdown item stagger on hover of parent */
    .dropdown-trigger:hover .dd-item:nth-child(1) { animation: ddIn .25s .04s both; }
    .dropdown-trigger:hover .dd-item:nth-child(2) { animation: ddIn .25s .08s both; }
    .dropdown-trigger:hover .dd-item:nth-child(3) { animation: ddIn .25s .12s both; }
    .dropdown-trigger:hover .dd-item:nth-child(4) { animation: ddIn .25s .16s both; }
    @keyframes ddIn {
      from { opacity: 0; transform: translateX(-6px); }
      to   { opacity: 1; transform: none; }
    }

    /* Navbar scroll glass */
    .navbar-scrolled {
      background: rgba(255,255,255,0.88) !important;
      backdrop-filter: blur(20px) saturate(1.8);
      -webkit-backdrop-filter: blur(20px) saturate(1.8);
      box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,103,184,0.06);
    }

    /* Mobile menu slide */
    @keyframes mobileSlideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: none; }
    }
    .mobile-menu-open { animation: mobileSlideIn .28s cubic-bezier(.16,1,.3,1) both; }

    /* CTA button pulse */
    @keyframes ctaGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,103,184,0); }
      50%       { box-shadow: 0 0 0 6px rgba(0,103,184,.12); }
    }
    .nav-cta:hover { animation: ctaGlow 1.2s ease infinite; }

    /* Hamburger */
    .ham span {
      display: block;
      height: 2px;
      background: #1a1a2e;
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(.16,1,.3,1);
      transform-origin: center;
    }
    .ham.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .ham.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    /* Active dot */
    .active-dot {
      position: absolute;
      bottom: -4px; left: 50%;
      transform: translateX(-50%);
      width: 4px; height: 4px;
      background: #0067b8;
      border-radius: 50%;
    }
  `}</style>
);

/* ─── Dropdown wrapper ──────────────────────────────────────────────────────── */
const DropdownMenu = ({ label, items, closeMobileMenu, isMobile }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="flex items-center justify-center gap-1.5 w-full py-3 px-4 text-gray-800 font-medium text-sm hover:text-blue-700 transition-colors"
        >
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="bg-gray-50 border-y border-gray-100 py-1">
            {items.map((item, i) => (
              <Link key={i} to={item.to}
                onClick={() => { setMobileOpen(false); closeMobileMenu(); }}
                className="flex items-center gap-3 px-8 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50/60 transition-all no-underline">
                <span className="text-blue-500">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  {item.desc && <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dropdown-trigger relative flex items-center cursor-pointer">
      <div className="nav-link-wrap">
        <span className="text-gray-800 font-medium text-sm flex items-center gap-1.5 select-none hover:text-blue-700 transition-colors duration-200 py-1">
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className="dropdown-arrow w-3 h-3 text-gray-400">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <div className="nav-underline" />
      </div>

      {/* Panel */}
      <div className="dropdown-panel">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-900/8 overflow-hidden min-w-[240px]"
          style={{ boxShadow: "0 8px 40px rgba(0,103,184,.10), 0 1px 0 rgba(0,0,0,.04)" }}>
          {/* Top accent */}
          <div className="h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400" />
          <div className="py-2">
            {items.map((item, i) => (
              <Link key={i} to={item.to}
                onClick={closeMobileMenu}
                className="dd-item flex items-start gap-3.5 px-5 py-3.5 hover:bg-blue-50/50 transition-colors no-underline group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{item.label}</div>
                  {item.desc && <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</div>}
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 transition-all ml-auto shrink-0 mt-1 group-hover:translate-x-0.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
        {/* Arrow tip */}
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,.03)]" />
      </div>
    </div>
  );
};

/* ─── Products items ────────────────────────────────────────────────────────── */
const productItems = [
  {
    to: "/finexo",
    label: "Finexo",
    desc: "Smart financial management",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M15 8h-4a2 2 0 000 4h2a2 2 0 010 4H9"/>
        <path d="M12 6v2M12 16v2"/>
      </svg>
    ),
  },
  {
    to: "/healnet",
    label: "HealNet",
    desc: "AI-powered health monitoring",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    to: "/agentra",
    label: "Agentra",
    desc: "AI teammates for business",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2"/>
        <path d="M6 6h.01M6 18h.01"/>
      </svg>
    ),
  },
];

const automationItems = [
  {
    to: "/home-automation",
    label: "Home Automation",
    desc: "Smart living environments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: "/office-automation",
    label: "Commercial Automation",
    desc: "Intelligent workspaces",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="2" y="7" width="20" height="15" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <path d="M12 12v4M10 14h4"/>
      </svg>
    ),
  },
  {
    to: "/hotel-automation",
    label: "Hotel Automation",
    desc: "Connected hospitality",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 22V8l9-6 9 6v14"/>
        <path d="M9 22v-4h6v4"/>
        <rect x="9" y="10" width="2" height="2"/>
        <rect x="13" y="10" width="2" height="2"/>
      </svg>
    ),
  },
];

const mainNavLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/industries", label: "Industries" },
  { to: "/solutions", label: "Solutions" },
  { to: "/contact", label: "Contact" },
];

/* ─── MAIN NAVBAR ───────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <NavStyles />
      <header
        className={`sticky top-0 z-[1000] bg-white border-b border-gray-100 transition-all duration-300 ${scrolled ? "navbar-scrolled" : ""}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-0 transition-opacity duration-300"
          style={{ opacity: scrolled ? 1 : 0 }} />

        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[68px] md:h-[76px]">

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0 group">
            <img
              src="/assets/IOT.webp"
              alt="IoTrenetics"
              className="h-28 sm:h-32 md:h-[144px] transition-all duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1 list-none m-0 p-0">

              {/* Home */}
              <li>
                <NavLink to="/" end
                  className={({ isActive }) =>
                    `nav-link-wrap relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline block
                     ${isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/60"}`
                  }>
                  {({ isActive }) => (
                    <>
                      Home
                      {isActive && <span className="active-dot" />}
                    </>
                  )}
                </NavLink>
              </li>

              {/* About */}
              <li>
                <NavLink to="/about"
                  className={({ isActive }) =>
                    `nav-link-wrap relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline block
                     ${isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/60"}`
                  }>
                  {({ isActive }) => (
                    <>
                      About
                      {isActive && <span className="active-dot" />}
                    </>
                  )}
                </NavLink>
              </li>

              {/* Products dropdown */}
              <li className="px-1">
                <DropdownMenu label="Products" items={productItems} closeMobileMenu={closeMenu} />
              </li>

              {/* Automation dropdown */}
              <li className="px-1">
                <DropdownMenu label="Automation" items={automationItems} closeMobileMenu={closeMenu} />
              </li>

              {/* Industries */}
              <li>
                <NavLink to="/industries"
                  className={({ isActive }) =>
                    `nav-link-wrap relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline block
                     ${isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/60"}`
                  }>
                  {({ isActive }) => (
                    <>
                      Industries
                      {isActive && <span className="active-dot" />}
                    </>
                  )}
                </NavLink>
              </li>

              {/* Solutions */}
              <li>
                <NavLink to="/solutions"
                  className={({ isActive }) =>
                    `nav-link-wrap relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 no-underline block
                     ${isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50/60"}`
                  }>
                  {({ isActive }) => (
                    <>
                      Solutions
                      {isActive && <span className="active-dot" />}
                    </>
                  )}
                </NavLink>
              </li>

            </ul>

            {/* CTA */}
            <Link to="/contact"
              className="nav-cta ml-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-full no-underline transition-all duration-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-700/25"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Contact
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="w-3.5 h-3.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className={`ham md:hidden flex flex-col gap-[6px] w-7 cursor-pointer bg-none border-none p-1 ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
          >
            <span className="w-full" />
            <span className="w-5" />
            <span className="w-full" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu-open md:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-76px)] overflow-y-auto">
            <div className="py-3">
              {[
                { to: "/", label: "Home", end: true },
                { to: "/about", label: "About" },
              ].map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3.5 text-sm font-medium no-underline transition-colors ${isActive ? "text-blue-700 bg-blue-50/50" : "text-gray-800 hover:text-blue-700 hover:bg-gray-50"}`
                  }>
                  {label}
                </NavLink>
              ))}

              <div className="border-t border-gray-50 mt-1 mb-1">
                <p className="px-6 pt-3 pb-1 text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400">Products</p>
                <DropdownMenu label="Products" items={productItems} closeMobileMenu={closeMenu} isMobile />
              </div>

              <div className="border-t border-gray-50 mt-1 mb-1">
                <p className="px-6 pt-3 pb-1 text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400">Automation</p>
                <DropdownMenu label="Automation" items={automationItems} closeMobileMenu={closeMenu} isMobile />
              </div>

              {[
                { to: "/industries", label: "Industries" },
                { to: "/solutions", label: "Solutions" },
              ].map(({ to, label }) => (
                <NavLink key={to} to={to} onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-6 py-3.5 text-sm font-medium no-underline transition-colors border-t border-gray-50 ${isActive ? "text-blue-700 bg-blue-50/50" : "text-gray-800 hover:text-blue-700 hover:bg-gray-50"}`
                  }>
                  {label}
                </NavLink>
              ))}

              <div className="px-5 py-4 border-t border-gray-100 mt-1">
                <Link to="/contact" onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-700 text-white text-sm font-bold rounded-full no-underline hover:bg-blue-800 transition-colors">
                  Contact Us
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
