module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {}
  },
  theme: {
    colors: {
      'black-100': '#1C1C1C',
      gray: '#2B2B2B',
      'gray-100': '#6A6A6A',
      'gray-200': '#4F4F4F',
      'gray-300': '#828282',
      'gray-400': '#585757',
      'gray-500': '#DBDBDB',
      'white-100': '#F7F7F7',
      'white-200': '#FCFBF7',
      'white-300': '#F6FAF8',
      black: '#000000',
      'beige-100': '#FBFBFB',
      'beige-500': '#EBE7DC',
      'beige-600': '#FFFBEA',
      blue: '#DBF8FF',
      'blue-100': '#03a9f4',
      'blue-200': '#DBF8FF',
      turquoise: '#7DCCBC',
      green: '#D6FFB8',
      pink: '#FFADA4',
      primary: '#FF4630',
      'primary-darker': '#EE2812',
      purple: '#DAC4F5',
      'purple-100': '#BB6BD9',
      white: '#FFFFFF',
      yellow: '#FFED9C'
    },
    fontWeight: {
      normal: 400,
      semibold: 600,
      bold: 800
    },
    extend: {
      fontFamily: {
        'more-gothic': ['More Gothic'],
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        xss: '0.6rem'
      },
      padding: {
        phoneInputLeft: '3.5rem'
      }
    }
  },
  variants: {},
  plugins: []
};
