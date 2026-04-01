import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import AddButton from '../AddButton/AddButton';
import { createGroup } from '../../services/createGroup';
import { useAuth } from '../../features/useAuth';
import { ToastContainer } from 'react-toastify';
import { createGroupSchema } from '../../utils/createGroupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormControl, FormHelperText, FilledInput, InputLabel } from '@mui/material';

export type CreateGroupSubmitData = {
    owner: string,
    name: string,
    description?: string,
}

type CreateGroupFormData = {
    name: string,
    description?: string,
}

const CreateGroupForm: React.FC<{ onSuccess: () => Promise<void> }> = ({ onSuccess }) => {
    const { user } = useAuth();
    const group: CreateGroupFormData = {
        name: '',
        description: '',
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateGroupFormData>({
        defaultValues: group,
        resolver: yupResolver<CreateGroupFormData>(createGroupSchema),
    });
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const showForm = () => setIsClicked(true);
    const closeForm = () => {
        setIsClicked(false);
        reset();
    };
    const submitGroupData = async (group: CreateGroupFormData) => {

        if (!user?.id) return;

        const createGroupDataPlusOwnerId = {
            ...group,
            owner: user.id,
        };

        try {
            await createGroup(createGroupDataPlusOwnerId);
            onSuccess();
            closeForm();
            toast.success(MESSAGES.SUCCES.CREATED_GROUP)
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
                        <FilledInput
                            placeholder='nazwa'
                            {...register('name')}
                        />
                        {errors.name && <FormHelperText>{errors.name?.message}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor={'description'}>
                            Opis
                        </InputLabel>
                        <FilledInput
                            placeholder='opis'
                            {...register('description')}
                        />
                    </FormControl>
                    <button type='button' onClick={closeForm}>X</button>
                    <button type='submit'>dodaj</button>
                </form>
                :
                null
        }
        <ToastContainer />
        <div style={{ background: 'none', border: 'none' }} onClick={showForm}>
            <AddButton />
        </div>
    </>
};

export default CreateGroupForm;