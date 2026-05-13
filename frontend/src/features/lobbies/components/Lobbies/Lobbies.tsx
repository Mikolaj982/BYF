import React from 'react'
import { Lobby } from '../../types/lobby.types';
import { Stack, Typography } from '@mui/material';
import LobbyCard from '../LobbyCard/LobbyCard';
import { useLobbyMembersCounts } from '../../hooks/useLobbyMembersCounts';

type LobbiesProps = {
    lobbies: Lobby[],
    lobbiesIds: string[]
}

const Lobbies: React.FC<LobbiesProps> = ({ lobbies, lobbiesIds }) => {
    const { lobbyMembersCounts, refetchLobbyMembersCounts, loading: loadingLobbyMembersCounts } = useLobbyMembersCounts(lobbiesIds);
    return (
        <Stack padding={3}>
            <Typography sx={{
                fontSize: 14,
                color: 'text.secondary'
            }}
            >
                LOBBIES
            </Typography>
            <Stack>
                {lobbies.map((lobby: Lobby) => {
                    const membersCount = lobbyMembersCounts[lobby.id] || 0;
                    return (
                        <LobbyCard
                            lobbyId={lobby.id}
                            groupId={lobby.group_id}
                            gameType={lobby.game_type}
                            membersCount={membersCount}
                            refetchLobbyMembersCounts={refetchLobbyMembersCounts}
                            loadingLobbyMembersCounts={loadingLobbyMembersCounts}
                            key={lobby.id}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default Lobbies;