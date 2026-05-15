import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F4A261',
        },
        secondary: {
            main: '#D16A5A',
        },
        background: {
            default: '#121212',
            paper: '#1a1a1a',
        },
        text: {
            primary: '#F5F5F5',
            secondary: '#757575',
        },
    },
    shape: {
        borderRadius: 8,
    },
});
