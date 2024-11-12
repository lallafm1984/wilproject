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
      colors: {
        primary: {
          DEFAULT: '#99253A',  // 메인 컬러
          light: '#B84548',    // 밝은 레드
          lighter: '#D9A7A1',  // 연한 핑크
        },
        neutral: {
          dark: '#2E2E2E',     // 다크 그레이
          light: '#F5F5F5',    // 라이트 그레이
        },
        brand: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          tertiary: 'var(--color-tertiary)',
          dark: 'var(--color-dark)',
          light: 'var(--color-light)',
        }
      }
    },
  },
  plugins: [],
};
