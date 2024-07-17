import React, { useState } from 'react';
import '../styles/HomeInstallation.css';

const HomeInstallation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Servicio a Domicilio solicitado con éxito');
  };

  return (
    <form className="container form installation-form" onSubmit={handleSubmit}>
      <h2>Solicitar Instalación a Domicilio</h2>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Teléfono:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <label>
        Servicio:
        <select name="service" value={formData.service} onChange={handleChange} required>
          <option value="">Seleccione un servicio</option>
          <option value="battery">Instalación de Batería</option>
          <option value="tires">Cambio de Llantas</option>
          <option value="inspection">Revisión Técnica</option>
        </select>
      </label>
      <label>
        Dirección:
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>
      <label>
        Fecha:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <label>
        Hora:
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      </label>
      <button type="submit" className='btn btn-primary'>Solicitar Servicio</button>
    </form>

  );
};

export default HomeInstallation;
