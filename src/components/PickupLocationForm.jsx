import React, { useState } from 'react';

const PickupLocationForm = () => {
  // Estado para almacenar la ubicación ingresada por el usuario
  const [location, setLocation] = useState('');
  // Estado para mostrar mensaje de confirmación
  const [message, setMessage] = useState('');

  // Maneja los cambios en el input
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (location.trim() === '') {
      setMessage('Por favor, ingrese una ubicación válida');
      return;
    }

    // Aquí podrías agregar lógica adicional como:
    // - Validación de la dirección
    // - Llamada a una API para verificar la ubicación
    // - Guardar la ubicación en una base de datos
    
    setMessage(`Ubicación confirmada: ${location}`);
    // Opcional: limpiar el input después de enviar
    // setLocation('');
  };

  return (
    <div style={styles.container}>
      <h2>Retiro de Vehículo</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="location" style={styles.label}>
          Ingrese la ubicación de recogida:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          placeholder="Ej: Av. Principal 123, Ciudad"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Confirmar Ubicación
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Estilos básicos (puedes moverlos a un archivo CSS separado)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  }
};

export default PickupLocationForm;