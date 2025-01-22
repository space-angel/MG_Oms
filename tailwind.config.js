/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        semantic: {
          'main-100': '#27c9fd',
          'main-10': '#e9faff',
        },
        gray: {
          100: '#404856',
          80: '#797f89',
          50: '#d9d9d9',
          30: '#dbdde1',
          10: '#f2f4f6',
          0: '#ffffff',
        }
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
      },
      fontSize: {
        base: '1rem',
        lg: '1.25rem',
        xl: '1.75rem',
        '2xl': '2rem',
      },
      fontFamily: {
        'pretendard-jp': ['Pretendard JP', 'sans-serif'],
        'pretendard': ['Pretendard', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 2px 60px rgba(23, 23, 28, 0.05), 0px 2px 10px rgba(23, 23, 28, 0.05)',
      },
      borderRadius: {
        0: '0rem',
        8: '0.48862841725349426rem',
        16: '0.75rem',
        18: '0.8224781155586243rem',
        24: '1.1459853649139404rem',
        32: '1.821710467338562rem',
        36: '4rem',
      },
      typography: {
        'display-32': {
          fontSize: '32px',
          lineHeight: '36px',
          fontFamily: 'Pretendard JP, sans-serif',
        },
        'title-28-semibold': {
          fontSize: '28px',
          lineHeight: '32px',
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '500',
        },
        'title-28-medium': {
          fontSize: '28px',
          lineHeight: '32px',
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '400',
        },
        'head-20-semibold': {
          fontSize: '20px',
          lineHeight: '28px',
          fontFamily: 'Pretendard JP, sans-serif',
          fontWeight: '500',
        },
        'head-20-medium': {
          fontSize: '20px',
          lineHeight: '28px',
          fontFamily: 'Pretendard JP, sans-serif',
          fontWeight: '400',
        },
        'head-20-regular': {
          fontSize: '20px',
          lineHeight: '28px',
          fontFamily: 'Pretendard JP, sans-serif',
          fontWeight: '300',
        },
        'body-16-medium': {
          fontSize: '16px',
          lineHeight: '24px',
          fontFamily: 'Pretendard JP, sans-serif',
          fontWeight: '300',
        },
        'body-16-regular': {
          fontSize: '16px',
          lineHeight: '24px',
          fontFamily: 'Pretendard JP, sans-serif',
          fontWeight: '200',
        },
      },
      keyframes: {
        slideDown: {
          '0%': { 
            transform: 'translate(-50%, -100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translate(-50%, 0)',
            opacity: '1'
          }
        }
      },
      animation: {
        'slideDown': 'slideDown 0.3s ease-out'
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.Title_28_SemiBold': {
          fontSize: '28px',
          lineHeight: '32px',
          fontWeight: '500',
          fontFamily: 'Pretendard, sans-serif',
        },
        '.Title_28_Medium': {
          fontSize: '28px',
          lineHeight: '32px',
          fontWeight: '400',
          fontFamily: 'Pretendard, sans-serif',
        },
        '.Head_20_SemiBold': {
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: '500',
          fontFamily: 'Pretendard JP, sans-serif',
        },
        '.Head_20_Medium': {
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: '400',
          fontFamily: 'Pretendard JP, sans-serif',
        },
        '.Body_16_Medium': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '300',
          fontFamily: 'Pretendard JP, sans-serif',
        },
        '.Body_16_Regular': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '200',
          fontFamily: 'Pretendard JP, sans-serif',
        },
      })
    }
  ],
}