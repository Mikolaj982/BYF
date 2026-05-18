import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useAuth } from '../../../auth/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';
import { updateGroupSchema } from '../../../../utils/updateGroupSchema';
import { updateGroup } from '../../services/updateGroup';
import { UserGroup } from '../../types/group.types';
import { UpdateGroupFormData } from '../../types/group.types';

type UpdateGroupFormProps = {
    onSuccess: () => Promise<void>;
    groupData: UserGroup;
};

const UpdateGroupForm: React.FC<UpdateGroupFormProps> = ({ onSuccess, groupData }) => {
    const { user } = useAuth();
    const updateFormValues: UpdateGroupFormData = {
        name: groupData.name,
        description: groupData.description
    };
    const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdateGroupFormData>({
        defaultValues: updateFormValues,
        resolver: yupResolver<UpdateGroupFormData>(updateGroupSchema),
    });
    const [open, setOpen] = useState<boolean>(false);

    const submitGroupData = async (data: UpdateGroupFormData) => {
        if (!user?.id) return;

        try {
            await updateGroup(groupData.id, data);
            await onSuccess();
            toast.success(MESSAGES.SUCCESS.UPDATED_GROUP)
            setOpen(false);
            reset();
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        }
    };

    return <>
        <Button onClick={() => setOpen(true)} sx={{ flex: 1 }} variant='outlined'>Update</Button>
        <Dialog open={open}>
            <DialogTitle>Update group</DialogTitle>
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
                            error={!!errors.description}
                            helperText={errors.description?.message}
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

export default UpdateGroupForm;