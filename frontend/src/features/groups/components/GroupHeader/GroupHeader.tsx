import React from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import UpdateGroupForm from '../UpdateGroup/UpdateGroupForm';
import CreateLobbyForm from '../../../lobbies/components/CreateLobby/CreateLobbyForm';
import { GroupRole, UserGroup } from '../../types/group.types';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import IconMenuMobile from '../../../../shared/components/IconMenuMobile/IconMenuMobile';
import GroupMenuItems from './GroupMenuItems/GroupMenuItems';
import MobileHeader from '../../../../shared/components/MobileHeader/MobileHeader';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import DesktopHeader from '../../../../shared/components/DesktopHeader/DesktopHeader';

type GroupHeaderProps = {
    handleLeaveGroup: (id: string) => void;
    groupData: UserGroup;
    handleDeleteGroup: (id: string) => void;
};

const GroupHeader: React.FC<GroupHeaderProps> = (
    {
        handleLeaveGroup,
        groupData,
        handleDeleteGroup
    }
) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { id, role, name } = groupData;
    const { onOpenSidebar } = useOutletContext<DashboardOutletContext>();

    return (
        <>{isMobile
            ? (
                <MobileHeader
                    title={name}
                    onOpenSidebar={onOpenSidebar}
                    rightContent={
                        <IconMenuMobile>
                            <GroupMenuItems
                                groupData={groupData}
                                handleDeleteGroup={handleDeleteGroup}
                                handleLeaveGroup={handleLeaveGroup}
                            />
                        </IconMenuMobile>
                    }
                />
            )
            : (
                <DesktopHeader
                    title={name}
                    rightContent={
                        <Stack direction='row' >
                            {role === GroupRole.Member
                                ? (
                                    <Stack direction='row' spacing={{ xs: 1, md: 2 }}>
                                        <CreateLobbyForm groupData={groupData} />
                                        <ConfirmDialog
                                            title='Leave group?'
                                            description='You will be missed.'
                                            onConfirm={() => handleLeaveGroup(id)}
                                            label='leave'
                                        />
                                    </Stack>
                                ) : (
                                    <Stack direction='row' spacing={{ xs: 1, md: 2 }}>
                                        <UpdateGroupForm groupData={groupData} />
                                        <CreateLobbyForm groupData={groupData} />
                                        <ConfirmDialog
                                            title='Delete group?'
                                            description='This action cannot be undone.'
                                            onConfirm={() => handleDeleteGroup(id)}
                                            label='delete'
                                        />
                                    </Stack>
                                )
                            }
                        </Stack>
                    }
                />
            )}
        </>
    )
};

export default GroupHeader;