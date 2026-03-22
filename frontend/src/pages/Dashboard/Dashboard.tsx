import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import ListOfFriends from '../../components/ListOfFriends/ListOfFriends'
import BrowserOfFriends from '../../components/BrowserOfFriends/BrowserOfFriends'
import { getUserGroups } from '../../services/dashboardService'
import { useAuth } from '../../features/useAuth';

const Dashboard: React.FC = () => {
    const [groups, setGroups] = useState<any>([]);
    const [loading, setLoading] = useState<any>(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        async function loadGroups() {
            try {
                const data = await getUserGroups(user.id);
                setGroups(data || []);
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadGroups();
    }, [user]);

    return (
        <div className='bg-indigo-400 h-[100vh] w-[100vw]'>
            <h2>Hello</h2>
            <h3>Your groups:</h3>
            {loading ? <p> Loading...</p> : (
                <ul>
                    {
                        groups.map((group: any) => (
                            <li key={group.id}>{group.name}</li>
                        ))
                    }
                </ul>
            )}
            <button>Create group</button>
        </div>
    )
}

export default Dashboard