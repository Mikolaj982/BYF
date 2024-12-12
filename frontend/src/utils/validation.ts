export const REGEX = {
    USERNAME: /^[a-zA-Z0-9_.-]{3,}$/,
    EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#!])[A-Za-z\d@$!%*?&#]{8,}$/,
};

export const validateUsername = (username: string): boolean => {
    return REGEX.USERNAME.test(username);
};

export const validateEmail = (email: string): boolean => {
    return REGEX.EMAIL.test(email)
};

export const validatePassword = (password: string): boolean => {
    return REGEX.EMAIL.test(password)
};