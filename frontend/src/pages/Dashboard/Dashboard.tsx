import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserGroups } from '../../features/groups/hooks/useUserGroups';
import { UserGroup } from '../../features/groups/types/group.types';
import CreateGroupForm from '../../features/groups/components/CreateGroup/CreateGroupForm';
import { ToastContainer } from 'react-toastify';
import JoinGroupForm from '../../features/groups/components/JoinGroup/JoinGroup';
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { groups, loading, error, refetchGroups } = useUserGroups();
    const handleSelectGroup = (id: string) => {
        navigate(`group/${id}`)
    };

    return (
        <div className='flex h-screen w-screen'>
            <h2>Hello</h2>
            <div>
                <h3>Your groups:</h3>
                {loading ? <p> Loading...</p> : (
                    <ul>
                        {groups.map((group: UserGroup) => {
                            return <div key={group.id} onClick={() => handleSelectGroup(group.id)}>{group.name}</div>
                        })}
                    </ul>
                )}
                {error && <p>{error}</p>}
                <CreateGroupForm onSuccess={refetchGroups} />
                <JoinGroupForm onSuccess={refetchGroups} />
            </div>
            <div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default Dashboard;