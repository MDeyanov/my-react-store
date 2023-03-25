import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
