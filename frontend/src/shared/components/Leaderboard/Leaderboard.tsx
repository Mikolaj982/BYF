import React, { Fragment } from 'react';
import { Divider, Paper, Stack } from '@mui/material';
import LeaderboardHeader from './LeaderboardHeader/LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow/LeaderboardRow';
import { assignPlaces } from '../../../utils/podiumUtils/podiumUtils';
import { LoadingState } from '../LoadingState/LoadingState';
import { ErrorState } from '../ErrorState/ErrorState';
import EmptyState from '../EmptyState/EmptyState';
import { LeaderboardEntry } from '../../types/leaderboard.types';

type LeaderboardProps = {
    title: string;
    entries: LeaderboardEntry[];
    isLoading: boolean;
    error: unknown;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ title, entries, isLoading, error }) => {
    const sortedEntries = entries.toSorted((a, b) => b.score - a.score);
    const entriesWithPlaces = assignPlaces(entries);
    const maxScore = sortedEntries[0]?.score ?? 0;

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!entries.length) return <EmptyState message='No results yet.' />;

    return (
        <Paper variant='outlined'>
            <LeaderboardHeader title={title} participantsCount={entries.length} />
            <Stack py={1}>
                {entriesWithPlaces.map((entry, index) => (
                    <Fragment key={index}>
                        {index !== 0 && <Divider />}
                        <LeaderboardRow
                            key={entry.userId}
                            playerData={entry}
                            maxScore={maxScore}
                        />
                    </Fragment>
                ))}
            </Stack>
        </Paper>
    )
};

export default Leaderboard;
