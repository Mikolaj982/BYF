import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { useAuth } from '../../../auth/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle, Box } from '@mui/material';
import { updateGroupSchema } from '../../../../utils/updateGroupSchema';
import { updateGroup } from '../../services/updateGroup';
import { UserGroup } from '../../types/group.types';
import { UpdateGroupFormData } from '../../types/group.types';
import { getErrorMessage } from '../../../../utils/errorUtils/getErrorMessage';
import { useQueryClient } from '@tanstack/react-query';

type UpdateGroupFormProps = {
    groupData: UserGroup;
    trigger?: React.ReactNode;
    onIconMenuClose?: () => void;
};

const UpdateGroupForm: React.FC<UpdateGroupFormProps> = (
    {
        groupData,
        trigger,
        onIconMenuClose
    }
) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
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
        try {
            await updateGroup(groupData.id, data);
            queryClient.invalidateQueries({ queryKey: ['groups', user?.id] })
            toast.success(MESSAGES.SUCCESS.UPDATED_GROUP, { toastId: 'update-group-success' })
            setOpen(false);
            reset();
        } catch (error: unknown) {
            toast.error(getErrorMessage(error), { toastId: 'update-group-error' });
        }
    };

    return (
        <>
            {trigger
                ? <Box component='span' onClick={() => setOpen(true)}>
                    {trigger}
                </Box>
                : <Button
                    onClick={() => setOpen(true)}
                    sx={{ flex: 1 }}
                    variant='outlined'
                >
                    edit group
                </Button>
            }
            <Dialog
                open={open}
                PaperProps={{
                    sx: { width: 400, maxWidth: 400 }
                }}
            >
                <DialogTitle>Edit group</DialogTitle>
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
                        variant='outlined'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit((formData) => {
                            submitGroupData(formData);
                            setOpen(false);
                            onIconMenuClose?.();
                        })}
                        variant='contained'
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default UpdateGroupForm;