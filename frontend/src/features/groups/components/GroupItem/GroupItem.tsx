import React, { useMemo } from 'react';
import { UserGroup } from '../../types/group.types';
import { deleteGroup } from '../../services/deleteGroup';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { Stack } from '@mui/material';
import GroupMembers from '../GroupMembers/GroupMembers';
import { leaveGroup } from '../../services/leaveGroup';
import GroupHeader from '../GroupHeader/GroupHeader';
import InviteBox from '../InviteBox/InviteBox';
import Lobbies from '../../../lobbies/components/Lobbies/Lobbies';
import { useOutletContext } from 'react-router-dom';
import { DashboardLayoutOutletContext } from '../../../../pages/Dashboard/types/outletContext.types';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';

type GroupItemProps = {
  groupData: UserGroup;
  refetchGroups: () => Promise<void>;
};

const GroupItem: React.FC<GroupItemProps> = ({ groupData, refetchGroups }) => {
  const { id, inviteCode } = groupData;
  const { lobbies, refetchLobbies } = useOutletContext<DashboardLayoutOutletContext>();
  const lobbiesIds: string[] = useMemo(() => {
    return lobbies.map(lobby => lobby.id)
  }, [lobbies]);

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      await refetchGroups();
      toast.success(MESSAGES.SUCCESS.DELETED_GROUP);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    try {
      await leaveGroup(groupId);
      await refetchGroups();
      toast.success(MESSAGES.SUCCESS.LEFT_GROUP);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Stack>
      <GroupHeader
        handleDeleteGroup={handleDeleteGroup}
        groupData={groupData}
        handleLeaveGroup={handleLeaveGroup}
        refetchLobbies={refetchLobbies}
        refetchGroups={refetchGroups}
      />
      <InviteBox inviteCode={inviteCode} />
      <GroupMembers groupId={id} />
      <Lobbies
        lobbies={lobbies}
        lobbiesIds={lobbiesIds}
        groupData={groupData}
      />
    </Stack>
  )
};

export default GroupItem;