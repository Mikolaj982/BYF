import React from 'react';
import GroupItem from '../../../../features/groups/components/GroupItem/GroupItem';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';
import { useParams } from 'react-router-dom';

const GroupItemWrapper: React.FC = () => {
    const { groups, refetchGroups, loading } = useUserGroups();
    const { groupId } = useParams();

    if (loading) return <p>Loading...</p>

    const selectedGroup = groups.find(group => group.id === groupId) ?? null;

    if (!selectedGroup) return <p>Nie znaleziono grupy</p>;

    return (
        <GroupItem groupData={selectedGroup} refetchGroups={refetchGroups} />
    )
};

export default GroupItemWrapper;