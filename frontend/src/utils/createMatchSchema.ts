import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const createMatchSchema = Yup.object({
    firstUserId: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED),
    secondUserId: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED)
        .test(
            'not-same-user-id',
            'Nie możesz wybrać tego samego użytkownika',
            function (value) {
                const { firstUserId } = this.parent;

                if (!value || !firstUserId) return true;

                return firstUserId !== value;
            }
        ),
    firstUserScore: Yup
        .number()
        .required(MESSAGES.ERROR.REQUIRED),
    secondUserScore: Yup
        .number()
        .required(MESSAGES.ERROR.REQUIRED),
});