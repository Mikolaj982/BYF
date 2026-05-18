import { supabase } from "../../../shared/api/supabaseClient";
import { CreateGroupSubmitData } from "../types/group.types";
import { Database } from "../../../types/database.types";

type CreateGroupReturn = Database['public']['Functions']['create_group']['Returns'];

export async function createGroup(createGroupData: CreateGroupSubmitData): Promise<CreateGroupReturn> {
    const { name, description, owner } = createGroupData;
    const { data: id, error } = await supabase.rpc('create_group', {
        input_name: name,
        input_description: description,
        input_owner: owner,
    });
    if (error) throw error;
    return id;
};