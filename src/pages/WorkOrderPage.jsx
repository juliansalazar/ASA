import React, { useState } from 'react';
import WorkOrderForm from '../components/WorkOrderForm.jsx';
import VehicleDamageDiagram from '../components/VehicleDamageDiagram.jsx';
import "../styles/Contact.css"

const WorkOrderPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [orderNumber, setOrderNumber] = useState(339600);

  const handleFormSubmit = (data) => {
    setOrderData(data);
    setOrderNumber((prev) => prev + 1);
  };

  return (
    <div className='contact-container'>
      <h2>Orden de Trabajo N° {orderNumber}</h2>
      <h1>Autocarest Servicio Automotriz</h1>
      <WorkOrderForm onSubmit={handleFormSubmit} />
      <VehicleDamageDiagram />
    </div>
  );
};

export default WorkOrderPage;