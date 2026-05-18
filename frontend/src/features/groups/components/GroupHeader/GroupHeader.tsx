import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import UpdateGroupForm from '../UpdateGroup/UpdateGroupForm';
import CreateLobbyForm from '../../../lobbies/components/CreateLobby/CreateLobbyForm';
import { GroupRole, UserGroup } from '../../types/group.types';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';

type GroupHeaderProps = {
    handleLeaveGroup: (id: string) => void;
    refetchLobbies: () => Promise<void>;
    groupData: UserGroup;
    refetchGroups: () => Promise<void>;
    handleDeleteGroup: (id: string) => void;
};

const GroupHeader: React.FC<GroupHeaderProps> = (
    {
        handleLeaveGroup,
        refetchLobbies,
        groupData,
        refetchGroups,
        handleDeleteGroup
    }
) => {
    const { id, role, name } = groupData;
    return (
        <Stack
            component='div'
            direction='row'
            justifyContent='space-between'
            sx={{ px: 3, py: 3, borderBottom: 1, borderColor: 'divider' }}
        >
            <Typography variant='h6'>
                {name}
            </Typography>
            <Stack direction='row'>
                {
                    role === GroupRole.Member
                        ?
                        (
                            <Button
                                onClick={() => handleLeaveGroup(id)}
                                sx={{ flex: 1 }}
                                variant='outlined'
                            >
                                Leave
                            </Button>
                        )
                        :
                        (
                            <Stack direction='row' spacing={2}>
                                <ConfirmDialog
                                    title='Delete group?'
                                    description='This action cannot be undone.'
                                    onConfirm={() => handleDeleteGroup(id)}
                                />
                                <UpdateGroupForm
                                    onSuccess={refetchGroups}
                                    groupData={groupData}
                                />
                                <CreateLobbyForm
                                    onSuccess={refetchLobbies}
                                    groupData={groupData}
                                />
                            </Stack>
                        )}
            </Stack>
        </Stack>
    )
};

export default GroupHeader;