import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typewriter from 'typewriter-effect';
import Form from '../../features/auth/components/Form/Form';
import { FormFields } from '../../features/auth/types/auth.types';

const Register: React.FC = () => {
    const loginLabels: FormFields[] = ["usernameOrEmail", "password"];
    const registerLabels: FormFields[] = ["username", "email", "password", "confirmPassword"];

    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

    const toggleMode = (): void => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const labels = isLoginMode ? loginLabels : registerLabels;
    return (
        <Box
            sx={{
                display: { xs: 'flex', md: 'block' },
                justifyContent: 'center',
                p: { xs: '2rem', lg: '4rem' },
                height: '100dvh',
                width: '100vw',
                bgcolor: 'background.default',
            }}
        >
            <Box
                sx={{
                    display: { md: 'flex' },
                    justifyContent: { lg: 'space-between' },
                    flexDirection: { lg: 'row' },
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        color: 'text.primary',
                        fontSize: { xs: '1.5rem', md: '1.875rem', lg: '3rem' },
                        fontWeight: 700,
                        flex: { md: 1 },
                        overflowWrap: 'break-word',
                        lineHeight: { md: 1.5, lg: 1.375 },
                        mt: { xs: '1.25rem', lg: 0 },
                    }}
                >
                    <Typewriter
                        key={isLoginMode ? 'login' : 'register'}
                        options={{
                            loop: true,
                            delay: 75,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(isLoginMode ? 'Log in to join your friends and keep the fun going!' : "Join the fun and show who's the champion!")
                                .pauseFor(4000)
                                .deleteAll()
                                .typeString(isLoginMode ? 'Compete, win, have fun!' : 'Share challenges and victories with your friends!')
                                .pauseFor(7000)
                                .deleteAll()
                                .typeString(isLoginMode ? 'Create victory stories with your friends!' : 'Join our community and be part of something great!')
                                .pauseFor(8000)
                                .start();
                        }}
                    />
                </Box>
                <svg
                    style={{ width: '100%', height: 'auto', position: 'absolute', bottom: 0, left: 0, transform: 'rotate(180deg)' }}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 600 200'
                    preserveAspectRatio='none'
                >
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".1" fill="#757575" />
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".3" fill="#E63946" />
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".75" fill="#F4A261" />
                </svg>
                <Form labels={labels} isLogin={isLoginMode} />
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: { xs: isLoginMode ? '4rem' : '1.5rem', md: '9rem' },
                        left: { xs: '50%', md: '0%' },
                        transform: { xs: 'translateX(-50%)', md: 'translateX(0)' },
                        width: { xs: '100%', md: '53%' },
                        p: '2rem',
                        color: 'text.primary',
                        fontWeight: 700,
                        fontSize: { xs: '0.875rem', lg: '1.125rem' },
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box component="span" sx={{ mb: '0.25rem' }}>
                        {isLoginMode ?
                            'Want to create an account? Sign up now!'
                            :
                            'Already have an account? Log in to continue and track your progress!'}
                    </Box>
                    <Box
                        component="button"
                        onClick={toggleMode}
                        sx={(theme) => ({
                            border: 0,
                            background: 'none',
                            p: 0,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontWeight: 'inherit',
                            textAlign: 'left',
                            fontSize: { lg: '1.25rem' },
                            ml: { md: '1rem' },
                            width: 'fit-content',
                            backgroundImage: 'linear-gradient(to right, #E63946, #fca5a5)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent',
                            transition: 'color 300ms, -webkit-text-fill-color 300ms',
                            zIndex: 10,
                            [theme.breakpoints.up('lg')]: {
                                '&:hover': {
                                    color: '#F4A261',
                                    WebkitTextFillColor: '#F4A261',
                                },
                            },
                        })}
                    >
                        {isLoginMode ? 'Sign up' : 'Log in'}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default Register;
