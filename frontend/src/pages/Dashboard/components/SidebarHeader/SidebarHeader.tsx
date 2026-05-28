import React from 'react';
import { Typography, Avatar, Stack } from '@mui/material';
import { useAuth } from '../../../../features/auth/hooks/useAuth';

const SidebarHeader: React.FC = () => {
    const { user } = useAuth();
    const username: string = user?.user_metadata?.username ?? 'player';
    const usernameFirstLetter: string = username.split('')[0];

    return (
        <Stack
            gap={1}
            borderBottom={1}
            borderColor='grey.800'
            padding={2}
        >
            <Stack direction='row'>
                <Typography variant='h6' fontWeight='600'>
                    Beat your <Typography
                        variant='h6'
                        component='span'
                        color='secondary.main'
                        fontWeight='700'
                    >
                        friend
                    </Typography>
                </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' gap={1}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
                <Typography variant='h6'>
                    {username.toUpperCase()}
                </Typography>
            </Stack>
        </Stack>
    )
};

export default SidebarHeader;
