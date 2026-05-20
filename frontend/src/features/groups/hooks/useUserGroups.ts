import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { getUserGroups } from "../services/getGroups";
import { UserGroup } from "../types/group.types";

export function useUserGroups() {
    const [groups, setGroups] = useState<UserGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);
    const { user, loading: loadingAuth } = useAuth();

    const loadGroups = async function () {
        if (!user) return;
        setLoading(true);

        try {
            const data = await getUserGroups(user.id);
            setGroups(data || []);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            setLoading(false);
            return;
        }
        loadGroups();
    }, [user, loadingAuth]);

    return {
        groups,
        loading,
        error,
        refetchGroups: loadGroups,
    };
}