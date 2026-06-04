import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Lobby } from '../../types/lobby.types';
import { useIsLobbyMember } from '../../hooks/useIsLobbyMember';
import { useJoinLobby } from '../../../../shared/hooks/useJoinLobby';

type LobbyCardProps = {
    lobbyData: Lobby;
    lobbyMembersCount: number;
    lobbiesIds: string[];
};

const LobbyCard: React.FC<LobbyCardProps> = (
    {
        lobbyData,
        lobbyMembersCount,
        lobbiesIds
    }
) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isLobbyMember = useIsLobbyMember(lobbyData.id);
    const { mutate: joinLobby } = useJoinLobby();

    const handleJoinLobby = (lobbyId: string) => {
        joinLobby(lobbyId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] });
                queryClient.invalidateQueries({ queryKey: ['lobbies_members_count', lobbiesIds] });
            }
        });
    };

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/${lobbyData.groupId}/lobby/${id}`)
    };

    return (
        <Paper
            variant='outlined'
            sx={{ p: 2, width: { xs: '100%', md: 'auto' } }}>
            <Stack>
                <Typography>
                    {lobbyData.gameType}
                </Typography>
                <Typography color='text.secondary'>
                    {lobbyMembersCount} members
                </Typography>
                <Stack
                    direction='row'
                    spacing={{ xs: 1, md: 2 }}
                    paddingTop={2}
                    justifyContent='space-between'
                    sx={{
                        '& .MuiButton-root': {
                            width: { xs: 'stretch', md: 80 },
                            minWidth: { xs: 'fit-content', md: 80 },
                            height: '30px',
                            fontSize: 10,
                            padding: '2px 6px',
                        },
                    }}
                >
                    <Button
                        onClick={() => handleJoinLobby(lobbyData.id)}
                        color={isLobbyMember ? 'success' : 'primary'}
                        variant={isLobbyMember ? 'contained' : 'outlined'}
                        disabled={isLobbyMember}
                    >
                        {isLobbyMember ? 'JOINED' : 'JOIN'}
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
