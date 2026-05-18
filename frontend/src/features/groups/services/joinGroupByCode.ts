import { supabase } from "../../../shared/api/supabaseClient";
import { Database } from "../../../types/database.types";

type JoinGroupByCode = Database['public']['Functions']['join_group_by_code']['Returns'];

export async function joinGroupByCode(code: string): Promise<JoinGroupByCode> {
    if (!code) throw new Error('Kod jest wymagany.')

    const { data, error } = await supabase.rpc('join_group_by_code', { code });
    if (error) throw error;
    return data;
};