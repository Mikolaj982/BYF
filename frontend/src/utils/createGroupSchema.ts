import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const createGroupSchema = Yup.object({
    name: Yup
        .string()
        .min(5, MESSAGES.ERROR.GROUP_NAME_TOO_SHORT)
        .max(10, MESSAGES.ERROR.GROUP_NAME_TOO_LONG)
        .required(MESSAGES.ERROR.REQUIRED),
    description: Yup
        .string()
        .default(''),
});