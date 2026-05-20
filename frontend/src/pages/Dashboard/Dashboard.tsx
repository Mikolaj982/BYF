import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar/Sidebar';
import { useUserGroups } from '../../features/groups/hooks/useUserGroups';

const Dashboard: React.FC = () => {
    const { groups, loading: loadingGroups, error: groupsError, refetchGroups } = useUserGroups();

    return (
        <Box component='div' sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
            <Sidebar groups={groups} loadingGroups={loadingGroups} groupsError={groupsError} refetchGroups={refetchGroups} />
            <Box component='div' sx={{ flex: 1, overflow: 'auto' }}>
                <Outlet context={{ groups, loadingGroups, groupsError, refetchGroups }} />
            </Box>
            <ToastContainer />
        </Box>
    )
};

export default Dashboard;