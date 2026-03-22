import { supabase } from "../shared/api/supabaseClient";

type Group = {
    id: string;
    name: string;
    description: string | null;
};

type GroupMembersRow = {
    groups: Group;
    role: string;
};

type UserGroup = {
    id: string;
    name: string;
    description: string | null;
    role: string;
};

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

    if (error) {
        throw new Error(error.message);
    }

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

