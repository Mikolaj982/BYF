import React from 'react';
import GroupMemberBar from '../GroupMemberBar/GroupMemberBar';
import { useGroupMembers } from '../../hooks/useGroupMembers';

const GroupMembers: React.FC<{ groupId: string }> = ({ groupId }) => {
    const { groupMembers, loading, error } = useGroupMembers(groupId);
    return (
        <div className='bg-slate-600 p-[10px]'>
            <h3>Uczestnicy grupy:</h3>
            {
                loading ?
                    <p>Loading...</p>
                    :
                    (groupMembers.length === 0) ?
                        <p>lista jest pusta</p>
                        :
                        (
                            <ul>
                                {groupMembers.map((member) => (
                                    <GroupMemberBar username={member.username} role={member.role} key={member.id} />
                                ))}
                            </ul>
                        )
            }
            {error && <p>{error}</p>}
        </div>
    )
}

export default GroupMembers

