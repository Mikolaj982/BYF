import React, { FormEvent, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { EmailRounded } from '@mui/icons-material';
import { VerifiedUserRounded } from '@mui/icons-material';
import useAlerts from '../../assets/hooks/useAlerts';
import '../../../src/index.css'

interface User {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const [userData, setUserData] = useState<User>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<object>({})
    const [visiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setIsVisibleConfirmPassword] = useState<boolean>(false);
    const { alerts, removeAlert, addAlert } = useAlerts();

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsVisiblePassword((prev) => !prev)
    }

    const handleClickShowConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsVisibleConfirmPassword((prev) => !prev)
    }

    const validate = () => {
        let newErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        if (!userData.username.match(/^[a-zA-Z0-9_.-]{3,}$/)) {
            newErrors.username = 'Nieprawidłowa nazwa użytkownika';
        }
        if (!userData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            newErrors.email = 'Nieprawidłowy email';
        }
        if (userData.password.length < 8) {
            newErrors.password = 'Hasło musi mieć co najmniej 8 znaków';
        }
        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = 'Hasła muszą być identyczne';
        }
        const errorCount = Object.values(newErrors).filter(error => error !== '').length;
        if (errorCount === 0) {
            addAlert('Dane zostały uzupełnione poprawnie!', 'success');
        } else {
            const err = Object.values(newErrors).find(err => err !== '');
            addAlert(err);
        }
        newErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate();
    };

    return (<>
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
            <div className='flex flex-col justify-center w-22 relative p-7 h-3/5 rounded-lg  bg-white/30'>
                <h1 className='font-bold text-2xl top-10'>Register</h1>
                <div className='h-28 bg-white mt-8'>pick avatar</div>
                <form
                    onSubmit={(e) => { handleUserData(e); handleSubmit(e) }}
                    className='flex flex-col h-full justify-end'>
                    <TextField
                        name='username'
                        label='username'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        value={userData?.username}
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
                        name='email'
                        label='email'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        value={userData?.email}
                        onChange={handleInputChange}
                        className='bg-white/50 rounded-md'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                    >
                                        {<EmailRounded />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    ></TextField>
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
                    ></TextField>
                    <TextField
                        name='confirmPassword'
                        label='confirm password'
                        variant='outlined'
                        size='small'
                        margin='dense'
                        className='bg-white/50 rounded-md'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowConfirmPassword}
                                        edge='end'
                                        aria-label="toggle password visibility"
                                    >
                                        {visibleConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        type={
                            visibleConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={userData?.confirmPassword}
                        onChange={handleInputChange}
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