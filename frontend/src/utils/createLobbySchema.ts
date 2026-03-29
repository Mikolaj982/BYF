import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const createLobbySchema = Yup.object({
    gameType: Yup
        .string()
        .required(MESSAGES.ERROR.REQUIRED),
});