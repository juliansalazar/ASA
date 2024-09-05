import '../styles/Banner.css';
import { FaWhatsapp } from "react-icons/fa6";

const Banner = () => {
  return (
    <>
      <div href="/" className="banner" style={{backgroundImage: "url(https://i.postimg.cc/rs6YnjYS/Normas-de-seguridad-de-mecanica-automotriz.jpg)", alignSelf: 'center', backgroundSize: 'cover', color: "white", paddingBottom: "30px"}}>
        <div className="container">
          <h3 className="display-1">50% OFF</h3>
          <h3 className="display-4">ABC Completo</h3>
          <h3 className="lead">Motor - Frenos - Amortiguadores</h3>
          <a className="btn" role="button" href="https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%20agendar%20una%20cita.%20PROMOWEB:%2050%OFF"> <FaWhatsapp /> AGENDA TU CITA </a>
        </div>
      </div>
    </>
  )
}
export default Banner