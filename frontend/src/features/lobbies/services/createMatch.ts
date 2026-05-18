import { supabase } from "../../../shared/api/supabaseClient";
import { LobbyMatchData } from "../types/lobby.types";
import { Database } from "../../../types/database.types";

type CreateMatchReturn = Database['public']['Functions']['create_match']['Returns'];

export async function createMatch(createLobbyMatchData: LobbyMatchData): Promise<CreateMatchReturn> {
    const { lobbyId, participants, gameName } = createLobbyMatchData;

    const { data, error } = await supabase.rpc('create_match', {
        input_lobby_id: lobbyId,
        input_game_name: gameName,
        input_participants: participants,
    });
    if (error) throw error;
    return data;
};