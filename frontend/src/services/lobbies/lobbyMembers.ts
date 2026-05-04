import { supabase } from "../../shared/api/supabaseClient";
import { LobbyMemberWithUsername } from "../../pages/Dashboard/types/lobby.types";

export async function getLobbyMembers(lobbyId: string): Promise<LobbyMemberWithUsername[]> {
    const { data, error } = await supabase
        .from('lobby_members')
        .select(`
        user_id,
            profiles!inner (
            username
            )`
        )
        .eq('lobby_id', lobbyId);

    if (error) throw error;

    return (data ?? []).flatMap((member) => {
        if (!member.user_id) return [];

        const profile = Array.isArray(member.profiles)
            ? member.profiles[0]
            : member.profiles;

        return [{
            userId: member.user_id,
            username: profile?.username ?? 'unknown',
        }];
    });
};