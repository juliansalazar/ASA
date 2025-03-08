import '../styles/AdditionalServices.css';
import { FaTruckPickup } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";

const AdditionalServices = () => {
  // Función para generar el enlace de WhatsApp con un mensaje específico para cada servicio
  const generateWhatsappLink = (service) => {
    const baseUrl = "https://wa.me/+593999966466?text=";
    let message = "";

    switch (service) {
      case "pickupDelivery":
        message = "Hola Autocarest, estoy interesado en el servicio Pickup & Delivery de vehículos.";
        break;
      case "batteryInstallation":
        message = "Hola Autocarest, necesito instalar una batería en mi vehículo.";
        break;
      case "tireChange":
        message = "Hola Autocarest, necesito cambiar una llanta en mi vehículo.";
        break;
      case "lightTechInspection":
        message = "Hola Autocarest, me gustaría agendar una revisión técnica liviana para mi auto.";
        break;
      default:
        message = "Hola Autocarest, quiero más información sobre sus servicios.";
    }

    return baseUrl + encodeURIComponent(message);
  };

  return (
    <div className="AddServ">
      <h2>Servicios Adicionales a Domicilio</h2>
      <div className="cards-container">
        <a href={generateWhatsappLink("pickupDelivery")} className="service-card" aria-label="Pickup & Delivery de vehículos">
          <div className="service-icon">
            <FaTruckPickup />
          </div>
          <h3>Pickup & Delivery de Vehículos</h3>
          <p>Recogemos y entregamos tu vehículo en la puerta de tu casa.</p>
        </a>

        <a href={generateWhatsappLink("batteryInstallation")} className="service-card" aria-label="Instalación de Baterías">
          <div className="service-icon">
            <FaCarBattery />
          </div>
          <h3>Instalación de Baterías</h3>
          <p>Instalamos baterías para que tu vehículo siga funcionando perfectamente.</p>
        </a>

        <a href={generateWhatsappLink("tireChange")} className="service-card" aria-label="Cambio de Llantas">
          <div className="service-icon">
            <GiFlatTire />
          </div>
          <h3>Cambio de Llantas</h3>
          <p>Te cambiamos las llantas de tu vehículo rápidamente y sin problemas.</p>
        </a>

        <a href={generateWhatsappLink("lightTechInspection")} className="service-card" aria-label="Revisión Técnica Liviana">
          <div className="service-icon">
            <BsHouses />
          </div>
          <h3>Revisión Técnica Liviana</h3>
          <p>Revisamos tu vehículo para asegurarnos de que todo esté en orden.</p>
        </a>
      </div>
    </div>
  );
};

export default AdditionalServices;
