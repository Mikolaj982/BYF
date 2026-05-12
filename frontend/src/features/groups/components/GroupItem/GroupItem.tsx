import React from 'react';
import { UserGroup } from '../../types/group.types';
import { deleteGroup } from '../../services/deleteGroup';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useGroupLobbies } from '../../../lobbies/hooks/useGroupLobbies';
import { Stack } from '@mui/material';
import GroupMembers from '../GroupMembers/GroupMembers';
import { leaveGroup } from '../../services/leaveGroup';
import { useNavigate } from 'react-router-dom';
import GroupHeader from '../GroupHeader/GroupHeader';
import InviteBox from '../InviteBox/InviteBox';
import Lobbies from '../../../lobbies/components/Lobbies/Lobbies';

const GroupItem: React.FC<{ groupData: UserGroup, refetchGroups: () => Promise<void> }> = ({ groupData, refetchGroups }) => {
  const { id, invite_code } = groupData;
  const { lobbies, refetchLobbies } = useGroupLobbies(id);
  const navigate = useNavigate();

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      await refetchGroups();
      toast.success(MESSAGES.SUCCESS.DELETED_GROUP)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(MESSAGES.ERROR.UNKNOWN);
      }
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    if (!window.confirm('Jesteś pewien?')) return;
    try {
      await leaveGroup(groupId);
      await refetchGroups();
      toast.success(MESSAGES.SUCCESS.LEFT_GROUP);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(MESSAGES.ERROR.UNKNOWN)
      }
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
      <InviteBox inviteCode={invite_code} />
      <GroupMembers groupId={id} />
      <Lobbies lobbies={lobbies} />
    </Stack>
  )
}

export default GroupItem;