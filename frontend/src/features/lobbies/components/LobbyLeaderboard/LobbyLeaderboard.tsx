import React, { Fragment } from 'react';
import LobbyLeaderboardRow from '../LobbyLeaderboardRow/LobbyLeaderboardRow';
import { Leaderboard } from '../../services/lobbyLeaderboard';
import { CircularProgress, Divider, Paper, Stack, Typography } from '@mui/material';
import { Lobby } from '../../types/lobby.types';
import LeaderboardHeader from './LeaderboardHeader/LeaderboardHeader';
import { assignPlaces } from '../../../../constants/podiumConfig';

type LobbyLeaderboardProps = {
    leaderboard: Leaderboard[],
    error: string | null,
    loading: boolean,
    lobbyData: Lobby,
}

const LobbyLeaderboard: React.FC<LobbyLeaderboardProps> = (
    {
        leaderboard,
        error,
        loading,
        lobbyData,
    }
) => {
    const lobbyName = lobbyData.game_type;
    const leaderboardPlayersCount = leaderboard.length;
    const sortedLeaderboard = leaderboard.toSorted((a, b) => b.score - a.score);
    const sortedPlayersScoresWithDraw = assignPlaces(leaderboard);
    const maxScore = sortedLeaderboard.length > 0 ? sortedLeaderboard[0].score : 0;

    return (
        <Stack
            padding={3}
            spacing={1}
        >
            <Typography
                fontSize={14}
                color='text.secondary'
            >
                LEADERBOARD
            </Typography>
            <Paper variant='outlined'>
                <LeaderboardHeader
                    lobbyName={lobbyName}
                    participantsCount={leaderboardPlayersCount}
                />
                <Stack py={1}>
                    {
                        error
                            ?
                            <Typography>
                                {error}
                            </Typography>
                            :
                            loading
                                ?
                                <CircularProgress
                                    size={20}
                                    sx={{ m: 1 }}
                                />
                                :
                                (leaderboard.length === 0)
                                    ?
                                    <Typography>
                                        brak wyników
                                    </Typography>
                                    :
                                    (sortedPlayersScoresWithDraw.map((player, index) => (
                                        <Fragment key={index}>
                                            {index !== 0 && <Divider />}
                                            <LobbyLeaderboardRow
                                                key={player.user_id}
                                                playerData={player}
                                                maxScore={maxScore}
                                            />
                                        </Fragment>
                                    )))
                    }
                </Stack>
            </Paper>
        </Stack>
    );
};

export default LobbyLeaderboard;