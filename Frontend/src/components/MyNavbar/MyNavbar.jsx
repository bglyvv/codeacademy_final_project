import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>
                        <Link to="/">Table</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/create">Create</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/status">Status</Link>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;