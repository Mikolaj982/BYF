export type FormFields = "username" | "email" | "confirmPassword" | "password" | "usernameOrEmail";

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginData = {
    usernameOrEmail: string;
    password: string;
};

export type UserFormData = RegisterData | LoginData;