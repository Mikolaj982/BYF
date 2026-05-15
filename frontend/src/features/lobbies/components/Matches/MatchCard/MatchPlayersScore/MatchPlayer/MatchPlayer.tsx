import React from 'react'
import { Avatar, Chip, Stack, Typography } from '@mui/material'

type MatchPlayerProps = {
    username: string,
    score: number,
}

const MatchPlayer: React.FC<MatchPlayerProps> = ({ username, score }) => {
    const usernameFirstLetter: string = username.split('')[0] ?? 'p';

    return (
        <Chip
            avatar={
                <Avatar
                    color='black'
                    sx={{
                        bgcolor: 'text.secondary',
                        fontSize: 10,
                        mr: '0px !important',
                    }}
                >
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
            }
            label={
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Typography sx={{ fontSize: 12, color: '#707070' }}>
                        {username}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {score}
                    </Typography>
                </Stack>
            }
            variant='outlined'
            sx={{
                borderColor: '#2A2A2A',
                borderWidth: 2,
                borderRadius: 6,
                transition: '0.2s ease',
                '&:hover': {
                    borderColor: '#707070',
                },
            }}
        />
    )
}

export default MatchPlayer