import React, {createContext, useState} from "react";
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/App.scss';
import HomePage from "./pages/HomePage";
import {CssBaseline} from "@mui/material";
import {theme, darkTheme} from "./styles/theme";
import {ThemeProvider} from "@mui/material/styles";
import NavBar from "./components/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export const ThemeContext = createContext<string>('light');

function App() {
    const [themeType, setThemeType] = useState<string>('light');

    const changeTheme = (value) => {
        if (value) setThemeType('dark')
        else setThemeType('light');
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={themeType === 'light' ? theme : darkTheme}>
                <CssBaseline />
            <ThemeContext.Provider value={{ themeType, changeTheme }}>
                    <BrowserRouter>
                        <NavBar></NavBar>
                        <Routes>
                            <Route path="/" element={ <HomePage /> } />
                        </Routes>
                    </BrowserRouter>
            </ThemeContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
