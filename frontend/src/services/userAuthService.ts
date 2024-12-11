import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const submitUserData = async (userData: UserData) => {
    try {
        const response = await axios.post('http://34.172.117.230:8080/api/v1/account', userData);

        if (!response.data) {
            throw new Error('Nieprawidłowe dane rejestracji.')
        }

        const data: string = await response.data;
        console.log('dane użytkownika:', data)

    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('Nieznany błąd', { autoClose: 5000 });
        }
    }
};

export const submitUserCredientials = async (userCredentials: UserCredentials) => {
    try {
        const response = await axios.post('http://34.172.117.230:8080/api/v1/account/authenticate', {
            usernameOrEmail: 'test@test.com',
            password: 'password',
        });

        if (!response.data) {
            throw new Error('Niepoprawne dane logowania.')
        }

        const data: string = await response.data.json();
        console.log('dane logowania:', data)
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('Nieznany błąd', { autoClose: 5000 });
        }
    }
}
