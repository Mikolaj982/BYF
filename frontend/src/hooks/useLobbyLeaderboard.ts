import { useEffect, useState } from "react";
import { getLobbyLeaderboard, LobbyLeaderboard } from "../services/lobbyLeaderboard";

export function useLobbyLeaderboard(lobbyId: string) {
    const [leaderboard, setLeaderboard] = useState<LobbyLeaderboard[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadLobbyLeaderboard = async function () {
        setError(null);
        setLoading(true);
        try {
            const data = await getLobbyLeaderboard(lobbyId);
            setLeaderboard(data || []);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!lobbyId) {
            setLoading(false);
            return;
        }
        setLeaderboard([]);
        loadLobbyLeaderboard();
    }, [lobbyId]);

    return {
        leaderboard,
        loading,
        error,
        refetchLobbyLeaderboard: loadLobbyLeaderboard,
    }
};