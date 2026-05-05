import React from 'react';
import { Lobby } from '../../types/lobby.types';
import { useLobbyMatches } from '../../hooks/useLobbiesMatches';
import CreateMatchForm from '../CreateMatchForm/CreateMatchForm';
import LobbyMembers from '../LobbyMembers/LobbyMembers';
import LobbyLeaderboard from '../LobbyLeaderboard/LobbyLeaderboard';
import { leaveLobby } from '../../services/leaveLobby';
import { MESSAGES } from '../../../../utils/messages';
import { toast } from 'react-toastify';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { deleteLobby } from '../../services/deleteLobby';
import { deleteMatch } from '../../services/deleteMatch';
import { useAuth } from '../../../auth/useAuth';
import { joinLobby } from '../../services/joinLobby';
import { useLobbyLeaderboard } from '../../hooks/useLobbyLeaderboard';

type LobbyItemProps = {
    lobbyData: Lobby;
    refetchLobbies: () => Promise<void>
}

const LobbyItem: React.FC<LobbyItemProps> = ({ lobbyData, refetchLobbies }) => {
    const { user } = useAuth();
    const lobbyId = lobbyData.id;
    const { matches, loading: loadingMatches, error: errorMatches, refetchMatches } = useLobbyMatches(lobbyId);
    const { lobbyMembers, loading: loadingLobbyMembers, error: errorLobbyMembers, refetchLobbyMembers } = useLobbyMembers(lobbyId);
    const { leaderboard, error, loading, refetchLobbyLeaderboard } = useLobbyLeaderboard(lobbyId);

    if (!user) return null;

    const isLobbyMember = lobbyMembers.some((member) => member.userId === user.id);

    const handleJoinLobby = async (lobby: Lobby) => {
        const joinLobbySubmitData = {
            user_id: user.id,
            lobby_id: lobby.id,
        }
        try {
            await joinLobby(joinLobbySubmitData);
            await refetchLobbyMembers();
            toast.success(MESSAGES.SUCCESS.JOINED_LOBBY)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        }
    }

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

    const handleDeleteMatch = async (matchId: string) => {
        if (!window.confirm('Jesteś pewien?')) return;
        try {
            await deleteMatch(matchId);
            await refetchMatches();
            await refetchLobbyLeaderboard();
            toast.success(MESSAGES.SUCCESS.DELETED_MATCH);
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
            <button onClick={() => handleJoinLobby(lobbyData)}>join lobby</button>
            <button onClick={() => handleLeaveLobby(lobbyId)}>leave lobby</button>
            <button onClick={() => handleDeleteLobby(lobbyId)}>delete lobby</button>
            <h4>{lobbyData.game_type}</h4>
            <LobbyMembers members={lobbyMembers} loading={loadingLobbyMembers} error={errorLobbyMembers} />
            {isLobbyMember
                ? (<>
                    <CreateMatchForm onMatchCreated={refetchMatches} onLeaderboardUpdated={refetchLobbyLeaderboard} lobbyData={lobbyData} />
                    <LobbyLeaderboard leaderboard={leaderboard} loading={loading} error={error} />
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
                                            <button onClick={() => handleDeleteMatch(match.matchId)}>delete match</button>
                                        </div>
                                    )
                                }))
                    }</>)
                : ''}
        </li>
    )
};

export default LobbyItem;