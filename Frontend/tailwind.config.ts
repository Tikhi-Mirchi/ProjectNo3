import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        framify: {
          bg: "var(--framify-bg)",
          "surface-1": "var(--framify-surface-1)",
          "surface-2": "var(--framify-surface-2)",
          "surface-3": "var(--framify-surface-3)",
          primary: "var(--framify-primary)",
          "primary-light": "var(--framify-primary-light)",
          "primary-dark": "var(--framify-primary-dark)",
          secondary: "var(--framify-secondary)",
          accent: "var(--framify-accent)",
          "accent-light": "var(--framify-accent-light)",
          text: "var(--framify-text)",
          "text-muted": "var(--framify-text-muted)",
          "text-dim": "var(--framify-text-dim)",
          border: "var(--framify-border)",
          "border-hover": "var(--framify-border-hover)",
          "border-active": "var(--framify-border-active)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        blob: "blob 8s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        breathe: "breathe 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        shimmer:
          "linear-gradient(90deg, transparent, rgba(167,243,208,0.04), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
