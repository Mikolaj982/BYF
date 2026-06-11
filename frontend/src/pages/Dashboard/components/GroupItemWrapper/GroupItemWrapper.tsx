import React from 'react';
import GroupItem from '../../../../features/groups/components/GroupItem/GroupItem';
import { Navigate, useParams } from 'react-router-dom';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';

const GroupItemWrapper: React.FC = () => {
    const { groups, loadingGroups } = useUserGroups();
    const { groupId } = useParams();

    if (!groupId) return <ErrorState error='Invalid route.' />;
    if (loadingGroups) return <LoadingState />;

    const selectedGroup = groups.find(group => group.id === groupId) ?? null;
    if (!selectedGroup) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <GroupItem groupData={selectedGroup} />
    )
};

export default GroupItemWrapper;