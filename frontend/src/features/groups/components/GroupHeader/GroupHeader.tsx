import React from 'react';
import { IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import UpdateGroupForm from '../UpdateGroup/UpdateGroupForm';
import CreateLobbyForm from '../../../lobbies/components/CreateLobby/CreateLobbyForm';
import { GroupRole, UserGroup } from '../../types/group.types';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import { useOutletContext } from 'react-router-dom';
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import MenuIcon from '@mui/icons-material/Menu';
import IconMenuMobile from '../../../../shared/components/IconMenuMobile/IconMenuMobile';
import GroupMenuItems from './GroupMenuItems/GroupMenuItems';

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
    const { onOpenSidebar } = useOutletContext<DashboardLayoutOutletContext>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id, role, name } = groupData;

    return (
        <Stack
            component='div'
            direction='row'
            justifyContent='space-between'
            sx={{
                py: { xs: 1, md: 3 },
                px: { xs: 1, md: 3 },
                borderBottom: 1,
                borderColor: 'divider',
                flexWrap: 'wrap',
                overflow: 'hidden'
            }}
        >
            {isMobile
                ? (
                    <Stack direction='row' justifyContent='space-between' width='100%'>
                        <IconButton
                            onClick={onOpenSidebar}
                            sx={{ mr: 0 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography alignContent='center'>{name}</Typography>
                        <IconMenuMobile>
                            <GroupMenuItems
                                groupData={groupData}
                                refetchGroups={refetchGroups}
                                refetchLobbies={refetchLobbies}
                                handleDeleteGroup={handleDeleteGroup}
                                handleLeaveGroup={handleLeaveGroup}
                            />
                        </IconMenuMobile>
                    </Stack>
                )
                : (
                    <>
                        <Typography alignContent='center'>{name}</Typography>
                        <Stack direction='row' >
                            {
                                role === GroupRole.Member
                                    ? (
                                        <ConfirmDialog
                                            title='Leave group?'
                                            description='You will be missed.'
                                            onConfirm={() => handleLeaveGroup(id)}
                                            label='leave'
                                        />
                                    )
                                    : (
                                        <Stack direction='row' spacing={{ xs: 1, md: 2 }}>
                                            <ConfirmDialog
                                                title='Delete group?'
                                                description='This action cannot be undone.'
                                                onConfirm={() => handleDeleteGroup(id)}
                                                label='delete'
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
                                    )
                            }
                        </Stack>
                    </>
                )}
        </Stack >
    )
};

export default GroupHeader;