import React from 'react';
import { Chip, Paper, Stack, Typography } from '@mui/material';

type LeaderboardHeaderProps = {
    title: string;
    participantsCount: number;
};

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ title, participantsCount }) => {
    return (
        <Paper variant='outlined' sx={{ borderRadius: '8px 8px 0 0' }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                paddingY={2}
                paddingX={3}
                alignItems='center'
                bgcolor='#1e1e1e'
                borderRadius='8px 8px 0 0'
            >
                <Typography
                    color='text.primary'
                    fontWeight='600'
                    variant='h6'
                >
                    {title}
                </Typography>
                <Chip
                    label={
                        <Typography
                            fontSize={12}
                            color='text.secondary'
                            fontWeight='bold'
                        >
                            {participantsCount} players
                        </Typography>
                    }
                    sx={{
                        borderRadius: '6px',
                        backgroundColor: '#2a2a2a'
                    }}
                />
            </Stack>
        </Paper>
    )
};

export default LeaderboardHeader;
