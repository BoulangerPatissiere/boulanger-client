import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ElevatingAppBar from './components/AppBar/ElevatingAppBar';
import { CAKES_ROUTE, ABOUT_ROUTE } from './global/constants';
import CakesContainer from './pages/cakes/CakesContainer';
import SocialFooter from './components/AppFooter/SocialFooter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#db9b8b',
      main: '#803a2a',
      dark: '#4f1212',
    },
    secondary: {
      light: '#83d2e6',
      main: '#2a7080',
      dark: '#214e56',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className='page'>
          <div className='page-content'>
            <BrowserRouter>
              <CssBaseline />
              <ElevatingAppBar></ElevatingAppBar>
              <Routes>
                <Route path={CAKES_ROUTE} element={<CakesContainer />} />
                {/* <Route path={ABOUT_ROUTE} element={<h1>ABOUT</h1>} /> */}
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </BrowserRouter>
          </div>
          <SocialFooter />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
