import React from 'react';
import GroupMemberBar from '../GroupMemberBar/GroupMemberBar';
import { useGroupMembers } from '../../hooks/useGroupMembers';
import { Stack } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';

type GroupMembersProps = {
    groupId: string;
};

const GroupMembers: React.FC<GroupMembersProps> = ({ groupId }) => {
    const { groupMembers, loadingGroupMembers, errorGroupMembers } = useGroupMembers(groupId);

    if (loadingGroupMembers) return <LoadingState />;
    if (errorGroupMembers) return <ErrorState error={errorGroupMembers} />;
    if (!groupMembers.length) return <EmptyState message='There is no members yet.' />;

    return (
        <Stack direction='row' spacing={1}>
            {groupMembers.map((member) => (
                <GroupMemberBar
                    username={member.username}
                    role={member.role}
                    key={member.id}
                />
            ))}
        </Stack>
    )
};

export default GroupMembers;

