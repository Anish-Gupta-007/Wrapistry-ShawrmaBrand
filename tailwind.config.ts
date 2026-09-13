import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        "bg-card": "#1A1A1A",
        "bg-surface": "#222222",
        primary: {
          DEFAULT: "#E8A33D", // Warm Amber Gold
          hover: "#F3B24D",
          light: "#FAD89A",
          dark: "#C68423",
        },
        secondary: {
          DEFAULT: "#D9481C", // Grilled Red-Orange
          hover: "#E85B2E",
          dark: "#B3330D",
        },
        cream: {
          DEFAULT: "#F2E8D5", // Cream / Cheese Tone
          dark: "#E3D5BA",
        },
        body: "#F0EBE3",
        muted: "#9E9A93",
        "dark-border": "#2D2D2D",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(232, 163, 61, 0.4)",
        "glow-red": "0 0 25px -5px rgba(217, 72, 28, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-overlay": "linear-gradient(to right, rgba(18, 18, 18, 0.9) 0%, rgba(18, 18, 18, 0.4) 50%, rgba(18, 18, 18, 0.8) 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8A33D 0%, #D9481C 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
