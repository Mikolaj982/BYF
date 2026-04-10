import React from 'react';
import { GroupMemberBarProps } from '../../pages/Dashboard/types/group.types';

const GroupMemberBar: React.FC<GroupMemberBarProps> = ({ username, role }) => {
    return (
        <li className='rounded-lg text-richBlack bg-coolGray py-2 px-3 mt-2 text-center w-full font-medium hover:bg-slate-500 hover:cursor-pointer'>
            <p>nickname: {username}</p>
            <p>rola: {role}</p>
        </li>
    );
};

export default GroupMemberBar;