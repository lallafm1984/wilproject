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
        'scrollDown': 'scrollDown 1.5s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        'marquee-left': 'marquee-left 30s linear infinite',
        'marquee-right': 'marquee-right 30s linear infinite',
      },
      keyframes: {
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        scrollDown: {
          '0%': { transform: 'translateY(0%)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
        pen: ['Nanum Pen Script', 'cursive'],
        poppins: ['var(--font-poppins)', 'sans-serif']
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
