import { supabase } from "../../../shared/api/supabaseClient";

export async function deleteGroup(groupId: string): Promise<void> {
    if (!groupId) throw new Error('Wymagany identyfikator grupy.')

    const { error } = await supabase.rpc('delete_group', { input_group_id: groupId });

    if (error) throw error;
    return;
};