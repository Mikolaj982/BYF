import { supabase } from "../../../shared/api/supabaseClient";

export async function deleteMatch(matchId: string): Promise<void> {
    const { error } = await supabase.rpc('delete_match', { input_match_id: matchId });

    if (error) throw error;
    return;
}; 