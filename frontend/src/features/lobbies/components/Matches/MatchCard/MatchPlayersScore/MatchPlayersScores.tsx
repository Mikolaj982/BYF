import React from 'react'
import { Stack } from '@mui/material'
import MatchPlayer from './MatchPlayer/MatchPlayer'
import { Player } from '../../../../types/lobby.types'

type MatchPlayersScoresProps = {
    players: Player[]
}

const MatchPlayersScores: React.FC<MatchPlayersScoresProps> = ({ players }) => {
    return (
        <Stack direction='row' spacing={1}>
            {
                players.map((player) => (
                    <MatchPlayer
                        key={player.userId}
                        username={player.username}
                        score={player.score}
                    />
                ))
            }
        </Stack>
    )
}

export default MatchPlayersScores