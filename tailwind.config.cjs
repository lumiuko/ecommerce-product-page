/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(0, 0, 0, 0.7)',
        black: '#1D2026',
        gray: '#69707D',
        border: '#E4E9F2',
        orange: '#FF7E1B',
        'dark-gray': '#B6BCC8',
        'light-gray': '#F6F8FD',
        'light-orange': '#FFEEE2',
        'very-light-orange': '#FFAB6A'
      },
      borderRadius: {
        badge: '6px',
        10: '10px',
        15: '15px'
      },
      boxShadow: {
        button: '0px 20px 50px -20px #FF7E1B',
        dropdown: '0px 20px 50px -20px rgba(29, 32, 38, 0.503143)'
      }
    },
    fontFamily: {
      sans: ['Kumbh Sans', 'sans-serif']
    },
    container: {
      center: true
    },
    screens: {
      md: '768px',
      lg: '1100px'
    },
    fontSize: {
      desktopNav: '0.875rem',
      mobileNav: '1.125rem',
      title: '1.75rem',
      badge: '0.625rem',
      'small-title': '0.75rem',
      'lg-title': '2.75rem'
    },
    lineHeight: {
      title: '2rem',
      'lg-title': '3rem',
      button: '1.25'
    },
    letterSpacing: {
      'small-title': '1.85px'
    }
  },
  plugins: []
}
