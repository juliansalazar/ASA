import React, { useState, useEffect } from 'react';
import '../styles/CookieConsent.css'; // Para estilos, créalo en el próximo paso

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true); // Mostrar si no hay consentimiento previo
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <p>
      Usamos cookies para mejorar tu experiencia en Autocarest.
        Consultar más en nuestro <a href="/terms">Centro de privacidad.</a>
      </p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Aceptar cookies</button>
        <button onClick={handleReject}>Configurar cookies</button>
      </div>
    </div>
  );
};

export default CookieConsent;