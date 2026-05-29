import React from 'react';
import { Lobby } from '../../../types/lobby.types';
import ConfirmDialog from '../../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { MenuItem } from '@mui/material';
import { useIsLobbyMember } from '../../../hooks/useIsLobbyMember';
import { useJoinLobby } from '../../../../../shared/hooks/useJoinLobby';
import { useQueryClient } from '@tanstack/react-query';

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
    const isLobbyMember = useIsLobbyMember(lobbyData.id);
    const queryClient = useQueryClient();
    const { mutate: joinLobby } = useJoinLobby();

    const handleJoinLobby = (lobbyId: string) => {
        joinLobby(lobbyId, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] })
        });
    };

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
                    isLobbyMember ? (
                        <ConfirmDialog
                            title='Leave lobby?'
                            description='You will be missed.'
                            onConfirm={() => onLeave(lobbyData.id)}
                            label='leave'
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>LEAVE</MenuItem>}
                            onIconMenuClose={onClose}
                        />
                    ) : (
                        <MenuItem onClick={() => {
                            handleJoinLobby(lobbyData.id);
                            onClose?.();
                        }}
                            sx={{ justifyContent: 'center' }}
                        >
                            JOIN
                        </MenuItem >
                    )
                )}
        </>
    )
};

export default LobbyMenuItems;