import React from 'react';

const LobbyMemberBar: React.FC<{ username: string }> = ({ username }) => {
    return (
        <li className='rounded-lg text-richBlack bg-coolGray py-2 px-3 mt-2 text-center w-full font-medium hover:bg-slate-500 hover:cursor-pointer'>
            <p>nickname: {username}</p>
        </li>
    );
};

export default LobbyMemberBar;