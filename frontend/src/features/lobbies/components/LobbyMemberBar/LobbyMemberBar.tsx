import { Avatar, Chip } from '@mui/material';
import React from 'react';

type LobbyMemberBar = {
    username: string
}

const LobbyMemberBar: React.FC<LobbyMemberBar> = ({ username }) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'p';
    return (
        <Chip
            avatar={
                <Avatar
                    color='black'
                    sx={{
                        bgcolor: 'primary.main',
                        fontSize: 10
                    }}>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
            }
            label={username}
            variant='outlined'
        />
    );
};

export default LobbyMemberBar;