import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import { createGroup } from '../../services/createGroup';
import { useAuth } from '../../../auth/useAuth';
import { createGroupSchema } from '../../../../utils/createGroupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, FilledInput, InputLabel, Button, DialogContent, Dialog, DialogTitle, DialogActions, TextField } from '@mui/material';

export type CreateGroupSubmitData = {
    owner: string,
    name: string,
    description: string,
}

type CreateGroupFormData = {
    name: string,
    description: string,
}

const CreateGroupForm: React.FC<{ onSuccess: () => Promise<void> }> = ({ onSuccess }) => {
    const { user } = useAuth();
    const group: CreateGroupFormData = {
        name: '',
        description: '',
    }
    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateGroupFormData>({
        defaultValues: group,
        resolver: yupResolver<CreateGroupFormData>(createGroupSchema),
    });

    const [open, setOpen] = useState<boolean>(false);

    const submitGroupData = async (group: CreateGroupFormData) => {
        if (!user?.id) return;

        const createGroupDataPlusOwnerId = {
            ...group,
            owner: user.id,
        };

        try {
            await createGroup(createGroupDataPlusOwnerId);
            await onSuccess();
            reset();
            toast.success(MESSAGES.SUCCESS.CREATED_GROUP);
            setOpen(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        };
    }

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


//          isClicked ?
//             <form className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-500 flex flex-col fixed shadow-xl rounded-2xl'
//                 onSubmit={handleSubmit(submitGroupData)} >
//                 <FormControl>
//                     <InputLabel htmlFor={'name'}>
//                         Nazwa
//                     </InputLabel>
//                     <FilledInput
//                         placeholder='nazwa'
//                         {...register('name')}
//                     />
//                     {errors.name && <FormHelperText>{errors.name?.message}</FormHelperText>}
//                 </FormControl>
//                 <FormControl>
//                     <InputLabel htmlFor={'description'}>
//                         Opis
//                     </InputLabel>
//                     <FilledInput
//                         placeholder='opis'
//                         {...register('description')}
//                     />
//                 </FormControl>
//                 <button type='button' onClick={closeForm}>X</button>
//                 <button type='submit'>dodaj</button>
//             </form>
//             :
//             null
//     }
//     <Button onClick={showForm} variant='outlined' sx={{ padding: 1 }}>+Create</Button>
// </> 