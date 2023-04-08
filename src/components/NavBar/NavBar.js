import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

import { AuthContext } from '../../contexts/AuthContext';
import PopUp from '../Notifications/Notifications';
import style from './NavBar.module.css';

export const NavBar = () => {
  const { isAuthenticated, userEmail} = useContext(AuthContext);

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
            <Link className={style.logo} to="/">
              <Image src="https://res.cloudinary.com/dzac3ggur/image/upload/v1680037348/Logo_dpfyps.png" alt="the logo" width="30" height="30" className="d-inline-block align-top" />
              Dimitrova ART Gallery
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link to="/paintings" style={{ color: 'white', textDecoration: 'none' }}>Paintings</Link >
              </Nav.Item>
              &nbsp;
              &nbsp;
              &nbsp;
              <Nav.Item>
                <Link to="/create-product" style={{ color: 'white', textDecoration: 'none' }}>Create</Link >
              </Nav.Item>
            </Nav>
            {isAuthenticated &&(
              <Nav>
                <Nav.Item style={{ color: 'white' }}>
                  Signed in as: <Link to="/" style={{ color: 'light blue', textDecoration: 'none' }}>{userEmail}</Link>
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
