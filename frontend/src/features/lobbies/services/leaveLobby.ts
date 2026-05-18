import { supabase } from "../../../shared/api/supabaseClient";

export async function leaveLobby(lobbyId: string): Promise<void> {
    if (!lobbyId) throw new Error('Wymagany identyfikator lobby.');

    const { error } = await supabase.rpc('leave_lobby', { input_lobby_id: lobbyId });
    if (error) throw error;
}