import { FaWhatsapp } from "react-icons/fa6";

const Banner = () => {
  return (
    <>
      <br/>
      <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1>¡Inicia Julio!</h1>
        <h2 className="display-4">Con tu auto en perfecto estado</h2>
        <h3 className="lead">¿Eres nuevo? Recibe $50 USD en crédito para Mano de Obra.</h3>
        <p>*Aplican condiciones.</p>
        <br/>
        <a className="btn btn-outline-primary" role="button" href="https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%20agendar%20una%20cita,%20soy%20un%20nuevo%20cliente!%20PROMOWEB:50USD"> <FaWhatsapp /> RECLAMA $50 AHORA </a>
      </div>
      <br/>
      </div>
    </>
  )
}

export default Banner