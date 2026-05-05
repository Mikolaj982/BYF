import { useEffect, useState } from "react";
import { getLobbyMatches } from "../services/lobbyMatchesService";
import { Match } from "../types/lobby.types";

export function useLobbyMatches(lobbyId: string) {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadMatches = async function (): Promise<void> {
        setError(null);
        setLoading(true);

        try {
            const data = await getLobbyMatches(lobbyId);
            setMatches(data || []);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
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
        setMatches([]);
        loadMatches();
    }, [lobbyId]);

    return {
        matches,
        error,
        loading,
        refetchMatches: loadMatches,
    };
};