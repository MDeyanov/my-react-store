import React from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

import { usePaintingContext } from '../../contexts/PaintingContext';

export const PaintingOwner = ({
    children,
}) => {
    const { paintingId } = useParams();
    const { getPainting } = usePaintingContext();
    const { userId } = useAuthContext();

    const currentPainting = getPainting(paintingId);

    if (currentPainting && currentPainting._ownerId !== userId) {
        return <Navigate to={`/paintings/${paintingId}`} replace />
    }

    return children ? children : <Outlet />
};