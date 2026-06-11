import React from 'react';
import { UserGroup } from '../../../types/group.types';
import ConfirmDialog from '../../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { GroupRole } from '../../../types/group.types';
import { MenuItem, Typography } from '@mui/material';
import UpdateGroupForm from '../../UpdateGroup/UpdateGroupForm';
import CreateLobbyForm from '../../../../lobbies/components/CreateLobby/CreateLobbyForm';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
                        <CreateLobbyForm
                            groupData={groupData}
                            trigger={
                                <MenuItem
                                    sx={{
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                        minWidth: 180,
                                        gap: 2,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    <AddIcon fontSize='small' />
                                    <Typography fontWeight={500}>
                                        CREATE LOBBY
                                    </Typography>
                                </MenuItem>
                            }
                            onIconMenuClose={onClose}
                        />
                        <ConfirmDialog
                            title='Leave group?'
                            description='You will be missed.'
                            onConfirm={() => handleLeaveGroup(groupData.id)}
                            trigger={
                                <MenuItem
                                    sx={{
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                        minWidth: 180,
                                        gap: 2,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    <ExitToAppIcon fontSize='small' />
                                    <Typography fontWeight={500}>
                                        LEAVE GROUP
                                    </Typography>
                                </MenuItem>
                            }
                            onIconMenuClose={onClose}
                        />
                    </>
                )
                : (
                    <>
                        <UpdateGroupForm
                            groupData={groupData}
                            trigger={
                                <MenuItem
                                    sx={{
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                        minWidth: 180,
                                        gap: 2,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    <EditIcon fontSize='small' />
                                    <Typography fontWeight={500}>
                                        EDIT GROUP
                                    </Typography>
                                </MenuItem>
                            }
                            onIconMenuClose={onClose}
                        />
                        <CreateLobbyForm
                            groupData={groupData}
                            trigger={
                                <MenuItem
                                    sx={{
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                        minWidth: 180,
                                        gap: 2,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    <AddIcon fontSize='small' />
                                    <Typography fontWeight={500}>
                                        CREATE LOBBY
                                    </Typography>
                                </MenuItem>
                            }
                            onIconMenuClose={onClose}
                        />
                        <ConfirmDialog
                            title='Delete group?'
                            description='This action cannot be undone.'
                            onConfirm={() => handleDeleteGroup(groupData.id)}
                            trigger={
                                <MenuItem
                                    sx={{
                                        bgcolor: 'background.default',
                                        border: '1px solid',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        overflow: 'hidden',
                                        minWidth: 180,
                                        gap: 2,
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    <DeleteIcon fontSize='small' />
                                    <Typography fontWeight={500}>
                                        DELETE GROUP
                                    </Typography>
                                </MenuItem>
                            }
                            onIconMenuClose={onClose}
                        />
                    </>
                )}
        </>
    )
};

export default GroupMenuItems;