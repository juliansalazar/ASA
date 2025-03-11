import React from 'react';

const WorkOrderPreview = ({ orderData }) => {
  if (!orderData) return null;

  const { services } = orderData;
  const selectedServices = Object.keys(services)
    .filter((key) => services[key])
    .map((key) => {
      switch (key) {
        case 'abcMotor':
          return 'ABC Motor';
        case 'abcBrakes':
          return 'ABC Frenos';
        case 'adjustment':
          return 'Reajuste';
        case 'suspensionCheck':
          return 'Chequeo Suspensión y Dirección';
        case 'motorOil':
          return 'Aceite Motor';
        case 'gearboxOil':
          return 'Aceite Caja';
        case 'shockAbsorber':
          return 'Amortiguador';
        case 'injectorCleaning':
          return 'Limp. Inyectores';
        case 'clutchChange':
          return 'Cambio Embrague';
        default:
          return '';
      }
    })
    .join(', ');

  return (
    <div style={{ maxWidth: 'auto', margin: '20px auto', border: '1px solid #ccc', padding: '20px' }}>
      <h2>Orden de Trabajo</h2> 
      <p><strong>Fecha:</strong> {orderData.date}</p>
      <p><strong>Señor/a:</strong> {orderData.customerName}</p>
      <p><strong>E-mail:</strong> {orderData.email || 'No proporcionado'}</p>
      <p><strong>Teléfono:</strong> {orderData.phone || 'No proporcionado'}</p>
      <p><strong>Placa:</strong> {orderData.licensePlate}</p>
      <p><strong>Vehículo:</strong> {orderData.vehicle}</p>
      <p><strong>Kilometraje:</strong> {orderData.mileage || 'No proporcionado'} km</p>
      <p><strong>Nivel de Combustible:</strong> {orderData.fuelLevel * 100}%</p>
      <p><strong>Servicios:</strong> {selectedServices || 'Ninguno seleccionado'}</p>
      <p><strong>Otros Trabajos:</strong> {orderData.otherWork || 'No especificado'}</p>
      <p><strong>Repuestos Utilizados:</strong> {orderData.spareParts || 'No especificado'}</p>
    </div>
  );
};

export default WorkOrderPreview;