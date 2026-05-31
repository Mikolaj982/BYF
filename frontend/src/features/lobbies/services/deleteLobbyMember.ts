import { supabase } from "../../../shared/api/supabaseClient";
import { DeleteLobbyMemberProps } from "../types/lobby.types";

export async function deleteLobbyMember({ targetUserId, lobbyId }: DeleteLobbyMemberProps): Promise<void> {
    const { error } = await supabase
        .from('lobby_members')
        .delete()
        .eq('user_id', targetUserId)
        .eq('lobby_id', lobbyId);

    if (error) throw error;
}