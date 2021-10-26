import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


export default function Navigation() {
  let loggedIn = false;

  if(localStorage.getItem("token")){
    loggedIn = true;
  };

  function logOut(){
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Webbshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!loggedIn ? 
              <Nav.Link href="/login">Login</Nav.Link>
              : 
              <Nav.Link onClick={logOut}>Log out</Nav.Link>
            }

            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
