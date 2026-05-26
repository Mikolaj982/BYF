import React from 'react';
import { Lobby, Match } from '../../types/lobby.types';
import { deleteMatch } from '../../services/deleteMatch';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { Stack, Typography } from '@mui/material';
import MatchCard from './MatchCard/MatchCard';
import CreateMatchForm from '../CreateMatchForm/CreateMatchForm';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';

type MatchesProps = {
    matches: Match[];
    loadingMatches: boolean;
    errorMatches: unknown;
    refetchMatches: () => Promise<void>;
    refetchLobbyLeaderboard: () => Promise<void>;
    lobbyData: Lobby;
};

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
    const matchesCount = matches.length;
    const handleDeleteMatch = async (matchId: string) => {
        try {
            await deleteMatch(matchId);
            await refetchMatches();
            await refetchLobbyLeaderboard();
            toast.success(MESSAGES.SUCCESS.DELETED_MATCH);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Stack padding={3} spacing={1}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack alignItems='baseline' gap={1}>
                    <Typography fontSize={14} color='text.secondary'>
                        MATCHES HISTORY
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {matchesCount === 0
                            ? 'No played matches yet'
                            : `${matchesCount} ${matchesCount === 1 ? 'match' : 'matches'}`
                        }
                    </Typography>
                </Stack>
                <CreateMatchForm
                    refetchMatches={refetchMatches}
                    refetchLeaderboard={refetchLobbyLeaderboard}
                    lobbyData={lobbyData}
                />
            </Stack>
            {
                loadingMatches
                    ? <LoadingState />
                    : errorMatches
                        ? <ErrorState error={errorMatches} />
                        : (!matches.length)
                            ? (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={2}
                                    p={2}
                                >
                                    <EmptyState message='No history yet.' />
                                    <CreateMatchForm
                                        refetchMatches={refetchMatches}
                                        refetchLeaderboard={refetchLobbyLeaderboard}
                                        lobbyData={lobbyData}
                                    />
                                </Stack>
                            )
                            : (
                                <Stack spacing={1.2}>
                                    {
                                        matches.map((match) => {
                                            return <MatchCard
                                                key={match.matchId}
                                                match={match}
                                                onDelete={handleDeleteMatch}
                                            />
                                        })
                                    }
                                </Stack>
                            )
            }
        </Stack>
    )
};

export default Matches;