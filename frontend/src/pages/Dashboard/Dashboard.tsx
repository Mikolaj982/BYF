import React from 'react'
import { useUserGroups } from '../../hooks/useUserGroups';
import { Group } from './types/group.types';

const Dashboard: React.FC = () => {
    const { groups, loading, error } = useUserGroups();
    return (
        <div className='bg-indigo-400 h-[100vh] w-[100vw]'>
            <h2>Hello</h2>
            <h3>Your groups:</h3>
            {loading ? <p> Loading...</p> : (
                <ul>
                    {
                        groups.map((group: Group) => (
                            <li key={group.id}>{group.name}</li>
                        ))
                    }
                </ul>
            )}
            {error ?? <p>{error}</p>}
            <button>Create group</button>
        </div>
    );
};

export default Dashboard;