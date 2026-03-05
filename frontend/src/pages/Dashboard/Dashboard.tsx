import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import ListOfFriends from '../../components/ListOfFriends/ListOfFriends'
import BrowserOfFriends from '../../components/BrowserOfFriends/BrowserOfFriends'
export const friends = ['Marcin', 'Wacek'];
const Dashboard: React.FC = () => {
    return (
        <div className='bg-indigo-400 h-[100vh] w-[100vw]'>
            <Navigation />
            <div className='mt-[30px] ml-[90px] fixed flex h-[100vh]'>
                <ListOfFriends friends={friends} />
                <BrowserOfFriends />
            </div>

        </div>
    )
}

export default Dashboard