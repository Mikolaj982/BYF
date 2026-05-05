import { GroupMember } from "../types/group.types";
import { supabase } from "../../../shared/api/supabaseClient";

export async function getGroupMembers(groupId: string): Promise<GroupMember[]> {
    const { data, error } = await supabase
        .from('group_members')
        .select(`
        user_id,
        role,
            profiles!inner (
                username
            )`
        )
        .eq('group_id', groupId)

    if (error) throw error;

    return (data ?? []).map((item) => {
        const profile = Array.isArray(item.profiles)
            ? item.profiles[0]
            : item.profiles;

        return {
            username: profile?.username ?? 'unknown',
            role: item.role ?? 'member',
            id: item.user_id,
        }
    });
};