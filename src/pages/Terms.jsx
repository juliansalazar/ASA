import React from 'react';
import '../styles/Terms.css'; // Archivo CSS para estilizar el componente
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Terms = () => {
  return (
    <>
        <Navbar />
        <div className="terms-container">
        <h1>Términos y Condiciones de Uso de Datos</h1>

        <section>
            <h2>1. Introducción</h2>
            <p>
            Bienvenido a la plataforma web de Autocarest Cia. Ltda. (en adelante, "Autocarest"), ubicada en Cuenca, Ecuador. 
            Al acceder y utilizar nuestro sitio web, usted acepta los términos y condiciones establecidos en este documento. 
            Si no está de acuerdo con estos términos, por favor, no utilice nuestra plataforma.
            </p>
        </section>

        <section>
            <h2>2. Recolección de Datos</h2>
            <p>Autocarest puede recopilar y almacenar información personal, como nombres, direcciones de correo electrónico, números de teléfono, y datos relacionados con su vehículo, incluyendo pero no limitándose a, la marca, modelo, año y detalles del servicio requerido.</p>
            <h3>2.1. Información que Recopilamos</h3>
            <ul>
            <li>Información de contacto: nombre, dirección de correo electrónico, número de teléfono.</li>
            <li>Información del vehículo: marca, modelo, año, detalles del servicio requerido.</li>
            <li>Información de navegación: cookies, dirección IP, datos de ubicación y comportamiento de navegación en nuestro sitio web.</li>
            </ul>
        </section>

        <section>
            <h2>3. Uso de los Datos</h2>
            <p>La información recopilada será utilizada para:</p>
            <ul>
            <li>Proveer y mejorar nuestros servicios.</li>
            <li>Gestionar citas y servicios de mantenimiento de vehículos.</li>
            <li>Comunicarnos con usted sobre sus citas y servicios.</li>
            <li>Enviar información promocional y actualizaciones de servicios, siempre que haya dado su consentimiento.</li>
            <li>Cumplir con obligaciones legales y reglamentarias.</li>
            </ul>
        </section>

        <section>
            <h2>4. Protección de Datos</h2>
            <p>Autocarest se compromete a proteger la privacidad de sus datos personales. Implementamos medidas de seguridad adecuadas para proteger su información contra accesos no autorizados, alteraciones, divulgaciones o destrucción.</p>
        </section>

        <section>
            <h2>5. Compartición de Datos</h2>
            <p>Autocarest no venderá, intercambiará ni transferirá sus datos personales a terceros sin su consentimiento, salvo en los siguientes casos:</p>
            <ul>
            <li>Proveedores de servicios que nos ayudan a operar nuestro sitio web y realizar nuestro negocio.</li>
            <li>Cumplimiento de obligaciones legales y regulatorias.</li>
            <li>Protección de derechos, propiedad y seguridad de Autocarest y sus usuarios.</li>
            </ul>
        </section>

        <section>
            <h2>6. Derechos del Usuario</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
            <li>Acceder a sus datos personales que hemos recopilado.</li>
            <li>Solicitar la corrección de cualquier dato personal incorrecto o desactualizado.</li>
            <li>Solicitar la eliminación de sus datos personales, salvo que tengamos la obligación legal de conservarlos.</li>
            <li>Retirar su consentimiento para el uso de sus datos en cualquier momento.</li>
            </ul>
        </section>

        <section>
            <h2>7. Cookies</h2>
            <p>Nuestro sitio web utiliza cookies para mejorar su experiencia de usuario. Las cookies son pequeños archivos que un sitio web transfiere a su disco duro a través de su navegador web para permitir que el sitio recuerde cierta información. Usted puede optar por desactivar las cookies a través de la configuración de su navegador, pero esto puede afectar la funcionalidad de nuestro sitio web.</p>
        </section>

        <section>
            <h2>8. Cambios en los Términos y Condiciones</h2>
            <p>Autocarest se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier cambio será publicado en esta página y entrará en vigencia inmediatamente después de su publicación. Le recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.</p>
        </section>

        <section>
            <h2>9. Contacto</h2>
            <p>Si tiene alguna pregunta o inquietud sobre estos términos y condiciones o sobre el uso de sus datos personales, por favor, contáctenos a través de:</p>
            <address>
            Autocarest Cia. Ltda.<br />
            Dirección: [Dirección de tu taller]<br />
            Correo electrónico: [Tu correo electrónico]<br />
            Teléfono: [Tu número de teléfono]
            </address>
            <br />
        </section>
        </div>       
        <Footer />
    </>
  );
};

export default Terms;
