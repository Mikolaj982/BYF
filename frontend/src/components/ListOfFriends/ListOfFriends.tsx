import React from 'react'
import FriendBar from '../FriendBar/FriendBar'

type Friends = {
    friends: string[];
}

const ListOfFriends: React.FC<Friends> = ({ friends }) => {
    return (
        <div className='h-[100vh] bg-slate-600 p-[10px]'>
            <button>Przyjaciele</button>
            <ul className=''>
                {friends ?
                    friends.map((name) => {
                        return <FriendBar name={name} key={name} />
                    })
                    : 'Zaproś przyjaciół!'}
            </ul>
        </div>

    )
}

export default ListOfFriends