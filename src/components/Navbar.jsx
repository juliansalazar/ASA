import '../styles/Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';

const BasicExample = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" >AUTOCAREST</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/about">Nosotros</NavLink>
            <NavLink to="/login">Iniciar Sesión</NavLink>
            <NavDropdown title="Quick Links" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://calendly.com/autocarest/citaprogramada">Agendar 30 minutos</NavDropdown.Item>
              <NavDropdown.Item href="tel:+593999966466">Llamar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://api.whatsapp.com/send/?phone=+593999966466&text=Hola Autocarest, mi nombre es ">
                Whatsapp
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicExample;