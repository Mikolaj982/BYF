import React from 'react';
import LobbyMemberBar from '../LobbyMemberBar/LobbyMemberBar';
import { useLobbyMembers } from '../../hooks/useLobbyMembers';

const LobbyMembers: React.FC<{ lobbyId: string }> = ({ lobbyId }) => {
    const { lobbyMembers, loading, error } = useLobbyMembers(lobbyId);
    return (
        <div className='bg-slate-600 p-[10px]'>
            <h3>Uczestnicy lobby:</h3>
            {error
                ? <p>{error}</p>
                : loading
                    ? <p>Loading...</p>
                    :
                    (lobbyMembers.length === 0)
                        ? <p>lista jest pusta</p>
                        : (<ul>
                            {lobbyMembers.map((member) => (
                                <LobbyMemberBar username={member.username} key={member.userId} />
                            ))}
                        </ul>)
            }
        </div>
    )
}

export default LobbyMembers