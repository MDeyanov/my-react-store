import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

import { AuthContext } from '../../contexts/AuthContext';
import  PopUp  from '../Notifications/Notifications';

export const NavBar = () => {
  const { isAuthenticated, userEmail, isAdmin } = useContext(AuthContext);

  const showNotification = () => {
    return <PopUp />;
  };

  useEffect(() => {
    showNotification();
  }, []);


  return (
    <nav>
      <Navbar bg="dark" variant="dark" expand="lg" >
        <Container fluid>
          <Navbar.Brand >
            <Link className="home" to="/" style={{ color: 'white', textDecoration: 'none' }}>
              React Online Store
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link to="/paintings" style={{ color: 'white', textDecoration: 'none' }}>Paintings</Link >
              </Nav.Item>
            </Nav>
            {isAuthenticated && !isAdmin && (
              <Nav>
                <Nav.Item>
                  <Link to="/cart">
                    <FaShoppingCart size={20} />
                  </Link>
                </Nav.Item>
                &nbsp;
                &nbsp;
                &nbsp;
                <Nav.Item style={{ color: 'white' }}>
                  Signed in as: <Link to="/random" style={{ color: 'light blue', textDecoration: 'none' }}>{userEmail}</Link>
                </Nav.Item>
                &nbsp;
                &nbsp;
                <Nav.Item>
                  <Link className="fw-normal" to="/logout" style={{ color: 'red', textDecoration: 'none' }}>
                    Logout
                  </Link>
                </Nav.Item>
              </Nav>
            )}
            {isAdmin && (
              <Nav>
                <Nav.Item>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/products">Products</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/admin/orders">Orders</Link>
                </Nav.Item>
                &nbsp;
                &nbsp;
                <Nav.Item>
                  <Link className="fw-normal" to="/logout" style={{ color: 'red', textDecoration: 'none' }}>
                    Logout
                  </Link>
                </Nav.Item>
              </Nav>
            )}
            {!isAuthenticated && (
              <Nav>
                <Nav.Item>
                  <Link className="fw-bold" to="/login" style={{ color: 'light blue', textDecoration: 'none' }}>Login</Link>
                </Nav.Item>
                &nbsp;
                &nbsp;
                &nbsp;
                <Nav.Item>
                  <Link className="fw-bold" to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showNotification()}     
    </nav>
  );
};
