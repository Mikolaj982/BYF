import { getGroupMembers } from "../services/groupMembers";
import { useQuery } from "@tanstack/react-query";

export function useGroupMembers(groupId: string) {
    const {
        data: groupMembers,
        isPending: loadingGroupMembers,
        error: errorGroupMembers,
    } = useQuery(
        {
            queryKey: ['group_members', groupId],
            queryFn: () => getGroupMembers(groupId)
        }
    );

    return {
        groupMembers,
        loadingGroupMembers,
        errorGroupMembers,
    };
};