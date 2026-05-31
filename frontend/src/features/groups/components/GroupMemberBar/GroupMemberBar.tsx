import React from 'react';
import { Avatar, Chip, Typography } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import CancelIcon from '@mui/icons-material/Cancel';

type GroupMemberBarProps = {
    username: string;
    onDelete?: () => void;
    role: string;
};

const GroupMemberBar: React.FC<GroupMemberBarProps> = (
    {
        username,
        onDelete,
        role
    }
) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'p';
    const isOwner = role === 'owner';
    return (
        <Chip
            avatar={
                <Avatar color='black' sx={{ bgcolor: 'primary.main', fontSize: 10 }}>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
            }
            label={
                <Typography fontSize={{ xs: 12, md: 14 }} fontWeight={600}>
                    {username}
                </Typography>
            }
            variant='outlined'
            onDelete={onDelete ? () => { } : undefined}
            deleteIcon={
                onDelete
                    ? <ConfirmDialog
                        title='Delete user?'
                        description='This action cannot be undone.'
                        onConfirm={onDelete}
                        trigger={
                            <CancelIcon sx={{
                                color: 'text.secondary',
                                opacity: 0.5,
                                height: { xs: '20px', md: '26px' },
                                width: { xs: '20px', md: '26px' }
                            }}
                            />
                        }
                    />
                    : undefined
            }
            sx={{
                borderColor: isOwner ? 'white' : 'text.secondary',
            }}
        />
    )
};

export default GroupMemberBar;