import { supabase } from "../../shared/api/supabaseClient";

export type CreateLobbyData = {
    groupId: string,
    gameType: string,
    owner: string,
}

export async function createLobby(createLobbyData: CreateLobbyData) {
    const { groupId, gameType, owner } = createLobbyData;
    const { data, error } = await supabase
        .from('lobbies')
        .insert([{
            group_id: groupId,
            game_type: gameType,
            created_by: owner,
        }])
        .select()
        .single()

    if (error) throw error;
    return data;
};

