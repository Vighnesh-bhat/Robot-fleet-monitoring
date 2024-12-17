// src/styles/theme.js
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f4f4',
    },
    status: {
      online: '#4caf50',
      offline: '#f44336',
      lowBattery: '#ff9800'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  }
});