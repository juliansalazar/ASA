import React, { useState } from 'react';

const VehicleDamageDiagram = () => {
  const [damages, setDamages] = useState([]); // Array para guardar las coordenadas de los daños

  const handleClick = (e) => {
    const svg = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svg.left;
    const y = e.clientY - svg.top;
    setDamages([...damages, { x, y }]); // Agregar nuevo daño
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h3>Diagrama de Daños</h3>
      <svg
        width="400"
        height="200"
        style={{ border: '1px solid black', cursor: 'crosshair' }}
        onClick={handleClick}
      >
        {/* Esquema básico del vehículo */}
        <rect x="50" y="50" width="300" height="100" fill="#d3d3d3" stroke="black" /> {/* Cuerpo */}
        <rect x="70" y="30" width="100" height="40" fill="#add8e6" stroke="black" /> {/* Cabina */}
        <circle cx="100" cy="150" r="20" fill="black" /> {/* Rueda delantera */}
        <circle cx="300" cy="150" r="20" fill="black" /> {/* Rueda trasera */}

        {/* Marcas de daños */}
        {damages.map((damage, index) => (
          <circle key={index} cx={damage.x} cy={damage.y} r="5" fill="red" />
        ))}
      </svg>
      <p>Daños registrados: {damages.length}</p>
      <button onClick={() => setDamages([])}>Limpiar Daños</button>
    </div>
  );
};

export default VehicleDamageDiagram;