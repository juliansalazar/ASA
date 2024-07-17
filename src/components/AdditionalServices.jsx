import '../styles/AdditionalServices.css';
import { FaTruckPickup } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";


const AdditionalServices = () => {
  return (
    <div className='AddServ'>
      <h2>Servicios Adicionales a Domicilio</h2>
      <ul>
        <li> <FaTruckPickup/> Pickup & Delivery de Vehículos</li>
        <li> <FaCarBattery/> Instalación de Baterías</li>
        <li> <GiFlatTire /> Cambio de Llantas</li>
        <li><BsHouses /> Revisión Técnica Liviana</li>
      </ul>
    </div>
  );
};

export default AdditionalServices;
