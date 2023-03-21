import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import theme from './styles/theme';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
          <CssBaseline />
          <App />
      </React.StrictMode>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();