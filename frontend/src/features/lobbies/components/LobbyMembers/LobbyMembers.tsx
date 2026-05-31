import React from 'react';
import LobbyMemberBarProps from '../LobbyMemberBar/LobbyMemberBar';
import { Stack } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useDeleteLobbyMember } from '../../hooks/useDeleteLobbyMember';
import { useQueryClient } from '@tanstack/react-query';

type LobbyMembersProps = {
    createdBy: string;
};

const LobbyMembers: React.FC<LobbyMembersProps> = ({ createdBy }) => {
    const { user } = useAuth();
    const { lobbyId } = useParams();
    const { lobbyMembers, loadingLobbyMembers, errorLobbyMembers } = useLobbyMembers(lobbyId ?? '');
    const { mutate: deleteLobbyMember } = useDeleteLobbyMember();
    const queryClient = useQueryClient();

    if (!lobbyId) return <ErrorState error='Invalid route' />;
    if (loadingLobbyMembers) return <LoadingState />;
    if (errorLobbyMembers) return <ErrorState error={errorLobbyMembers} />;
    if (!lobbyMembers.length) return <EmptyState message='No lobby members yet.' />;

    const handleDeleteLobbyMember = (memberId: string) => {
        deleteLobbyMember({ lobbyId, targetUserId: memberId }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['lobby_members', lobbyId] });
            }
        });
    };

    return (
        <Stack
            direction='row'
            flexWrap='wrap'
            gap={1}
        >
            {lobbyMembers.map((member) => {
                const isOwner = createdBy === member.userId;
                return <LobbyMemberBarProps
                    username={member.username}
                    onDelete={
                        !isOwner && user?.id !== member.userId
                            ? () => handleDeleteLobbyMember(member.userId)
                            : undefined
                    }
                    key={member.userId}
                />
            })}
        </Stack>
    )
};

export default LobbyMembers;