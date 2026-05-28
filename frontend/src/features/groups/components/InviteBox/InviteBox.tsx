import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';

type InviteBoxProps = {
    inviteCode: string;
};

const InviteBox: React.FC<InviteBoxProps> = ({ inviteCode }) => {
    return (
        <Paper variant='outlined' sx={{ px: 2, py: 1 }}>
            <Stack direction='row' alignItems='center' >
                <Typography variant='body2' fontFamily='monospace' flex={1}>
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
    )
};

export default InviteBox;