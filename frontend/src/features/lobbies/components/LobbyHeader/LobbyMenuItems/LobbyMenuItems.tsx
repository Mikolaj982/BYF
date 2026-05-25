import React from 'react';
import { Lobby } from '../../../types/lobby.types';
import ConfirmDialog from '../../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { MenuItem } from '@mui/material';

type LobbyMenuItemsProps = {
    onLeave: (id: string) => void;
    lobbyData: Lobby;
    onDelete: (id: string) => void;
    isOwner: boolean;
    onClose?: () => void;
};

const LobbyMenuItems: React.FC<LobbyMenuItemsProps> = (
    {
        onLeave,
        lobbyData,
        onDelete,
        isOwner,
        onClose
    }
) => {
    return (
        <>
            {isOwner
                ? (
                    <ConfirmDialog
                        title='Delete lobby?'
                        description='This action cannot be undone.'
                        onConfirm={() => onDelete(lobbyData.id)}
                        label='delete'
                        trigger={<MenuItem sx={{ justifyContent: 'center' }}>DELETE</MenuItem>}
                        onIconMenuClose={onClose}
                    />
                )
                : (
                    <ConfirmDialog
                        title='Leave lobby?'
                        description='You will be missed.'
                        onConfirm={() => onLeave(lobbyData.id)}
                        label='leave'
                        trigger={<MenuItem sx={{ justifyContent: 'center' }}>LEAVE</MenuItem>}
                        onIconMenuClose={onClose}
                    />
                )}
        </>
    )
};

export default LobbyMenuItems;