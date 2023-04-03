import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.module.css';

import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { Paintings } from "./components/Paintings/Paintings";
import { CreateProduct } from "./components/CreateProduct/CreateProduct";
import { PaintingDetails } from "./components/PaintingDetails/PaintingDetails";
import { EditPainting } from "./components/EditPainting/EditPainting";
import { RouteGuard } from "./components/common/RouteGuard";
import { PaintingOwner } from "./components/common/PaintingOwner";


import { AuthProvider } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';
import { paintingServiceFactory } from "./services/paintingService";
import { PaintingProvider } from "./contexts/PaintingContext";

function App() {
    const [status, setStatus] = useState(false);

    const [paintings, setPaintings] = useState([]);
    const paintingService = paintingServiceFactory();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");


    //paintings
    useEffect(() => {
        paintingService.getAll()
            .then(result => {
                setPaintings(result)
            })
    }, []);

    const onCreateProductSubmit = async (data) => {
        const newPaintings = await paintingService.create(data);

        setPaintings(state => [...state, newPaintings]);

    };

    //paintings

    //notifications
    const showMessage = (message, messageType) => {
        setStatus(true);
        setMessage(message);
        setMessageType(messageType);
    };

    const clearMessage = () => {
        setStatus(false);
        setMessage("");
        setMessageType("");
    };
    //notifications

    return (
        <AuthProvider>
            <PaintingProvider>
                <NotificationContext.Provider
                    value={{
                        status,
                        message,
                        messageType,
                        showMessage,
                        clearMessage
                    }}
                >
                    <div className="App">
                        <NavBar />
                        <main id="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/paintings' element={<Paintings paintings={paintings} />} />
                                <Route path='/paintings/:paintingId' element={<PaintingDetails />} />
                                <Route element={<RouteGuard />}>
                                    <Route path='/paintings/:paintingId/edit' element={
                                        <PaintingOwner>
                                            <EditPainting />
                                        </PaintingOwner>
                                    } />
                                    <Route path='/create-product' element={<CreateProduct onCreateProductSubmit={onCreateProductSubmit} />} />
                                    <Route path='/logout' element={<Logout />} />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </NotificationContext.Provider>
            </PaintingProvider>
        </AuthProvider>
    );
}

export default App;
