import React from 'react';
import LobbyMemberBarProps from '../LobbyMemberBar/LobbyMemberBar';
import { LobbyMember } from '../../types/lobby.types';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';

type LobbyMembersProps = {
    members: LobbyMember[];
    loading: boolean;
    error: unknown;
};

const LobbyMembers: React.FC<LobbyMembersProps> = ({ members, loading, error }) => {

    return (
        <Stack padding={3} spacing={1}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                LOBBY MEMBERS
            </Typography>
            {
                loading
                    ? <LoadingState />
                    : error
                        ? <ErrorState error={error} />
                        : (!members.length)
                            ? <EmptyState message='No lobby members yet.' />
                            : (
                                <Stack direction='row' spacing={1}>
                                    {
                                        members.map((member) => (
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