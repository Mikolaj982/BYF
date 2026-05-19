import React from 'react';
import GroupItem from '../../../../features/groups/components/GroupItem/GroupItem';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../types/outletContext.types';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { Stack } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';

const GroupItemWrapper: React.FC = () => {
    const { groups, refetchGroups, loadingGroups } = useOutletContext<DashboardOutletContext>();
    const { groupId } = useParams();

    if (loadingGroups) return <LoadingState />;
    const selectedGroup = groups.find(group => group.id === groupId) ?? null;

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
        <GroupItem groupData={selectedGroup} refetchGroups={refetchGroups} />
    )
};

export default GroupItemWrapper;