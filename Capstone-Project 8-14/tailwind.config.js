/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#16233D",
          50: "#EEF1F5",
          100: "#D7DDE8",
          400: "#4C5C7D",
          700: "#1F2E4D",
          900: "#0F1830",
        },
        paper: {
          DEFAULT: "#F5F7F8",
          rule: "#DCE3E8",
          panel: "#FFFFFF",
        },
        brass: {
          DEFAULT: "#C9932E",
          600: "#AD7A1F",
          50: "#FBF1DD",
        },
        credit: {
          DEFAULT: "#2F7D5A",
          50: "#E6F2EC",
        },
        debit: {
          DEFAULT: "#B5452B",
          50: "#F6E7E3",
        },
      },
      fontFamily: {
        display: [
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        ledger: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      backgroundImage: {
        "ledger-lines":
          "repeating-linear-gradient(to bottom, transparent, transparent 43px, #DCE3E8 44px)",
      },
    },
  },
  plugins: [],
};
