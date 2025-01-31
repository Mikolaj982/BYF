import 'react-toastify/dist/ReactToastify.css';
import { tokenService } from './tokenService';
import { axiosInstance as axios } from '../configs/axiosConfig';
import { MESSAGES } from '../utils/messages';
import { AxiosError } from 'axios';

export type UserData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type UserCredentials = {
    usernameOrEmail: string;
    password: string;
}

export type UserFormData = UserData | UserCredentials;

export const userAuthService = {
    register: async (userData: UserData) => {
        try {
            const response = await axios.post('/v1/account', userData);

            if (response.status !== 201) {
                throw new Error(MESSAGES.ERROR.REGISTER_FAILED)
            }
        } catch (error: unknown) {
            let message = MESSAGES.ERROR.REGISTER_FAILED;
            const axiosError = error as AxiosError<{ message: string; errorCode?: number }>
            if (axiosError.response?.data?.message) {
                message = axiosError.response.data?.message;
            }
            throw new Error(message);
        }
    },
    login: async (userCredentials: UserCredentials) => {
        try {
            const response = await axios.post('/v1/account/authenticate', userCredentials);
            const accessToken = response.data;

            if (!accessToken) {
                throw new Error(MESSAGES.ERROR.LOGIN_FAILED)
            }

            tokenService.setToken(accessToken);
            return accessToken;
        } catch (error: unknown) {
            let message = MESSAGES.ERROR.REGISTER_FAILED;
            const axiosError = error as AxiosError<{ message: string; errorCode?: number }>
            if (axiosError.response?.data?.message) {
                message = axiosError.response.data?.message;
            }
            throw new Error(message);
        }
    },

    logout: async () => {
        try {
            await axios.post('/v1/account/logout');
            tokenService.removeToken();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }
        }
    },

    isAuthenticated: (): boolean => !!tokenService.getToken(),
} 
