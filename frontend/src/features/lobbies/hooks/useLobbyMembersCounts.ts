import { useEffect, useState } from "react";
import { getLobbyMembersCounts } from "../services/getLobbyMembersCounts";

export function useLobbyMembersCounts(lobbyIds: string[]) {
    const [lobbyMembersCounts, setLobbyMembersCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const loadLobbyMembersCounts = async function () {
        setError(null);
        setLoading(true);
        try {
            const data = await getLobbyMembersCounts(lobbyIds);
            setLobbyMembersCounts(data || {});
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (lobbyIds.length === 0) {
            setLoading(false);
            return;
        }
        loadLobbyMembersCounts();
    }, [lobbyIds]);

    return {
        lobbyMembersCounts,
        loading,
        error,
        refetchLobbyMembersCounts: loadLobbyMembersCounts,
    };
}
