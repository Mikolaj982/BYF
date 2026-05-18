import React from 'react';
import GroupItem from '../../../../features/groups/components/GroupItem/GroupItem';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../types/outletContext.types';

const GroupItemWrapper: React.FC = () => {
    const { groups, loading, refetchGroups } = useOutletContext<DashboardOutletContext>();
    const { groupId } = useParams();

    if (loading) return <p>Loading...</p>;

    const selectedGroup = groups.find(group => group.id === groupId) ?? null;

    if (!selectedGroup) return <p>Nie znaleziono grupy</p>;

    return (
        <GroupItem groupData={selectedGroup} refetchGroups={refetchGroups} />
    )
};

export default GroupItemWrapper;