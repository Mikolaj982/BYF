import React from 'react';
import { Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { Lobby } from '../../types/lobby.types';
import MenuIcon from '@mui/icons-material/Menu';
import { useOutletContext } from 'react-router-dom';
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import IconMenuMobile from '../../../../shared/components/IconMenuMobile/IconMenuMobile';
import LobbyMenuItems from './LobbyMenuItems/LobbyMenuItems';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useIsLobbyMember } from '../../hooks/useIsLobbyMember';
import { useQueryClient } from '@tanstack/react-query';
import { useJoinLobby } from '../../../../shared/hooks/useJoinLobby';

type LobbyHeaderProps = {
    onLeave: (id: string) => void;
    lobbyData: Lobby;
    onDelete: (id: string) => void;
};

const LobbyHeader: React.FC<LobbyHeaderProps> = (
    {
        onLeave,
        lobbyData,
        onDelete,
    }
) => {
    const { user } = useAuth();
    const { onOpenSidebar } = useOutletContext<DashboardLayoutOutletContext>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id, gameType } = lobbyData;
    const isOwner = lobbyData.createdBy === user?.id;
    const isLobbyMember = useIsLobbyMember(id);
    const { mutate: joinLobby } = useJoinLobby();
    const queryClient = useQueryClient();

    const handleJoinLobby = (lobbyId: string) => {
        joinLobby(lobbyId, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] })
        });
    };

    return (
        <Stack
            component='div'
            direction='row'
            justifyContent='space-between'
            padding={{ xs: 1, md: 2 }}
            borderBottom={1}
            borderColor='divider'
        >
            {isMobile ? (
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    width='100%'
                >
                    <IconButton onClick={onOpenSidebar} sx={{ mr: 0 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography alignContent='center' fontWeight='600'>
                        {gameType}
                    </Typography>
                    <IconMenuMobile>
                        <LobbyMenuItems
                            onLeave={() => onLeave(id)}
                            onDelete={() => onDelete(id)}
                            lobbyData={lobbyData}
                            isOwner={isOwner}
                        />
                    </IconMenuMobile>
                </Stack>
            ) : (
                <>
                    <Typography
                        variant='h6'
                        fontWeight='600'
                        alignContent='center'
                    >
                        {gameType}
                    </Typography>
                    <Stack direction='row'>
                        {isOwner
                            ? (
                                <ConfirmDialog
                                    title='Delete lobby?'
                                    description='This action cannot be undone.'
                                    onConfirm={() => onDelete(id)}
                                    label='delete'
                                />
                            ) : (
                                isLobbyMember ? (
                                    <ConfirmDialog
                                        title='Leave lobby?'
                                        description='You will be missed.'
                                        onConfirm={() => onLeave(id)}
                                        label='leave'
                                    />
                                ) : (
                                    <Button onClick={() => handleJoinLobby(id)} variant='outlined'>
                                        JOIN
                                    </Button>
                                )
                            )
                        }
                    </Stack>
                </>
            )}
        </Stack>
    )
};

export default LobbyHeader;