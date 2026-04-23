import React from 'react';
import { Lobby } from '../../pages/Dashboard/types/lobby.types';
import { useLobbyMatches } from '../../hooks/useLobbiesMatches';
import CreateMatchForm from '../CreateMatchForm/CreateMatchForm';
import LobbyMembers from '../LobbyMembers/LobbyMembers';
import LobbyLeaderboard from '../LobbyLeaderboard/LobbyLeaderboard';
import { leaveLobby } from '../../services/lobbies/leaveLobby';
import { MESSAGES } from '../../utils/messages';
import { toast } from 'react-toastify';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { deleteLobby } from '../../services/lobbies/deleteLobby';

type LobbyItemProps = {
    handleJoinLobby: (lobby: Lobby) => Promise<void>;
    lobbyData: Lobby;
    refetchLobbies: () => Promise<void>
}

const LobbyItem: React.FC<LobbyItemProps> = ({ handleJoinLobby, lobbyData, refetchLobbies }) => {
    const lobbyId = lobbyData.id;
    const { matches, loading: loadingMatches, error: errorMatches, refetch } = useLobbyMatches(lobbyId);
    const { lobbyMembers, loading: loadingLobbyMembers, error: errorLobbyMembers, refetchLobbyMembers } = useLobbyMembers(lobbyId);

    const handleLeaveLobby = async (lobbyId: string) => {
        if (!window.confirm('Jesteś pewien?')) return;
        try {
            await leaveLobby(lobbyId);
            await refetchLobbyMembers();
            toast.success(MESSAGES.SUCCESS.LEFT_LOBBY);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN)
            }
        }
    };

    const handleDeleteLobby = async (lobbyId: string) => {
        if (!window.confirm('Jesteś pewien?')) return;
        try {
            await deleteLobby(lobbyId);
            await refetchLobbies();
            toast.success(MESSAGES.SUCCESS.DELETED_LOBBY);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN)
            }
        }
    };

    return (
        <li>
            <CreateMatchForm onSuccess={refetch} lobbyData={lobbyData} />
            <button onClick={() => handleJoinLobby(lobbyData)}>join lobby</button>
            <button onClick={() => handleLeaveLobby(lobbyId)}>leave lobby</button>
            <button onClick={() => handleDeleteLobby(lobbyId)}>delete lobby</button>
            <h4>{lobbyData.game_type}</h4>
            <LobbyMembers members={lobbyMembers} loading={loadingLobbyMembers} error={errorLobbyMembers} />
            <LobbyLeaderboard lobbyId={lobbyId} />
            <h4>Matches:</h4>
            {errorMatches
                ? <p>{errorMatches}</p>
                : loadingMatches
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