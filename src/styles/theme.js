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
        },
        subtitle1: {
            fontSize: 11,
        },
        subtitle2: {
            fontSize: 9,
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1536,
        },
    },
});

theme.typography.h6 = {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.2rem',
    },
};

theme.typography.body1 = {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1rem',
    },
};

theme.typography.body2 = {
    fontSize: '0.75rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
    },
};

theme.typography.caption = {
    fontSize: '0.7rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.65rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '0.75rem',
    },
};

export default theme;