import React from 'react';
import '../styles/Footer.css';
import { NavLink } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Todos los derechos reservados.</p>
        <div className="footer-links">
          <NavLink href="/contact">Contáctanos</NavLink>
          <NavLink href="/terms">Política de Privacidad</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;