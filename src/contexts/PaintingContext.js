import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { paintingServiceFactory } from '../services/paintingService';

export const PaintingContext = createContext();

export const PaintingProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [paintings, setPaintings] = useState([]);
    const paintingService = paintingServiceFactory();

    useEffect(() => {
        paintingService.getAll()
            .then(result => {
                setPaintings(result)
            })
    }, []);

    const onCreatePaintingSubmit = async (data) => {
        const newPainting = await paintingService.create(data);

        setPaintings(state => [...state, newPainting]);

        navigate('/paintings');
    };

    const onPaintingEditSubmit = async (values) => {
        const result = await paintingService.edit(values._id, values);

        setPaintings(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/paintings/${values._id}`);
    };

    const deletePainting = (paintingId) => {
        setPaintings(state => state.filter(painting => painting._id !== paintingId));
    };

    const getPainting = (paintingId) => {
        return paintings.find(painting => painting._id === paintingId);
    };

    const contextValues = {
        paintings,
        onCreatePaintingSubmit,
        onPaintingEditSubmit,
        deletePainting,
        getPainting,
    };

    return (
        <PaintingContext.Provider value={contextValues}>
            {children}
        </PaintingContext.Provider>
    );
};

export const usePaintingContext = () => {
    const context = useContext(PaintingContext);

    return context;
};