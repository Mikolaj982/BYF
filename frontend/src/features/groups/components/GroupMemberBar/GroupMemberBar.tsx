import React from 'react';
import { Avatar, Chip, Typography } from '@mui/material';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import CloseIcon from '@mui/icons-material/Close';

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
    const usernameFirstLetter: string = username.split('')[0] ?? 'P';
    const isOwner = role === 'owner';
    return (
        <Chip
            avatar={<Avatar>{usernameFirstLetter.toUpperCase()}</Avatar>}
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
                            <CloseIcon sx={{
                                color: 'primary.main',
                                opacity: 0.7,
                                height: { xs: '16px', md: '20px' },
                                width: { xs: '16px', md: '20px' },
                                marginRight: '4px',
                                '@media (hover: hover)': {
                                    '&:hover': {
                                        color: 'secondary.main',
                                        cursor: 'pointer'
                                    },
                                }
                            }} />
                        }
                    />
                    : undefined
            }
            sx={{
                borderColor: isOwner ? 'text.primary' : 'text.secondary',
                height: { xs: '26px', md: '34px' },
                '& .MuiChip-avatar': {
                    height: { xs: '20px', md: '26px' },
                    width: { xs: '20px', md: '26px' },
                    fontSize: '10px',
                    backgroundColor: 'primary.main',
                    marginRight: 0,
                    marginLeft: { xs: '3px', md: '4px' },
                    color: 'background.default'
                },
                '& .MuiChip-label': {
                    padding: { xs: 0.7, md: 1 },
                },
            }}
        />
    )
};

export default GroupMemberBar;