import React from 'react';
import '../styles/Footer.css'; // Asegúrate de crear un archivo CSS para estilizar tu footer
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Todos los derechos reservados. Autocarest &#174; {new Date().getFullYear()}.</p>
        <div className="footer-links">
          <NavLink to="/contact">Contáctanos</NavLink>
          <NavLink to="/terms">Política de Privacidad</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;