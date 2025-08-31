/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all React/TS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};