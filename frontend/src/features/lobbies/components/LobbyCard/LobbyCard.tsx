import React from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { joinLobby } from '../../services/joinLobby'
import { toast } from 'react-toastify'
import { MESSAGES } from '../../../../utils/messages'
import { useAuth } from '../../../auth/useAuth'
import { useLobbyMembers } from '../../hooks/useLobbyMembers'
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types'

type LobbyCardProps = {
    lobbyId: string,
    groupId: string,
    gameType: string,
    membersCount: number,
    loadingLobbyMembersCounts: boolean,
    refetchLobbyMembersCounts: () => Promise<void>
}

const LobbyCard: React.FC<LobbyCardProps> = ({ lobbyId, groupId, gameType, loadingLobbyMembersCounts, refetchLobbyMembersCounts, membersCount }) => {
    const { refetchLobbyMembers } = useLobbyMembers(lobbyId);
    const { loadingLobbies } = useOutletContext<DashboardLayoutOutletContext>();

    const navigate = useNavigate();
    const { user } = useAuth();
    if (!user) return null;

    if (!groupId) return <p>Brak groupId</p>;
    if (loadingLobbies) return <p>Loading...</p>

    const handleJoinLobby = async (lobbyId: string) => {
        const joinLobbySubmitData = {
            user_id: user.id,
            lobby_id: lobbyId,
        }
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
    }

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/${groupId}/lobby/${id}`)
    };

    return (
        <Paper>
            <Stack>
                <Typography>{gameType}</Typography>
                <Typography>{membersCount} members</Typography>
                <Button onClick={() => handleJoinLobby(lobbyId)}>JOIN</Button>
                <Button onClick={() => handleSelectLobby(lobbyId)}>ENTER LOBBY</Button>
            </Stack>
        </Paper>
    )
}

export default LobbyCard;
