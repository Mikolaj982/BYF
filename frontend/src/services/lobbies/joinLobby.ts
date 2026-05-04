import { supabase } from "../../shared/api/supabaseClient";
import { DB_ERROR_CODES } from "../../constants/dbErrors";
import { Database } from "../../types/database.types";

type LobbyMember = Database['public']['Tables']['lobby_members']['Insert']

export async function joinLobby(lobbyData: LobbyMember): Promise<void> {
    const { user_id: userId, lobby_id: lobbyId } = lobbyData;

    const { error } = await supabase
        .from('lobby_members')
        .insert([{
            user_id: userId,
            lobby_id: lobbyId
        }])

    if (error) {
        if (error.code === DB_ERROR_CODES.UNIQUE_VIOLATION) {
            throw new Error("Już jesteś w lobby");
        }
        throw error;
    }
};