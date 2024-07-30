import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GrMapLocation } from "react-icons/gr";
import { VscCallOutgoing } from "react-icons/vsc";
import { LuCalendarClock } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

const BasicExample = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" >AUTOCAREST</Navbar.Brand>
        <Navbar.Toggle className="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://www.google.com/maps/search/Autocarest/@-2.9016935,-79.0299089,17z/data=!3m1!4b1?entry=ttu"> <GrMapLocation/> Encuentranos</Nav.Link>
            <Nav.Link href="https://wa.me/+59399773001?text=I'm%20inquiring%20about%20the%20apartment%20listing"> <FaWhatsapp/> Escribenos</Nav.Link>
            <Nav.Link href="tel:+593999966466"> <VscCallOutgoing/> Llamanos</Nav.Link>
            <Nav.Link> <LuCalendarClock/> Lun - Vie 8h30am a 5h00pm </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicExample;