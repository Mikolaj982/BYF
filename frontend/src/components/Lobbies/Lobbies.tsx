import React from 'react'
import { lobby } from '../../pages/Dashboard/types/lobby.types';

const Lobbies: React.FC<{ lobbies: lobby[] }> = ({ lobbies }) => {
    return (
        <div>
            <h3>Lobbies:</h3>
            <ul>
                {
                    lobbies.map((lobby: lobby) => {
                        return (
                            <li key={lobby.id}>{lobby.game_type}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Lobbies;