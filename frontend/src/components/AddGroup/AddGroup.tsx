import React, { EventHandler, useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import { FilledInput, FormControl, FormGroup, OutlinedInput } from '@mui/material'
import { axiosInstance as axios } from '../../configs/axiosConfig';
import { tokenService } from '../../services/tokenService';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';
import AddButton from '../AddButton/AddButton';

type groupData = {
    name: string,
    description: string,
    members: string[],
    admins: string[],
}

const AddGroup: React.FC = () => {
    const [groupData, setGroupData] = useState<groupData>({ name: '', description: '', members: ['Jan', 'Wacek', 'Placek'], admins: ['Jan', 'Wacek', 'Placek'] })
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const showForm = (): void => setIsClicked(true);
    const closeForm = (e: any): void => {
        setIsClicked(false);
        setGroupData({ name: '', description: '', members: [], admins: [] })
    };

    const handleChangeGroupData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupData({ ...groupData, [e.target.name]: e.target.value })
    }

    const submitGroupData = async (e: any) => {
        e.preventDefault();
        try {
            console.log('klik');
            // const token = tokenService.getToken();
            // await axios.post('/v1/group', {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });
            console.log('Utworzono grupę');
            console.log('dane grupy:', groupData);
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

                    <OutlinedInput name='name' placeholder='nazwa' value={groupData.name} onChange={handleChangeGroupData} />
                    <OutlinedInput name='description' placeholder='opis' value={groupData.description} onChange={handleChangeGroupData} />
                    <OutlinedInput name='members' placeholder='wybierz członków grupy' value={groupData.members} onChange={handleChangeGroupData} />
                    <OutlinedInput name='admins' placeholder='wybierz administratorów' value={groupData.admins} onChange={handleChangeGroupData} />
                    <button onClick={closeForm}>X</button>
                    <button onClick={submitGroupData}>dodaj</button>
                </form>
                :
                null
        }
        <button type="submit" style={{ background: 'none', border: 'none' }} onClick={showForm}>
            <AddButton />
        </button>
    </>
};

export default AddGroup;