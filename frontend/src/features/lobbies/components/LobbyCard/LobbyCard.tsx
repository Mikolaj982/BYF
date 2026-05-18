import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { joinLobby } from '../../services/joinLobby';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useAuth } from '../../../auth/useAuth';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';

type LobbyCardProps = {
    lobbyId: string;
    groupId: string;
    gameType: string;
    membersCount: number;
    loadingLobbyMembersCounts: boolean;
    refetchLobbyMembersCounts: () => Promise<void>;
};

const LobbyCard: React.FC<LobbyCardProps> = (
    {
        lobbyId,
        groupId,
        gameType,
        refetchLobbyMembersCounts,
        membersCount
    }
) => {
    const { refetchLobbyMembers, lobbyMembers } = useLobbyMembers(lobbyId);
    const { loadingLobbies } = useOutletContext<DashboardLayoutOutletContext>();
    const navigate = useNavigate();
    const { user } = useAuth();
    if (!user) return null;
    if (!groupId) return <p>Brak groupId</p>;
    if (loadingLobbies) return <p>Loading...</p>;
    const isMember = lobbyMembers.some((member) => user.id === member.userId);

    const handleJoinLobby = async (lobbyId: string) => {
        const joinLobbySubmitData = {
            user_id: user.id,
            lobby_id: lobbyId,
        };
        try {
            await joinLobby(joinLobbySubmitData);
            await refetchLobbyMembers();
            await refetchLobbyMembersCounts();
            toast.success(MESSAGES.SUCCESS.JOINED_LOBBY)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        }
    };

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/${groupId}/lobby/${id}`)
    };

    return (
        <Paper
            variant='outlined'
            sx={{ p: 2 }}
        >
            <Stack>
                <Typography>
                    {gameType}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {membersCount} members
                </Typography>
                <Stack
                    direction='row'
                    spacing={2}
                    paddingTop={2}
                    sx={{
                        '& .MuiButton-root': {
                            width: 80,
                            minWidth: 80,
                            fontSize: 10,
                            padding: '2px 6px',
                        },
                    }}
                >
                    <Button
                        onClick={() => handleJoinLobby(lobbyId)}
                        color={isMember ? 'success' : 'primary'}
                        variant={isMember ? 'contained' : 'outlined'}
                        disabled={isMember}
                    >
                        {isMember ? 'JOINED' : 'JOIN'}
                    </Button>
                    <Button
                        onClick={() => handleSelectLobby(lobbyId)}
                        color='primary'
                        variant='outlined'
                    >
                        ENTER LOBBY
                    </Button>
                    <Button
                        color='primary'
                        variant='outlined'
                    >
                        RESULTS
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
};

export default LobbyCard;
