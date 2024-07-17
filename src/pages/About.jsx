import '../styles/About.css'; // Asegúrate de crear este archivo para los estilos
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
    return (

        <>
            <Navbar />
            <div className="about-container">
                <h1>Nosotros</h1>
                <p>Somos un taller vehicular dedicado a brindar servicios de mantenimiento y reparación de alta calidad.</p>
                <h2>Misión</h2>
                <p>En Autocarest, nos enorgullecemos de ofrecer un servicio amigable y profesional, y nos esforzamos por mantener la satisfacción del cliente en todo momento.</p>
                <h2>Our Vision</h2>
                <p>Our vision is to be the most trusted provider of technology solutions in the industry.</p>
                <h2>Nuestro Equipo</h2>
                <p>Nuestro equipo de expertos mecánicos y técnicos altamente capacitados se esfuerza por proporcionar a nuestros clientes soluciones confiables y eficientes para sus necesidades automotrices.</p>
            </div>
            <Footer />
        </>
    );
};

export default About;
