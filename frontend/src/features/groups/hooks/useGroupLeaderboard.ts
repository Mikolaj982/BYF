import { useQuery } from '@tanstack/react-query';
import { getGroupLeaderboard } from '../services/getGroupLeaderboard';

export function useGroupLeaderboard(groupId: string) {
    const {
        data: groupLeaderboard = [],
        isPending: loadingGroupLeaderboard,
        error: errorGroupLeaderboard
    } = useQuery(
        {
            queryKey: ['group-leaderboard', groupId],
            queryFn: () => getGroupLeaderboard(groupId)
        }
    )

    return {
        groupLeaderboard,
        loadingGroupLeaderboard,
        errorGroupLeaderboard,
    };
}