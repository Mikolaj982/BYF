import { supabase } from "../../../shared/api/supabaseClient";
import { MESSAGES } from "../../../utils/messages";
import { RegisterData, LoginData } from "../types/auth.types";

export const userAuthService = {
    register: async (userData: RegisterData) => {
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

        if (error) throw error;

        if (!data.user) {
            throw new Error("User not created");
        }

        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: data.user?.id,
                username: username,
                email: email,
            });

        if (insertError) throw insertError;
        return data;
    },
    login: async (userData: LoginData) => {
        const { usernameOrEmail, password } = userData;
        const isEmail = usernameOrEmail.includes('@');
        let email: string = '';

        if (isEmail) {
            email = usernameOrEmail
        } else {
            if (!isEmail) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('username', usernameOrEmail)

                if (error) throw error;

                if (data.length === 0) throw new Error(MESSAGES.ERROR.USERNAME_DOES_NOT_EXIST);

                const result = data[0].email;
                email = result;
            }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return data;
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    isAuthenticated: async (): Promise<boolean> => {
        const { data } = await supabase.auth.getSession();
        return !!data.session;
    }
}; 
