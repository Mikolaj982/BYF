import React from 'react'
import { useUserGroups } from '../../features/groups/hooks/useUserGroups';
import { UserGroup } from '../../features/groups/types/group.types';
import CreateGroupForm from '../../features/groups/components/CreateGroup/CreateGroupForm';
import GroupItem from '../../features/groups/components/GroupItem/GroupItem';
import { ToastContainer } from 'react-toastify';
import JoinGroupForm from '../../features/groups/components/JoinGroup/JoinGroup';

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