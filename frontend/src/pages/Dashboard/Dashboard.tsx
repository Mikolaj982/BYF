import React from 'react'
import { useUserGroups } from '../../hooks/useUserGroups';
import { Group } from './types/group.types';
import CreateGroupForm from '../../components/CreateGroup/CreateGroupForm';

const Dashboard: React.FC = () => {
    const { groups, loading, error, refetchGroups } = useUserGroups();
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
            <CreateGroupForm onSuccess={refetchGroups} />
        </div>
    );
};

export default Dashboard;