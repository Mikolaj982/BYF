import { supabase } from "../../../shared/api/supabaseClient";

export async function joinGroupByCode(code: string) {
    if (!code) throw new Error('Kod jest wymagany.')

    const { data, error } = await supabase.rpc('join_group_by_code', { code })

    if (error) throw error;
    return data;
};