import React from 'react';
import LobbyMemberBar from '../LobbyMemberBar/LobbyMemberBar';
import { LobbyMemberWithUsername } from '../../types/lobby.types';
import { CircularProgress, Stack, Typography } from '@mui/material';

type LobbyMembersProps = {
    members: LobbyMemberWithUsername[],
    loading: boolean,
    error: string | null,
}

const LobbyMembers: React.FC<LobbyMembersProps> = ({ members, loading, error }) => {

    return (
        <Stack padding={3} spacing={1}>
            <Typography sx={{
                fontSize: 14,
                color: 'text.secondary'
            }}
            >
                LOBBY MEMBERS
            </Typography>
            {
                loading
                    ?
                    <CircularProgress
                        size={20}
                        sx={{ m: 1 }}
                    />
                    :
                    (
                        (members.length === 0)
                            ?
                            <Typography>List is empty</Typography>
                            :
                            (
                                <Stack
                                    direction='row'
                                    spacing={1}
                                >
                                    {members.map((member) => (
                                        <LobbyMemberBar
                                            username={member.username}
                                            key={member.userId}
                                        />
                                    ))}
                                </Stack>
                            )
                    )
            }
            {error && <p>{error}</p>}
        </Stack>
    )
};

export default LobbyMembers;