import React from 'react';
import { Lobby, LobbyMember, Match } from '../../types/lobby.types';
import LobbyMembers from '../LobbyMembers/LobbyMembers';
import LobbyLeaderboard from '../LobbyLeaderboard/LobbyLeaderboard';
import { leaveLobby } from '../../services/leaveLobby';
import { MESSAGES } from '../../../../utils/messages';
import { toast } from 'react-toastify';
import { deleteLobby } from '../../services/deleteLobby';
import { useAuth } from '../../../auth/useAuth';
import { Leaderboard } from '../../types/lobby.types';
import LobbyHeader from '../LobbyHeader/LobbyHeader';
import Matches from '../Matches/Matches';
import { Stack } from '@mui/material';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';

type LobbyItemProps = {
    lobbyData: Lobby;
    refetchLobbies: () => Promise<void>;
    matches: Match[];
    loadingMatches: boolean;
    errorMatches: unknown;
    refetchMatches: () => Promise<void>;
    leaderboard: Leaderboard[];
    loadingLobbyLeaderboard: boolean;
    errorLobbyLeaderboard: unknown;
    refetchLobbyLeaderboard: () => Promise<void>;
    lobbyMembers: LobbyMember[];
    refetchLobbyMembers: () => Promise<void>;
    errorLobbyMembers: unknown;
    loadingLobbyMembers: boolean;
};

const LobbyItem: React.FC<LobbyItemProps> = (
    {
        lobbyMembers,
        refetchLobbyMembers,
        refetchMatches,
        matches,
        loadingMatches,
        errorMatches,
        leaderboard,
        errorLobbyLeaderboard,
        loadingLobbyLeaderboard,
        refetchLobbyLeaderboard,
        loadingLobbyMembers,
        errorLobbyMembers,
        refetchLobbies,
        lobbyData
    }
) => {
    const { user } = useAuth();
    const isOwner = lobbyData.createdBy === user!.id;
    const isLobbyMember = lobbyMembers.some((member) => member.userId === user!.id);

    const handleLeaveLobby = async (lobbyId: string) => {
        try {
            await leaveLobby(lobbyId);
            await refetchLobbyMembers();
            toast.success(MESSAGES.SUCCESS.LEFT_LOBBY);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleDeleteLobby = async (lobbyId: string) => {
        try {
            await deleteLobby(lobbyId);
            await refetchLobbies();
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
            <LobbyMembers
                members={lobbyMembers}
                loading={loadingLobbyMembers}
                error={errorLobbyMembers}
            />
            {
                isLobbyMember && (
                    <>
                        <Matches
                            matches={matches}
                            loadingMatches={loadingMatches}
                            errorMatches={errorMatches}
                            refetchLobbyLeaderboard={refetchLobbyLeaderboard}
                            refetchMatches={refetchMatches}
                            lobbyData={lobbyData}
                        />
                        <LobbyLeaderboard
                            leaderboard={leaderboard}
                            loading={loadingLobbyLeaderboard}
                            error={errorLobbyLeaderboard}
                            lobbyData={lobbyData}
                        />
                    </>
                )
            }
        </Stack>
    )
};

export default LobbyItem;