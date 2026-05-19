import { useEffect, useState } from "react";
import { LobbyMember } from "../types/lobby.types";
import { getLobbyMembers } from "../services/lobbyMembers";

export function useLobbyMembers(lobbyId: string) {
    const [lobbyMembers, setLobbyMembers] = useState<LobbyMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const loadLobbyMembers = async function () {
        setError(null);
        setLoading(true);
        try {
            const data = await getLobbyMembers(lobbyId);
            setLobbyMembers(data || []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!lobbyId) {
            setLoading(false);
            return;
        }
        setLobbyMembers([]);
        loadLobbyMembers();
    }, [lobbyId]);

    return {
        lobbyMembers,
        loading,
        error,
        refetchLobbyMembers: loadLobbyMembers,
    };
}


