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

type CreateLobbyFormData = {
    gameType: string;
};

type CreateLobbyFormProps = {
    onSuccess: () => Promise<void>;
    groupData: UserGroup;
    trigger?: React.ReactNode;
};

const CreateLobbyForm: React.FC<CreateLobbyFormProps> = (
    {
        onSuccess,
        groupData,
        trigger
    }
) => {
    const { user } = useAuth();
    const { id: groupId } = groupData;
    const lobby: CreateLobbyFormData = {
        gameType: '',
    };
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
            await onSuccess();
            reset();
            toast.success(MESSAGES.SUCCESS.CREATED_LOBBY);
            setOpen(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
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
                    <Button onClick={() => setOpen(false)} variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(submitLobbyData)} variant='contained'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default CreateLobbyForm;