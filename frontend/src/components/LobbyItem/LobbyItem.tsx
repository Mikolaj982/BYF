import React from 'react';
import { Lobby } from '../../pages/Dashboard/types/lobby.types';
import { useLobbyMatches } from '../../hooks/useLobbiesMatches';
import CreateMatchForm from '../CreateMatchForm/CreateMatchForm';
import LobbyMembers from '../LobbyMembers/LobbyMembers';
import LobbyLeaderboard from '../LobbyLeaderboard/LobbyLeaderboard';

type LobbyItemProps = {
    handleJoinLobby: (lobby: Lobby) => Promise<void>;
    lobbyData: Lobby;
}

const LobbyItem: React.FC<LobbyItemProps> = ({ handleJoinLobby, lobbyData }) => {
    const lobbyId = lobbyData.id;
    const { matches, loading, error, refetch } = useLobbyMatches(lobbyId);

    return (
        <li>
            <CreateMatchForm onSuccess={refetch} lobbyData={lobbyData} />
            <button onClick={() => handleJoinLobby(lobbyData)}>join lobby</button>
            <h4>{lobbyData.game_type}</h4>
            <LobbyMembers lobbyId={lobbyId} />
            <LobbyLeaderboard lobbyId={lobbyId} />
            <h4>Matches:</h4>
            {error
                ? <p>{error}</p>
                : loading
                    ? <p>Loading...</p>
                    : matches.length === 0
                        ? <p>Brak meczów</p>
                        : (matches.map((match) => {
                            return (
                                <div key={match.matchId}>
                                    {match.players.map((p) => {
                                        return (
                                            <div key={p.userId}>
                                                <p>{p.username}: {p.score}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }))
            }
        </li>
    )
};

export default LobbyItem;