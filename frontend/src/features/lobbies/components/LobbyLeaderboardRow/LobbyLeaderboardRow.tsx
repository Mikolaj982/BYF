import { Avatar, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { Leaderboard } from '../../services/lobbyLeaderboard';

type LobbyLeaderboardRowProps = {
    playerData: Leaderboard;
    place: number;
    maxScore: number;
    isPodium: boolean;
};

type PodiumConfigType = Record<number, { color: string }>;


const LobbyLeaderboardRow: React.FC<LobbyLeaderboardRowProps> = (
    {
        playerData,
        place,
        maxScore,
        isPodium
    }
) => {
    const progressValue = maxScore > 0
        ? (playerData.total_score / maxScore) * 100
        : 0;

    const podiumConfig: PodiumConfigType = {
        1: { color: '#E67E22' },
        2: { color: '#7F8C8D' },
        3: { color: '#A04020' },
    };

    const medal = isPodium ? podiumConfig[place] : null;

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