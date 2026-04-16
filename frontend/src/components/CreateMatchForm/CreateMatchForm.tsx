import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import AddButton from '../AddButton/AddButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem, FilledInput } from '@mui/material';
import { createMatchSchema } from '../../utils/createMatchSchema';
import { Lobby, LobbyMatchData } from '../../pages/Dashboard/types/lobby.types';
import { createMatch } from '../../services/lobbies/createMatch';
import { useGroupMembers } from '../../hooks/useGroupMembers';

type CreateMatchFormData = {
    firstUserId: string,
    secondUserId: string,
    firstUserScore: number,
    secondUserScore: number,
}

const CreateMatchForm: React.FC<{ onSuccess: () => Promise<void>, lobbyData: Lobby }> = ({ onSuccess, lobbyData }) => {
    const { groupMembers } = useGroupMembers(lobbyData.group_id);
    const { id } = lobbyData;
    const match: CreateMatchFormData = {
        firstUserId: '',
        secondUserId: '',
        firstUserScore: 0,
        secondUserScore: 0,
    };
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
        defaultValues: match,
        resolver: yupResolver<CreateMatchFormData>(createMatchSchema),
    });
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const showForm = () => {
        setIsClicked(true);
        reset();
    }
    const closeForm = () => {
        setIsClicked(false);
    };
    const submitMatchData = async (match: CreateMatchFormData) => {
        const participants = [
            { user_id: match.firstUserId, score: match.firstUserScore },
            { user_id: match.secondUserId, score: match.secondUserScore }
        ];
        const createMatchFormDataPlusLobbyId: LobbyMatchData = {
            lobby_id: id,
            participants
        };

        try {
            await createMatch(createMatchFormDataPlusLobbyId);
            closeForm();
            await onSuccess();
            toast.success(MESSAGES.SUCCESS.CREATED_MATCH)
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
                onSubmit={handleSubmit(submitMatchData)} >
                <FormControl>
                    <InputLabel id='first-username-select-label'>
                        first username
                    </InputLabel>
                    <Controller
                        name='firstUserId'
                        control={control}
                        render={({ field }) => (
                            <Select {...field} placeholder='Username'>{groupMembers.map((member) => {
                                return (
                                    <MenuItem key={member.id} value={member.id}>{member.username}</MenuItem>
                                )
                            })}</Select>
                        )} />
                    {errors.firstUserId && <FormHelperText>{errors.firstUserId?.message}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor={'firstUserScore'}>
                        Score
                    </InputLabel>
                    <FilledInput
                        type='number'
                        placeholder='Score'
                        {...register('firstUserScore')} />
                    {errors.firstUserScore && <FormHelperText>{errors.firstUserScore?.message}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor={'secondUserScore'}>
                        Score
                    </InputLabel>
                    <FilledInput
                        type='number'
                        placeholder='Score'
                        {...register('secondUserScore')} />
                    {errors.secondUserScore && <FormHelperText>{errors.secondUserScore?.message}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <InputLabel id='second-username-select-label'>
                        second username
                    </InputLabel>
                    <Controller
                        name='secondUserId'
                        control={control}
                        render={({ field }) => (
                            <Select {...field} placeholder='Username'>{groupMembers.map((member) => {
                                return (
                                    <MenuItem key={member.id} value={member.id}>{member.username}</MenuItem>
                                )
                            })}
                            </Select>
                        )} />
                    {errors.secondUserId && <FormHelperText>{errors.secondUserId?.message}</FormHelperText>}
                </FormControl>
                <button type='button' onClick={closeForm}>X</button>
                <button type='submit'>dodaj</button>
            </form>
        )}
        <div style={{ background: 'none', border: 'none' }} onClick={showForm}>
            <AddButton />
        </div>
    </>
};

export default CreateMatchForm;