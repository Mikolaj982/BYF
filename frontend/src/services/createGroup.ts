import { supabase } from "../shared/api/supabaseClient";
import { CreateGroupSubmitData } from "../components/CreateGroup/CreateGroupForm";

export async function createGroup(createGroupData: CreateGroupSubmitData) {
    const { name, description, owner } = createGroupData;
    const { data: group, error: groupError } = await supabase
        .from('groups')
        .insert([{ name, description, owner }])
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
        .select();

    if (membersError) throw membersError;
    return group;
};