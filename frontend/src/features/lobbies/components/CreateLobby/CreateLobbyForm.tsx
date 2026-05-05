import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../../../utils/messages';
import AddButton from '../../../../shared/components/AddButton/AddButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormControl, FormHelperText, FilledInput, InputLabel } from '@mui/material';
import { createLobby, CreateLobbyData } from '../../services/createLobby';
import { createLobbySchema } from '../../../../utils/createLobbySchema';
import { UserGroup } from '../../../groups/types/group.types';
import { useAuth } from '../../../auth/useAuth';

type CreateLobbyFormData = {
    gameType: string,
}

const CreateLobbyForm: React.FC<{ onSuccess: () => Promise<void>, groupData: UserGroup }> = ({ onSuccess, groupData }) => {
    const { user } = useAuth();
    const { id: groupId } = groupData;
    const lobby: CreateLobbyFormData = {
        gameType: '',
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: lobby,
        resolver: yupResolver<CreateLobbyFormData>(createLobbySchema),
    });
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const showForm = () => {
        setIsClicked(true);
        reset();
    }
    const closeForm = () => {
        setIsClicked(false);
    };
    const submitLobbyData = async (lobby: CreateLobbyFormData) => {
        if (!user?.id) return;
        const createLobbyFormDataPlusGroupId: CreateLobbyData = {
            ...lobby,
            owner: user.id,
            groupId: groupId,
        };

        try {
            await createLobby(createLobbyFormDataPlusGroupId);
            closeForm();
            await onSuccess();
            toast.success(MESSAGES.SUCCESS.CREATED_LOBBY)
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        };
    };

    return <>
        {isClicked && (
            <form className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-500 flex flex-col fixed shadow-xl rounded-2xl'
                onSubmit={handleSubmit(submitLobbyData)} >
                <FormControl>
                    <InputLabel htmlFor={'name'}>
                        game type
                    </InputLabel>
                    <FilledInput
                        placeholder='nazwa'
                        {...register('gameType')}
                    />
                    {errors.gameType && <FormHelperText>{errors.gameType?.message}</FormHelperText>}
                </FormControl>
                <button type='button' onClick={closeForm}>X</button>
                <button type='submit'>dodaj</button>
            </form>
        )
        }
        <div style={{ background: 'none', border: 'none' }} onClick={showForm}>
            <AddButton />
        </div>
    </>
};

export default CreateLobbyForm;