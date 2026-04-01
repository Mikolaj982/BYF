import { createTheme } from "@mui/material";

const muiTheme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                size: 'small',
                margin: 'dense',
            },
            styleOverrides: {
                root: {
                    marginTop: '0px',
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontFamily: 'Poppins',
                    color: 'black',
                    backgroundColor: 'rgb(255 255 255 / 0.5)',
                    marginBottom: '5px',
                    borderRadius: '5px',
                    [theme.breakpoints.down('md')]: {
                        fontSize: '1rem',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused': {
                        boxShadow: '0 0 5px 2px rgba(255, 87, 34, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& input:-webkit-autofill': {
                        backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
                        color: 'black !important',
                    },
                    '& input:-moz-autofill': {
                        backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
                        color: 'rgba(255, 255, 255, 0.7) !important',
                    },
                    '& input': {
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }),
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.down('md')]: {
                        marginTop: '0',
                    },
                }),
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: ({ theme }) => ({
                    marginLeft: '5px',
                    marginTop: '3px',
                    fontFamily: 'Poppins',
                    color: 'rgba(255, 0, 0, 0.7)',
                    fontSize: '0.75rem',
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '0.65rem',
                        marginTop: '0',
                    },
                    [theme.breakpoints.up('lg')]: {
                        fontSize: '0.85rem',
                        marginTop: '0',
                    },
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: 'Poppins',
                    '&.Mui-focused': {
                        fontFamily: 'Poppins',
                        color: 'rgba(0, 0, 0, 0.7)',
                    }
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: 0,
                }
            }
        }
    },
});

export default muiTheme;