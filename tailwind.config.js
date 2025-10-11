/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#5bb55b',
          500: '#369936',
          600: '#2a7c2a',
          700: '#236223',
          800: '#1f4f1f',
          900: '#1c411c',
        },
        earth: {
          50: '#faf9f7',
          100: '#f5f2ee',
          200: '#ebe5db',
          300: '#ddd2c2',
          400: '#cab8a1',
          500: '#b89c7f',
          600: '#a68460',
          700: '#8b6e4d',
          800: '#735c42',
          900: '#5f4d38',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}