import React from 'react'
import { useUserGroups } from '../../hooks/useUserGroups';
import { UserGroup } from './types/group.types';
import CreateGroupForm from '../../components/CreateGroup/CreateGroupForm';
import GroupItem from '../../components/GroupItem/GroupItem';
import { ToastContainer } from 'react-toastify';
import JoinGroupForm from '../../components/JoinGroup/JoinGroup';

const Dashboard: React.FC = () => {
    const { groups, loading, error, refetchGroups } = useUserGroups();

    return (
        <div className='bg-indigo-400 h-[100vh] w-[100vw]'>
            <h2>Hello</h2>
            <h3>Your groups:</h3>
            {loading ? <p> Loading...</p> : (
                <ul>
                    {groups.map((group: UserGroup) => {
                        return <GroupItem key={group.id} groupData={group} refetchGroups={refetchGroups} />
                    })}
                </ul>
            )}
            {error && <p>{error}</p>}
            <CreateGroupForm onSuccess={refetchGroups} />
            <JoinGroupForm onSuccess={refetchGroups} />
            <ToastContainer />
        </div>

    );
};

export default Dashboard;