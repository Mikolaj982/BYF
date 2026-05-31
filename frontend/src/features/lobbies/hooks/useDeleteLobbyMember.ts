import { useMutation } from "@tanstack/react-query";
import { MESSAGES } from "../../../utils/messages";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/errorUtils/getErrorMessage";
import { DeleteLobbyMemberProps } from "../types/lobby.types";
import { deleteLobbyMember } from "../services/deleteLobbyMember";

export function useDeleteLobbyMember() {
    return useMutation({
        mutationFn: (data: DeleteLobbyMemberProps) => deleteLobbyMember(data),
        onSuccess: () => toast.success(MESSAGES.SUCCESS.DELETED_MEMBER, { toastId: 'delete-lobby-member-success' }),
        onError: (error) => toast.error(getErrorMessage(error), { toastId: 'delete-lobby-member-error' }),
    });
}