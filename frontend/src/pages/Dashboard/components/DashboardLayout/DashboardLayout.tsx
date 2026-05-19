import React from 'react';
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useGroupLobbies } from '../../../../features/lobbies/hooks/useGroupLobbies';
import { DashboardOutletContext } from '../../types/outletContext.types';

const DashboardLayout: React.FC = () => {
    const { groups, loadingGroups, groupsError, refetchGroups } = useOutletContext<DashboardOutletContext>();
    const { groupId } = useParams();
    const { lobbies, loading: loadingLobbies, refetchLobbies, error: lobbiesError } = useGroupLobbies(groupId ?? '');

    return (
        <Outlet context={{
            groups,
            loadingGroups,
            groupsError,
            refetchGroups,
            lobbies,
            loadingLobbies,
            refetchLobbies,
            lobbiesError
        }} />
    )
};

export default DashboardLayout;