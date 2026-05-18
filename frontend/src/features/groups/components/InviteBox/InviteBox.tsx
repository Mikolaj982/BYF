import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';

type InviteBoxProps = {
    inviteCode: string;
};

const InviteBox: React.FC<InviteBoxProps> = ({ inviteCode }) => {
    return (
        <Stack
            sx={{ p: 3 }}
            gap={1}
        >
            <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontSize: 14 }}
            >INVITATION CODE</Typography>
            <Paper variant='outlined' sx={{ px: 2, py: 1 }}>
                <Stack direction='row' alignItems='center' >
                    <Typography
                        variant='body2'
                        sx={{ fontFamily: 'monospace', flex: 1 }}
                    >
                        {inviteCode}
                    </Typography>
                    <Button
                        onClick={() => navigator.clipboard.writeText(inviteCode)}
                        color='primary'
                        variant='outlined'
                    >
                        COPY
                    </Button>
                </Stack>
            </Paper >
        </Stack>
    )
};

export default InviteBox;