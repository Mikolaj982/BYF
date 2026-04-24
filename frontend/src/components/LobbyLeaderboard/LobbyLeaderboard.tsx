import React from 'react';
import LobbyLeaderboardRow from '../LobbyLeaderboardRow/LobbyLeaderboardRow';
import { Leaderboard } from '../../services/lobbyLeaderboard';

type LobbyLeaderboardProps = {
    leaderboard: Leaderboard[],
    error: string | null,
    loading: boolean,
}

const LobbyLeaderboard: React.FC<LobbyLeaderboardProps> = ({ leaderboard, error, loading }) => {
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