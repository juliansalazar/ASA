import '../styles/Banner.css';
import { FaWhatsapp } from "react-icons/fa6";

const Banner = () => {
  return (
    <>
      <div href="/" className="banner" style={{backgroundImage: "url(https://i.postimg.cc/rs6YnjYS/Normas-de-seguridad-de-mecanica-automotriz.jpg)", alignSelf: 'center', backgroundSize: 'cover', color: "white", paddingBottom: "30px"}}>
        <div className="container">
          <h1>¡Inicia Agosto!</h1>
          <h2 className="display-4">Con tu auto en perfecto estado</h2>
          <h3 className="lead">¿Eres nuevo? Recibe $50 USD en crédito para Mano de Obra.</h3>
          <p>*Aplican condiciones.</p>
          <a className="btn" role="button" href="https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%20agendar%20una%20cita,%20soy%20un%20nuevo%20cliente!%20PROMOWEB:50USD"> <FaWhatsapp /> RECLAMA $50 AHORA </a>
        </div>
      </div>
    </>
  )
}

export default Banner