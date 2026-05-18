import React from 'react';
import { Stack } from '@mui/material';
import MatchPlayer from './MatchPlayer/MatchPlayer';
import { Player } from '../../../../types/lobby.types';
import { assignPlaces } from '../../../../../../utils/podiumUtils';

type MatchPlayersScoresProps = {
    players: Player[];
};

const MatchPlayersScores: React.FC<MatchPlayersScoresProps> = ({ players }) => {
    const sortedPlayersScoresWithDraw = assignPlaces(players);
    return (
        <Stack direction='row' spacing={1}>
            {sortedPlayersScoresWithDraw.map(player => <MatchPlayer key={player.userId} playerData={player} />)}
        </Stack>
    )
};

export default MatchPlayersScores; 