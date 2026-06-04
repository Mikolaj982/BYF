import React from 'react';
import GroupMemberBar from '../GroupMemberBar/GroupMemberBar';
import { useGroupMembers } from '../../hooks/useGroupMembers';
import { Stack } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';
import { useDeleteGroupMember } from '../../hooks/useDeleteGroupMember';
import { useQueryClient } from '@tanstack/react-query';
import { GroupRole } from '../../types/group.types';
import { useAuth } from '../../../auth/hooks/useAuth';

type GroupMembersProps = {
    groupId: string;
};

const GroupMembers: React.FC<GroupMembersProps> = ({ groupId }) => {
    const { user } = useAuth();
    const { groupMembers, loadingGroupMembers, errorGroupMembers } = useGroupMembers(groupId);
    const { mutate: deleteGroupMember } = useDeleteGroupMember();
    const queryClient = useQueryClient();

    if (loadingGroupMembers) return <LoadingState />;
    if (errorGroupMembers) return <ErrorState error={errorGroupMembers} />;
    if (!groupMembers.length) return <EmptyState message='There is no members yet.' />;

    const groupOwner = groupMembers?.find(member => member.role === GroupRole.Owner);
    const handleDeleteGroupMember = (memberId: string) => {
        deleteGroupMember({ groupId, targetUserId: memberId }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['group_members', groupId] });
                queryClient.invalidateQueries({ queryKey: ['lobbies_members_count'] });
            }
        });
    };

    return (
        <Stack
            direction='row'
            flexWrap='wrap'
            gap={1}
        >
            {groupMembers.map((member) => {
                return <GroupMemberBar
                    role={member.role}
                    username={member.username}
                    onDelete={
                        groupOwner?.id === user?.id && member.id !== groupOwner?.id
                            ? () => handleDeleteGroupMember(member.id)
                            : undefined
                    }
                    key={member.id}
                />
            })}
        </Stack>
    )
};

export default GroupMembers;

