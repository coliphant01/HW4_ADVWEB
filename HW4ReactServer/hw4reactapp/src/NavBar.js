import './App.css';
import {Navbar, Nav, Container} from "react-bootstrap";
function NavBar () {
    return (
        <Navbar bg="info" data-bs-theme="dark" text="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/customers">Customers</Nav.Link>
                    <Nav.Link href="/items">Products</Nav.Link>
                    <Nav.Link href="/sales">Sales</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;