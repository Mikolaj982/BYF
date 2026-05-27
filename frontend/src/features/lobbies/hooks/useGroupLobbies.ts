import { useAuth } from "../../auth/hooks/useAuth";
import { getGroupLobbies } from "../services/getGroupLobbies";
import { useQuery } from "@tanstack/react-query";

export function useGroupLobbies(groupId: string) {
    const { user, loading: loadingAuth } = useAuth();
    const {
        data: lobbies = [],
        isPending: loadingLobbies,
        error: errorLobbies,
    } = useQuery({
        queryKey: ['lobbies', groupId],
        queryFn: () => getGroupLobbies(groupId),
        enabled: !!user && !loadingAuth && !!groupId
    });

    return {
        lobbies,
        loadingLobbies,
        errorLobbies,
    };
}