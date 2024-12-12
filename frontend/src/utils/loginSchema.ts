import * as Yup from 'yup';
import { MESSAGES } from './messages';
import { REGEX } from './validation';

export const loginSchema = Yup.object({
    usernameOrEmail: Yup
        .string()
        .test(
            'username-or-email',
            'Pole musi zawierać istniejący adres email lub nazwę użytkownika',
            (value) => {
                if (!value) return false;
                const isEmail = REGEX.EMAIL.test(value);
                const isUsername = REGEX.USERNAME.test(value);
                return isEmail || isUsername;
            }
        )
        .required(MESSAGES.ERROR.REQUIRED),

    password: Yup
        .string()
        .required(MESSAGES.ERROR.INVALID_PASSWORD)
        .matches(REGEX.PASSWORD, {
            message: MESSAGES.ERROR.INVALID_PASSWORD,
        }),
});