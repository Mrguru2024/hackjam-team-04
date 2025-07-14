/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          subtle: '#C2D8FE',
          lighter: '#74A6FF',
          default: '#2977FF',
          darker: '#2A4EA2',
        },
        surface: {
          subtle: '#EFEDED',
          default: '#575252',
          disabled: '#B7B5B5',
        },
        border: {
          default: '#C6C6C6',
          disabled: '#9AA7BC',
          darker: '#575252',
          error: '#B41C2B',
          success: '#009F42',
          warning: '#F0AD4E',
        },
        text: {
          title: '#161515',
          body: '#353232',
          subtitle: '#353232',
          caption: '#767070',
          negative: '#EFEDED',
          disabled: '#919191',
        },
      },
      fontFamily: {
        jura: ['Jura', 'sans-serif'],
      },
      fontSize: {
        jumbo: '40px',
      },
      borderRadius: {
        xl: '12px',
      },
    },
  },
  plugins: [],
} 