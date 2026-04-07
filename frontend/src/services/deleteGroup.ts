import { supabase } from "../shared/api/supabaseClient";

export async function deleteGroup(groupId: string) {
    const { data: lobbies } = await supabase
        .from("lobbies")
        .select("id")
        .eq("group_id", groupId);

    const lobbyId = lobbies?.map(lobby => lobby.id) ?? [];

    if (lobbyId.length > 0) {
        const { error: deleteLobbiesMembersError } = await supabase
            .from('lobby_members')
            .delete()
            .in('lobby_id', lobbyId);

        if (deleteLobbiesMembersError) throw deleteLobbiesMembersError;
    };

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