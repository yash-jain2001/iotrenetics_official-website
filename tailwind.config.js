import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0067b8",
        "brand-dark": "#002e5d",
        accent: "#e53935",
        "accent-dark": "#c62828",
      },
      fontFamily: {
        sans:    ["DM Sans",  "Arial", "sans-serif"],
        display: ["Syne",     "Arial", "sans-serif"],
      },
      keyframes: {
        floatImage: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        ring: {
          "0%":   { transform: "scale(1)",   opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        float:   "floatImage 4s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        fadeUp:  "fadeUp 0.6s cubic-bezier(.16,1,.3,1) both",
        ring:    "ring 2s ease-out infinite",
      },
      boxShadow: {
        "blue-glow": "0 8px 32px rgba(0,103,184,0.25)",
        "card":      "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [daisyui],
};
