import React from 'react';
import Box from '@mui/material/Box';
import SidebarSection from '../SidebarSection/SidebarSection';
import SidebarBottom from '../SidebarBottom/SidebarBottom';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import { UserGroup } from '../../../../features/groups/types/group.types';

type SidebarProps = {
    groups: UserGroup[];
    refetchGroups: () => Promise<void>;
    groupsError: unknown;
    loadingGroups: boolean;
};

const Sidebar: React.FC<SidebarProps> = (
    {
        groups,
        refetchGroups,
        groupsError,
        loadingGroups,
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
                <SidebarSection loadingGroups={loadingGroups} groups={groups} groupsError={groupsError} refetchGroups={refetchGroups} />
            </Box>
            <SidebarBottom refetchGroups={refetchGroups} />
        </Box>
    )
};

export default Sidebar;