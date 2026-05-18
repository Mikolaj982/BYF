import React from 'react';
import { Avatar, Chip, Stack, Typography } from '@mui/material';
import { getMedal } from '../../../../../../../utils/podiumUtils';
import { Player } from '../../../../../types/lobby.types';

type MatchPlayerProps = {
    playerData: Player & { place: number };
};

const MatchPlayer: React.FC<MatchPlayerProps> = ({ playerData }) => {
    const usernameFirstLetter: string = playerData.username.split('')[0] ?? 'p';
    const medal = getMedal(playerData.place);

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
                        {playerData.username}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {playerData.score}
                    </Typography>
                </Stack>
            }
            variant='outlined'
            sx={{
                borderColor: medal ? `${medal?.color}` : '#2A2A2A',
                borderRadius: 6,
                transition: '0.2s ease',
                backgroundColor: medal ? `${medal?.color}15` : '#1e1e1e',

                '&:hover': {
                    borderColor: medal ? null : '#707070',
                },
            }}
        />
    )
};

export default MatchPlayer;