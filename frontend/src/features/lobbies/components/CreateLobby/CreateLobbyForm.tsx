import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, DialogTitle, TextField, DialogContent, DialogActions, Box } from '@mui/material';
import { createLobby, CreateLobbyData } from '../../services/createLobby';
import { createLobbySchema } from '../../../../utils/createLobbySchema';
import { UserGroup } from '../../../groups/types/group.types';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';

type CreateLobbyFormData = {
    gameType: string;
};

type CreateLobbyFormProps = {
    groupData: UserGroup;
    trigger?: React.ReactNode;
    onIconMenuClose?: () => void;
};

const CreateLobbyForm: React.FC<CreateLobbyFormProps> = (
    {
        groupData,
        trigger,
        onIconMenuClose
    }
) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { id: groupId } = groupData;
    const lobby: CreateLobbyFormData = { gameType: '' };
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: lobby,
        resolver: yupResolver<CreateLobbyFormData>(createLobbySchema),
    });
    const [open, setOpen] = useState<boolean>(false);

    const submitLobbyData = async (lobby: CreateLobbyFormData) => {
        if (!user?.id) return;
        const createLobbyFormDataPlusGroupId: CreateLobbyData = {
            ...lobby,
            owner: user.id,
            groupId: groupId,
        };

        try {
            await createLobby(createLobbyFormDataPlusGroupId);
            queryClient.invalidateQueries({ queryKey: ['lobbies', groupId] })
            toast.success(MESSAGES.SUCCESS.CREATED_LOBBY, { toastId: 'create-lobby-success' });
            setOpen(false);
            reset();
        } catch (error: unknown) {
            toast.error(getErrorMessage(error), { toastId: 'create-lobby-error' });
        };
    };

    return (
        <>
            {trigger
                ? <Box component='span' onClick={() => setOpen(true)}>
                    {trigger}
                </Box>
                : <Button onClick={() => setOpen(true)} variant='outlined'>
                    +Lobby
                </Button>
            }
            <Dialog open={open}>
                <DialogTitle>
                    Create lobby
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        pt: 2
                    }}>
                    <Controller
                        name='gameType'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='name'
                                error={!!errors.gameType}
                                helperText={errors.gameType?.message}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            onIconMenuClose?.();
                        }}
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit((formData) => {
                            submitLobbyData(formData);
                            onIconMenuClose?.();
                        })}
                        variant='contained'
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    )
};

export default CreateLobbyForm;