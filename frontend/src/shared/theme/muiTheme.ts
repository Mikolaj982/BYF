import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F4A261', // sandyOrange
        },
        secondary: {
            main: '#E63946', // carmineRed
        },
        background: {
            default: '#121212', // richBlack
            paper: '#1a1a1a',
        },
        text: {
            primary: '#F5F5F5', // offWhite
            secondary: '#757575', // coolGray
        },
    },
    shape: {
        borderRadius: 8,
    },
});
