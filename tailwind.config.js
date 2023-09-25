/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        xl: '1280px',
        smOnly: { max: '767.98px' },
        mdOnly: { min: '768px', max: '1279.98px' },
        notXl: { max: '1279.98px' },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          xl: '2rem',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
