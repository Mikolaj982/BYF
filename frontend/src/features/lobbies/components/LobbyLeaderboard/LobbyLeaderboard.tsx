import React from 'react';
import Leaderboard from '../../../../shared/components/Leaderboard/Leaderboard';
import { Lobby } from '../../types/lobby.types';
import { useLobbyLeaderboard } from '../../hooks/useLobbyLeaderboard';

type LobbyLeaderboardProps = {
    lobbyData: Lobby,
};

const LobbyLeaderboard: React.FC<LobbyLeaderboardProps> = ({ lobbyData }) => {
    const { leaderboard, loadingLeaderboard, errorLeaderboard } = useLobbyLeaderboard(lobbyData.id);

    return (
        <Leaderboard
            title={lobbyData.gameType}
            entries={leaderboard}
            isLoading={loadingLeaderboard}
            error={errorLeaderboard}
        />
    )
};

export default LobbyLeaderboard;
