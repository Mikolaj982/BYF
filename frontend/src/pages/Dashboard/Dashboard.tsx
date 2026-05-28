import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar/Sidebar';

const Dashboard: React.FC = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    const onOpenSidebar = () => setIsOpenSidebar(true);
    const onCloseSidebar = () => setIsOpenSidebar(false);

    return (
        <Box
            component='div'
            sx={{
                display: 'flex',
                height: '100vh',
                bgcolor: 'background.default'
            }}
        >
            <Sidebar isOpen={isOpenSidebar} onCloseSidebar={onCloseSidebar} />
            <Box component='div' sx={{ flex: 1, overflow: 'auto' }}>
                <Outlet context={{ onOpenSidebar }} />
            </Box>
        </Box>
    )
};

export default Dashboard;