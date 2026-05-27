import React from 'react';
import { useParams } from 'react-router-dom';
import LobbyItem from '../../../../features/lobbies/components/LobbyItem/LobbyItem';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { Stack } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { useGroupLobbies } from '../../../../features/lobbies/hooks/useGroupLobbies';

const LobbyWrapper: React.FC = () => {
    const { groupId, lobbyId } = useParams();
    const { lobbies, loadingLobbies } = useGroupLobbies(groupId ?? '');

    if (!groupId || !lobbyId) return <ErrorState error='Invalid route.' />;
    if (loadingLobbies) return <LoadingState />;

    const selectedLobby = lobbies.find(lobby => lobby.id === lobbyId) ?? null;
    if (!selectedLobby) return (
        <Stack
            alignItems="center"
            justifyContent="center"
            gap={2}
            p={2}
        >
            <ErrorState error='Lobby not found.' />
        </Stack>
    );

    return (
        <LobbyItem lobbyData={selectedLobby} />
    )
};

export default LobbyWrapper;