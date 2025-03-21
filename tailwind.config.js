/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      spacing: {
        per4: '4%',
        per20: '20%',
        per30: '30%',
        rem22: '5.5rem',
        n4px: '-0.25rem',
        '4px': '0.25rem',
        '6px': '0.375rem',
        '8px': '0.5rem',
        '10px': '0.625rem',
        '12px': '0.75rem',
        '14px': '0.875rem',
        '16px': '1rem',
        '18px': '1.125rem',
        '20px': '1.25rem',
        '24px': '1.5rem',
        '28px': '1.75rem',
        '32px': '2rem',
        '40px': '2.5rem',
        '48px': '3rem',
        '64px': '4rem',
        '80px': '5rem',
        '88px': '5.5rem',
        '96px': '6rem',
        '120px': '7.5rem',
        '136px': '8.5rem',
        '160px': '10rem'
      },
      colors: {
        'bor-gray': '#C9C9C9',
        'bor-gray1': '#DFDFDF',
        'bor-gray2': '#797979',
        'bor-gray3': '#F2F2F2',
        'fill-blue': '#DFE8F6',
        'fill-blue1': '#005BAC',
        'fill-gray': '#F2F2F2',
        'fill-gray1': '#F9F9F9',
        'fill-gray2': '#000000',
        'fill-red': '#D9001B',
        blue: '#005BAC',
        black: '#333333',
        gray: '#999999',
        white: '#ffffff'
      },
      fontSize: {
        '12px': '0.75rem',
        '14px': '0.875rem'
      },
      borderRadius: {
        s1: '0.3125rem'
      }
    }
  },
  plugins: []
}
