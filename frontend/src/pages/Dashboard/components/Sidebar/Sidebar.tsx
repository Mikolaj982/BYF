import React from 'react';
import Box from '@mui/material/Box';
import SidebarSection from '../SidebarSection/SidebarSection';
import SidebarBottom from '../SidebarBottom/SidebarBottom';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import { UserGroup } from '../../../../features/groups/types/group.types';

type SidebarProps = {
    loading: boolean;
    error: string | null;
    groups: UserGroup[];
    refetchGroups: () => Promise<void>;
};

const Sidebar: React.FC<SidebarProps> = (
    {
        loading,
        error,
        groups,
        refetchGroups
    }
) => {
    return (
        <Box
            component='div'
            sx={{
                display: 'flex',
                width: '250px',
                flexDirection: 'column',
                bgcolor: 'background.paper'
            }}
        >
            <SidebarHeader />
            <Box component='div' sx={{ flexGrow: 1, overflow: 'auto' }}>
                <SidebarSection loading={loading} error={error} groups={groups} />
            </Box>
            <SidebarBottom refetchGroups={refetchGroups} />
        </Box>
    )
};

export default Sidebar;