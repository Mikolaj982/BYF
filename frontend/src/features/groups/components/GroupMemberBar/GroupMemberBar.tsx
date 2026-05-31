import React from 'react';
import { Avatar, Chip } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import CancelIcon from '@mui/icons-material/Cancel';

type GroupMemberBarProps = {
    username: string;
    onDelete?: () => void;
};

const GroupMemberBar: React.FC<GroupMemberBarProps> = (
    {
        username,
        onDelete
    }
) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'p';
    return (
        <Chip
            avatar={
                <Avatar color='black' sx={{ bgcolor: 'primary.main', fontSize: 10 }}>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
            }
            label={username}
            variant='outlined'
            onDelete={onDelete ? () => { } : undefined}
            deleteIcon={onDelete ? (
                <ConfirmDialog
                    title='Delete user?'
                    description='This action cannot be undone.'
                    onConfirm={onDelete}
                    trigger={<CancelIcon sx={{ color: 'secondary.main' }} />}
                />
            ) : undefined}
        />
    )
};

export default GroupMemberBar;