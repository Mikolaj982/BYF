import { supabase } from "../../../shared/api/supabaseClient";

export async function leaveGroup(groupId: string) {
    if (!groupId) throw new Error('Wymagany identyfikator grupy.')

    const { error } = await supabase.rpc('leave_group', { input_group_id: groupId })

    if (error) throw error;

    return;
};