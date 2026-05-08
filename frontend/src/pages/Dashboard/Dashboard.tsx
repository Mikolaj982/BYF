import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar/Sidebar';

const Dashboard: React.FC = () => {
    return (
        <Box component='div' sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar />
            <Box component='div' sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Dashboard;