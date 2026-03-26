import { useEffect, useState } from "react";
import { useAuth } from "../features/useAuth";
import { getUserGroups } from "../services/dashboardService";
import { UserGroup } from "../pages/Dashboard/types/group.types";

export function useUserGroups() {
    const [groups, setGroups] = useState<UserGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const loadGroups = async function () {
        if (!user) return;
        setError(null);
        setLoading(true);
        try {
            const data = await getUserGroups(user.id);
            setGroups(data || []);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return
        };

        loadGroups();
    }, [user]);

    return {
        groups,
        loading,
        error,
        refetchGroups: loadGroups,
    };
}