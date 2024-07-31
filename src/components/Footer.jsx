import React from 'react';
import '../styles/Footer.css'; // Asegúrate de crear un archivo CSS para estilizar tu footer


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/contact">Contáctanos</a>
          <a href="/terms">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;