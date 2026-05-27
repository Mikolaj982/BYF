import React from 'react';
import GroupItem from '../../../../features/groups/components/GroupItem/GroupItem';
import { useParams } from 'react-router-dom';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { Stack } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';

const GroupItemWrapper: React.FC = () => {
    const { groups, loadingGroups } = useUserGroups();
    const { groupId } = useParams();

    if (loadingGroups) return <LoadingState />;
    const selectedGroup = groups?.find(group => group.id === groupId) ?? null;

    if (!selectedGroup) return (
        <Stack
            alignItems="center"
            justifyContent="center"
            gap={2}
            p={2}
        >
            <ErrorState error='Group not found.' />
        </Stack>
    );

    return (
        <GroupItem groupData={selectedGroup} />
    )
};

export default GroupItemWrapper;