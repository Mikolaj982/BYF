import { supabase } from "../shared/api/supabaseClient";

export async function deleteGroup(groupId: string) {
    const { error: deleteGroupMembersError } = await supabase
        .from('group_members')
        .delete()
        .eq('group_id', groupId);

    if (deleteGroupMembersError) throw deleteGroupMembersError;

    const { error: deleteGroupError } = await supabase
        .from('groups')
        .delete()
        .eq('id', groupId);

    if (deleteGroupError) throw deleteGroupError;
};