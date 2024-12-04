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
                </Container>
            </Navbar>
        </header>
    );
};

export default Formhead;


