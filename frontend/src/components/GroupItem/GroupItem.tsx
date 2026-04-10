import React from 'react';
import { UserGroup } from '../../pages/Dashboard/types/group.types';
import UpdateGroupForm from '../UpdateGroup/UpdateGroupForm';
import CreateLobbyForm from '../CreateLobby/CreateLobbyForm';
import Lobbies from '../Lobbies/Lobbies';
import { deleteGroup } from '../../services/deleteGroup';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import { useGroupLobbies } from '../../hooks/useGroupLobbies';
import { Button, TextField } from '@mui/material';
import GroupMembers from '../GroupMembers/GroupMembers';

const GroupItem: React.FC<{ groupData: UserGroup, refetchGroups: () => Promise<void> }> = ({ groupData, refetchGroups }) => {

  const { id, name, description, role, invite_code } = groupData;
  const { lobbies, refetchLobbies } = useGroupLobbies(id);

  const handleDeleteGroup = async (groupId: string) => {
    if (!window.confirm('Jesteś pewien?')) return;
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

  return (
    <li>
      <h3>{name}</h3>
      <p>{description}</p>
      <TextField
        value={invite_code}
        InputProps={{ readOnly: true }}
      />
      <Button onClick={() => navigator.clipboard.writeText(invite_code)}>
        Copy code
      </Button>
      {role === 'owner' && (
        <div>
          <button onClick={() => handleDeleteGroup(id)}>delete</button>
          <UpdateGroupForm onSuccess={refetchGroups} groupData={groupData} />
          <CreateLobbyForm onSuccess={refetchLobbies} groupData={groupData} />
        </div>
      )}
      <GroupMembers groupId={id} />
      <Lobbies lobbies={lobbies} />
    </li>
  )
}

export default GroupItem;