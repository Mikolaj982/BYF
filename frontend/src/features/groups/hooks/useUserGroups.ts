import { useAuth } from "../../auth/hooks/useAuth";
import { getUserGroups } from "../services/getGroups";
import { useQuery } from "@tanstack/react-query";

export function useUserGroups() {
    const { user, loading: loadingAuth } = useAuth();
    const { data: groups = [], isPending: loadingGroups, error: groupsError } = useQuery(
        {
            queryKey: ['groups', user?.id],
            queryFn: () => getUserGroups(user!.id),
            enabled: !!user && !loadingAuth
        }
    );

    return {
        groups,
        loadingGroups,
        groupsError,
    };
}