import React from 'react';
import LobbyMemberBarProps from '../LobbyMemberBar/LobbyMemberBar';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { useParams } from 'react-router-dom';

const LobbyMembers: React.FC = () => {
    const { lobbyId } = useParams();
    const { lobbyMembers, loadingLobbyMembers, errorLobbyMembers } = useLobbyMembers(lobbyId ?? '');

    return (
        <Stack padding={3} spacing={1}>
            <Typography fontSize={14} color='text.secondary'>
                LOBBY MEMBERS
            </Typography>
            {loadingLobbyMembers
                ? <LoadingState />
                : errorLobbyMembers
                    ? <ErrorState error={errorLobbyMembers} />
                    : (!lobbyMembers?.length)
                        ? <EmptyState message='No lobby members yet.' />
                        : (
                            <Stack
                                direction='row'
                                flexWrap='wrap'
                                gap={1}
                            >
                                {
                                    lobbyMembers.map((member) => (
                                        <LobbyMemberBarProps
                                            username={member.username}
                                            key={member.userId}
                                        />
                                    ))
                                }
                            </Stack>
                        )
            }
        </Stack>
    )
};

export default LobbyMembers;