import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import LobbyItem from '../../../../features/lobbies/components/LobbyItem/LobbyItem';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { useGroupLobbies } from '../../../../features/lobbies/hooks/useGroupLobbies';

const LobbyWrapper: React.FC = () => {
    const { groupId, lobbyId } = useParams();
    const { lobbies, loadingLobbies } = useGroupLobbies(groupId ?? '');

    if (!groupId || !lobbyId) return <ErrorState error='Invalid route.' />;
    if (loadingLobbies) return <LoadingState />;

    const selectedLobby = lobbies.find(lobby => lobby.id === lobbyId) ?? null;
    if (!selectedLobby) {
        return <Navigate to={`/dashboard/group/${groupId}`} replace />;
    }

    return (
        <LobbyItem lobbyData={selectedLobby} />
    )
};

export default LobbyWrapper;