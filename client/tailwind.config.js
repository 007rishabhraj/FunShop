/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "offwhite": "#F5F5F5",
      "custom-blue": "#02023D",
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
