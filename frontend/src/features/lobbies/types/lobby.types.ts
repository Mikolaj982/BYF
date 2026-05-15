export type Lobby = {
    id: string;
    group_id: string;
    game_type: string;
    created_by: string;
};

export type LobbyMember = {
    lobby_id: string;
    user_id: string;
};

export type LobbyMemberWithUsername = {
    userId: string,
    username: string,
};

export type LobbyMatchData = {
    lobby_id: string,
    gameName: string,
    participants: {
        user_id: string,
        score: number,
    }[],
};

export type Player = {
    userId: string,
    username: string,
    score: number,
};

export type Match = {
    matchId: string,
    gameName: string,
    players: Player[],
    createdAt: string,
    owner: string,
}