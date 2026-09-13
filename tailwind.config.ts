import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#6B0F1A",
          light: "#8A1B27",
          dark: "#4A0A12",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E7C468",
          dark: "#A9820F",
        },
        blush: {
          DEFAULT: "#F3C9C9",
          light: "#FAE3E3",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          dark: "#FDF0E2",
        },
        sage: {
          DEFAULT: "#8A9A5B",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(107, 15, 26, 0.08)",
        cardHover: "0 8px 30px rgba(107, 15, 26, 0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
