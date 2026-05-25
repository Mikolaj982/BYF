import React from 'react';
import { UserGroup } from '../../../types/group.types';
import ConfirmDialog from '../../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { GroupRole } from '../../../types/group.types';
import { MenuItem } from '@mui/material';
import UpdateGroupForm from '../../UpdateGroup/UpdateGroupForm';
import CreateLobbyForm from '../../../../lobbies/components/CreateLobby/CreateLobbyForm';

type GroupMenuItemsProps = {
    handleLeaveGroup: (id: string) => void;
    handleDeleteGroup: (id: string) => void;
    refetchGroups: () => Promise<void>;
    refetchLobbies: () => Promise<void>;
    groupData: UserGroup;
};

const GroupMenuItems: React.FC<GroupMenuItemsProps> = (
    {
        handleLeaveGroup,
        handleDeleteGroup,
        refetchGroups,
        refetchLobbies,
        groupData
    }
) => {
    return (
        <>
            {groupData.role === GroupRole.Member
                ? (
                    <ConfirmDialog
                        title='Leave group?'
                        description='You will be missed.'
                        onConfirm={() => handleLeaveGroup(groupData.id)}
                        label='leave'
                        trigger={<MenuItem sx={{ justifyContent: 'center' }}>leave</MenuItem>}
                    />
                )
                : (
                    <>
                        <ConfirmDialog
                            title='Delete group?'
                            description='This action cannot be undone.'
                            onConfirm={() => handleDeleteGroup(groupData.id)}
                            label='delete'
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>delete</MenuItem>}
                        />
                        <UpdateGroupForm
                            onSuccess={refetchGroups}
                            groupData={groupData}
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>update</MenuItem>}
                        />
                        <CreateLobbyForm
                            onSuccess={refetchLobbies}
                            groupData={groupData}
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>create</MenuItem>}
                        />
                    </>
                )}
        </>
    )
};

export default GroupMenuItems;