import * as Yup from 'yup';
import { MESSAGES } from './messages';
import { REGEX } from './validation';

export const registerSchema = Yup.object({
    username: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED),
    email: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED)
        .matches(REGEX.EMAIL, {
            message: MESSAGES.ERROR.INVALID_EMAIL,
        }),
    password: Yup
        .string()
        .required(MESSAGES.ERROR.INVALID_PASSWORD)
        .matches(REGEX.PASSWORD, {
            message: MESSAGES.ERROR.INVALID_PASSWORD,
        }),
    confirmPassword: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED)
        .oneOf([Yup.ref('password')], MESSAGES.ERROR.NOT_MATCHES_PASSWORD),
});

export const loginSchema = Yup.object({
    usernameOrEmail: Yup
        .string()
        .test(
            'username-or-email',
            MESSAGES.ERROR.INVALID_USERNAME_EMAIL,
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