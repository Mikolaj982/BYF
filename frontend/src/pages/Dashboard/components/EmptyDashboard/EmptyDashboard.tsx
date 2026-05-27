import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../types/outletContext.types';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import CreateGroupForm from '../../../../features/groups/components/CreateGroup/CreateGroupForm';
import { Box, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';

const EmptyDashboard: React.FC = () => {
    const { groups, loadingGroups, groupsError } = useUserGroups();
    const { onOpenSidebar } = useOutletContext<DashboardOutletContext>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box component='div' >
            {
                loadingGroups ?
                    <LoadingState />
                    : groupsError
                        ? <ErrorState error={groupsError} />
                        : (!groups?.length)
                            ? (
                                <Box component='div'>
                                    {isMobile && (
                                        <IconButton
                                            onClick={onOpenSidebar}
                                            sx={{ m: 2 }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    )}
                                    <Stack
                                        alignItems='center'
                                        justifyContent='center'
                                        gap={2}
                                        p={2}
                                    >
                                        <EmptyState message='There is no groups yet. Create new one, invite your friends. Have fun!' />
                                        <CreateGroupForm />
                                    </Stack>
                                </Box>
                            )
                            : (
                                <Box component='div'>
                                    {isMobile && (
                                        <IconButton
                                            onClick={onOpenSidebar}
                                            sx={{ m: 2 }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    )}
                                    <Stack
                                        alignItems='center'
                                        justifyContent='center'
                                        gap={2}
                                        p={2}
                                    >
                                        <EmptyState message='Choose your group or create another one.' />
                                        <CreateGroupForm />
                                    </Stack>
                                </Box>
                            )
            }
        </Box>
    )
};

export default EmptyDashboard;