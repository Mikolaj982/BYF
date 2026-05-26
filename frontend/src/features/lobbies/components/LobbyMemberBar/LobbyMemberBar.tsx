import { Avatar, Chip } from '@mui/material';
import React from 'react';

type LobbyMemberBarProps = {
    username: string;
};

const LobbyMemberBar: React.FC<LobbyMemberBarProps> = ({ username }) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'P';
    return (
        <Chip
            avatar={
                <Avatar>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
            }
            label={username}
            variant='outlined'
            sx={{
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