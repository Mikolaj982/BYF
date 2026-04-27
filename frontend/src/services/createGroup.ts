import { supabase } from "../shared/api/supabaseClient";
import { CreateGroupSubmitData } from "../components/CreateGroup/CreateGroupForm";

export async function createGroup(createGroupData: CreateGroupSubmitData): Promise<string> {
    const { name, description, owner } = createGroupData;
    const { data: id, error } = await supabase.rpc('create_group', {
        input_name: name,
        input_description: description,
        input_owner: owner,
    });
    if (error) throw error;
    return id;
};