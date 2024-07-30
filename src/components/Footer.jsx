import React from 'react';
import '../styles/Footer.css'; // Asegúrate de crear un archivo CSS para estilizar tu footer
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Todos los derechos reservados.</p>
        <div className="footer-links">
          <Link to="/contact">Contáctanos</Link>
          <Link to="/terms">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;