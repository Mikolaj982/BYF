import React from 'react';
import { Avatar, LinearProgress, Stack, Typography } from '@mui/material';
import { LeaderboardEntry } from '../../../types/leaderboard.types';
import { getMedal } from '../../../../utils/podiumUtils/podiumUtils';

type LeaderboardRowProps = {
    playerData: LeaderboardEntry & { place: number };
    maxScore: number;
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ playerData, maxScore }) => {
    const progressValue = maxScore > 0
        ? (playerData.score / maxScore) * 100
        : 0;

    const medal = getMedal(playerData.place);

    return (
        <Stack
            direction='row'
            alignItems='center'
            gap={2}
            paddingX={3}
            paddingY={2}
            borderRadius={0}
            borderColor='#2A2A2A'
            sx={{
                transition: '0.2s ease',
                '&:hover': {
                    backgroundColor: medal ? `${medal?.color}15` : '#1e1e1e',
                },
            }}
        >
            <Typography
                color={medal?.color ?? "#2a2a2a"}
                fontWeight='bold'
                width='12px'
                textAlign='center'
                display='inline-block'
            >
                {playerData.place}
            </Typography>
            <Avatar sx={{ height: '26px', width: '26px' }}>
            </Avatar>
            <Typography flex={1} fontWeight={playerData.place === 1 ? '600' : undefined}>
                {playerData.username}
            </Typography>
            <Stack
                marginLeft='auto'
                direction='row'
                alignItems='center'
                maxWidth='160px'
                flex={1}
                gap={1}
            >
                <LinearProgress
                    variant='determinate'
                    value={progressValue}
                    sx={{
                        width: '100%',
                        height: 4,
                        borderRadius: 1,
                        backgroundColor: '#2a2a2a',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: medal?.color ?? '#2a2a2a',
                        },
                    }}
                />
                <Typography
                    width='30px'
                    textAlign='right'
                    color={playerData.place === 1 ? 'text.primary' : '#7f8c8d'}
                    fontWeight='bold'
                >
                    {playerData.score}
                </Typography>
            </Stack>
        </Stack>
    )
};

export default LeaderboardRow;
