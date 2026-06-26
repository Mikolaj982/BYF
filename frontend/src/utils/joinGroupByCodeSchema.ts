import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const joinGroupByCodeSchema = Yup.object({
    code: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED),
});