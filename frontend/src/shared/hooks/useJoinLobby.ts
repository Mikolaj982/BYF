import { joinLobby } from "../../features/lobbies/services/joinLobby";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { toast } from "react-toastify";
import { MESSAGES } from "../../utils/messages";
import { getErrorMessage } from "../../utils/errorUtils/getErrorMessage";

export function useJoinLobby() {
    const { user } = useAuth();

    return useMutation({
        mutationFn: (lobbyId: string) => {
            if (!user) throw new Error(MESSAGES.ERROR.NOT_AUTH);
            return joinLobby({ user_id: user!.id, lobby_id: lobbyId });
        },
        onSuccess: () => toast.success(MESSAGES.SUCCESS.JOINED_LOBBY, { toastId: 'join-lobby-success' }),
        onError: (error) => toast.error(getErrorMessage(error), { toastId: 'join-lobby-error' }),
    });
}