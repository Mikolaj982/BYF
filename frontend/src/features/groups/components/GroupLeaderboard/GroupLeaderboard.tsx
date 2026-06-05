import React, { Fragment } from 'react';
import { Divider, Paper, Stack } from '@mui/material';
import LeaderboardHeader from './LeaderboardHeader/LeaderboardHeader';
import { assignPlaces } from '../../../../utils/podiumUtils';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useGroupLeaderboard } from '../../hooks/useGroupLeaderboard';
import { UserGroup } from '../../types/group.types';
import LobbyLeaderboardRow from '../../../lobbies/components/LobbyLeaderboardRow/LobbyLeaderboardRow';

type GroupLeaderboardProps = {
    groupData: UserGroup
};

const GroupLeaderboard: React.FC<GroupLeaderboardProps> = ({ groupData }) => {
    const { groupLeaderboard, loadingGroupLeaderboard, errorGroupLeaderboard } = useGroupLeaderboard(groupData.id);
    const sortedLeaderboard = groupLeaderboard.toSorted((a, b) => b.score - a.score);
    const sortedPlayersScoresWithDraw = assignPlaces(groupLeaderboard);
    const maxScore = sortedLeaderboard[0]?.score ?? 0;

    if (loadingGroupLeaderboard) return <LoadingState />;
    if (errorGroupLeaderboard) return <ErrorState error={errorGroupLeaderboard} />;
    if (!groupLeaderboard.length) return <EmptyState message='No results yet.' />;

    return (
        <Paper variant='outlined'>
            <LeaderboardHeader groupName='GENERAL' participantsCount={groupLeaderboard.length ?? 0} />
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

export default GroupLeaderboard;