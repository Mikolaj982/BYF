import React from 'react';
import { Lobby } from '../../../types/lobby.types';
import ConfirmDialog from '../../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { MenuItem, Typography } from '@mui/material';
import { useIsLobbyMember } from '../../../hooks/useIsLobbyMember';
import { useJoinLobby } from '../../../../../shared/hooks/useJoinLobby';
import { useQueryClient } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';

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
                        trigger={
                            <MenuItem
                                sx={{
                                    bgcolor: 'background.default',
                                    border: '1px solid',
                                    borderColor: 'rgba(255,255,255,0.08)',
                                    overflow: 'hidden',
                                    minWidth: 180,
                                    gap: 2,
                                    letterSpacing: 0.5,
                                }}
                            >
                                <DeleteIcon fontSize='small' />
                                <Typography fontWeight={500}>
                                    DELETE LOBBY
                                </Typography>
                            </MenuItem>
                        }
                        onIconMenuClose={onClose}
                    />
                )
                : (
                    isLobbyMember ? (
                        <ConfirmDialog
                            title='Leave lobby?'
                            description='You will be missed.'
                            onConfirm={() => onLeave(lobbyData.id)}
                            trigger={
                                <MenuItem
                                    sx={{
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                        minWidth: 180,
                                        gap: 2,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    <ExitToAppIcon fontSize='small' />
                                    <Typography fontWeight={500}>
                                        LEAVE LOBBY
                                    </Typography>
                                </MenuItem>
                            }
                            onIconMenuClose={onClose}
                        />
                    ) : (
                        <MenuItem
                            onClick={() => {
                                handleJoinLobby(lobbyData.id);
                                onClose?.();
                            }}
                            sx={{
                                bgcolor: 'background.default',
                                border: '1px solid',
                                borderColor: 'rgba(255,255,255,0.08)',
                                overflow: 'hidden',
                                minWidth: 180,
                                gap: 2,
                                letterSpacing: 0.5,
                            }}
                        >
                            <AddIcon fontSize='small' />
                            <Typography fontWeight={500}>
                                JOIN
                            </Typography>
                        </MenuItem >
                    )
                )}
        </>
    )
};

export default LobbyMenuItems;