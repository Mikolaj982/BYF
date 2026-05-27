import { getLobbiesMembersCount } from "../services/getLobbyMembersCount";
import { useQuery } from "@tanstack/react-query";

export function useLobbiesMembersCount(lobbiesIds: string[]) {
    const {
        data: lobbiesMembersCount,
        isPending: loadingLobbiesMembersCount,
        error: errorLobbiesMembersCount
    } = useQuery({
        queryKey: ['lobbies_members_count', lobbiesIds],
        queryFn: () => getLobbiesMembersCount(lobbiesIds)
    });

    return {
        lobbiesMembersCount,
        loadingLobbiesMembersCount,
        errorLobbiesMembersCount,
    };
}
