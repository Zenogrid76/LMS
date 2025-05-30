// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
  extend: {
    colors: {
      primary: "#1FDEAB",
    },
    fontFamily: {
      lexend: ["poppins", "sans-serif"],
    },
  },
},

}