import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { NotificationContext } from '../../contexts/NotificationContext';

import { AuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogout } = useContext(AuthContext);
    const notifications = useContext(NotificationContext);

    useEffect(() => {
        onLogout();
        notifications.showMessage('Logged out successfully!', 'success');
    }, [onLogout]);

    return <Navigate to="/" />
};