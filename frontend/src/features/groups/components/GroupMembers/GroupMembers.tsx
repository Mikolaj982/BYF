import React from 'react';
import GroupMemberBar from '../GroupMemberBar/GroupMemberBar';
import { useGroupMembers } from '../../hooks/useGroupMembers';
import { Stack, Typography } from '@mui/material';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import EmptyState from '../../../../shared/components/EmptyState/EmptyState';

type GroupMembersProps = {
    groupId: string;
};

const GroupMembers: React.FC<GroupMembersProps> = ({ groupId }) => {
    const { groupMembers, loading, error } = useGroupMembers(groupId);

    return (
        <Stack padding={3} spacing={1}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                MEMBERS
            </Typography>
            <Stack direction='row' spacing={1}>
                {
                    loading
                        ? <LoadingState />
                        : error
                            ? <ErrorState error={error} />
                            : (!groupMembers.length)
                                ? <EmptyState message='There is no members yet.' />
                                : (
                                    groupMembers.map((member) => (
                                        <GroupMemberBar
                                            username={member.username}
                                            role={member.role}
                                            key={member.id}
                                        />
                                    ))
                                )
                }
            </Stack>
        </Stack>
    )
};

export default GroupMembers;

