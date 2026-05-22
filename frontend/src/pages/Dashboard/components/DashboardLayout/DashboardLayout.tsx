import React from 'react';
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useGroupLobbies } from '../../../../features/lobbies/hooks/useGroupLobbies';
import { DashboardOutletContext } from '../../types/outletContext.types';

const DashboardLayout: React.FC = () => {
    const { groupId } = useParams();
    const {
        groups,
        loadingGroups,
        groupsError,
        refetchGroups,
        onOpenSidebar
    } = useOutletContext<DashboardOutletContext>();
    const {
        lobbies,
        loading: loadingLobbies,
        refetchLobbies,
        error: lobbiesError
    } = useGroupLobbies(groupId ?? '');

    return (
        <Outlet context={{
            groups,
            loadingGroups,
            groupsError,
            refetchGroups,
            lobbies,
            loadingLobbies,
            refetchLobbies,
            lobbiesError,
            onOpenSidebar,
        }}
        />
    )
};

export default DashboardLayout;