// src/ContactUs.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import emailjs from 'emailjs-com';

const SERVICE_ID = "contact_service";
const TEMPLATE_ID = "contact_form";
const PUBLIC_KEY = "Rq3-OIs79dOplGgLT";

const Contact = () => {
    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
          .then((result) => {
            console.log(result.text);
            alert('Mensaje enviado!')
          }, (error) => {
            console.log(error.text);
            alert('Hubo algún error al enviar el mensaje! Trata otra vez...')
          });
        e.target.reset()
      };
    return (
    <>  
        <Navbar />
        <section className='heading'>
            <br />
            <h3>Contáctanos</h3>
            <h6>Te daremos una respuesta en menos de 24 horas.</h6>
        </section>
        <section className='form'>
            <div>
                <form className="formContainer" onSubmit={handleOnSubmit}>    
                    <div className="form-group">
                        <label>Nombre y Apellido: </label>
                        <input type="text" id="from_name" name="from_name" placeholder="Julian Salazar" required />
                    </div>
                    <div className="form-group">
                        <label>E-mail: </label>
                        <input type="email" id="from_email" name="from_email" placeholder="julian@gmail.com" required />
                    </div>
                    <div className="form-group">
                        <label>Mensaje: </label>
                        <br />
                        <textarea name="message" rows="8" cols="30" placeholder="Cuentanos, ¿en qué podemos ayudarte?" required />
                    </div>
                    <button type='submit' className='btn btn-block'>Enviar</button>
                </form>
            </div>
        </section>
        <Footer />
    </>
    )
}

export default Contact;