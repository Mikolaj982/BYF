import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { Lobby } from '../../types/lobby.types';

type LobbyHeaderProps = {
    onLeave: (id: string) => void;
    lobbyData: Lobby;
    onDelete: (id: string) => void;
    isOwner: boolean;
};

const LobbyHeader: React.FC<LobbyHeaderProps> = (
    {
        onLeave,
        lobbyData,
        onDelete,
        isOwner
    }
) => {
    const { id, gameType } = lobbyData;

    return (
        <Stack
            component='div'
            direction='row'
            justifyContent='space-between'
            sx={{ px: 3, py: 3, borderBottom: 1, borderColor: 'divider' }}
        >
            <Typography variant='h6'>
                {gameType}
            </Typography>
            <Stack direction='row'>
                {
                    isOwner
                        ? (
                            <ConfirmDialog
                                title='Delete lobby?'
                                description='This action cannot be undone.'
                                onConfirm={() => onDelete(id)}
                            />
                        )
                        : (
                            <ConfirmDialog
                                title='Leave lobby?'
                                description='You will be missed.'
                                onConfirm={() => onLeave(id)}
                            />
                        )
                }
            </Stack>
        </Stack>
    )
};

export default LobbyHeader;