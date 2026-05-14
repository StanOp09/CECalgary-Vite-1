/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish", "ui-sans-serif", "system-ui", "Arial", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        merri: ["Merriweather", "serif"],
        brand: ['"Plus Jakarta Sans"', "sans-serif"],
        raleway: ['"Raleway"', "sans-serif"],
        lora: ['"Lora"', "serif"],
      },
    },
  },
  plugins: [],
};
