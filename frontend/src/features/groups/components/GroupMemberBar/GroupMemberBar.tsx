import React from 'react';
import { GroupMemberBarProps } from '../../types/group.types';
import { Avatar, Chip } from '@mui/material';

const GroupMemberBar: React.FC<GroupMemberBarProps> = ({ username }) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'p';
    return (
        <Chip
            avatar={<Avatar color='black' sx={{ bgcolor: 'primary.main', fontSize: 10 }}>{usernameFirstLetter.toUpperCase()}</Avatar>}
            label={username}
            variant='outlined'
        />
    );
};

export default GroupMemberBar;