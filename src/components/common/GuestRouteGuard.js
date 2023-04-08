import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export const GuestRouteGuard = ({
    children,
}) => {
    const { isAuthenticated } = useAuthContext();
    
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet />
};