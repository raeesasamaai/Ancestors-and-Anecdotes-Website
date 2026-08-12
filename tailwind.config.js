/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        section: ["Tangerine", "cursive"],
        heading: ["Lora", "Palatino Linotype", "serif"],
        body: ["Cormorant Garamond", "serif"],
      },
    },
  },
  plugins: [],
};