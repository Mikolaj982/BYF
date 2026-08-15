import { supabase } from "../../../shared/api/supabaseClient";
import { LeaderboardEntry } from "../../../shared/types/leaderboard.types";

export async function getGroupLeaderboard(groupId: string): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase.rpc('get_group_leaderboard', { input_group_id: groupId });
    if (error) throw error;

    return (data ?? []).map((row) => {
        return {
            username: row.username,
            score: row.total_score,
            userId: row.user_id,
        };
    });
}