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
    groupData: UserGroup;
    onClose?: () => void;
};

const GroupMenuItems: React.FC<GroupMenuItemsProps> = (
    {
        handleLeaveGroup,
        handleDeleteGroup,
        groupData,
        onClose
    }
) => {
    return (
        <>
            {groupData.role === GroupRole.Member
                ? (
                    <>
                        <ConfirmDialog
                            title='Leave group?'
                            description='You will be missed.'
                            onConfirm={() => handleLeaveGroup(groupData.id)}
                            label='leave'
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>LEAVE GROUP</MenuItem>}
                            onIconMenuClose={onClose}
                        />
                        <CreateLobbyForm
                            groupData={groupData}
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>CREATE LOBBY</MenuItem>}
                            onIconMenuClose={onClose}
                        />
                    </>
                )
                : (
                    <>
                        <ConfirmDialog
                            title='Delete group?'
                            description='This action cannot be undone.'
                            onConfirm={() => handleDeleteGroup(groupData.id)}
                            label='delete'
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>DELETE GROUP</MenuItem>}
                            onIconMenuClose={onClose}
                        />
                        <UpdateGroupForm
                            groupData={groupData}
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>UPDATE GROUP</MenuItem>}
                            onIconMenuClose={onClose}
                        />
                        <CreateLobbyForm
                            groupData={groupData}
                            trigger={<MenuItem sx={{ justifyContent: 'center' }}>CREATE LOBBY</MenuItem>}
                            onIconMenuClose={onClose}
                        />
                    </>
                )}
        </>
    )
};

export default GroupMenuItems;