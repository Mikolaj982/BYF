import React, { useEffect, useState } from 'react'
import { OutlinedInput } from '@mui/material'
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import AddButton from '../AddButton/AddButton';
import { createGroup } from '../../services/createGroup';
import { useAuth } from '../../features/useAuth';

export type CreateGroupFormData = {
    owner: string,
    name: string,
    description: string,
}

const CreateGroupForm: React.FC = () => {
    const { user } = useAuth();
    const [group, setGroup] = useState<CreateGroupFormData>({
        name: '',
        description: '',
        owner: '',
    });
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const showForm = () => setIsClicked(true);
    const closeForm = () => {
        setIsClicked(false);
        setGroup({
            name: '',
            description: '',
            owner: '',
        })
    };

    const handleChangeGroupData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroup({ ...group, [e.target.name]: e.target.value });
    }

    const submitGroupData = async (e: any) => {
        e.preventDefault();

        if (!user?.id) {
            console.error("użytkownik nie jest zalogowany.")
        }

        const createGroupDataPlusOwnerId = {
            ...group,
            owner: user.id,
        };

        try {
            await createGroup(createGroupDataPlusOwnerId);
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
                <form className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-500 flex flex-col fixed shadow-xl rounded-2xl' onSubmit={(e) => submitGroupData(e)} >
                    <OutlinedInput name='name' placeholder='nazwa' value={group.name} onChange={handleChangeGroupData} />
                    <OutlinedInput name='description' placeholder='opis' value={group.description} onChange={handleChangeGroupData} />
                    <button onClick={closeForm}>X</button>
                    <button type='submit'>dodaj</button>
                </form>
                :
                null
        }
        <div style={{ background: 'none', border: 'none' }} onClick={showForm}>
            <AddButton />
        </div>
    </>
};

export default CreateGroupForm;