import React from 'react';
import { Lobby, LobbyMemberWithUsername, Match } from '../../types/lobby.types';
import CreateMatchForm from '../CreateMatchForm/CreateMatchForm';
import LobbyMembers from '../LobbyMembers/LobbyMembers';
import LobbyLeaderboard from '../LobbyLeaderboard/LobbyLeaderboard';
import { leaveLobby } from '../../services/leaveLobby';
import { MESSAGES } from '../../../../utils/messages';
import { toast } from 'react-toastify';
import { deleteLobby } from '../../services/deleteLobby';
import { deleteMatch } from '../../services/deleteMatch';
import { useAuth } from '../../../auth/useAuth';
import { Leaderboard } from '../../services/lobbyLeaderboard';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import LobbyHeader from '../LobbyHeader/LobbyHeader';

type LobbyItemProps = {
    lobbyData: Lobby;
    refetchLobbies: () => Promise<void>;
    matches: Match[];
    loadingMatches: boolean;
    errorMatches: string | null;
    refetchMatches: () => Promise<void>;
    leaderboard: Leaderboard[];
    loadingLobbyLeaderboard: boolean;
    errorLobbyLeaderboard: string | null;
    refetchLobbyLeaderboard: () => Promise<void>;
    lobbyMembers: LobbyMemberWithUsername[];
    refetchLobbyMembers: () => Promise<void>;
    errorLobbyMembers: string | null;
    loadingLobbyMembers: boolean;
}

const LobbyItem: React.FC<LobbyItemProps> = (
    {
        lobbyMembers,
        refetchLobbyMembers,
        refetchMatches,
        matches,
        loadingMatches,
        errorMatches,
        leaderboard,
        errorLobbyLeaderboard,
        loadingLobbyLeaderboard,
        refetchLobbyLeaderboard,
        loadingLobbyMembers,
        errorLobbyMembers,
        refetchLobbies,
        lobbyData
    }
) => {

    const { user } = useAuth();
    if (!user) return null;

    const isOwner = lobbyData.created_by === user.id;
    const isLobbyMember = lobbyMembers.some((member) => member.userId === user.id);

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
            <LobbyHeader
                onLeave={handleLeaveLobby}
                onDelete={handleDeleteLobby}
                lobbyData={lobbyData}
                isOwner={isOwner}
            />
            <LobbyMembers
                members={lobbyMembers}
                loading={loadingLobbyMembers}
                error={errorLobbyMembers}
            />
            {isLobbyMember
                ? (<>
                    <CreateMatchForm onMatchCreated={refetchMatches} onLeaderboardUpdated={refetchLobbyLeaderboard} lobbyData={lobbyData} />
                    <LobbyLeaderboard leaderboard={leaderboard} loading={loadingLobbyLeaderboard} error={errorLobbyLeaderboard} />
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