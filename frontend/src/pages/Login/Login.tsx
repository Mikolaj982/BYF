import React, { useState } from 'react'
import { VerifiedUserRounded } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { UserCredentials } from '../../services/userAuthService';
import { loginSchema as resolver } from '../../utils/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { userAuthService } from '../../services/userAuthService';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';

const Login = () => {
    const userCredientials: UserCredentials = {
        usernameOrEmail: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserCredentials>({
        defaultValues: userCredientials,
        resolver: yupResolver(resolver),
    });
    const [visiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = userAuthService;

    const onSubmit = async (userCredientials: UserCredentials) => {
        try {
            await login(userCredientials);
            reset();
            toast.success(MESSAGES.SUCCES.USER_REGISTERED);
            setTimeout(() => navigate('/main-page'), 2000);
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'message' in error) {
                toast.error((error as { message: string }).message);
            } else if (error instanceof Error) {
                toast.error(MESSAGES.ERROR.LOGIN_FAILED);
            } else {
                toast.error('Coś poszło nie tak.');
            }
        }
    };

    const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsVisiblePassword((prev) => !prev)
    };

    return (
        <>
            <div className='h-screen relative flex justify-center items-center'>
                <div className="fixed top-0 left-0 right-0 h-8 z-10"></div>
                <div className='h-full w-full bg-gradient-to-br from-[#87e5da] via-[#db2d43] to-[#db2d43] absolute top-0 left-0'></div>
                <div className='flex flex-col justify-center w-[350px] relative p-7 rounded-lg  bg-white/30'>
                    <h1 className='font-bold text-2xl top-10'>Login</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col h-full mt-6 w-full'>
                        <TextField
                            {...register('usernameOrEmail')}
                            error={!!errors.usernameOrEmail}
                            helperText={errors.usernameOrEmail?.message}
                            name='usernameOrEmail'
                            label='username/email'
                            variant='outlined'
                            size='small'
                            margin='dense'
                            className='rounded-md'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                        >
                                            {<VerifiedUserRounded />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: 'rgb(255 255 255 / 0.8);',
                                },
                                "& .MuiFormHelperText-root.Mui-error": {
                                    color: 'black',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    margin: '4px 0 0 0',
                                    padding: '5px',
                                    width: '100%',
                                    textAlign: 'justify',
                                    letterSpacing: '0',
                                    lineHeight: '1.3',
                                    borderRadius: '3px'
                                },
                            }}
                        />
                        <TextField
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            name='password'
                            label='password'
                            variant='outlined'
                            size='small'
                            margin='dense'
                            className='rounded-md'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge='end'
                                            aria-label="toggle password visibility"
                                        >
                                            {visiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            type={
                                visiblePassword
                                    ? "text"
                                    : "password"
                            }
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: 'rgb(255 255 255 / 0.8);',
                                },
                                "& .MuiFormHelperText-root.Mui-error": {
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    color: 'black',
                                    margin: '4px 0 0 0',
                                    padding: '5px',
                                    width: '100%',
                                    textAlign: 'justify',
                                    letterSpacing: '0',
                                    lineHeight: '1.3',
                                    borderRadius: '3px'
                                },
                            }}
                        />
                        <button
                            type='submit'
                            className="mt-6 self-center justify-end bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Submit
                        </button>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Login