import { supabase } from "../shared/api/supabaseClient";
import { CreateGroupSubmitData } from "../components/CreateGroup/CreateGroupForm";

export async function createGroup(createGroupData: CreateGroupSubmitData) {
    const invite_code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const { name, description, owner } = createGroupData;
    const { data: group, error: groupError } = await supabase
        .from('groups')
        .insert([{ name, description, owner, invite_code }])
        .select()
        .single();

    if (groupError) throw groupError;

    const { error: membersError } = await supabase
        .from('group_members')
        .insert([{
            group_id: group.id,
            user_id: owner,
            role: 'owner',
        }])

    if (membersError) throw membersError;
    return group;
};