import React from 'react'
import { Lobby } from '../../pages/Dashboard/types/lobby.types';
import { joinLobby } from '../../services/lobbies/joinLobby';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import { useAuth } from '../../features/useAuth';
import LobbyItem from '../LobbyItem/LobbyItem';

const Lobbies: React.FC<{ lobbies: Lobby[] }> = ({ lobbies }) => {
    const { user } = useAuth();

    const handleJoinLobby = async (lobby: Lobby) => {
        const joinLobbySubmitData = {
            user_id: user.id,
            lobby_id: lobby.id,
        }

        try {
            await joinLobby(joinLobbySubmitData);
            toast.success(MESSAGES.SUCCESS.JOINED_LOBBY)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        }
    }
    return (
        <div>
            <h3>Lobbies:</h3>
            <ul>
                {lobbies.map((lobby: Lobby) => {
                    return (
                        <LobbyItem key={lobby.id} handleJoinLobby={handleJoinLobby} lobbyData={lobby} />
                    )
                })}
            </ul>
        </div>
    )
}

export default Lobbies;