import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, loginSchema } from '../../../../utils/loginRegisterSchema';
import { ThemeProvider } from '@mui/material';
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
    const userCredientials = {
        usernameOrEmail: '',
        password: '',
    };
    const defaultYupValues = isLogin
        ? userData
        : userCredientials;

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
                toast.success(MESSAGES.SUCCESS.USER_LOGGED);
                reset();
                navigate('/dashboard');
            } else {
                await userAuthService.register(userData as RegisterData);
                toast.success(MESSAGES.SUCCESS.USER_REGISTERED);
                reset();
                navigate('/dashboard');
            }
        } catch (error: unknown) {
            toast.error(getErrorMessage(error));
        };
    };

    return (
        <div className={`${isLogin ? "mt-10" : "mt-0"} flex flex-col z-20 justify-self-end md:mt-10 w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] h-max md:h-fit p-5 md:p-7 md:ml-[3rem] rounded-lg bg-gradient-to-b from-coolGray to-richBlack shadow-fancy`}>
            <h1 className='font-bold text-2xl md:text-3xl mb-6'>{isLogin ? 'Log in' : 'Sign up'}</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col h-full justify-end w-full'>
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
                <button
                    type="submit"
                    className="relative mt-6 w-full rounded-lg py-2.5 px-5 lg:transition-all duration-100 lg:hover:shadow-hoverFancy lg:active:shadow-activeFancy lg:hover:scale-105 lg:active:scale-95">
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-sandyOrange to-carmineRed lg:transition-opacity lg:duration-100 lg:hover:opacity-0"></span>
                    <span className="absolute inset-0 rounded-lg bg-carmineRed lg:transition-opacity lg:duration-100 opacity-0 lg:hover:opacity-100"></span>
                    <span className="relative z-10 pointer-events-none text-offWhite">{isLogin ? 'log in' : 'sign up'}</span>
                </button>
            </form>
        </div>
    )
};

export default Form;