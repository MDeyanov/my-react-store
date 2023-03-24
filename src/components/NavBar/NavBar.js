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
            <Nav.Link>
              <Link to="/products">Products</Link>
            </Nav.Link>
          </Nav>
          {isAuthenticated && !isAdmin && (
            <Nav>
              <Nav.Link>
                <Link to="/cart">
                  <FaShoppingCart size={20} />
                </Link>
              </Nav.Link>
              <Nav.Link>
                Signed in as: <Link to="/random">{userEmail}</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/logout" style={{ color: 'red' }}>
                  Logout
                </Link>
              </Nav.Link>
            </Nav>
          )}
          {isAdmin && (
            <Nav>
              <Nav.Link>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin/products">Products</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin/orders">Orders</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/logout" style={{ color: 'red' }}>
                  Logout
                </Link>
              </Nav.Link>
            </Nav>
          )}
          {!isAuthenticated && (
            <Nav>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/register">Register</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

