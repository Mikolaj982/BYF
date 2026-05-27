import React, { useMemo } from 'react';
import { Lobby } from '../../types/lobby.types';
import { Stack } from '@mui/material';
import LobbyCard from '../LobbyCard/LobbyCard';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import CreateLobbyForm from '../CreateLobby/CreateLobbyForm';
import { UserGroup } from '../../../groups/types/group.types';
import { useGroupLobbies } from '../../hooks/useGroupLobbies';
import { useLobbiesMembersCount } from '../../hooks/useLobbyMembersCount';

type LobbiesProps = {
    groupData: UserGroup;
};

const Lobbies: React.FC<LobbiesProps> = ({ groupData }) => {
    const { lobbies, loadingLobbies, errorLobbies } = useGroupLobbies(groupData.id);
    const lobbiesIds: string[] = useMemo(() => {
        return lobbies.map(lobby => lobby.id);
    }, [lobbies]);
    const { lobbiesMembersCount } = useLobbiesMembersCount(lobbiesIds);

    if (loadingLobbies) return <LoadingState />;
    if (errorLobbies) return <ErrorState error={errorLobbies} />;
    if (!lobbies.length) return (
        <Stack alignItems="center" justifyContent="center" gap={2} p={2}>
            <EmptyState message='There is no lobbies yet.' />
            <CreateLobbyForm groupData={groupData} />
        </Stack>
    );

    return (
        <Stack
            direction='row'
            flexWrap='wrap'
            gap={2}
        >
            {lobbies.map((lobby: Lobby) => {
                const lobbyMembersCount = lobbiesMembersCount?.[lobby.id] || 0;
                return <LobbyCard
                    lobbiesIds={lobbiesIds}
                    lobbyData={lobby}
                    lobbyMembersCount={lobbyMembersCount}
                    key={lobby.id}
                />
            })}
        </Stack>
    )
};

export default Lobbies;