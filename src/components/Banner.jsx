import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { useSelector } from "react-redux"; // Para verificar si está autenticado
import "../styles/Banner.css";

const Banner = () => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  // Estado para controlar el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Listado de promociones
  const promotions = [
    {
      title: `¡Dale la bienvenida a ${new Date().toLocaleString("es-ES", { month: "long" })} con tu auto al 100%!`,
      description: "Si eres nuevo, obtén 50% OFF en Mano de Obra. ¡Tu primer servicio nos encanta!",
      buttonText: "¡Reclama tu descuento ahora!",
      link: "https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%20agendar%20una%20cita,%20soy%20un%20nuevo%20cliente!%20PROMOWEB:50%OFF",
    },
    {
      title: "¡Gracias por confiar en nosotros!",
      description: "Como cliente recurrente, obtienes un descuento exclusivo en tu próxima cita. ¡Te esperamos!",
      buttonText: "¡Agenda tu cita ahora!",
      link: "https://wa.me/+593999966466?text=Hola%20Autocarest,%20me%20gustaría%20agendar%20una%20nueva%20cita!%20PROMOCLIENTE:DESCUENTO",
    }
  ];

  // Efecto para cambiar la slide automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [promotions.length]);

  // Lógica para mostrar el banner según si el usuario está autenticado o no
  const promotion = isAuthenticated ? promotions[1] : promotions[0];

  const handleWhatsAppClick = () => {
    window.open(promotion.link, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="banner" role="banner">
      <div>
        <h1>{promotion.title}</h1>
        <h2 className="display-4">Tu auto merece lo mejor, ¡y nosotros también!</h2>
        <h3 className="lead">{promotion.description}</h3>
        <p className="terms">*Aplican condiciones. ¡Oferta limitada!</p>
        <button
          className="whatsapp-btn"
          onClick={handleWhatsAppClick}
          aria-label="Reclamar promoción contactando por WhatsApp"
        >
          <FaWhatsapp /> {promotion.buttonText}
        </button>
      </div>
    </section>
  );
};

export default Banner;
