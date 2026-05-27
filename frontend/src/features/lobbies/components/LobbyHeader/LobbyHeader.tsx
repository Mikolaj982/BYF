import React from 'react';
import { IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { Lobby } from '../../types/lobby.types';
import MenuIcon from '@mui/icons-material/Menu';
import { useOutletContext } from 'react-router-dom';
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import IconMenuMobile from '../../../../shared/components/IconMenuMobile/IconMenuMobile';
import LobbyMenuItems from './LobbyMenuItems/LobbyMenuItems';

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
    const { onOpenSidebar } = useOutletContext<DashboardLayoutOutletContext>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id, gameType } = lobbyData;

    return (
        <Stack
            component='div'
            direction='row'
            justifyContent='space-between'
            sx={{ px: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}
        >
            {isMobile ? (
                <Stack direction='row' justifyContent='space-between' width='100%'>
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
                        marginLeft={2}
                        fontWeight='600'
                    >
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
                                        label='delete'
                                    />
                                )
                                : (
                                    <ConfirmDialog
                                        title='Leave lobby?'
                                        description='You will be missed.'
                                        onConfirm={() => onLeave(id)}
                                        label='leave'
                                    />
                                )
                        }
                    </Stack>
                </>
            )}
        </Stack>
    )
};

export default LobbyHeader;