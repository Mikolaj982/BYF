import React from 'react';
import { useLobbyLeaderboard } from '../../hooks/useLobbyLeaderboard';
import LobbyLeaderboardRow from '../LobbyLeaderboardRow/LobbyLeaderboardRow';

const LobbyLeaderboard: React.FC<{ lobbyId: string }> = ({ lobbyId }) => {
    const { leaderboard, error, loading } = useLobbyLeaderboard(lobbyId);

    return (
        <div>
            <h4>Leaderboard</h4>
            <ul>
                {error
                    ? <p>{error}</p>
                    : loading
                        ? <p>loading...</p>
                        : (leaderboard.length === 0)
                            ? <p>brak wyników</p>
                            : (leaderboard.map((player) => (
                                <LobbyLeaderboardRow key={player.user_id} score={player.total_score} username={player.username} />
                            )))
                }
            </ul>
        </div>
    );
};

export default LobbyLeaderboard;