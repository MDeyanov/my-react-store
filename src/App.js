import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { Products } from "./components/Products/Products";


import { AuthProvider } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';
import { productServiceFactory } from "./services/productService";
import { CreateProduct } from "./components/CreateProduct/CreateProduct";

function App() {
    const [status, setStatus] = useState(false);
    const [products, setProducts] = useState([]);
    const productService = productServiceFactory();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");


    //products
    useEffect(() => {
        productService.getAll()
            .then(result => {
                setProducts(result)
            })
    }, []);

    const onCreateProductSubmit = async (data) => {
        const newProduct = await productService.create(data);

        setProducts(state => [...state, newProduct]);

    };

    //products

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
                                <Route path='/create-product' element={<CreateProduct onCreateProductSubmit={onCreateProductSubmit}/>} />
                                <Route path='/products' element={<Products products={products}/>} />
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
