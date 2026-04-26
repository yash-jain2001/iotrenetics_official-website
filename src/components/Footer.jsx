import { Link } from "react-router-dom";
import NewsletterUpdates from "./NewsletterUpdates";

const Footer = () => {

  return (
    <footer className="bg-brand-dark text-white text-center pt-10 pb-10 px-5 text-sm">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-5">
        
        {/* Newsletter */}
        <div
          className="w-full max-w-[1200px] bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10"
          data-aos="fade-up"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
            Subscribe for Updates
          </h3>

          <p className="text-white/70 mb-6 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Join our newsletter to receive the latest updates on IoT technology
            trends, automation developments, and company announcements.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-accent text-white font-bold rounded-full px-8 py-3 hover:bg-white hover:text-accent transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="w-full h-px bg-white/10 mb-2"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-4 mt-4">

          {/* ✅ FIXED TEXT (NO WRAP EVER) */}
          <p className="text-white/70 text-center md:text-left text-xs sm:text-sm">
            © 2026 IoTrenetics Solutions Pvt. Ltd. <span className="hidden sm:inline">|</span> <br className="sm:hidden" /> Intelligence in Motion.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/iotrenetics-solutions-private-limited-962504377"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/iotrenetics_solutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Mail */}
            <a
              href="mailto:support@iotrenetics.com"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              aria-label="Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

