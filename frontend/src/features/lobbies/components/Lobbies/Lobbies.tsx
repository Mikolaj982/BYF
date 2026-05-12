import React from 'react'
import { Lobby } from '../../types/lobby.types';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Stack, Typography } from '@mui/material';

type LobbiesProps = {
    lobbies: Lobby[]
}

const Lobbies: React.FC<LobbiesProps> = ({ lobbies }) => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/${groupId}/lobby/${id}`)
    };

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
                    return (
                        <Paper key={lobby.id} onClick={() => handleSelectLobby(lobby.id)}>{lobby.game_type}</Paper>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default Lobbies;