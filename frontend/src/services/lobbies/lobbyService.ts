import { supabase } from "../../shared/api/supabaseClient";
import { Lobby } from "../../pages/Dashboard/types/lobby.types";

export async function getGroupLobbies(groupId: string): Promise<Lobby[]> {
    const { data, error } = await supabase
        .from('lobbies')
        .select(`
            id,
            group_id,
            game_type
        `)
        .eq('group_id', groupId)

    if (error) throw error;

    return (data ?? []).flatMap((item) => {
        if (!item.group_id) return [];

        return [{
            id: item.id,
            group_id: item.group_id,
            game_type: item.game_type,
        }]
    });
};
