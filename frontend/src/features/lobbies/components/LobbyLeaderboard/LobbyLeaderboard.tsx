import React, { Fragment } from 'react';
import LobbyLeaderboardRow from '../LobbyLeaderboardRow/LobbyLeaderboardRow';
import { Divider, Paper, Stack } from '@mui/material';
import { Lobby } from '../../types/lobby.types';
import LeaderboardHeader from './LeaderboardHeader/LeaderboardHeader';
import { assignPlaces } from '../../../../utils/podiumUtils/podiumUtils';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useLobbyLeaderboard } from '../../hooks/useLobbyLeaderboard';

type LobbyLeaderboardProps = {
    lobbyData: Lobby,
};

const LobbyLeaderboard: React.FC<LobbyLeaderboardProps> = ({ lobbyData }) => {
    const { leaderboard, loadingLeaderboard, errorLeaderboard } = useLobbyLeaderboard(lobbyData.id);
    const sortedLeaderboard = leaderboard.toSorted((a, b) => b.score - a.score);
    const sortedPlayersScoresWithDraw = assignPlaces(leaderboard);
    const maxScore = sortedLeaderboard[0]?.score ?? 0;

    if (loadingLeaderboard) return <LoadingState />;
    if (errorLeaderboard) return <ErrorState error={errorLeaderboard} />;
    if (!leaderboard.length) return <EmptyState message='No results yet.' />;

    return (
        <Paper variant='outlined'>
            <LeaderboardHeader lobbyName={lobbyData.gameType} participantsCount={leaderboard.length ?? 0} />
            <Stack py={1}>
                {sortedPlayersScoresWithDraw.map((player, index) => (
                    <Fragment key={index}>
                        {index !== 0 && <Divider />}
                        <LobbyLeaderboardRow
                            key={player.userId}
                            playerData={player}
                            maxScore={maxScore}
                        />
                    </Fragment>
                ))}
            </Stack>
        </Paper>
    )
};

export default LobbyLeaderboard;