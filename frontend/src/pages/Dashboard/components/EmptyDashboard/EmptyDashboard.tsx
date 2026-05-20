import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../types/outletContext.types';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import CreateGroupForm from '../../../../features/groups/components/CreateGroup/CreateGroupForm';
import { Box, Stack } from '@mui/material';

const EmptyDashboard: React.FC = () => {
    const { groups, loadingGroups, refetchGroups, groupsError } = useOutletContext<DashboardOutletContext>();

    return (
        <Box component='div' >
            {
                loadingGroups ?
                    <LoadingState />
                    : groupsError
                        ? <ErrorState error={groupsError} />
                        : (!groups.length)
                            ? (
                                <Stack alignItems='center' justifyContent='center' gap={2} p={2}>
                                    <EmptyState message='There is no groups yet. Create new one, invite your friends. Have fun!' />
                                    <CreateGroupForm onSuccess={refetchGroups} />
                                </Stack>
                            )
                            : (
                                <Stack alignItems='center' justifyContent='center' gap={2} p={2}>
                                    <EmptyState message='Choose your group or create another one.' />
                                    <CreateGroupForm onSuccess={refetchGroups} />
                                </Stack>
                            )
            }
        </Box>
    )
};

export default EmptyDashboard;