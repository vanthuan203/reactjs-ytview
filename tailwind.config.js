module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
      colors: {
      transparent: 'transparent',
      current: 'currentColor'
    }
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // import tailwind forms
      require('@themesberg/flowbite/plugin')
   ],
  }