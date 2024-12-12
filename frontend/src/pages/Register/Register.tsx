import React, { useState } from 'react';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { EmailRounded } from '@mui/icons-material';
import { VerifiedUserRounded } from '@mui/icons-material';
import '../../../src/index.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MESSAGES } from '../../utils/messages';
import { toast, ToastContainer } from 'react-toastify';
import { submitUserData } from '../../services/userAuthService';
import { UserData } from '../../services/userAuthService';
import { registerSchema as resolver } from '../../utils/registerSchema';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const userData: UserData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserData>({
        defaultValues: userData,
        resolver: yupResolver(resolver),
    });
    const [PasswordVisibility, setPasswordVisibility] = useState<{ password: boolean, confirmPassword: boolean }>({
        password: false,
        confirmPassword: false,
    });
    const navigate = useNavigate();

    const onSubmit = async (userData: UserData) => {
        try {
            await submitUserData(userData);
            reset();
            toast.success(MESSAGES.SUCCES.USER_REGISTERED);
            navigate('/login');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Nieznany błąd.');
            };
        };
    };

    const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (<>
        <div className='h-screen relative flex justify-center items-center'>
            <ToastContainer />
            <div className='h-full w-full bg-gradient-to-br from-[#87e5da] via-[#db2d43] to-[#db2d43] absolute top-0 left-0'></div>
            <div className='flex flex-col justify-center w-[350px] relative p-7 rounded-lg  bg-white/30'>
                <h1 className='font-bold text-2xl'>Register</h1>
                <div className='h-28 bg-white mt-8'>pick avatar</div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col h-full justify-end w-full'>
                    <TextField
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        name='username'
                        label='username'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: 'rgb(255 255 255 / 0.5);',
                            },
                            "& .MuiFormHelperText-root.Mui-error": {
                                color: 'black',
                                marginLeft: '5px',
                            },
                            marginTop: '0px',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end">
                                        <VerifiedUserRounded />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        name='email'
                        label='email'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: 'rgb(255 255 255 / 0.5);',
                            },
                            "& .MuiFormHelperText-root.Mui-error": {
                                color: 'black',
                                marginLeft: '5px',
                            },
                            marginTop: '0px',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                    >
                                        {<EmailRounded />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                    <TextField
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        name='password'
                        label='password'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: 'rgb(255 255 255 / 0.5);',
                            },
                            "& .MuiFormHelperText-root.Mui-error": {
                                color: 'black',
                                marginLeft: '5px',
                            },
                            marginTop: '0px',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => handleClickShowPassword('password')}
                                        edge='end'
                                        aria-label="toggle password visibility"
                                    >
                                        {PasswordVisibility.password ?
                                            <VisibilityOffIcon /> :
                                            <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        type={
                            PasswordVisibility.password
                                ? "text"
                                : "password"
                        }
                    ></TextField>
                    <TextField
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        name='confirmPassword'
                        label='confirm password'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: 'rgb(255 255 255 / 0.5);',
                            },
                            "& .MuiFormHelperText-root.Mui-error": {
                                color: 'black',
                                marginLeft: '5px',
                            },
                            marginTop: '0px',
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() => handleClickShowPassword('confirmPassword')}
                                        edge='end'
                                        aria-label="toggle password visibility"
                                    >
                                        {PasswordVisibility.confirmPassword ?
                                            <VisibilityOffIcon /> :
                                            <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        type={
                            PasswordVisibility.confirmPassword
                                ? "text"
                                : "password"
                        }
                    ></TextField>
                    <button
                        type='submit'
                        className="mt-6 self-center bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Submit
                    </button>
                </form>
            </div >
        </div >
    </>
    )
}

export default Register