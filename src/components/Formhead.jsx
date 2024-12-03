import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaBell, FaEnvelope, FaHeart, FaSearch } from 'react-icons/fa';

const Formhead = () => {
    return (
        <header className="bg-white shadow-sm">
            <Navbar bg="white" expand="md" className="px-3">
                <Container fluid className="d-flex align-items-center justify-content-space-between">
                    {/* Logo */}
                    <Navbar.Brand href="/" className="d-flex align-items-center me-5">
                        <img src="https://res.cloudinary.com/df2q6gyuq/image/upload/v1733152278/dashme-logo_asszym.png" alt="" />
                    </Navbar.Brand>

                    <Nav className="d-flex flex-row">
                        <Nav.Link href="/login" className="me-4 fs-6  text-dark">
                            Log In
                        </Nav.Link>
                        <Nav.Link href="/register" className="me-3 fs-6  text-dark">
                            Sign Up
                        </Nav.Link>
                    </Nav>

                </Container>
            </Navbar>
        </header>
    );
};

export default Formhead;


