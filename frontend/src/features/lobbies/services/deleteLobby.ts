import { supabase } from "../../../shared/api/supabaseClient";

export async function deleteLobby(lobbyId: string): Promise<void> {
    const { error } = await supabase.rpc('delete_lobby', { input_lobby_id: lobbyId });
    if (error) throw error;
}