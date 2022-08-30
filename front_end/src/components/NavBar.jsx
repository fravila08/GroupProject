import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import { FaUserTie } from 'react-icons/fa';

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
        <Navbar className="brokenNavbar" bg="light" expand="lg">
            <a href="/"><Image className="navbar_brand_image" src="https://cdn.dribbble.com/users/1874602/screenshots/7242868/media/5162ea1d37b188dc55932161f90d5573.png?compress=1&resize=400x300&vertical=top" alt="Jobify Logo"></Image></a>
            {/* <Navbar.Brand> <Image className="navbar_image" src="https://cdn.dribbble.com/users/1874602/screenshots/7242868/media/5162ea1d37b188dc55932161f90d5573.png?compress=1&resize=400x300&vertical=top" alt="Jobify Logo"></Image> </Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#/forums">Forums</Nav.Link>
                    <Nav.Link href="#/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#/profile">My Profile</Nav.Link> */}
                    <Nav.Item>
                        <form onSubmit={handleSearch}>
                            <input type="text" id="searchBar" placeholder='Search Jobs' required />
                        </form>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <NavDropdown 
                    title={
                    <div className="pull-left">
                        <img className="navbar_profile_image thumbnail-image" 
                        src="https://images.squarespace-cdn.com/content/v1/536e785fe4b0b84b930da48c/1649365755383-3MQD2BJVWVWR793E8IWY/Headshot+Photographer+020.jpg" 
                        alt="user pic"
                        />
                    </div>} 
                    id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#/forums">
                            Forums
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#/profile">My Profile</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/* <Nav.Item>
                    <form onSubmit={handleSearch}>
                        <input type="text" id="searchBar" placeholder='Search Jobs' required />
                    </form>
                </Nav.Item> */}
            </Navbar.Collapse>
            <Navbar.Brand>
                <Button variant="outline-dark" onClick={signOut} >Logout</Button>
            </Navbar.Brand>
            
        </Navbar>
    );
}

export default NavBar
