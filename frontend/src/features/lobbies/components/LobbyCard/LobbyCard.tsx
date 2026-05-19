import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { joinLobby } from '../../services/joinLobby';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useAuth } from '../../../auth/useAuth';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';

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
    const { user } = useAuth();
    const { refetchLobbyMembers, lobbyMembers } = useLobbyMembers(lobbyId);
    const navigate = useNavigate();
    const isMember = lobbyMembers.some((member) => user!.id === member.userId);

    const handleJoinLobby = async (lobbyId: string) => {
        const joinLobbySubmitData = {
            user_id: user!.id,
            lobby_id: lobbyId,
        };

        try {
            await joinLobby(joinLobbySubmitData);
            await refetchLobbyMembers();
            await refetchLobbyMembersCounts();
            toast.success(MESSAGES.SUCCESS.JOINED_LOBBY)
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/${groupId}/lobby/${id}`)
    };

    return (
        <Paper variant='outlined' sx={{ p: 2 }}>
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
                    <Button color='primary' variant='outlined'>
                        RESULTS
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
};

export default LobbyCard;
