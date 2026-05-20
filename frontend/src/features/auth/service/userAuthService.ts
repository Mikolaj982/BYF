import { supabase } from "../../../shared/api/supabaseClient";
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
            });

        if (insertError) throw insertError;
        return data;
    },
    login: async (userData: LoginData) => {
        const { usernameOrEmail: email, password } = userData;
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
