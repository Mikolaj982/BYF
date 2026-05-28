import { supabase } from "../../../shared/api/supabaseClient";

export async function leaveGroup(groupId: string): Promise<void> {
    const { error } = await supabase.rpc('leave_group', { input_group_id: groupId });
    if (error) throw error;
};