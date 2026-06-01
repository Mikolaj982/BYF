import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const createLobbySchema = Yup.object({
    gameType: Yup
        .string()
        .min(3, MESSAGES.ERROR.LOBBY_NAME_TOO_SHORT)
        .max(25, MESSAGES.ERROR.LOBBY_NAME_TOO_LONG)
        .required(MESSAGES.ERROR.REQUIRED),
});