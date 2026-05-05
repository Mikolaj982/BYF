import { useEffect, useState } from "react";
import { GroupMember } from "../types/group.types";
import { getGroupMembers } from "../services/groupMembers";

export function useGroupMembers(groupId: string) {
    const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadMembers = async function (id: string): Promise<void> {
        setError(null);
        setLoading(true);

        try {
            const data = await getGroupMembers(id);
            setGroupMembers(data || []);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!groupId) {
            setLoading(false);
            return;
        }
        setGroupMembers([]);
        loadMembers(groupId);
    }, [groupId])

    return {
        groupMembers,
        loading,
        error,
        refetchGroupMembers: loadMembers,
    };
};