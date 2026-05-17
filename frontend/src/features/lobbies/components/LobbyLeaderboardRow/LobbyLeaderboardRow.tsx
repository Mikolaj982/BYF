import { Avatar, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { Leaderboard } from '../../services/lobbyLeaderboard';
import { getMedal } from '../../../../constants/podiumConfig';

type LobbyLeaderboardRowProps = {
    playerData: Leaderboard & { place: number };
    maxScore: number;
};

const LobbyLeaderboardRow: React.FC<LobbyLeaderboardRowProps> = ({ playerData, maxScore }) => {
    const progressValue = maxScore > 0
        ? (playerData.total_score / maxScore) * 100
        : 0;

    const medal = getMedal(playerData.place);

    return (
        <Stack
            direction='row'
            alignItems='center'
            sx={{
                gap: 3,
                px: 3,
                py: 2,
                borderRadius: 0,
                borderColor: '#2A2A2A',
                transition: '0.2s ease',
                '&:hover': {
                    backgroundColor: medal ? `${medal?.color}15` : '#1e1e1e',
                },
            }}
        >
            <Typography
                color={medal?.color ?? "#2a2a2a"}
                fontWeight='bold'
            >
                {playerData.place}
            </Typography>
            <Avatar>
            </Avatar>
            <Typography>
                {playerData.username}
            </Typography>
            <Stack marginLeft='auto' direction='row' alignItems='center'>
                <LinearProgress
                    variant='determinate'
                    value={progressValue}
                    sx={{
                        width: 100,
                        height: 6,
                        borderRadius: 1,
                        backgroundColor: '#2a2a2a',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: medal?.color ?? '#2a2a2a',
                        },
                    }}
                />
                <Typography width={40} textAlign='right' color={playerData.place === 1 ? 'text.primary' : '#7f8c8d'} fontWeight='bold'>
                    {playerData.total_score}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default LobbyLeaderboardRow