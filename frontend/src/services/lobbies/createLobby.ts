import { supabase } from "../../shared/api/supabaseClient";

export type CreateLobbyData = {
    groupId: string,
    gameType: string,
}

export async function createLobby(createLobbyData: CreateLobbyData) {
    const { groupId, gameType } = createLobbyData;
    const { data, error } = await supabase
        .from('lobbies')
        .insert([{
            group_id: groupId,
            game_type: gameType,
        }])
        .select()
        .single()

    if (error) throw error;
    return data;
};

