import React from 'react'
import { Input, OutlinedInput, TextField } from '@mui/material'
import AddButton from '../AddButton/AddButton'

const BrowserOfFriends = () => {
    return (
        <div className='p-2 flex flex-col'>
            <OutlinedInput placeholder='Wpisz nickname' sx={{ bgcolor: 'grey', color: '#F5F5F5' }}></OutlinedInput>
            <AddButton label='dodaj przyjaciela' />
        </div>

    )
}

export default BrowserOfFriends