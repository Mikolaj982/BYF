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
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        fontSize: '0.75rem',
                    },
                    [theme.breakpoints.up('md')]: {
                        fontSize: '0.85rem',
                    },
                }),
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        fontSize: '1.5rem',
                    },
                }),
                h5: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        fontSize: '1.25rem',
                    },
                }),
                h6: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        fontSize: '1rem',
                    },
                    [theme.breakpoints.up('md')]: {
                        fontSize: '1.25rem',
                    },
                }),
                body1: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        fontSize: '0.875rem',
                    },
                }),
                body2: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        fontSize: '0.75rem',
                    },
                }),
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    padding: '16px',
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '16px !important',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '16px',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: '8px',
                },
            },
        },
    },

});
