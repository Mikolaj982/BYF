import React from 'react';
import { Lobby, Match } from '../../types/lobby.types';
import { deleteMatch } from '../../services/deleteMatch';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { CircularProgress, Stack, Typography } from '@mui/material';
import MatchCard from './MatchCard/MatchCard';
import CreateMatchForm from '../CreateMatchForm/CreateMatchForm';

type MatchesProps = {
    matches: Match[];
    loadingMatches: boolean;
    errorMatches: string | null;
    refetchMatches: () => Promise<void>;
    refetchLobbyLeaderboard: () => Promise<void>;
    lobbyData: Lobby;
}

const Matches: React.FC<MatchesProps> = (
    {
        matches,
        loadingMatches,
        errorMatches,
        refetchMatches,
        refetchLobbyLeaderboard,
        lobbyData
    }
) => {
    const handleDeleteMatch = async (matchId: string) => {
        try {
            await deleteMatch(matchId);
            await refetchMatches();
            await refetchLobbyLeaderboard();
            toast.success(MESSAGES.SUCCESS.DELETED_MATCH);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN)
            }
        }
    };

    return (
        <Stack padding={3} spacing={1}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack
                    alignItems='baseline'
                    gap={1}
                >
                    <Typography
                        fontSize={14}
                        color='text.secondary'
                    >
                        MATCHES HISTORY
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {matches.length} mecze
                    </Typography>
                </Stack>
                <CreateMatchForm
                    onMatchCreated={refetchMatches}
                    onLeaderboardUpdated={refetchLobbyLeaderboard}
                    lobbyData={lobbyData}
                />
            </Stack>
            {
                errorMatches
                    ?
                    <Typography>
                        {errorMatches}
                    </Typography>
                    :
                    loadingMatches
                        ?
                        <CircularProgress
                            size={20}
                            sx={{ m: 1 }}
                        />
                        :
                        matches.length === 0
                            ?
                            <Typography>
                                History is empty
                            </Typography>
                            :
                            (
                                <Stack spacing={1}>
                                    {matches.map((match) => {
                                        return <MatchCard
                                            key={match.matchId}
                                            match={match}
                                            onDelete={handleDeleteMatch}
                                        />
                                    })}
                                </Stack>
                            )
            }
        </Stack>
    )
}

export default Matches