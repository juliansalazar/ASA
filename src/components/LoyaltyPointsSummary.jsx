import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/LoyaltyPointsSummary.css'; // Asegúrate de crear este archivo de estilos

const LoyaltyPointsSummary = () => {
  const { user } = useSelector((state) => state.auth); // Obtener el usuario autenticado desde Redux
  const [totalPoints, setTotalPoints] = useState(0); // Total de puntos acumulados
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores

  // URL del backend (ajusta según tu despliegue en Render)
  const backendUrl = 'https://tu-backend-en-render/api/loyalty/calculate-points';

  // Función para obtener los puntos desde el backend
  const fetchPoints = async () => {
    if (!user?._id) {
      setError('No hay usuario autenticado');
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      console.log('Fetching points from:', backendUrl); // Depuración
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user.token}`, // Si aplica
        },
        body: JSON.stringify({ userId: user._id }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Points data:', data); // Depuración
      setTotalPoints(data.totalPoints || 0);
    } catch (err) {
      console.error('Fetch error:', err); // Depuración
      setError(`Error al cargar los puntos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Cargar los puntos al montar el componente
  useEffect(() => {
    fetchPoints();
  }, [user]); // Se ejecuta cuando cambia el usuario (inicio de sesión)

  // Renderizado condicional
  if (!user) {
    return <div className="loyalty-points-container">Por favor, inicia sesión para ver tus puntos.</div>;
  }

  return (
    <div className="loyalty-points-container">
      <h2>Tus Puntos</h2>
      {loading ? (
        <p>Cargando puntos...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="points-summary">
          <p>
            <strong>Total Acumulado:</strong> {totalPoints} km
          </p>
          <button
            className="refresh-button"
            onClick={fetchPoints}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar Puntos'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoyaltyPointsSummary;