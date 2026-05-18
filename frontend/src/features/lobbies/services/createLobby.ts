import { supabase } from "../../../shared/api/supabaseClient";

export type CreateLobbyData = {
    groupId: string;
    gameType: string;
    owner: string;
};

export async function createLobby(createLobbyData: CreateLobbyData): Promise<void> {
    const { groupId, gameType, owner } = createLobbyData;
    const { error } = await supabase
        .from('lobbies')
        .insert([{
            group_id: groupId,
            game_type: gameType,
            created_by: owner,
        }]);

    if (error) throw error;
}

