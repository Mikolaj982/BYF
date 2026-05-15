import { supabase } from "../../../shared/api/supabaseClient";
import { LobbyMatchData } from "../types/lobby.types";

export async function createMatch(createLobbyMatchData: LobbyMatchData): Promise<string> {
    const { lobby_id, participants, gameName } = createLobbyMatchData;

    const { data, error } = await supabase.rpc('create_match', {
        input_lobby_id: lobby_id,
        input_game_name: gameName,
        input_participants: participants,
    });
    if (error) throw error;
    return data;
};