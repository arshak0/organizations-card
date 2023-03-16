import {createTheme} from "@mui/material/styles";
import {green, red} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4369EE',
        },
        secondary: {
            main: '#cccccc',
        },
        error: {
            main: red.A400,
        },
        success: {
            main: green.A400,
        },
        white: {
            main: '#FFFFFF',
        },
    },
    spacing: [0, 4, 8, 16, 32, 64],
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

export default theme;