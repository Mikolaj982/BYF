import { Group } from "../pages/Dashboard/types/group.types";
import { supabase } from "../shared/api/supabaseClient";

export type updateGroupFormData = {
    name: string,
    description?: string | null,
}

export async function updateGroup(groupId: string, updateGroupData: updateGroupFormData): Promise<Group> {
    const { name, description } = updateGroupData;
    const { data, error } = await supabase
        .from('groups')
        .update([{ name, description }])
        .eq('id', groupId)
        .select()
        .single()

    if (error) throw error;

    return data;
};