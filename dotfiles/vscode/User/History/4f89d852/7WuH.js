const { breakpoints } = require('./components/sormus/constants');

module.exports = {
  important: '.tailwind',
  purge: {
    content: [
      './pages/**/*.js',
      './pages/**/*.tsx',
      './pages/**/*.module.scss',
      './components/**/*.js',
      './components/**/*.tsx',
      './components/**/*.module.scss',
    ],
    options: {
      safelist: [
        /** safelist text- classes until components don't allow color prop */
        'text-helsinkiBlue',
        'text-helsinkiBlue-light',
        'text-helsinkiBlue-dark',
        'text-sand',
        'text-sand-light',
        'text-sand-dark',
        'text-grayscale',
        'text-grayscale-light',
        'text-grayscale-dark',
        'text-grayMedium',
        'text-ensoBlue',
        'text-livingCoral',
        'text-burntOrange',
        'text-success',
        'text-success-light',
        'text-error',
        'text-error-light',
        'text-dawnBlue',
        'text-morningLight',
        'text-goldenHour',
        'text-pinkHaze',
        'text-purpleRain',
        'text-plum',
        'text-dawnBlue-dark',
        'text-stravaOrange',
        'font-normal',
        'bg-helsinkiBlue',
        'bg-helsinkiBlue-light',
        'bg-helsinkiBlue-dark',
        'bg-sand',
        'bg-sand-light',
        'bg-sand-dark',
        'bg-grayscale',
        'bg-grayscale-light',
        'bg-grayscale-dark',
        'bg-ensoBlue',
        'bg-livingCoral',
        'bg-burntOrange',
        'bg-success',
        'bg-success-light',
        'bg-error',
        'bg-error-light',
        'bg-dawnBlue',
        'bg-morningLight',
        'bg-goldenHour',
        'bg-pinkHaze',
        'bg-purpleRain',
        'bg-plum',
        'sm:hidden',
        'md:hidden',
        'lg:hidden',
        'xl:hidden',
        'sm:block',
        'md:block',
        'lg:block',
        'xl:block',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        helsinkiBlue: {
          DEFAULT: '#2F4A73',
          light: '#526075',
          dark: '#101926',
          extraDark: '#0A1018',
        },
        sand: {
          DEFAULT: '#E6DED3',
          light: '#F6F3EF',
          dark: '#C6BCB1',
        },
        grayscale: {
          DEFAULT: '#d3d8d9',
          light: '#f2f3f5',
          medium: '#CECAC4',
          dark: '#6E6E6E',
          text: '#72757C',
        },
        grayMedium: {
          DEFAULT: '#32353B',
        },
        ensoBlue: {
          DEFAULT: '#A2D3E8',
        },
        livingCoral: {
          DEFAULT: '#FC6558',
        },
        burntOrange: {
          DEFAULT: '#CC612C',
        },
        success: {
          DEFAULT: '#55DC83',
          light: '#E2EDD5',
        },
        error: {
          DEFAULT: '#EC3F27',
          light: '#F2D0CB',
        },
        warning: {
          DEFAULT: '#ED9639',
        },
        dawnBlue: {
          DEFAULT: '#C1DDEC',
          dark: '#598EB4',
        },
        morningLight: {
          DEFAULT: '#FBF1D8',
        },
        goldenHour: {
          DEFAULT: '#FBE6D8',
        },
        pinkHaze: {
          DEFAULT: '#FFE1E1',
        },
        purpleRain: {
          DEFAULT: '#DBD7E9',
        },
        plum: {
          DEFAULT: '#4A343D',
        },
        rusticRed: {
          DEFAULT: '#310003',
        },
        blackRussian: {
          DEFAULT: '#09090E',
        },
        gucciGold: {
          DEFAULT: '#F6D048',
        },
        gucciBurgundy: {
          DEFAULT: '#3E1615',
        },
        sirocco: {
          DEFAULT: '#63826F',
        },
        stravaOrange: {
          DEFAULT: '#FC6100',
        },
        stravaBlue: {
          DEFAULT: '#191923',
        },
        stravaGray: {
          DEFAULT: '#8C8C8C',
          dark: '#434648',
        },
        opticsBlue: {
          DEFAULT: '#6FCBFF',
        },
        inherit: 'inherit',
      },
      fontSize: {
        super: '3.75rem',
        superDesktop: '4.25rem',
        heading: '2.65rem',
        headingDesktop: '3rem',
        subhead1: '1.75rem',
        subhead1Desktop: '2rem',
        subhead2: '1.333rem',
        subhead2Desktop: '1.5rem',
        subhead3: '1.2rem',
        subhead3Desktop: '1.333rem',
        body: '1rem',
        body2: '.9rem',
        eyebrow: '0.875rem',
        caption: '0.75rem',
      },
      lineHeight: {
        super: '1.2em',
        heading: '1.2em',
      },
      gridColumn: {
        main: 'main',
        full: 'full',
      },
      gridColumnStart: {
        full: 'full',
        main: 'main',
      },
      gridColumnEnd: {
        full: 'full',
        mail: 'main',
      },
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
      gridRowEnd: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
    },
    screens: {
      sm: `${breakpoints.small}px`,
      md: `${breakpoints.medium}px`,
      lg: `${breakpoints.large}px`,
      xl: `${breakpoints.xlarge}px`,
      'max-content': `${breakpoints.contentMax}px`,
    },
    fontFamily: {
      sans: ['AkkuratLL', 'ui-sans-serif', 'sans-serif'],
      serif: ['Editorial New', 'ui-serif', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
