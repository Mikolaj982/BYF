import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const createGroupSchema = Yup.object({
    name: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED),
    description: Yup
        .string()
        .optional(),
});