import * as Yup from 'yup';
import { MESSAGES } from './messages';

export const createMatchSchema = Yup.object({
    gameName: Yup.string()
        .required(MESSAGES.ERROR.REQUIRED),
    players: Yup.array()
        .of(
            Yup.object({
                userId: Yup.string()
                    .required(MESSAGES.ERROR.REQUIRED),

                score: Yup.number()
                    .required(MESSAGES.ERROR.REQUIRED)
                    .min(0),
            })
        )
        .required()
        .min(2, 'Mecz musi mieć minimum 2 graczy')
        .test(
            'unique-users',
            'Nie możesz wybrać tego samego użytkownika',
            (players) => {
                if (!players) return true;

                const userIds = players.map(
                    (player) => player.userId
                );

                return new Set(userIds).size === userIds.length;
            }
        ),
});