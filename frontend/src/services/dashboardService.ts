import { supabase } from "../shared/api/supabaseClient";
import { UserGroup, GroupMembersRow } from "../pages/Dashboard/types/group.types";

export async function getUserGroups(userId: string): Promise<UserGroup[]> {
    const { data, error } = await supabase
        .from("group_members")
        .select(`
                role,
                groups!inner (
                        id,
                        name,
                        description
                )`
        )
        .eq("user_id", userId)

    if (error) throw error;

    const typedData = data as unknown as GroupMembersRow[] | null;

    const mapped = typedData?.map((item) => {
        const group = item.groups;

        if (!group) return null;

        return {
            name: group.name,
            id: group.id,
            description: group.description,
            role: item.role,
        };
    }) || [];

    const result = mapped.filter(
        (item): item is UserGroup => item !== null
    );

    return result;
};

