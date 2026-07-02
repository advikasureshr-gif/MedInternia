import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      navbarGradient: string;
      footerBg: string;
      heroGradient: string;
      cardShadow: string;
      cardShadowHover: string;
      navbarHeight: number;
    };
  }
  interface ThemeOptions {
    custom?: {
      navbarGradient?: string;
      footerBg?: string;
      heroGradient?: string;
      cardShadow?: string;
      cardShadowHover?: string;
      navbarHeight?: number;
    };
  }
}

const primaryMain = '#0072ff';
const primaryDark = '#0056cc';
const primaryLight = '#e8f4ff';
const secondaryMain = '#00c6ff';
const tealAccent = '#008ecf';

export const medInterniaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryMain,
      dark: primaryDark,
      light: primaryLight,
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryMain,
      dark: tealAccent,
      light: '#e0f7ff',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#d1fae5',
    },
    warning: {
      main: '#f59e0b',
      light: '#fef3c7',
    },
    error: {
      main: '#ef4444',
      light: '#fee2e2',
    },
    info: {
      main: tealAccent,
      light: '#e0f2fe',
    },
    background: {
      default: '#f8fbff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#64748b',
      disabled: '#94a3b8',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: 0, color: '#1a202c' },
    h2: { fontWeight: 700, letterSpacing: 0, color: '#1a202c' },
    h3: { fontWeight: 700, color: '#1a202c' },
    h4: { fontWeight: 700, color: '#1a202c' },
    h5: { fontWeight: 600, color: '#1a202c' },
    h6: { fontWeight: 600, color: '#1a202c' },
    subtitle1: { fontWeight: 500, color: '#64748b' },
    subtitle2: { fontWeight: 500, color: '#64748b', fontSize: '0.875rem' },
    body1: { fontSize: '1rem', lineHeight: 1.6, color: '#334155' },
    body2: { fontSize: '0.875rem', lineHeight: 1.6, color: '#64748b' },
    button: { fontWeight: 600, textTransform: 'none' as const, letterSpacing: '0.01em' },
    caption: { fontSize: '0.75rem', color: '#94a3b8' },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  custom: {
    navbarGradient: `linear-gradient(90deg, ${primaryDark} 0%, ${primaryMain} 50%, ${secondaryMain} 100%)`,
    footerBg: '#0f172a',
    heroGradient: `linear-gradient(135deg, ${primaryMain} 0%, ${secondaryMain} 100%)`,
    cardShadow: '0 1px 3px rgba(0, 114, 255, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)',
    cardShadowHover: '0 4px 24px rgba(0, 114, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
    navbarHeight: 64,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8fbff',
          color: '#1a202c',
        },
        'input, textarea, [contenteditable="true"]': {
          userSelect: 'text',
          WebkitUserSelect: 'text',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontWeight: 600,
          '&:focus-visible': {
            outline: `2px solid ${primaryMain}`,
            outlineOffset: 2,
          },
        },
        containedPrimary: {
          background: `linear-gradient(90deg, ${primaryMain} 0%, ${secondaryMain} 100%)`,
          '&:hover': {
            background: `linear-gradient(90deg, ${primaryDark} 0%, ${primaryMain} 100%)`,
          },
        },
        outlinedPrimary: {
          borderColor: alpha(primaryMain, 0.4),
          '&:hover': {
            borderColor: primaryMain,
            backgroundColor: alpha(primaryMain, 0.04),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0, 114, 255, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&.Mui-focused fieldset': {
              borderColor: primaryMain,
              boxShadow: `0 0 0 3px ${alpha(primaryMain, 0.12)}`,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            backgroundColor: alpha(primaryMain, 0.1),
            color: primaryDark,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 86, 204, 0.15)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${primaryMain}`,
            outlineOffset: 2,
          },
        },
      },
    },
  },
});

export default medInterniaTheme;
