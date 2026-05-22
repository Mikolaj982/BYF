import React from 'react';
import Box from '@mui/material/Box';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import SidebarSection from '../SidebarSection/SidebarSection';
import SidebarBottom from '../SidebarBottom/SidebarBottom';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import { UserGroup } from '../../../../features/groups/types/group.types';

type SidebarProps = {
    groups: UserGroup[];
    refetchGroups: () => Promise<void>;
    groupsError: unknown;
    loadingGroups: boolean;
    isOpen: boolean;
    onCloseSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = (
    {
        groups,
        refetchGroups,
        groupsError,
        loadingGroups,
        isOpen,
        onCloseSidebar
    }
) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const content = (
        <Box
            component='div'
            sx={{
                display: 'flex',
                width: { xs: '250px', md: '300px' },
                height: '100vh',
                flexDirection: 'column',
                bgcolor: 'background.paper',
            }}
        >
            <SidebarHeader />
            <Box
                component='div'
                sx={{
                    flexGrow: 1,
                    overflow: 'auto'
                }}
            >
                <SidebarSection
                    loadingGroups={loadingGroups}
                    groups={groups}
                    groupsError={groupsError}
                    refetchGroups={refetchGroups}
                />
            </Box>
            <SidebarBottom refetchGroups={refetchGroups} />
        </Box>
    );

    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={onCloseSidebar}
            >
                {content}
            </Drawer>
        );
    }

    return content;
};

export default Sidebar;