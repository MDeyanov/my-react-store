import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

import { AuthContext } from '../../contexts/AuthContext';

export const NavBar = () => {
  const { isAuthenticated, userEmail, isAdmin } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container fluid>
        <Navbar.Brand>
          <Link className="home" to="/">
            React Online Store
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/products">Products</Link>
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
                Signed in as: <Link to="/random">{userEmail}</Link>
              </Nav.Item>
              &nbsp; 
              <Nav.Item>
                <Link to="/logout" style={{ color: 'red' }}>
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
              <Nav.Item>
                <Link to="/logout" style={{ color: 'red' }}>
                  Logout
                </Link>
              </Nav.Item>
            </Nav>
          )}
          {!isAuthenticated && (
            <Nav>
              <Nav.Item>
                <Link to="/login">Login</Link>
              </Nav.Item> 
              &nbsp;           
              <Nav.Item>
                <Link to="/register">Register</Link>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
