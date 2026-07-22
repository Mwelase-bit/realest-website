/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#DEDBC8", ink: "#111110" },
      fontFamily: { serif: ['"Instrument Serif"', "serif"] },
    },
  },
  plugins: [],
};
