import React from 'react';
import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { Lobby } from '../../types/lobby.types';
import { useOutletContext } from 'react-router-dom';
import IconMenuMobile from '../../../../shared/components/IconMenuMobile/IconMenuMobile';
import LobbyMenuItems from './LobbyMenuItems/LobbyMenuItems';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useIsLobbyMember } from '../../hooks/useIsLobbyMember';
import { useQueryClient } from '@tanstack/react-query';
import { useJoinLobby } from '../../../../shared/hooks/useJoinLobby';
import MobileHeader from '../../../../shared/components/MobileHeader/MobileHeader';
import { DashboardOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import DesktopHeader from '../../../../shared/components/DesktopHeader/DesktopHeader';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id, gameType } = lobbyData;
    const isOwner = lobbyData.createdBy === user?.id;
    const isLobbyMember = useIsLobbyMember(id);
    const { mutate: joinLobby } = useJoinLobby();
    const queryClient = useQueryClient();
    const { onOpenSidebar } = useOutletContext<DashboardOutletContext>();

    const handleJoinLobby = (lobbyId: string) => {
        joinLobby(lobbyId, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] })
        });
    };

    return (
        <>
            {isMobile ? (
                <MobileHeader
                    title={gameType}
                    onOpenSidebar={onOpenSidebar}
                    rightContent={
                        <IconMenuMobile>
                            <LobbyMenuItems
                                onLeave={() => onLeave(id)}
                                onDelete={() => onDelete(id)}
                                lobbyData={lobbyData}
                                isOwner={isOwner}
                            />
                        </IconMenuMobile>
                    }
                />
            ) : <DesktopHeader
                title={gameType}
                rightContent={
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
                }
            />}
        </>
    )
};

export default LobbyHeader;