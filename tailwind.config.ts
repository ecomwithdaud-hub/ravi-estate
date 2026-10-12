import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060b16",
          900: "#0a1224",
          800: "#111e38",
          700: "#1b2e52",
        },
        gold: {
          300: "#ebd197",
          400: "#d4af37",
          500: "#c59b27",
          600: "#a37c18",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "\"Times New Roman\"", "Times", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
