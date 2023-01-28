/**
 * Common theme configs.
 * Merged with overrides from custom themes.
 */

import { museoSans } from 'themes/overrides';

const GREY = {
  50: '#f3f3f3',
  100: '#e6e7e7',
  200: '#cecfd0',
  300: '#b5b7b8',
  400: '#9d9fa1',
  500: '#848789',
  600: '#6b6f72',
  700: '#53575a',
  800: '#3a3f43',
  900: '#22272b',
};

const defaultTheme = {
  palette: {
    text: {
      primary: '#090F14',
      secondary: '#3a3f43',
      disabled: '#848789',
    },
    info: {
      main: '#3a3f43',
      light: '#53575a',
      dark: '#22272b',
      contrastText: '#fff',
    },
    powerPackage: {
      main: '#FFF1E0',
      light: '#FFF7ED',
      dark: '#CCBEAE',
      contrastText: '#59350E',
    },
    boothPackage: {
      main: '#E8F5E9',
      light: '#FFFFFF',
      dark: '#B6C2B7',
      contrastText: '#203F20',
    },
    grey: {
      50: GREY[50],
      100: GREY[100],
      200: GREY[200],
      300: GREY[300],
      400: GREY[400],
      500: GREY[500],
      600: GREY[600],
      700: GREY[700],
      800: GREY[800],
      900: GREY[900],
      A100: GREY[100],
      A200: GREY[200],
      A400: GREY[400],
      A700: GREY[700],
    },
  },
  typography: {
    fontFamily: 'MuseoSans, sans-serif !important', // TODO: move reset.css to the top
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
    caption: {
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 700,
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: 1.5,
      verticalAlign: 'super',
    },
    subtitle1: {
      fontWeight: 700,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: museoSans,
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            opacity: '1 !important',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textAlign: 'center',
          fontSize: '.875rem',
          lineHeight: '1rem',
        },
        sizeSmall: {
          padding: '.25rem .375rem',
        },
        outlinedSizeSmall: {
          padding: 'calc(.25rem - 1px) calc(.375rem - 1px)',
        },
        iconSizeSmall: {
          '& > *:first-of-type': {
            fontSize: '1rem',
          },
        },
        sizeMedium: {
          padding: '.1875rem .5rem',
          minHeight: '1.75rem',
        },
        outlinedSizeMedium: {
          padding: 'calc(.375rem - 1px) calc(.5rem - 1px)',
        },
        iconSizeMedium: {
          '& > *:first-of-type': {
            fontSize: '1.25rem',
          },
        },
        sizeLarge: {
          padding: '.5rem .75rem',
          minHeight: '2.5rem',
        },
        outlinedSizeLarge: {
          padding: 'calc(.75rem - 1px)',
        },
        iconSizeLarge: {
          '& > *:first-of-type': {
            fontSize: '1.375rem',
          },
        },
        startIcon: {
          marginRight: 4,
        },
        endIcon: {
          marginLeft: 4,
        },
        outlinedInherit: {
          borderColor: GREY[400],
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingBottom: 0,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '1rem',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 2,
          marginBottom: 12,
          lineHeight: 1.5,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundColor: GREY[100], // set active color here, and override in CSS
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
  },
};

export default defaultTheme;
