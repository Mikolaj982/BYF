import React from 'react';
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
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../auth/hooks/useAuth';
import SectionContainer from '../../../../shared/components/SectionContainer/SectionContainer';
import SectionLabel from '../../../../shared/components/SectionLabel/SectionLabel';

type GroupItemProps = {
  groupData: UserGroup;
};

const GroupItem: React.FC<GroupItemProps> = ({ groupData }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id, inviteCode } = groupData;

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      queryClient.invalidateQueries({ queryKey: ['groups', user?.id] });
      navigate('/dashboard');
      toast.success(MESSAGES.SUCCESS.DELETED_GROUP, { toastId: 'delete-group-success' });
    } catch (error) {
      toast.error(getErrorMessage(error), { toastId: 'delete-group-error' });
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    try {
      await leaveGroup(groupId);
      queryClient.invalidateQueries({ queryKey: ['groups', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['group_members', id] });
      navigate('/dashboard');
      toast.success(MESSAGES.SUCCESS.LEFT_GROUP, { toastId: 'leave-group-success' });
    } catch (error) {
      toast.error(getErrorMessage(error), { toastId: 'leave-group-error' });
    }
  };

  return (
    <Stack>
      <GroupHeader
        handleDeleteGroup={handleDeleteGroup}
        groupData={groupData}
        handleLeaveGroup={handleLeaveGroup}
      />
      <SectionContainer>
        <SectionLabel label='invitation code' />
        <InviteBox inviteCode={inviteCode} />
      </SectionContainer>
      <SectionContainer>
        <SectionLabel label='group members' />
        <GroupMembers groupId={id} />
      </SectionContainer>
      <SectionContainer>
        <SectionLabel label='lobbies' />
        <Lobbies groupData={groupData} />
      </SectionContainer>
    </Stack>
  )
};

export default GroupItem;