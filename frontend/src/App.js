

// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;