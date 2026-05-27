import { getLobbyMatches } from "../services/lobbyMatchesService";
import { useQuery } from '@tanstack/react-query';

export function useLobbyMatches(lobbyId: string) {
    const { isPending: loadingMatches, data: matches, error: errorMatches } = useQuery({ queryKey: ['matches', lobbyId], queryFn: () => getLobbyMatches(lobbyId) })

    return {
        matches,
        loadingMatches,
        errorMatches,
    };
}