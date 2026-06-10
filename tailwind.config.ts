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
        // Brand palette
forest: {
  50:  '#f0faf1',
  100: '#d6f5da',
  200: '#aeeab5',
  300: '#77d982',
  400: '#3BC14A',  // ← اللون الأساسي
  500: '#28a436',
  600: '#1e832a',
  700: '#3BC14A',
  800: '#155120',
  900: '#0f3d18',
  950: '#071f0c',
},
        sand: {
          50:  "#faf8f4",
          100: "#f2ede3",
          200: "#e4d9c5",
          300: "#d2bf9f",
          400: "#bda077",
          500: "#ae8a5e",
          600: "#9f7750",
          700: "#856144",
          800: "#6d503b",
          900: "#594233",
          950: "#2f221a",
        },
        charcoal: {
          50:  "#f5f5f4",
          100: "#e7e5e4",
          200: "#d6d3d1",
          300: "#b5b0ac",
          400: "#908b85",
          500: "#756f68",
          600: "#605b55",
          700: "#4f4a44",
          800: "#3c3835",  // primary text dark
          900: "#1c1917",  // deepest dark
          950: "#0f0e0d",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.25rem, 5vw, 4rem)",  { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md":  ["clamp(1.25rem, 2.5vw, 2rem)", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease forwards",
        "fade-in":   "fadeIn 0.5s ease forwards",
        "shimmer":   "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "grain": "url('/textures/grain.png')",
      },
    },
  },
  plugins: [],
};

export default config;
