import { getLobbyMatches } from "../services/lobbyMatchesService";
import { useQuery } from '@tanstack/react-query';

export function useLobbyMatches(lobbyId: string) {
    const {
        data: matches = [],
        isPending: loadingMatches,
        error: errorMatches
    } = useQuery(
        {
            queryKey: ['matches', lobbyId],
            queryFn: () => getLobbyMatches(lobbyId)
        }
    );

    return {
        matches,
        loadingMatches,
        errorMatches,
    };
}