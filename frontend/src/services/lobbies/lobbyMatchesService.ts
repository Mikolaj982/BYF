import { supabase } from "../../shared/api/supabaseClient";
import { Match } from "../../pages/Dashboard/types/lobby.types";

export async function getLobbyMatches(lobbyId: string): Promise<Match[]> {
    const { data, error } = await supabase
        .from('matches')
        .select(`
            id,
            match_participants (
                user_id,
                profiles (username)
            ),
            match_scores (
                user_id,
                score
            )
            `)
        .eq('lobby_id', lobbyId);

    if (error) throw error;

    return (data ?? []).map((match) => {
        const scores = match.match_scores;
        const participants = match.match_participants;

        const players = participants.map(p => {
            if (!p.user_id) throw new Error('Missing user_id')

            const profile = Array.isArray(p.profiles)
                ? p.profiles[0]
                : p.profiles;

            const score = scores.find(s => s.user_id === p.user_id);

            return {
                userId: p.user_id,
                username: profile?.username ?? 'unknown',
                score: score?.score ?? 0
            }
        });

        return {
            matchId: match.id,
            players,
        };
    });
};