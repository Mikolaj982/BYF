import React from 'react';
import { List, ListItemButton, ListItemText, Chip, Stack } from '@mui/material';
import { UserGroup } from '../../../../features/groups/types/group.types';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import CreateGroupForm from '../../../../features/groups/components/CreateGroup/CreateGroupForm';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';

type SidebarSectionProps = {
    handleCloseSidebar: () => void;
};

const SidebarSection: React.FC<SidebarSectionProps> = ({ handleCloseSidebar }) => {
    const { groups, loadingGroups, groupsError } = useUserGroups();
    const navigate = useNavigate();
    const handleSelectGroup = (id: string) => {
        handleCloseSidebar();
        navigate(`group/${id}`);
    };

    if (loadingGroups) return <LoadingState />;
    if (groupsError) return <ErrorState error={groupsError} />;
    if (!groups.length) return (
        <Stack alignItems="center" justifyContent="center" gap={2} p={2}>
            <EmptyState message='You are not a member of any group yet.' />
            <CreateGroupForm />
        </Stack>
    );

    return (
        <List>
            {groups.map((group: UserGroup) => (
                <ListItemButton
                    component='div'
                    key={group.id}
                    onClick={() => handleSelectGroup(group.id)}
                    sx={{ fontSize: 14 }}
                >
                    <ListItemText primary={group.name} />
                    <Chip label={group.role} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default SidebarSection;