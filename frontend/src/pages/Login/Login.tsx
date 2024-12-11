import React, { FormEvent, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { VerifiedUserRounded } from '@mui/icons-material';
import useAlerts from '../../assets/hooks/useAlerts';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface User {
    usernameOrEmail: '',
    password: ''
}

const Login = () => {
    const [userData, setUserData] = useState<User>({
        usernameOrEmail: '',
        password: '',
    });
    const [visiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const { alerts, removeAlert, addAlert } = useAlerts();

    const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsVisiblePassword((prev) => !prev)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {
            usernameOrEmail: '',
            password: '',
        };

        const isValidUsername = /^[a-zA-Z0-9_.-]{3,}$/.test(userData.usernameOrEmail);
        const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.usernameOrEmail);

        if (!isValidUsername && !isValidEmail) {
            newErrors.usernameOrEmail = 'Wpisz prawidłową nazwę użytkownika lub adres email';
        }
        if (userData.password.length < 8) {
            newErrors.password = 'Hasło musi mieć co najmniej 8 znaków';
        }

        const errorCount = Object.values(newErrors).filter(error => error !== '').length;

        if (errorCount === 0) {
            addAlert('Dane zostały uzupełnione poprawnie!', 'success');
        } else {
            const err = Object.values(newErrors).find(err => err !== '');
            addAlert(err);
        }

        newErrors = {
            usernameOrEmail: '',
            password: '',
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate();
    };

    const handleUserData = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('', userData);
            console.log('success', response.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error('failure', error.message)
            } else {
                console.error('Unexpected error:', error)
            }
        }
    };

    return (
        <>
            <div className='h-screen relative flex justify-center items-center'>
                <div className="fixed top-0 left-0 right-0 h-8 z-10"> {alerts.map((alert, index) => (
                    <Snackbar
                        className="animate-slide-down"
                        key={index}
                        open={true}
                        autoHideDuration={6000}
                        onClose={() => removeAlert(index)}
                    >
                        <Alert
                            variant="filled"
                            className="w-full h-auto"
                            onClose={() => removeAlert(index)}
                            severity={alert.type}
                        >
                            {alert.message}
                        </Alert>
                    </Snackbar>
                ))}</div>
                <div className='h-full w-full bg-gradient-to-br from-[#87e5da] via-[#db2d43] to-[#db2d43] absolute top-0 left-0'></div>
                <div className='flex flex-col justify-center w-22 relative p-7 rounded-lg  bg-white/30'>
                    <h1 className='font-bold text-2xl top-10'>Login</h1>
                    <form
                        onSubmit={(e) => { handleUserData(e); handleSubmit(e) }}
                        className='flex flex-col h-full mt-6'>
                        <TextField
                            name='usernameOrEmail'
                            label='username or email'
                            variant='outlined'
                            size='small'
                            margin='dense'
                            value={userData?.usernameOrEmail}
                            onChange={handleInputChange}
                            className='bg-white/50 rounded-md'
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
                        />
                        <TextField
                            name='password'
                            label='password'
                            variant='outlined'
                            size='small'
                            margin='dense'
                            className='bg-white/50 rounded-md'
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
                            value={userData?.password}
                            onChange={handleInputChange}
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