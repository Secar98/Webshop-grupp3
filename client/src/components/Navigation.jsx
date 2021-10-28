import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { UserContext } from '../context/userContext';


export default function Navigation() {
  const { isLoggedin } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Webbshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedin ?
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
              :
              <>
                <Nav.Link onClick={logOut}>Log out</Nav.Link>
                <Nav.Link as={Link} to="/user">User</Nav.Link>
                <Nav.Link as={Link} to="/checkout">🛒</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
