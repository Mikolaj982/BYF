import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, } from 'react-router-dom';
import { joinLobby } from '../../services/joinLobby';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';
import { Lobby } from '../../types/lobby.types';

type LobbyCardProps = {
    lobbyData: Lobby;
    lobbyMembersCount: number;
    lobbiesIds: string[] | undefined;
};

const LobbyCard: React.FC<LobbyCardProps> = (
    {
        lobbyData,
        lobbyMembersCount,
        lobbiesIds
    }
) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { lobbyMembers } = useLobbyMembers(lobbyData.id);
    const navigate = useNavigate();
    const isMember = lobbyMembers?.some((member) => user!.id === member.userId);

    const handleJoinLobby = async (lobbyId: string) => {
        const joinLobbySubmitData = {
            user_id: user!.id,
            lobby_id: lobbyId,
        };

        try {
            await joinLobby(joinLobbySubmitData);
            queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] });
            queryClient.invalidateQueries({ queryKey: ['lobbies_members_count', lobbiesIds] });
            toast.success(MESSAGES.SUCCESS.JOINED_LOBBY);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/${lobbyData.groupId}/lobby/${id}`)
    };

    return (
        <Paper
            variant='outlined'
            sx={{
                p: 2,
                width: { xs: '100%', md: 'auto' }
            }}>
            <Stack>
                <Typography>
                    {lobbyData.gameType}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {lobbyMembersCount} members
                </Typography>
                <Stack
                    direction='row'
                    spacing={2}
                    paddingTop={2}
                    justifyContent='space-between'
                    sx={{
                        '& .MuiButton-root': {
                            width: { xs: 'stretch', md: 80 },
                            minWidth: { xs: 'fit-content', md: 80 },
                            height: { xs: '30px', md: 'auto' },
                            fontSize: 10,
                            padding: '2px 6px',
                        },
                    }}
                >
                    <Button
                        onClick={() => handleJoinLobby(lobbyData.id)}
                        color={isMember ? 'success' : 'primary'}
                        variant={isMember ? 'contained' : 'outlined'}
                        disabled={isMember}
                    >
                        {isMember ? 'JOINED' : 'JOIN'}
                    </Button>
                    <Button
                        onClick={() => handleSelectLobby(lobbyData.id)}
                        color='primary'
                        variant='outlined'
                    >
                        ENTER LOBBY
                    </Button>
                    <Button color='primary' variant='outlined'>
                        RESULTS
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
};

export default LobbyCard;
