import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { createGroup } from '../../services/createGroup';
import { useAuth } from '../../../auth/useAuth';
import { createGroupSchema } from '../../../../utils/createGroupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, DialogContent, Dialog, DialogTitle, DialogActions, TextField } from '@mui/material';
import { CreateGroupSubmitData } from '../../types/group.types';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';

type CreateGroupFormData = {
    name: string;
    description: string;
};

type CreateGroupFormProps = {
    onSuccess: () => Promise<void>;
};

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSuccess }) => {
    const { user } = useAuth();
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
            await onSuccess();
            toast.success(MESSAGES.SUCCESS.CREATED_GROUP);
            setOpen(false);
            reset();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return <>
        <Button onClick={() => setOpen(true)} sx={{ flex: 1 }} variant='outlined'>+Create</Button>
        <Dialog open={open}>
            <DialogTitle>Create group</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
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
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit(submitGroupData)} variant='contained'>Submit</Button>
            </DialogActions>
        </Dialog>
    </>
};

export default CreateGroupForm;
