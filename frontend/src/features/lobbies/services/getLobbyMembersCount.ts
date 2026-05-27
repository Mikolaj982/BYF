import { supabase } from "../../../shared/api/supabaseClient";

export async function getLobbiesMembersCount(lobbiesIds: string[]): Promise<Record<string, number>> {
    const { data, error } = await supabase
        .from('lobby_members')
        .select('lobby_id')
        .in('lobby_id', lobbiesIds);

    if (error) throw new Error(error.message);
    if (!data) return {};

    const counts = data.reduce((acc, row) => {
        if (!row.lobby_id) return acc;
        acc[row.lobby_id] = (acc[row.lobby_id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return counts;
}