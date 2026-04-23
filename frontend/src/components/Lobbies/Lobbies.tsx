import React from 'react'
import { Lobby } from '../../pages/Dashboard/types/lobby.types';
import LobbyItem from '../LobbyItem/LobbyItem';

const Lobbies: React.FC<{ lobbies: Lobby[], onSuccess: () => Promise<void> }> = ({ lobbies, onSuccess }) => {

    return (
        <div>
            <h3>Lobbies:</h3>
            <ul>
                {lobbies.map((lobby: Lobby) => {
                    return (
                        <LobbyItem key={lobby.id} lobbyData={lobby} refetchLobbies={onSuccess} />
                    )
                })}
            </ul>
        </div>
    )
}

export default Lobbies;