import React from 'react';
import Leaderboard from '../../../../shared/components/Leaderboard/Leaderboard';
import { useGroupLeaderboard } from '../../hooks/useGroupLeaderboard';
import { UserGroup } from '../../types/group.types';

type GroupLeaderboardProps = {
    groupData: UserGroup
};

const GroupLeaderboard: React.FC<GroupLeaderboardProps> = ({ groupData }) => {
    const { groupLeaderboard, loadingGroupLeaderboard, errorGroupLeaderboard } = useGroupLeaderboard(groupData.id);

    return (
        <Leaderboard
            title='GENERAL'
            entries={groupLeaderboard}
            isLoading={loadingGroupLeaderboard}
            error={errorGroupLeaderboard}
        />
    )
};

export default GroupLeaderboard;
