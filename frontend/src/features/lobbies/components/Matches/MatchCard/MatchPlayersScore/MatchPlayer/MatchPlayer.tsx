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
    const winner = playerData.place === 1;

    return (
        <Chip
            avatar={
                <Avatar>
                    {usernameFirstLetter.toUpperCase()}
                </Avatar>
            }
            label={
                <Stack
                    direction="row"
                    spacing={{ xs: 0.5, md: 1 }}
                    alignItems="center"
                    paddingX={{ xs: 0, md: 0.5 }}
                    paddingRight={{ xs: 0.5, md: undefined }}
                >
                    <Typography
                        fontSize={{ xs: 10, md: 12 }}
                        color={winner ? 'text.primary' : '#707070'}
                        fontWeight='600'
                    >
                        {playerData.username}
                    </Typography>
                    <Typography
                        fontSize={{ xs: 10, md: 12 }}
                        color={winner ? '#E67E22' : '#414243'}
                        fontWeight='600'
                    >
                        {playerData.score}
                    </Typography>
                </Stack>
            }
            variant='outlined'
            sx={{
                height: { xs: '26px', md: '34px' },
                borderColor: medal ? `${medal?.color}` : '#2A2A2A',
                borderRadius: 6,
                transition: '0.2s ease',
                backgroundColor: medal ? `${medal?.color}15` : '#1e1e1e',
                '@media (hover: hover)': {
                    '&:hover': {
                        borderColor: medal ? null : '#707070',
                    },
                },
                '& .MuiChip-label': {
                    padding: { xs: 0.6, md: undefined },
                },
                '& .MuiChip-avatar': {
                    height: { xs: '20px', md: '26px' },
                    width: { xs: '20px', md: '26px' },
                    fontSize: { xs: '8px', md: '10px' },
                    bgcolor: 'text.secondary',
                    marginRight: 0,
                    marginLeft: { xs: '3px', md: '4px' }
                },
            }}
        />
    )
};

export default MatchPlayer;