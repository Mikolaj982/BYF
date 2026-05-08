import React from 'react';
import { Typography, Box, CircularProgress, List, ListItemButton, ListItemText, Chip } from '@mui/material';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';
import { UserGroup } from '../../../../features/groups/types/group.types';
import { useNavigate } from 'react-router-dom';

const SidebarSection: React.FC = () => {

    const navigate = useNavigate();

    const handleSelectGroup = (id: string) => {
        navigate(`group/${id}`)
    };

    return (
        <Box component='div' sx={{ padding: 2 }}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Your groups:</Typography>
            {loading ? <CircularProgress size={20} sx={{ m: '1' }} /> : (
                <List>
                    {groups.map((group: UserGroup) => {
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
                        );
                    })}
                </List>
            )}
            {error && <Typography>{error}</Typography>}
        </Box>
    )
}

export default SidebarSection