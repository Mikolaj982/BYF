import React from 'react';
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
import { useLobbyMatches } from '../../hooks/useLobbyMatches';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Matches: React.FC = () => {
    const { lobbyId } = useParams();
    const { matches, loadingMatches, errorMatches } = useLobbyMatches(lobbyId ?? '');
    const queryClient = useQueryClient();
    const matchesCount = matches.length;

    if (!lobbyId) return <ErrorState error='Invalid route' />;
    if (loadingMatches) return <LoadingState />;
    if (errorMatches) return <ErrorState error={errorMatches} />;
    if (!matchesCount) return (
        <Stack
            alignItems="center"
            justifyContent="center"
            gap={2}
            p={2}
        >
            <EmptyState message='No history yet.' />
            <CreateMatchForm />
        </Stack>
    );


    const handleDeleteMatch = async (matchId: string) => {
        try {
            await deleteMatch(matchId);
            queryClient.invalidateQueries({ queryKey: ['matches', lobbyId] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard', lobbyId] });
            toast.success(MESSAGES.SUCCESS.DELETED_MATCH);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Stack spacing={1}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack alignItems='baseline' gap={1}>
                    <Typography variant="body2" color="text.secondary">
                        {matchesCount === 0
                            ? 'No played matches yet'
                            : `${matchesCount} ${matchesCount === 1 ? 'match' : 'matches'}`
                        }
                    </Typography>
                </Stack>
                <CreateMatchForm />
            </Stack>
            <Stack spacing={1.2}>
                {matches.map((match) => (
                    <MatchCard
                        key={match.matchId}
                        match={match}
                        onDelete={handleDeleteMatch}
                    />
                ))}
            </Stack>
        </Stack>
    )
};

export default Matches;