import React from 'react';
import Box from '@mui/material/Box';
import SidebarSection from '../SidebarSection/SidebarSection';
import SidebarBottom from '../SidebarBottom/SidebarBottom';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import { useUserGroups } from '../../../../features/groups/hooks/useUserGroups';

const Sidebar: React.FC = () => {
    const { groups, loading, error, refetchGroups } = useUserGroups();

    return (
        <Box component='div' sx={{ display: 'flex', width: '250px', flexDirection: 'column', bgcolor: 'background.paper' }}>
            <SidebarHeader />
            <Box component='div' sx={{ flexGrow: 1, overflow: 'auto' }}>
                <SidebarSection />
            </Box>
            <SidebarBottom />
        </Box>
    )
};

export default Sidebar;