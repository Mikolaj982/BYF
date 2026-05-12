import React from 'react';
import GroupMemberBar from '../GroupMemberBar/GroupMemberBar';
import { useGroupMembers } from '../../hooks/useGroupMembers';
import { CircularProgress, List, Stack, Typography } from '@mui/material';

type GroupMembersProps = {
    groupId: string
}

const GroupMembers: React.FC<GroupMembersProps> = ({ groupId }) => {
    const { groupMembers, loading, error } = useGroupMembers(groupId);
    return (
        <Stack padding={3} spacing={1}>
            <Typography sx={{
                fontSize: 14,
                color: 'text.secondary'
            }}
            >
                MEMBERS
            </Typography>
            {
                loading
                    ?
                    <CircularProgress size={20} sx={{ m: 1 }} />
                    :
                    (
                        (groupMembers.length === 0)
                            ?
                            <Typography>List is empty</Typography>
                            :
                            (
                                <Stack direction='row' spacing={1}>
                                    {groupMembers.map((member) => (
                                        <GroupMemberBar username={member.username} role={member.role} key={member.id} />
                                    ))}
                                </Stack>
                            )
                    )
            }
            {error && <p>{error}</p>}
        </Stack>
    )
}

export default GroupMembers

