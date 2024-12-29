/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Montserrat_Bold: 'Montserrat-Bold',
        Montserrat_SemiBold: 'Montserrat-SemiBold',
        Montserrat_Medium: 'Montserrat-Medium',
        Montserrat_Regular: 'Montserrat-Regular',
        Montserrat_Light: 'Montserrat-Light',
      },
      colors: {
        'ecomm-primary': '#8F5F43',
        'ecomm-primary-dark': '#390B12',
        'ecomm-black': '#0D0D0D',
        'ecomm-grey': '#9299A3',
        'ecomm-text-black': '#272422',
        'ecomm-text-error': '#D02828',
        'ecomm-text-error-dark': '#FF8C8C',        
      },
    },
  },
  plugins: [],
};
