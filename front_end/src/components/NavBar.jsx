import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

function NavBar(props) {
  function signOut(event){
    event.preventDefault()
    axios.post('sign_out').then((response)=>{
      console.log(response);
      window.location.href=""
    })
  }

    return (
        <Navbar className="navbar" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                            <button onClick={signOut}>Sign Out</button>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand>
                    {props.user && <Button variant="outline-danger" onClick={props.signOut} >Logout</Button>}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavBar
