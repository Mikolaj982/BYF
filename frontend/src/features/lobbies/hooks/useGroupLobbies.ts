import { useState, useEffect } from "react";
import { Lobby } from "../types/lobby.types";
import { getGroupLobbies } from "../services/getGroupLobbies";

export function useGroupLobbies(groupId: string) {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const loadLobbies = async function () {
        setLoading(true);
        try {
            const data = await getGroupLobbies(groupId);
            setLobbies(data || []);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!groupId) {
            setLoading(false);
            return;
        }
        loadLobbies();
    }, [groupId]);

    return {
        lobbies,
        loading,
        error,
        refetchLobbies: loadLobbies
    };
}