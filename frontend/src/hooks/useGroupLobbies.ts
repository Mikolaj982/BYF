import { useState, useEffect } from "react";
import { Lobby } from "../pages/Dashboard/types/lobby.types";
import { getGroupLobbies } from "../services/lobbies/lobbyService";

export function useGroupLobbies(groupId: string) {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const loadLobbies = async function () {
        setError(null);
        setLoading(true);
        try {
            const data = await getGroupLobbies(groupId);
            setLobbies(data || []);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!groupId) {
            setLoading(false);
            return
        }
        loadLobbies();
    }, [groupId])

    return {
        lobbies,
        loading,
        error,
        refetchLobbies: loadLobbies
    };
};