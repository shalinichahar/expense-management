import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green color for primary actions
    },
    secondary: {
      main: '#FFC107', // Amber color for secondary actions
    },
    background: {
      default: '#f4f4f4', // Light grey background for slight contrast
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

