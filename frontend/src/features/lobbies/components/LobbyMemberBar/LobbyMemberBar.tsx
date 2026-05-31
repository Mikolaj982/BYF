import { Avatar, Chip, Typography } from '@mui/material';
import React from 'react';
import ConfirmDialog from '../../../../shared/components/ConfirmDialog/ConfirmDialog';
import CancelIcon from '@mui/icons-material/Cancel';

type LobbyMemberBarProps = {
    username: string;
    onDelete?: () => void;
    isOwner: boolean;
};

const LobbyMemberBar: React.FC<LobbyMemberBarProps> = (
    {
        username,
        onDelete,
        isOwner
    }
) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'P';
    return (
        <Chip
            avatar={
                <Avatar>
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
                        title='Delete lobby member?'
                        description='This action cannot be undone.'
                        onConfirm={onDelete}
                        trigger={
                            <CancelIcon
                                sx={{
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
                fontWeight: 500,
                height: { xs: '26px', md: '34px' },
                '& .MuiChip-avatar': {
                    height: { xs: '20px', md: '26px' },
                    width: { xs: '20px', md: '26px' },
                    fontSize: { xs: '8px', md: '10px' },
                    bgcolor: 'text.secondary',
                    marginRight: 0,
                    marginLeft: { xs: '3px', md: '4px' }
                },
                '& .MuiChip-label': {
                    padding: { xs: 0.7, md: 1 },
                },
            }}
        />
    )
};

export default LobbyMemberBar;