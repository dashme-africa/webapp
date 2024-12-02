import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaBell, FaEnvelope, FaHeart, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <Navbar bg="white" variant="light" expand="md" collapseOnSelect>
        <Container>
          {/* Logo / Brand */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png" alt="Logo" height="30" /> {/* Replace with your logo image */}
          </Navbar.Brand>
          {/* Search Bar */}
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-center">
            <Form className="d-flex" style={{ width: '50%', border: "1px solid green", borderRadius: '25px' }}>
              <FormControl
                type="search"
                placeholder="Search for items"
                className="me-2"
                aria-label="Search"
                style={{ borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px'  }}
              />
              <Button variant="outline-success" style={{ borderRadius: '25px' }}>
                <FaSearch /> {/* Search icon */}
              </Button>
            </Form>
          </Navbar.Collapse>

          {/* Navbar links */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/messages">
                <FaEnvelope />
              </Nav.Link>
              <Nav.Link href="/notifications">
                <FaBell />
              </Nav.Link>
              <Nav.Link href="/favorites">
                <FaHeart />
              </Nav.Link>
              <Nav.Link href="/account">
                <FaUser />
              </Nav.Link>
              <Nav.Link href="/upload">Upload</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/language">EN</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;