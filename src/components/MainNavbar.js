import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'

export default function MainNavbar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    {/* <Navbar.Brand href="/">
                        <img
                        alt=""
                        src="/images/logos_white.png"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Nav.Link href="/">MeowSocial</Nav.Link>
                        <Nav.Link href="/message">Message</Nav.Link>
                        <Nav.Link href="/signin">Signin</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
