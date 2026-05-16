import { Avatar, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { Leaderboard } from '../../services/lobbyLeaderboard';

type LobbyLeaderboardRowProps = {
    playerData: Leaderboard;
    place: number;
    maxScore: number;
};

const LobbyLeaderboardRow: React.FC<LobbyLeaderboardRowProps> = (
    {
        playerData,
        place,
        maxScore
    }
) => {
    const progressValue = maxScore > 0
        ? (playerData.total_score / maxScore) * 100
        : 0;

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
                    backgroundColor: '#1e1e1e',
                },
            }}
        >
            <Typography
                color='#2a2a2a'
                fontWeight='bold'
            >
                {place}
            </Typography>
            <Avatar>
            </Avatar>
            <Typography>
                {playerData.username}
            </Typography>
            <Stack marginLeft='auto' direction='row' alignItems='center' spacing={4}>
                <LinearProgress
                    variant='determinate'
                    value={progressValue}
                    sx={{ width: 100, height: 6, borderRadius: 1 }}
                />
                <Typography>
                    {playerData.total_score}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default LobbyLeaderboardRow