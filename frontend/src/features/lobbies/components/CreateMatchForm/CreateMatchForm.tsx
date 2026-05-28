import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, DialogContent, TextField, DialogTitle, Dialog, DialogActions, Autocomplete, Chip, Typography, Stack } from '@mui/material';
import { createMatchSchema } from '../../../../utils/createMatchSchema';
import { LobbyMatchData } from '../../types/lobby.types';
import { createMatch } from '../../services/createMatch';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';
import { ErrorState } from '../../../../shared/components/ErrorState/ErrorState';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type CreateMatchFormData = {
    gameName: string;
    players: {
        userId: string;
        score: number;
    }[];
};

const CreateMatchForm: React.FC = () => {
    const { lobbyId } = useParams();
    const queryClient = useQueryClient();
    const { lobbyMembers, loadingLobbyMembers, errorLobbyMembers } = useLobbyMembers(lobbyId ?? '');
    const match: CreateMatchFormData = {
        gameName: '',
        players: [],
    };
    const { handleSubmit, reset, control } = useForm({
        defaultValues: match,
        resolver: yupResolver<CreateMatchFormData>(createMatchSchema),
    });
    const [open, setOpen] = useState<boolean>(false);
    const watchedPlayers = useWatch({ control, name: 'players' });

    const submitMatchData = async (match: CreateMatchFormData) => {
        const createMatchFormDataPlusLobbyId: LobbyMatchData = {
            lobbyId: lobbyId ?? '',
            gameName: match.gameName,
            participants: match.players.map((player) => ({
                user_id: player.userId,
                score: player.score,
            })),
        };

        try {
            await createMatch(createMatchFormDataPlusLobbyId);
            queryClient.invalidateQueries({ queryKey: ['matches', lobbyId] });
            queryClient.invalidateQueries({ queryKey: ['leaderboard', lobbyId] });
            toast.success(MESSAGES.SUCCESS.CREATED_MATCH, { toastId: 'create-match-success' });
            setOpen(false);
            reset();
        } catch (error: unknown) {
            toast.error(getErrorMessage(error), { toastId: 'create-match-error' });
        }
    };

    if (!lobbyId) return <ErrorState error='Invalid route.' />;
    if (loadingLobbyMembers) return <LoadingState />;
    if (errorLobbyMembers) return <ErrorState error={errorLobbyMembers} />;

    return (
        <>
            <Button variant='outlined' onClick={() => setOpen(true)}>
                +MATCH
            </Button>
            <Dialog open={open}>
                <DialogTitle>create match</DialogTitle>
                <DialogContent>
                    <Controller
                        name="gameName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label='Name'
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )} />
                    <Controller
                        name="players"
                        control={control}
                        defaultValue={[]}
                        rules={{ validate: (value) => value.length >= 2 || 'Minimum 2 graczy' }}
                        render={({ field, fieldState }) => (
                            <Autocomplete
                                multiple
                                options={lobbyMembers}
                                getOptionLabel={(option) => option.username}
                                value={lobbyMembers.filter(member =>
                                    field.value.some(player => player.userId === member.userId)
                                )}
                                onChange={(_, selectedMembers) => {
                                    field.onChange(
                                        selectedMembers.map(member => ({
                                            userId: member.userId,
                                            score: 0,
                                        })))
                                }}
                                renderTags={(value, getTagProps) => (
                                    value.map((option, index) => {
                                        const { key, ...tagProps } = getTagProps({ index });
                                        return (
                                            <Chip
                                                key={key}
                                                label={option.username}
                                                {...tagProps} />
                                        )
                                    })
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Participants"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                    />
                    {watchedPlayers.length >= 2 && (
                        <Stack direction='column' gap={1.5}>
                            <Typography variant="caption" color="text.secondary">
                                Wyniki
                            </Typography>
                            {watchedPlayers.map((player, index) => {
                                const name = lobbyMembers.find(m => m.userId === player.userId)?.username ?? 'Unknown';
                                return (
                                    <Controller
                                        key={player.userId}
                                        name={`players.${index}.score`}
                                        control={control}
                                        rules={{ required: true, min: { value: 0, message: 'Min 0' } }}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                                label={name}
                                                type="number"
                                                size="small"
                                                inputProps={{ min: 0 }}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            />
                                        )}
                                    />
                                )
                            })}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit(submitMatchData)}>Create</Button>
                    <Button onClick={() => { setOpen(false) }}>Cancel</Button>
                </DialogActions>
            </Dialog >
        </>
    )
};

export default CreateMatchForm;