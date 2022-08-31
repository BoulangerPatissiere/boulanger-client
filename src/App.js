import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import ElevatingAppBar from './components/AppBar/ElevatingAppBar';
import { CAKES_ROUTE, ABOUT_ROUTE } from './constants';
import CakesContainer from './pages/cakes/CakesContainer';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <CssBaseline />
        <ElevatingAppBar></ElevatingAppBar>
        <Routes>
          <Route path={CAKES_ROUTE} element={<CakesContainer />} />
          {/* <Route path={ABOUT_ROUTE} element={<h1>ABOUT</h1>} /> */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
