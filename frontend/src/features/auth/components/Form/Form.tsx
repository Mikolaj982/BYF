import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../../../utils/loginRegisterSchema';
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react'
import { userAuthService } from '../../service/userAuthService';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import muiTheme from './Form.styles';
import CustomInputField from '../CustomInputField/CustomInputField';
import { FormFields, UserFormData, LoginData, RegisterData } from '../../types/auth.types';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';

type FormProps = {
    labels: FormFields[];
    isLogin: boolean;
};

const Form: React.FC<FormProps> = ({ labels, isLogin }) => {
    const navigate = useNavigate();
    const userData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const userCredentials = {
        usernameOrEmail: '',
        password: '',
    };
    const defaultYupValues = isLogin
        ? userCredentials
        : userData;

    const defaultResolver = isLogin
        ? loginSchema : registerSchema;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
        defaultValues: defaultYupValues,
        resolver: yupResolver<UserFormData>(defaultResolver),
    });

    useEffect(() => {
        reset();
    }, [isLogin, reset])

    const onSubmit = async (userData: UserFormData) => {
        try {
            if (isLogin) {
                await userAuthService.login(userData as LoginData);
                toast.success(MESSAGES.SUCCESS.USER_LOGGED, { toastId: 'login-success' });
                reset();
                navigate('/dashboard');
            } else {
                await userAuthService.register(userData as RegisterData);
                toast.success(MESSAGES.SUCCESS.USER_REGISTERED, { toastId: 'register-success' });
                reset();
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            toast.error(getErrorMessage(error), { toastId: 'auth-error' });
        };
    };

    return (
        <Box
            sx={{
                mt: { xs: isLogin ? '2.5rem' : 0, md: '2.5rem' },
                display: 'flex',
                flexDirection: 'column',
                zIndex: 20,
                width: { xs: '250px', md: '300px', lg: '350px', xl: '400px' },
                height: { xs: 'max-content', md: 'fit-content' },
                p: { xs: '1.25rem', md: '1.75rem' },
                ml: { md: '3rem' },
                borderRadius: 1,
                backgroundImage: 'linear-gradient(to bottom, #757575, #121212)',
                boxShadow: '0 0 10px 3px rgba(255, 69, 0, 0.6), 0 0 30px 10px rgba(230, 57, 70, 0.4)',
            }}
        >
            <Box component="h1" sx={{ m: 0, mb: '1.5rem', fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.875rem' } }}>
                {isLogin ? 'Log in' : 'Sign up'}
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end', width: '100%' }}
            >
                <ThemeProvider theme={muiTheme}>
                    {labels.map((label) => (
                        <CustomInputField
                            key={label}
                            {...register(label)}
                            label={label}
                            helperText={errors[label as keyof UserFormData]?.message}
                            error={!!errors[label as keyof UserFormData]}
                        />))}
                </ThemeProvider>
                <Box
                    component="button"
                    type="submit"
                    sx={(theme) => ({
                        position: 'relative',
                        mt: '1.5rem',
                        width: '100%',
                        borderRadius: 1,
                        py: '0.625rem',
                        px: '1.25rem',
                        border: 0,
                        background: 'none',
                        cursor: 'pointer',
                        font: 'inherit',
                        [theme.breakpoints.up('lg')]: {
                            transition: 'transform 100ms, box-shadow 100ms',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 0 8px 3px rgba(255, 165, 0, 0.4), 0 0 18px 6px rgba(255, 87, 34, 0.3)',
                            },
                            '&:hover .gradient-layer': { opacity: 0 },
                            '&:hover .solid-layer': { opacity: 1 },
                            '&:active': {
                                transform: 'scale(0.95)',
                                boxShadow: '0 0 5px 2px rgba(255, 140, 0, 0.3), 0 0 10px 4px rgba(255, 69, 0, 0.25)',
                            },
                        },
                    })}
                >
                    <Box
                        className="gradient-layer"
                        sx={(theme) => ({
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 1,
                            backgroundImage: 'linear-gradient(to right, #F4A261, #E63946)',
                            [theme.breakpoints.up('lg')]: { transition: 'opacity 100ms' },
                        })}
                    />
                    <Box
                        className="solid-layer"
                        sx={(theme) => ({
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 1,
                            backgroundColor: '#E63946',
                            opacity: 0,
                            [theme.breakpoints.up('lg')]: { transition: 'opacity 100ms' },
                        })}
                    />
                    <Box component="span" sx={{ position: 'relative', zIndex: 10, pointerEvents: 'none', color: 'text.primary' }}>
                        {isLogin ? 'log in' : 'sign up'}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default Form;
