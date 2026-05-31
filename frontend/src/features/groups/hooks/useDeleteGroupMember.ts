import { useMutation } from "@tanstack/react-query";
import { deleteGroupMember } from "../services/deleteGroupMember";
import { MESSAGES } from "../../../utils/messages";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/errorUtils/getErrorMessage";
import { DeleteGroupMemberProps } from "../types/group.types";

export function useDeleteGroupMember() {
    return useMutation({
        mutationFn: (data: DeleteGroupMemberProps) => deleteGroupMember(data),
        onSuccess: () => toast.success(MESSAGES.SUCCESS.DELETED_MEMBER, { toastId: 'delete-group-member-success' }),
        onError: (error) => toast.error(getErrorMessage(error), { toastId: 'delete-group-member-error' }),
    });
}