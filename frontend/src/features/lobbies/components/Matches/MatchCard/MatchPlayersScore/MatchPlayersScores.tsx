import React from 'react'
import { Stack } from '@mui/material'
import MatchPlayer from './MatchPlayer/MatchPlayer'
import { Player } from '../../../../types/lobby.types'

type MatchPlayersScoresProps = {
    players: Player[]
}

const MatchPlayersScores: React.FC<MatchPlayersScoresProps> = ({ players }) => {
    const sortedPlayersScores = players.toSorted((a, b) => b.score - a.score);
    const sortedPlayersScoresWithDraw = sortedPlayersScores.reduce<(Player & { place: number })[]>(
        (
            acc,
            player,
            index,
            arr
        ) => {
            const place = 1;
            if (index === 0) {
                acc.push({ ...player, place });
                return acc;
            } else {
                const prevPlace = acc[index - 1].place;
                if (arr[index].score === arr[index - 1].score) {
                    acc.push({ ...player, place: prevPlace });
                    return acc;
                } else {
                    acc.push({ ...player, place: prevPlace + 1 });
                    return acc;
                }
            }
        }, []);

    return (
        <Stack direction='row' spacing={1}>
            {sortedPlayersScoresWithDraw.map(player => <MatchPlayer key={player.userId} playerData={player} />)}
        </Stack>
    )
}

export default MatchPlayersScores 