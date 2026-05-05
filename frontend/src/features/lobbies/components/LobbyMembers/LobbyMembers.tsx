import React from 'react';
import LobbyMemberBar from '../LobbyMemberBar/LobbyMemberBar';
import { LobbyMemberWithUsername } from '../../types/lobby.types';

type LobbyMembersProps = {
    members: LobbyMemberWithUsername[],
    loading: boolean,
    error: string | null,
}

const LobbyMembers: React.FC<LobbyMembersProps> = ({ members, loading, error }) => {

    return (
        <div className='bg-slate-600 p-[10px]'>
            <h3>Uczestnicy lobby:</h3>
            {error
                ? <p>{error}</p>
                : loading
                    ? <p>Loading...</p>
                    :
                    (members.length === 0)
                        ? <p>lista jest pusta</p>
                        : (<ul>
                            {members.map((member) => (
                                <LobbyMemberBar username={member.username} key={member.userId} />
                            ))}
                        </ul>)
            }
        </div>
    )
};

export default LobbyMembers;