import React from 'react';
import Box from '@mui/material/Box';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import SidebarSection from '../SidebarSection/SidebarSection';
import SidebarBottom from '../SidebarBottom/SidebarBottom';
import SidebarHeader from '../SidebarHeader/SidebarHeader';

type SidebarProps = {
    isOpen: boolean;
    onCloseSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = (
    {
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
                <SidebarSection />
            </Box>
            <SidebarBottom />
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