/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shine: "shine 3s infinite linear",
      },
      keyframes: {
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
      },
      fontFamily: {
        pen: ['Nanum Pen Script', 'cursive']
      },
    },
  },
  plugins: [],
};
