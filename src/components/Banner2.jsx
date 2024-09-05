import '../styles/Banner.css';
import { FaWhatsapp } from "react-icons/fa6";

const Banner2 = () => {
  return (
    <>
      <div href="/" className="banner" style={{backgroundImage: "url(https://assets.bridgestonetire.com/content/dam/consumer/bst/la/mx/news/2022/equivalencia_llantas.jpg)", alignSelf: 'center', backgroundSize: 'cover', color: "white", paddingBottom: "30px"}}>
        <div className="container">
          <h3 className="display-4">¿Llantas?</h3>
          <h3 className="display-4">Cotiza en Autocarest</h3>
          <h3 className="lead">Somos Distrubuidores Autorizados:</h3>
          <h3 className="display-4">Maxxis - Farroad - Pirelli</h3>
          <a className="btn" role="button" href="https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%llantas.%20PROMOWEB:%20LLANTAS"> <FaWhatsapp /> COTIZA AQUÍ </a>
        </div>
      </div>
    </>
  )
}
export default Banner2