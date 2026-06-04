import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

type EmptyStateProps = {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message, actionLabel, onAction }) => (
    <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        p={2}
    >
        <Typography
            fontSize={14}
            color="text.secondary"
            textAlign="center"
        >
            {message}
        </Typography>
        {
            onAction && actionLabel && (
                <Button onClick={onAction} variant="outlined">{actionLabel}</Button>
            )
        }
    </Stack>
);

export default EmptyState;