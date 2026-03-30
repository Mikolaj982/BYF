import { supabase } from "../../shared/api/supabaseClient";
import { LobbyMember } from "../../pages/Dashboard/types/lobby.types";
import { DB_ERROR_CODES } from "../../constants/dbErrors";

export async function joinLobby(lobbyData: LobbyMember) {
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