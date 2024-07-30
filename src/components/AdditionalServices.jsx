import '../styles/AdditionalServices.css';
import { FaTruckPickup } from "react-icons/fa";
import { FaCarBattery } from "react-icons/fa";
import { GiFlatTire } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";


const AdditionalServices = () => {
  return (
    <div className='container' style={{padding: '20px'}}>
      <h1>Servicios Adicionales a Domicilio</h1>
      <ul className='container'>
        <li> <FaTruckPickup/> <a href='/'> Pickup & Delivery de Vehículos </a> </li>
        <li> <FaCarBattery/> Instalación de Baterías</li>
        <li> <GiFlatTire /> Cambio de Llantas</li>
        <li><BsHouses /> Revisión Técnica Liviana</li>
      </ul>
    </div>
  );
};

export default AdditionalServices;
