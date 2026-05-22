import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import { useUserGroups } from '../../features/groups/hooks/useUserGroups';
import Sidebar from './components/Sidebar/Sidebar';

const Dashboard: React.FC = () => {
    const { groups, loading: loadingGroups, error: groupsError, refetchGroups } = useUserGroups();
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
            <Sidebar
                groups={groups}
                loadingGroups={loadingGroups}
                groupsError={groupsError}
                refetchGroups={refetchGroups}
                isOpen={isOpenSidebar}
                onCloseSidebar={onCloseSidebar}
            />
            <Box component='div' sx={{ flex: 1, overflow: 'auto' }}>
                <Outlet context={{
                    groups,
                    loadingGroups,
                    groupsError,
                    refetchGroups,
                    onOpenSidebar,
                }}
                />
            </Box>
            <ToastContainer />
        </Box>
    )
};

export default Dashboard;