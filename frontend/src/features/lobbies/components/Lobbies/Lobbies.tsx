import React from 'react'
import { Lobby } from '../../types/lobby.types';
import { useNavigate } from 'react-router-dom';

const Lobbies: React.FC<{ lobbies: Lobby[] }> = ({ lobbies }) => {
    const navigate = useNavigate();

    const handleSelectLobby = (id: string) => {
        navigate(`/dashboard/group/:groupId/lobby/${id}`)
    };

    return (
        <div>
            <h3>Lobbies:</h3>
            <ul>
                {lobbies.map((lobby: Lobby) => {
                    return (
                        <div key={lobby.id} onClick={() => handleSelectLobby(lobby.id)}>{lobby.game_type}</div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Lobbies;