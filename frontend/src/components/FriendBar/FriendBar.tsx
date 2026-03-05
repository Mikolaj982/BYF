import React from 'react'
import AddButton from '../AddButton/AddButton'

type Friend = {
    name: string,
}

const FriendBar: React.FC<Friend> = ({ name }) => {
    return (
        <>
            <li className='rounded-lg text-richBlack bg-coolGray py-2 px-3 mt-2 text-center w-full font-medium hover:bg-slate-500 hover:cursor-pointer'>{name}</li>
        </>
    )
}

export default FriendBar