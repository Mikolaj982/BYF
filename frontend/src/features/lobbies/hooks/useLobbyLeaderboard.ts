import { useCallback, useEffect, useState } from "react";
import { getLobbyLeaderboard } from '../services/lobbyLeaderboard';
import { Leaderboard } from "../types/lobby.types";

export function useLobbyLeaderboard(lobbyId: string) {
    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const loadLobbyLeaderboard = useCallback(async function () {
        setError(null);
        setLoading(true);
        try {
            const data = await getLobbyLeaderboard(lobbyId);
            setLeaderboard(data || []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [lobbyId]);

    useEffect(() => {
        if (!lobbyId) {
            setLoading(false);
            return;
        }
        setLeaderboard([]);
        loadLobbyLeaderboard();
    }, [lobbyId, loadLobbyLeaderboard]);

    return {
        leaderboard,
        loading,
        error,
        refetchLobbyLeaderboard: loadLobbyLeaderboard,
    };
}