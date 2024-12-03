import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaBell, FaEnvelope, FaHeart, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <Navbar bg="white" expand="lg" className="px-3">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span
              className="fw-bold text-success"
              style={{ fontSize: '1.5rem', fontFamily: 'Arial' }}
            >
              db
            </span>
          </Navbar.Brand>

          {/* Toggle for Mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* Search Bar */}
            <Form className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '600px', width: '100%' }}>
              <FormControl
                type="search"
                placeholder="Search for items"
                className="rounded-start"
                aria-label="Search"
                style={{
                  border: '1px solid green',
                  borderRight: 'none',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '25px',
                }}
              />
              <Button
                variant="outline-success"
                className="rounded-end"
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                  border: '1px solid green',
                }}
              >
                <FaSearch />
              </Button>
            </Form>
          {/* Navbar Links */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            {/* Icons and Links */}
            <Nav className="d-flex align-items-center">
              <Nav.Link href="/messages" className="me-2">
                <FaEnvelope size={18} />
              </Nav.Link>
              <Nav.Link href="/notifications" className="me-2">
                <FaBell size={18} />
              </Nav.Link>
              <Nav.Link href="/favorites" className="me-2">
                <FaHeart size={18} />
              </Nav.Link>
              <Nav.Link href="/account" className="me-3">
                <FaUser size={18} />
              </Nav.Link>
              <Nav.Link href="/upload" className="me-3 fw-bold text-dark">
                Upload
              </Nav.Link>
              <Nav.Link href="/signup" className="me-3 fw-bold text-dark">
                Sign Up
              </Nav.Link>
              <Nav.Link href="/language" className="fw-bold text-dark">
                EN <span className="fw-light">&#x25BC;</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
