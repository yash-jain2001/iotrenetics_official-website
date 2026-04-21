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
        sans: ["Inter", "Arial", "sans-serif"],
      },
      keyframes: {
        floatImage: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        float: "floatImage 4s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
};
