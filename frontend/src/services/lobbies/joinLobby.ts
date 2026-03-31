import { supabase } from "../../shared/api/supabaseClient";
import { LobbyMember } from "../../pages/Dashboard/types/lobby.types";

export async function joinLobby(lobbyData: LobbyMember) {
    const { user_id: userId, lobby_id: lobbyId } = lobbyData;
    const { error } = await supabase
        .from('lobby_members')
        .insert([{
            user_id: userId,
            lobby_id: lobbyId
        }])
    if (error) {
        if (error.code === "23505") {
            throw new Error("Już jesteś w lobby");
        }
        throw error;
    }
};