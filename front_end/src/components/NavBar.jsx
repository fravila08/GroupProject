import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

function NavBar() {

    function signOut(event) {
        event.preventDefault()
        axios.post('sign_out').then((respone) => {
            window.location.href = "#/signin"
        })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        let searchValue = document.querySelector('#searchBar').value.trim()
        window.location.href = `#/searchResult/${searchValue}`
    }

    return (
        <Navbar className="brokenNavbar" bg="white" expand="lg">

            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#/forums">Forums</Nav.Link>
                    <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#/profile">My Profile</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav.Item>
                    <form onSubmit={handleSearch}>
                        <input type="text" id="searchBar" placeholder='Search Jobs' required />
                    </form>
                </Nav.Item>
            </Navbar.Collapse>
            <Navbar.Brand>
                <Button variant="outline-danger" onClick={signOut} >Logout</Button>
            </Navbar.Brand>

        </Navbar>
    );
}

export default NavBar
