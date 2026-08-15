import { supabase } from "../../../shared/api/supabaseClient";
import { LeaderboardEntry } from "../../../shared/types/leaderboard.types";

type LeaderboardDb = {
    username: string;
    total_score: number;
    user_id: string;
};

export async function getLobbyLeaderboard(lobbyId: string): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase.rpc('get_lobby_leaderboard', { input_lobby_id: lobbyId });
    if (error) throw error;

    return (data ?? []).map((row: LeaderboardDb) => {
        return {
            username: row.username,
            score: row.total_score,
            userId: row.user_id,
        };
    });
}