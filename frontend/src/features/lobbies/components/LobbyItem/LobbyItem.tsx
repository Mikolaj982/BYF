import React from 'react';
import { Lobby } from '../../types/lobby.types';
import { leaveLobby } from '../../services/leaveLobby';
import { MESSAGES } from '../../../../utils/messages';
import { toast } from 'react-toastify';
import { deleteLobby } from '../../services/deleteLobby';
import { useAuth } from '../../../auth/hooks/useAuth';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { useQueryClient } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import LobbyHeader from '../LobbyHeader/LobbyHeader';
import Matches from '../Matches/Matches';
import LobbyLeaderboard from '../LobbyLeaderboard/LobbyLeaderboard';
import LobbyMembers from '../LobbyMembers/LobbyMembers';
import SectionLabel from '../../../../shared/components/SectionLabel/SectionLabel';
import SectionContainer from '../../../../shared/components/SectionContainer/SectionContainer';

type LobbyItemProps = {
    lobbyData: Lobby;
};

const LobbyItem: React.FC<LobbyItemProps> = ({ lobbyData }) => {
    const { lobbyMembers } = useLobbyMembers(lobbyData.id ?? '');
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const isOwner = lobbyData.createdBy === user!.id;
    const isLobbyMember = lobbyMembers?.some((member) => member.userId === user!.id);
    const groupId = lobbyData.groupId;

    const handleLeaveLobby = async (lobbyId: string) => {
        try {
            await leaveLobby(lobbyId);
            queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] });
            toast.success(MESSAGES.SUCCESS.LEFT_LOBBY);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleDeleteLobby = async (lobbyId: string) => {
        try {
            await deleteLobby(lobbyId);
            navigate(`/dashboard/group/${groupId}`);
            queryClient.invalidateQueries({ queryKey: ['lobbies', lobbyId] });
            toast.success(MESSAGES.SUCCESS.DELETED_LOBBY);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Stack>
            <LobbyHeader
                onLeave={handleLeaveLobby}
                onDelete={handleDeleteLobby}
                lobbyData={lobbyData}
                isOwner={isOwner}
            />
            <SectionContainer>
                <SectionLabel label='lobby members' />
                <LobbyMembers />
            </SectionContainer>
            {isLobbyMember && (
                <>
                    <SectionContainer>
                        <SectionLabel label='matches history' />
                        <Matches />
                    </SectionContainer>
                    <SectionContainer>
                        <SectionLabel label='leaderboard' />
                        <LobbyLeaderboard lobbyData={lobbyData} />
                    </SectionContainer>
                </>
            )}
        </Stack>
    )
};

export default LobbyItem;