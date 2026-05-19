import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../useAuth';
import { LoadingState } from '../../../../shared/components/LoadingState/LoadingState';

const PrivateRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingState />;
    if (!user) return <Navigate to='/' replace />;
    return <Outlet />;
};

export default PrivateRoute;