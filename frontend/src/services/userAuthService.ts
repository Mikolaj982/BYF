import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { tokenService } from '../utils/tokenService';
import { axiosInstance as axios } from '../utils/axiosConfig';

export interface UserData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserCredentials {
    usernameOrEmail: string;
    password: string;
}

export const userAuthService = {
    register: async (userData: UserData) => {
        try {
            const response = await axios.post('/v1/account', userData);
            const { accessToken } = response.data;

            if (!accessToken) {
                throw new Error('Nieprawidłowe dane rejestracji.')
            }

            tokenService.setToken(accessToken);
            return accessToken;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            } else {
                toast.error('Coś poszło nie tak', { autoClose: 5000 });
            }
        }
    },
    login: async (userCredentials: UserCredentials) => {
        try {
            const response = await axios.post('/v1/account/authenticate', userCredentials);
            const { accessToken } = response.data;

            if (!accessToken) {
                throw new Error('Niepoprawne dane logowania.')
            }

            tokenService.setToken(accessToken);
            return accessToken;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            } else {
                toast.error('Coś poszło nie tak.', { autoClose: 5000 });
            }
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
