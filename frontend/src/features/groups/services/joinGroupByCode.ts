import { supabase } from "../../../shared/api/supabaseClient";
import { Database } from "../../../types/database.types";
import { MESSAGES } from "../../../utils/messages";

type JoinGroupByCode = Database['public']['Functions']['join_group_by_code']['Returns'];

export async function joinGroupByCode(code: string): Promise<JoinGroupByCode> {
    if (!code) throw new Error(MESSAGES.ERROR.EMPTY_INVITE_CODE);

    const { data, error } = await supabase.rpc('join_group_by_code', { code });
    if (error) throw error;

    return data;
};