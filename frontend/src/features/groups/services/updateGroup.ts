import { supabase } from "../../../shared/api/supabaseClient";
import { UpdateGroupFormData } from "../types/group.types";

export async function updateGroup(groupId: string, updateGroupData: UpdateGroupFormData): Promise<void> {
    const { name, description } = updateGroupData;
    const { error } = await supabase
        .from('groups')
        .update({ name, description })
        .eq('id', groupId);

    if (error) throw error;
};