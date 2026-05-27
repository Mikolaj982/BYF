import { useQuery } from '@tanstack/react-query';
import { getLobbyLeaderboard } from '../services/lobbyLeaderboard';

export function useLobbyLeaderboard(lobbyId: string) {
    const {
        data: leaderboard,
        isPending: loadingLeaderboard,
        error: errorLeaderboard
    } = useQuery({
        queryKey: ['leaderboard', lobbyId],
        queryFn: () => getLobbyLeaderboard(lobbyId)
    })

    return {
        leaderboard,
        loadingLeaderboard,
        errorLeaderboard,
    };
}