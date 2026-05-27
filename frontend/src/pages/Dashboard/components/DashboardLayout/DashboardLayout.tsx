import React from 'react';
import { Outlet, useOutletContext } from "react-router-dom";
import { DashboardOutletContext } from '../../types/outletContext.types';

const DashboardLayout: React.FC = () => {
    const { onOpenSidebar } = useOutletContext<DashboardOutletContext>();

    return (
        <Outlet context={{ onOpenSidebar }} />
    )
};

export default DashboardLayout;