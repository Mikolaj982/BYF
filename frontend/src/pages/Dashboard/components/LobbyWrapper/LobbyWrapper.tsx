import React from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useLobbyLeaderboard } from '../../../../features/lobbies/hooks/useLobbyLeaderboard';
import { useLobbyMatches } from '../../../../features/lobbies/hooks/useLobbiesMatches';
import LobbyItem from '../../../../features/lobbies/components/LobbyItem/LobbyItem';
import { useLobbyMembers } from '../../../../features/lobbies/hooks/useLobbyMembers';
import { DashboardLayoutOutletContext } from '../../types/outletContext.types';

const LobbyWrapper: React.FC = () => {
    const { lobbyId } = useParams();
    const { lobbies, refetchLobbies, loading: loadingLobbies } = useOutletContext<DashboardLayoutOutletContext>();
    const { matches, loading: loadingMatches, error: errorMatches, refetchMatches } = useLobbyMatches(lobbyId ?? '');
    const { leaderboard, error: errorLobbyLeaderboard, loading: loadingLobbyLeaderboard, refetchLobbyLeaderboard } = useLobbyLeaderboard(lobbyId ?? '');
    const { lobbyMembers, loading: loadingLobbyMembers, error: errorLobbyMembers, refetchLobbyMembers } = useLobbyMembers(lobbyId ?? '');


    if (loadingLobbies) return <p>Loading...</p>

    const selectedLobby = lobbies.find(lobby => lobby.id === lobbyId) ?? null;

    if (!selectedLobby) return <p>Nie znaleziono lobby</p>;

    return (
        <LobbyItem
            lobbyData={selectedLobby}
            refetchLobbies={refetchLobbies}
            matches={matches}
            loadingMatches={loadingMatches}
            errorMatches={errorMatches}
            refetchMatches={refetchMatches}
            leaderboard={leaderboard}
            errorLobbyLeaderboard={errorLobbyLeaderboard}
            loadingLobbyLeaderboard={loadingLobbyLeaderboard}
            refetchLobbyLeaderboard={refetchLobbyLeaderboard}
            lobbyMembers={lobbyMembers}
            loadingLobbyMembers={loadingLobbyMembers}
            errorLobbyMembers={errorLobbyMembers}
            refetchLobbyMembers={refetchLobbyMembers}
        />
    )
}

export default LobbyWrapper;