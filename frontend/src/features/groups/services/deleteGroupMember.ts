import { supabase } from "../../../shared/api/supabaseClient";
import { DeleteGroupMemberProps } from "../types/group.types";

export async function deleteGroupMember({ groupId, targetUserId }: DeleteGroupMemberProps): Promise<void> {
    const { error } = await supabase.rpc('delete_group_member', { target_group_id: groupId, target_user_id: targetUserId });
    if (error) throw error;
}