import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import { useAuth } from '../../features/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, FilledInput, InputLabel } from '@mui/material';
import { updateGroupSchema } from '../../utils/updateGroupSchema';
import { updateGroup } from '../../services/updateGroup';
import { UserGroup } from '../../pages/Dashboard/types/group.types';

type UpdateGroupFormData = {
    name: string,
    description?: string | null,
}

const UpdateGroupForm: React.FC<{ onSuccess: () => Promise<void>, groupData: UserGroup }> = ({ onSuccess, groupData }) => {
    const { user } = useAuth();
    const updateFormValues: UpdateGroupFormData = {
        name: groupData.name,
        description: groupData.description
    }
    const { control, handleSubmit, reset, formState: { errors } } = useForm<UpdateGroupFormData>({
        defaultValues: updateFormValues,
        resolver: yupResolver<UpdateGroupFormData>(updateGroupSchema),
    });
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const showForm = () => {
        setIsClicked(true);
    }
    const closeForm = () => {
        setIsClicked(false);
    };
    const submitGroupData = async (data: UpdateGroupFormData) => {

        if (!user?.id) return;

        try {
            await updateGroup(groupData.id, data);
            await onSuccess();
            closeForm();
            toast.success(MESSAGES.SUCCESS.UPDATED_GROUP)
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        };
    }

    return <>
        {
            isClicked ?
                <form className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-500 flex flex-col fixed shadow-xl rounded-2xl'
                    onSubmit={handleSubmit(submitGroupData)} >
                    <FormControl>
                        <InputLabel htmlFor={'name'}>
                            Nazwa
                        </InputLabel>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <FilledInput {...field} placeholder='nazwa' />
                            )} />
                        {errors.name && <FormHelperText>{errors.name?.message}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor={'description'}>
                            Opis
                        </InputLabel>
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <FilledInput
                                    {...field}
                                    placeholder='opis'
                                />
                            )} />
                    </FormControl>
                    <button type='button' onClick={closeForm}>X</button>
                    <button type='submit'>potwierdź zmiany</button>
                </form>
                :
                null
        }
        <div style={{ background: 'none', border: 'none' }} onClick={showForm}>
            <button>edytuj</button>
        </div>
    </>
};

export default UpdateGroupForm;