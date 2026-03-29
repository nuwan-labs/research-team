/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F8FA",
        panel: "#FFFFFF",
        panelAlt: "#F1F3F6",
        text: "#1E2430",
        muted: "#5A6474",
        border: "#D8DDE6",
        success: "#1F7A4D",
        warning: "#B16A00",
        danger: "#B0382C",
        info: "#2F5DAA",
        accent: "#3A6EA5"
      }
    }
  },
  plugins: []
};
