import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar/Sidebar';
import { Stack } from '@mui/material';

const Dashboard: React.FC = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
    const onOpenSidebar = () => setIsOpenSidebar(true);
    const onCloseSidebar = () => setIsOpenSidebar(false);

    return (
        <Stack
            direction='row'
            height='100vh'
            bgcolor='background.default'
        >
            <Sidebar isOpen={isOpenSidebar} onCloseSidebar={onCloseSidebar} />
            <Box component='div' flex={1} overflow='auto'>
                <Outlet context={{ onOpenSidebar }} />
            </Box>
        </Stack>
    )
};

export default Dashboard;