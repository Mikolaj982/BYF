export type Lobby = {
    id: string;
    groupId: string;
    gameType: string;
    createdBy: string;
};

export type LobbyMember = {
    userId: string;
    username: string;
};

export type LobbyMatchData = {
    lobbyId: string;
    gameName: string;
    participants: {
        user_id: string;
        score: number;
    }[];
};

export type Player = {
    userId: string;
    username: string;
    score: number;
};

export type Match = {
    matchId: string;
    gameName: string;
    players: Player[];
    createdAt: string;
    owner: string;
};

export type Leaderboard = {
    username: string;
    score: number;
    userId: string;
};
