import React from 'react';
import { Lobby } from '../../types/lobby.types';
import { Stack, Typography } from '@mui/material';
import LobbyCard from '../LobbyCard/LobbyCard';
import { useLobbyMembersCounts } from '../../hooks/useLobbyMembersCounts';

type LobbiesProps = {
    lobbies: Lobby[];
    lobbiesIds: string[];
};

const Lobbies: React.FC<LobbiesProps> = ({ lobbies, lobbiesIds }) => {
    const { lobbyMembersCounts, refetchLobbyMembersCounts, loading: loadingLobbyMembersCounts } = useLobbyMembersCounts(lobbiesIds);
    return (
        <Stack padding={3} spacing={1}>
            <Typography sx={{
                fontSize: 14,
                color: 'text.secondary'
            }}
            >
                LOBBIES
            </Typography>
            <Stack
                direction='row'
                flexWrap='wrap'
                gap={2}
            >
                {
                    lobbies.map((lobby: Lobby) => {
                        const membersCount = lobbyMembersCounts[lobby.id] || 0;
                        return (
                            <LobbyCard
                                lobbyId={lobby.id}
                                groupId={lobby.groupId}
                                gameType={lobby.gameType}
                                membersCount={membersCount}
                                refetchLobbyMembersCounts={refetchLobbyMembersCounts}
                                loadingLobbyMembersCounts={loadingLobbyMembersCounts}
                                key={lobby.id}
                            />
                        )
                    })
                }
            </Stack>
        </Stack>
    )
};

export default Lobbies;