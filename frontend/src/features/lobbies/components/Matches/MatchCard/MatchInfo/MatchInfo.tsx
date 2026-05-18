import React from 'react';
import { Stack, Typography } from '@mui/material';

type MatchInfoProps = {
    playersCount: number;
    createdAt: string;
    gameName: string;
};

const MatchInfo: React.FC<MatchInfoProps> = (
    {
        playersCount,
        createdAt,
        gameName
    }
) => {
    return (
        <Stack color='text.secondary' spacing={1}>
            <Typography fontSize={14} color='text.primary'>
                {gameName}
            </Typography>
            <Typography variant='body2' fontSize={11}>
                {new Date(createdAt).toLocaleDateString('pl-PL')}
            </Typography>
            <Typography fontSize={10}>
                {playersCount} participants
            </Typography>
        </Stack>
    )
};

export default MatchInfo;