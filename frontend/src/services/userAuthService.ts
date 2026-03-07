import 'react-toastify/dist/ReactToastify.css';
import { MESSAGES } from '../utils/messages';
import { supabase } from '../shared/api/supabaseClient';

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type LoginData = {
    usernameOrEmail: string;
    password: string;
}

export type UserFormData = RegisterData | LoginData;

export const userAuthService = {
    register: async (userData: RegisterData) => {
        try {
            const { email, password, username } = userData;

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username
                    }
                }
            });

            if (error) {
                throw new Error(error.message);
            }

            return data;

        } catch (error: unknown) {
            let message = MESSAGES.ERROR.REGISTER_FAILED;
            if (error instanceof Error) {
                message = error.message;
            }
            throw new Error(message);
        }
    },
    login: async (userData: LoginData) => {
        try {
            const { usernameOrEmail: email, password } = userData;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) {
                throw new Error(error.message);
            }

            return data;
        } catch (error: unknown) {
            let message = MESSAGES.ERROR.REGISTER_FAILED;
            if (error instanceof Error) {
                message = error.message;
            }
            throw new Error(message);
        }
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }
    },

    isAuthenticated: async (): Promise<boolean> => {
        const { data } = await supabase.auth.getSession();
        return !!data.session;
    }


} 
