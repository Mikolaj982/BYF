import { supabase } from "../../../shared/api/supabaseClient";

export async function leaveLobby(lobbyId: string): Promise<void> {
    const { error } = await supabase.rpc('leave_lobby', { input_lobby_id: lobbyId });
    if (error) throw error;
}