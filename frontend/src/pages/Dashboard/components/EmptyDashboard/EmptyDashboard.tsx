import React from 'react';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import CreateGroupForm from '../../../../features/groups/components/CreateGroup/CreateGroupForm';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../types/outletContext.types';
import MobileHeader from '../../../../shared/components/MobileHeader/MobileHeader';

const EmptyDashboard: React.FC = () => {
    const { groups, loadingGroups, groupsError } = useUserGroups();
    const { onOpenSidebar } = useOutletContext<DashboardOutletContext>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const message = !groups.length
        ? 'There is no groups yet. Create new one, invite your friends. Have fun!'
        : 'Choose your group or create another one.';

    if (loadingGroups) return <LoadingState />;
    if (groupsError) return <ErrorState error={groupsError} />;

    return (
        <Box component='div'>
            {isMobile && (
                <MobileHeader
                    title='Dashboard'
                    onOpenSidebar={onOpenSidebar}
                />
            )}
            <Stack
                alignItems='center'
                justifyContent='center'
                gap={2}
                p={2}
            >
                <EmptyState message={message} />
                <CreateGroupForm />
            </Stack>
        </Box>
    )
};

export default EmptyDashboard;