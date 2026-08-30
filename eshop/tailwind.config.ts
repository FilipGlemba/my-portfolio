import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0C0E",
          soft: "#16181C",
          line: "#26292E",
        },
        flame: {
          50: "#FFF1EE",
          100: "#FFDFD8",
          200: "#FFB8A8",
          300: "#FF8F78",
          400: "#FF6448",
          500: "#FF4433",
          600: "#E8331F",
          700: "#C22417",
        },
        volt: {
          DEFAULT: "#D7FF3F",
          soft: "#EEFFB0",
          dark: "#A8CC1E",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      boxShadow: {
        panel: "0 20px 45px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 1px rgba(255,68,51,0.15), 0 20px 60px rgba(255,68,51,0.18)",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
