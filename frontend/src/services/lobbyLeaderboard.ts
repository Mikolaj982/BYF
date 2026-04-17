import { supabase } from "../shared/api/supabaseClient";

export type LobbyLeaderboard = {
    username: string;
    total_score: number;
    user_id: string;
}

export async function getLobbyLeaderboard(lobbyId: string): Promise<LobbyLeaderboard[]> {
    const { data, error } = await supabase.rpc('get_lobby_leaderboard', { input_lobby_id: lobbyId });
    if (error) throw error;

    const mapped: LobbyLeaderboard[] = data?.map((row: LobbyLeaderboard) => {
        return {
            username: row.username,
            total_score: row.total_score,
            user_id: row.user_id,
        };
    })
    return mapped;
};