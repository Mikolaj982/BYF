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
                    .transform((value, original) => original === '' ? undefined : value)
                    .required(MESSAGES.ERROR.REQUIRED)
                    .min(0, 'Score must be 0 or higher'),
            })
        )
        .required()
        .min(2, 'The match requires two players.')
        .test(
            'unique-users',
            "you can't select the same player",
            (players) => {
                if (!players) return true;

                const userIds = players.map(
                    (player) => player.userId
                );

                return new Set(userIds).size === userIds.length;
            }
        ),
});