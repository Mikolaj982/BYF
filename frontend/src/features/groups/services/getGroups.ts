import { supabase } from "../../../shared/api/supabaseClient";
import { GroupRole, UserGroup } from "../types/group.types";

export async function getUserGroups(userId: string): Promise<UserGroup[]> {
    const { data, error } = await supabase
        .from("group_members")
        .select(`
                role,
                groups!inner (
                        id,
                        name,
                        description,
                        invite_code
                )`
        )
        .eq("user_id", userId);

    if (error) throw error;

    return (data ?? []).flatMap((item) => {
        const group = Array.isArray(item.groups) ? item.groups[0] : item.groups;

        if (!group) return [];

        return [{
            name: group.name,
            id: group.id,
            description: group.description,
            role: item.role as GroupRole,
            inviteCode: group.invite_code
        }];
    })
};

