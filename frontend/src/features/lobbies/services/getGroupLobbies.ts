import { supabase } from "../../../shared/api/supabaseClient";
import { Lobby } from "../types/lobby.types";

export async function getGroupLobbies(groupId: string): Promise<Lobby[]> {
    const { data, error } = await supabase
        .from('lobbies')
        .select(`
            id,
            group_id,
            game_type,
            created_by
        `)
        .eq('group_id', groupId);

    if (error) throw error;

    return (data ?? []).flatMap((item) => {
        if (!item.group_id) return [];

        return [{
            id: item.id,
            groupId: item.group_id,
            gameType: item.game_type,
            createdBy: item.created_by
        }]
    });
}
