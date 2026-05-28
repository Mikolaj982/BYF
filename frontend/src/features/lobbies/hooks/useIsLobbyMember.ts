import { useAuth } from "../../auth/hooks/useAuth";
import { useLobbyMembers } from "./useLobbyMembers";

export function useIsLobbyMember(lobbyId: string) {
    const { user } = useAuth();
    const { lobbyMembers } = useLobbyMembers(lobbyId);
    return lobbyMembers.some(member => member.userId === user?.id);
}