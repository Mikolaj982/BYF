import { supabase } from "../../shared/api/supabaseClient";
import { lobby } from "../../pages/Dashboard/types/lobby.types";

export async function getGroupLobbies(groupId: string): Promise<lobby[]> {
    const { data, error } = await supabase
        .from('lobbies')
        .select(`
            id,
            group_id,
            game_type
        `)
        .eq('group_id', groupId)

    if (error) throw error;
    console.log('lobbies:', data)
    return data;
};
