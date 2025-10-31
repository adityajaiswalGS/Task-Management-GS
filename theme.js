// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,  // 'light' or 'dark'
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

export default getTheme;