import React from 'react';
import Box from '@mui/material/Box';
import { Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import SidebarSection from '../SidebarSection/SidebarSection';
import SidebarBottom from '../SidebarBottom/SidebarBottom';
import SidebarHeader from '../SidebarHeader/SidebarHeader';
import SectionContainer from '../../../../shared/components/SectionContainer/SectionContainer';
import SectionLabel from '../../../../shared/components/SectionLabel/SectionLabel';

type SidebarProps = {
    isOpen: boolean;
    onCloseSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseSidebar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const content = (
        <Stack
            width={{ xs: '250px', md: '300px' }}
            height='100vh'
            bgcolor='background.paper'
        >
            <SidebarHeader />
            <Box
                flexGrow={1}
                overflow='auto'
                component='div'
            >
                <SectionContainer>
                    <SectionLabel label='your groups' />
                    <SidebarSection handleCloseSidebar={onCloseSidebar} />
                </SectionContainer>
            </Box>
            <SidebarBottom />
        </Stack>
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