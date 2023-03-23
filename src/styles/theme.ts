import {createTheme} from "@mui/material/styles";
import {green, red} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4369EE',//blue
        },
        secondary: {
            main: '#cccccc',//lightgray
        },
        error: {
            main: red.A400,
        },
        success: {
            main: green.A400,
        },
        white: {
            main: '#FFFFFF',//white
        },
        black: {
            main: '#2a2953',
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

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#4369EE',//blue
        },
        secondary: {
            main: '#cccccc',//lightgray
        },
        error: {
            main: red.A400,
        },
        success: {
            main: green.A400,
        },
        white: {
            main: '#2a2953',//white; almost black
        },
        black: {
            main: '#FFFFFFF',
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

darkTheme.typography.h6 = {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.2rem',
    },
};

darkTheme.typography.body1 = {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1rem',
    },
};

darkTheme.typography.body2 = {
    fontSize: '0.75rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
    },
};

darkTheme.typography.caption = {
    fontSize: '0.7rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.65rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '0.75rem',
    },
}