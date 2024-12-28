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
        'ecomm-black': '#272422',
        'ecomm-grey': '#9D9EA3',
      },
    },
  },
  plugins: [],
};
