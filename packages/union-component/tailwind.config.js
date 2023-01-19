module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      // We whitelist the Colors enum classes to keep them after purge
      // TODO: find a way to import the enum and build the classes array
      whitelist: [
        'bg-blue',
        'bg-gray',
        'bg-jade',
        'bg-green',
        'bg-pink',
        'bg-primary',
        'bg-purple',
        'bg-white',
        'bg-yellow'
      ]
    }
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
      jade: '#187c68',
      'jade-darker': '#146656',
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
      borderWidth: {
        1: '1px'
      },
      backgroundPosition: {
        75: '75%'
      },
      lineHeight: {
        12: '2.75rem',
        13: '3rem',
        14: '3.25rem',
        15: '3.5rem',
        20: '5rem',
        40: '10rem'
      },
      screens: {
        xxl: '1536px'
      },
      spacing: {
        'x-screen-spacing': '2rem',
        'y-screen-spacing': '4rem',
        'desktop-screen-spacing': '6rem'
      },
      fontFamily: {
        'more-gothic': ['More Gothic'],
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        xss: '0.6rem',
        '7xl': '6rem',
        '9xl': '7.5rem'
      },
      minHeight: {
        'fish-section': '27.5rem',
        'screen-45': '45vh',
        'screen-70': '70vh',
        'screen-95': '95vh',
        80: '80rem'
      },
      minWidth: {
        auto: 'auto',
        '3/4': '75%'
      },
      maxWidth: {
        '5xl': '50rem',
        '6xl': '60rem',
        '8xl': '90rem'
      },
      padding: {
        phoneInputLeft: '3.5rem'
      },
      width: {
        '5xl': '50rem',
        '6xl': '60rem',
        '8xl': '90rem'
      },
      zIndex: {
        'modal-screen': 9999
      }
    }
  },
  variants: {},
  plugins: []
};
