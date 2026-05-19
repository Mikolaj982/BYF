import React from 'react';
import { Lobby } from '../../types/lobby.types';
import { Stack, Typography } from '@mui/material';
import LobbyCard from '../LobbyCard/LobbyCard';
import { useLobbyMembersCounts } from '../../hooks/useLobbyMembersCounts';
import { useOutletContext } from 'react-router-dom';
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import CreateLobbyForm from '../CreateLobby/CreateLobbyForm';
import { UserGroup } from '../../../groups/types/group.types';

type LobbiesProps = {
    lobbies: Lobby[];
    lobbiesIds: string[];
    groupData: UserGroup;
};

const Lobbies: React.FC<LobbiesProps> = ({ lobbies, lobbiesIds, groupData }) => {
    const {
        lobbyMembersCounts,
        refetchLobbyMembersCounts,
        loading: loadingLobbyMembersCounts,
    } = useLobbyMembersCounts(lobbiesIds);
    const { loadingLobbies, lobbiesError, refetchLobbies } = useOutletContext<DashboardLayoutOutletContext>();

    return (
        <Stack padding={3} spacing={1}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                LOBBIES
            </Typography>
            <Stack
                direction='row'
                flexWrap='wrap'
                gap={2}
            >
                {loadingLobbies
                    ? <LoadingState />
                    : lobbiesError
                        ? <ErrorState error={lobbiesError} />
                        : (!lobbies.length)
                            ? (
                                <Stack alignItems="center" justifyContent="center" gap={2} p={2}>
                                    <EmptyState message='There is no lobbies yet.' />
                                    <CreateLobbyForm onSuccess={refetchLobbies} groupData={groupData} />
                                </Stack>
                            )
                            : (
                                lobbies.map((lobby: Lobby) => {
                                    const membersCount = lobbyMembersCounts[lobby.id] || 0;
                                    return <LobbyCard
                                        lobbyId={lobby.id}
                                        groupId={lobby.groupId}
                                        gameType={lobby.gameType}
                                        membersCount={membersCount}
                                        refetchLobbyMembersCounts={refetchLobbyMembersCounts}
                                        loadingLobbyMembersCounts={loadingLobbyMembersCounts}
                                        key={lobby.id}
                                    />
                                })
                            )
                }
            </Stack>
        </Stack>
    )
};

export default Lobbies;