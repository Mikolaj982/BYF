import React from 'react';
import { Typography, Box, List, ListItemButton, ListItemText, Chip, Stack } from '@mui/material';
import { UserGroup } from '../../../../features/groups/types/group.types';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import CreateGroupForm from '../../../../features/groups/components/CreateGroup/CreateGroupForm';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';

type SidebarSectionProps = {
    groups: UserGroup[];
    groupsError: unknown;
    loadingGroups: boolean;
    refetchGroups: () => Promise<void>;
};

const SidebarSection: React.FC<SidebarSectionProps> = (
    {
        groups,
        groupsError,
        loadingGroups,
        refetchGroups
    }
) => {
    const navigate = useNavigate();
    const handleSelectGroup = (id: string) => {
        navigate(`group/${id}`);
    };

    return (
        <Box component='div' sx={{ padding: 2 }}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                YOUR GROUPS
            </Typography>
            {
                loadingGroups
                    ? <LoadingState />
                    : groupsError
                        ? <ErrorState error={groupsError} />
                        : (!groups.length)
                            ? (
                                <Stack alignItems="center" justifyContent="center" gap={2} p={2}>
                                    <EmptyState message='You are not a member of any group yet.' />
                                    <CreateGroupForm onSuccess={refetchGroups} />
                                </Stack>
                            ) : (
                                <List>
                                    {
                                        groups.map((group: UserGroup) => {
                                            return (
                                                <ListItemButton
                                                    component='div'
                                                    key={group.id}
                                                    onClick={() => handleSelectGroup(group.id)}
                                                    sx={{ fontSize: 14 }}
                                                >
                                                    <ListItemText primary={group.name} />
                                                    <Chip label={group.role} />
                                                </ListItemButton>
                                            )
                                        })
                                    }
                                </List>
                            )
            }
        </Box>
    )
};

export default SidebarSection;