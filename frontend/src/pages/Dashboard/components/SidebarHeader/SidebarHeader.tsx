import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { useAuth } from '../../../../features/auth/hooks/useAuth';

const SidebarHeader: React.FC = () => {
    const { user } = useAuth();
    const username: string = user?.user_metadata?.username ?? 'player';
    const usernameFirstLetter: string = username.split('')[0];

    return (
        <Box component='div'
            sx={{
                display: 'flex',
                gap: 1,
                flexDirection: 'column',
                borderBottom: 1,
                borderColor: 'grey.800',
                padding: 2
            }}
        >
            <Box component='div'>
                <Typography variant='h6'>Beat your friend</Typography>
            </Box>
            <Box component='div'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
                <Typography variant='h6'>
                    {username.toUpperCase()}
                </Typography>
            </Box>
        </Box>
    )
};

export default SidebarHeader;
