import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { createGroup } from '../../services/createGroup';
import { useAuth } from '../../../auth/hooks/useAuth';
import { createGroupSchema } from '../../../../utils/createGroupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, DialogContent, Dialog, DialogTitle, DialogActions, TextField } from '@mui/material';
import { CreateGroupSubmitData } from '../../types/group.types';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';

type CreateGroupFormData = {
    name: string;
    description: string;
};

const CreateGroupForm: React.FC = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const group: CreateGroupFormData = {
        name: '',
        description: '',
    };
    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateGroupFormData>({
        defaultValues: group,
        resolver: yupResolver<CreateGroupFormData>(createGroupSchema),
    });

    const [open, setOpen] = useState<boolean>(false);

    const submitGroupData = async (group: CreateGroupFormData) => {
        if (!user?.id) return;

        const createGroupDataPlusOwnerId: CreateGroupSubmitData = {
            ...group,
            owner: user.id,
        };

        try {
            await createGroup(createGroupDataPlusOwnerId);
            queryClient.invalidateQueries({ queryKey: ['groups', user?.id] })
            toast.success(MESSAGES.SUCCESS.CREATED_GROUP);
            setOpen(false);
            reset();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return <>
        <Button
            onClick={() => setOpen(true)}
            sx={{ flex: 1 }}
            variant='outlined'
        >
            +Create
        </Button>
        <Dialog open={open}>
            <DialogTitle>Create group</DialogTitle>
            <DialogContent>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='name'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='description'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant='outlined'>Cancel</Button>
                <Button onClick={handleSubmit(submitGroupData)} variant='contained'>Submit</Button>
            </DialogActions>
        </Dialog>
    </>
};

export default CreateGroupForm;
