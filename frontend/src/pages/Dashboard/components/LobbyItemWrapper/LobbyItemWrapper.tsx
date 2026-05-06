import React from 'react';
import LobbyItem from '../../../../features/lobbies/components/LobbyItem/LobbyItem';
import { useParams } from 'react-router-dom';
import { useGroupLobbies } from '../../../../features/lobbies/hooks/useGroupLobbies';

const LobbyItemWrapper: React.FC = () => {
    const { lobbyId, groupId } = useParams();
    const { lobbies, refetchLobbies, loading } = useGroupLobbies(groupId ?? '');

    if (!groupId) return <p>Brak groupId</p>;
    if (loading) return <p>Loading...</p>

    const selectedLobby = lobbies.find(lobby => lobby.id === lobbyId) ?? null;

    if (!selectedLobby) return <p>Nie znaleziono lobby</p>;

    return (
        <LobbyItem lobbyData={selectedLobby} refetchLobbies={refetchLobbies} />
    )
}

export default LobbyItemWrapper;