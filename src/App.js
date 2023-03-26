import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';

function App() {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

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

    return (
        <BrowserRouter>
            <AuthProvider>
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
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </NotificationContext.Provider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
