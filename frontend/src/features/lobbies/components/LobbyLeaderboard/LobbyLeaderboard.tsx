import React, { Fragment } from 'react';
import LobbyLeaderboardRow from '../LobbyLeaderboardRow/LobbyLeaderboardRow';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Lobby } from '../../types/lobby.types';
import LeaderboardHeader from './LeaderboardHeader/LeaderboardHeader';
import { assignPlaces } from '../../../../utils/podiumUtils';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useLobbyLeaderboard } from '../../hooks/useLobbyLeaderboard';

type LobbyLeaderboardProps = {
    lobbyData: Lobby,
};

const LobbyLeaderboard: React.FC<LobbyLeaderboardProps> = ({ lobbyData }) => {
    const { leaderboard, loadingLeaderboard, errorLeaderboard } = useLobbyLeaderboard(lobbyData.id);
    const lobbyName = lobbyData.gameType;
    const leaderboardPlayersCount = leaderboard?.length;
    const sortedLeaderboard = leaderboard?.toSorted((a, b) => b.score - a.score);
    const sortedPlayersScoresWithDraw = assignPlaces(leaderboard ?? []);
    const maxScore = sortedLeaderboard?.[0]?.score ?? 0;

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
                    participantsCount={leaderboardPlayersCount ?? 0}
                />
                <Stack py={1}>
                    {loadingLeaderboard
                        ? <LoadingState />
                        : errorLeaderboard
                            ? <ErrorState error={errorLeaderboard} />
                            : (!leaderboard?.length)
                                ? <EmptyState message='No results yet.' />
                                : (
                                    sortedPlayersScoresWithDraw.map((player, index) => (
                                        <Fragment key={index}>
                                            {index !== 0 && <Divider />}
                                            <LobbyLeaderboardRow
                                                key={player.userId}
                                                playerData={player}
                                                maxScore={maxScore}
                                            />
                                        </Fragment>
                                    ))
                                )
                    }
                </Stack>
            </Paper>
        </Stack>
    )
};

export default LobbyLeaderboard;