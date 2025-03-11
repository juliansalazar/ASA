import React, { useState } from 'react';

const WorkOrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    licensePlate: '',
    vehicle: '',
    mileage: '',
    fuelLevel: 0,
    services: {
      abcMotor: false,
      abcBrakes: false,
      adjustment: false,
      suspensionCheck: false,
      steeringCheck: false,
      motorOil: false,
      gearboxOil: false,
      shockAbsorber: false,
      injectorCleaning: false,
      clutchChange: false,
    },
    otherWork: '',
    spareParts: '',
    date: new Date().toISOString().split('T')[0],
  });

  const servicesList = {
    abcMotor: "ABC Motor",
    abcBrakes: "ABC Frenos",
    adjustment: "Ajuste General",
    suspensionCheck: "Revisión de Suspensión",
    steeringCheck: "Revisión de Dirección",
    motorOil: "Cambio de Aceite de Motor",
    gearboxOil: "Cambio de Aceite de Caja",
    shockAbsorber: "Cambio de Amortiguadores",
    injectorCleaning: "Limpieza de Inyectores",
    clutchChange: "Cambio de Embrague",
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        services: { ...prev.services, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input" required />
        </div>
        <div>
          <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} className="input" required placeholder='Cliente' />
        </div>
        <div>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input" placeholder='Email' />
        </div>
        <div>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder='Teléfono' />
        </div>
        <div>
          <input type="text" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleChange} className="input" required placeholder='Placa' />
        </div>
        <div>
          <input type="number" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} className="input" placeholder='Kilometraje/millas' />
        </div>
        <div className="col-span-2">
          <label htmlFor="fuelLevel" className="block">Combustible: {formData.fuelLevel * 100}%</label>
          <input type="range" id="fuelLevel" min="0" max="1" step="0.1" name="fuelLevel" value={formData.fuelLevel} onChange={handleChange} className="w-full" />
        </div>
        <fieldset className="col-span-2 border p-4 rounded">
          <legend className="font-semibold">Servicios</legend>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(servicesList).map(([key, label]) => (
              <label key={key} className="flex items-center space-x-2">
                <input type="checkbox" name={key} checked={formData.services[key]} onChange={handleChange} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="col-span-2">
          <label htmlFor="otherWork" className="block">Otros Trabajos:</label>
          <textarea id="otherWork" name="otherWork" value={formData.otherWork} onChange={handleChange} className="input h-20"></textarea>
        </div>
        <div className="col-span-2">
          <label htmlFor="spareParts" className="block">Repuestos Utilizados:</label>
          <textarea id="spareParts" name="spareParts" value={formData.spareParts} onChange={handleChange} className="input h-20"></textarea>
        </div>
        <div className="col-span-2">
          <button type="submit">Generar Orden</button>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderForm;
