import React from 'react'
import { useUserGroups } from '../../hooks/useUserGroups';
import { UserGroup } from './types/group.types';
import CreateGroupForm from '../../components/CreateGroup/CreateGroupForm';
import { deleteGroup } from '../../services/deleteGroup';
import { toast } from 'react-toastify';
import { MESSAGES } from '../../utils/messages';

const Dashboard: React.FC = () => {
    const { groups, loading, error, refetchGroups } = useUserGroups();
    const handleDeleteGroup = async (groupId: string) => {
        if (!groupId) return;
        if (!window.confirm('Jesteś pewien?')) return;
        try {
            await deleteGroup(groupId);
            await refetchGroups();
            toast.success(MESSAGES.SUCCES.DELETED_GROUP)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(MESSAGES.ERROR.UNKNOWN);
            }
        }
    };

    return (
        <div className='bg-indigo-400 h-[100vh] w-[100vw]'>
            <h2>Hello</h2>
            <h3>Your groups:</h3>
            {loading ? <p> Loading...</p> : (
                <ul>
                    {
                        groups.map((group: UserGroup) => (
                            <li key={group.id}>
                                <h3>{group.name}</h3>
                                {group.role === 'owner' && <button onClick={() => handleDeleteGroup(group.id)}>delete</button>}
                            </li>
                        ))
                    }
                </ul>
            )}
            {error && <p>{error}</p>}
            <CreateGroupForm onSuccess={refetchGroups} />
        </div>
    );
};

export default Dashboard;