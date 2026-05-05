import React from 'react';

type LobbyLeaderboardRowProps = {
    username: string;
    score: number;
};

const LobbyLeaderboardRow: React.FC<LobbyLeaderboardRowProps> = ({ username, score }) => {
    return (
        <li>
            {username} : {score}
        </li>
    );
};

export default LobbyLeaderboardRow;