import { supabase } from "../shared/api/supabaseClient";

export async function deleteGroup(groupId: string) {
    const { error: deleteLobbiesError } = await supabase
        .from('lobbies')
        .delete()
        .eq('group_id', groupId);

    if (deleteLobbiesError) throw deleteLobbiesError;

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