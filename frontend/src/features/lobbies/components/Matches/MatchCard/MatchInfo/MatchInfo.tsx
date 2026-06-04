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
        <Stack
            color='text.secondary'
            spacing={{ xs: 0.5, md: 1 }}
            width={{ xs: '70px', md: '130px' }}
            flexShrink={0}
            boxSizing='border-box'
        >
            <Typography
                fontSize={14}
                color='text.primary'
                overflow='hidden'
                sx={{ wordBreak: 'break-word' }}
            >
                {gameName}
            </Typography>
            <Typography variant='body2' fontSize={11}>
                {new Date(createdAt).toLocaleDateString('pl-PL')}
            </Typography>
            <Typography variant='body2' fontSize={10} noWrap>
                {playersCount} players
            </Typography>
        </Stack>
    )
};

export default MatchInfo;