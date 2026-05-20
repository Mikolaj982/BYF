import React from 'react';
import { Divider, Paper, Stack } from '@mui/material';
import { Match } from '../../../types/lobby.types';
import MatchPlayersScores from './MatchPlayersScore/MatchPlayersScores';
import MatchInfo from './MatchInfo/MatchInfo';
import ConfirmDialog from '../../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { useAuth } from '../../../../auth/hooks/useAuth';

type MatchCardProps = {
    match: Match;
    onDelete: (id: string) => Promise<void>;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, onDelete }) => {
    const { user } = useAuth();
    const { players, createdAt, owner, matchId, gameName } = match;
    const isOwner = owner === user!.id;
    const playersCount = match.players.length;

    return (
        <Paper
            variant='outlined'
            sx={{
                p: 2,
                transition: '0.2s ease',
                '&:hover': {
                    borderColor: 'secondary.main',
                    boxShadow: 4,
                },
            }}
        >
            <Stack
                direction='row'
                alignItems='center'
                spacing={3}
            >
                <MatchInfo
                    gameName={gameName}
                    createdAt={createdAt}
                    playersCount={playersCount}
                />
                <Divider
                    sx={{ borderColor: 'divider', borderRightWidth: 2 }}
                    orientation='vertical'
                    flexItem

                />
                <MatchPlayersScores players={players} />
                {
                    isOwner && (
                        <Stack
                            direction='row'
                            spacing={2}
                            sx={{ ml: 'auto !important' }}
                        >
                            <ConfirmDialog
                                title='Delete match?'
                                description='This action cannot be undone.'
                                onConfirm={() => onDelete(matchId)}
                            />
                        </Stack>
                    )
                }
            </Stack>
        </Paper>
    )
};

export default MatchCard;