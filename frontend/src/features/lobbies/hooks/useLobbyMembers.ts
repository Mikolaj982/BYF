import { useAuth } from "../../auth/hooks/useAuth";
import { getLobbyMembers } from "../services/lobbyMembers";
import { useQuery } from "@tanstack/react-query";

export function useLobbyMembers(lobbyId: string) {
    const { user, loading: authLoading } = useAuth();
    const {
        data: lobbyMembers,
        isPending: loadingLobbyMembers,
        error: errorLobbyMembers
    } = useQuery(
        {
            queryKey: ['lobby_members', lobbyId],
            queryFn: () => getLobbyMembers(lobbyId),
            enabled: !!user && !authLoading && !!lobbyId,
        }
    );

    return {
        lobbyMembers,
        loadingLobbyMembers,
        errorLobbyMembers,
    };
}


