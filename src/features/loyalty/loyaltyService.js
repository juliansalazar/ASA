// src/services/loyaltyService.js
import axios from 'axios';

// Base URL de tu API en Render
const API_URL = 'https://asa-back-zs74.onrender.com/api/loyaltypoints'; // 'http://localhost:8080/api/loyaltypoints' || 


// Configuración de axios con token si tienes autenticación
const getConfig = () => {
  const token = localStorage.getItem('token'); // Ejemplo de token en localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Obtener los puntos de lealtad de un usuario
export const getLoyaltyPoints = async (identificacion) => {
  if (!identificacion) {
    throw new Error('Identificación no proporcionada');
  }
  try {
    const response = await axios.get(`${API_URL}/loyalty/${identificacion}`, getConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching loyalty points:', error);
    throw error;
  }
};

// Actualizar los puntos de lealtad manualmente
export const updateLoyaltyPoints = async (identificacion, points) => {
  if (!identificacion) {
    throw new Error('Identificación no proporcionada');
  }
  try {
    const response = await axios.post(
      `${API_URL}/loyalty/update`,
      { userId: identificacion, points },
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating loyalty points:', error);
    throw error;
  }
};

// Sincronizar con Contifico
export const syncContificoLoyalty = async (identificacion, tipoIdentificacion) => {
  if (!identificacion || !tipoIdentificacion) {
    throw new Error('Faltan identificación o tipo de identificación');
  }
  try {
    const response = await axios.post(
      `${API_URL}/loyalty/sync-contifico`,
      { identificacion, tipoIdentificacion },
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error syncing with Contifico:', error);
    throw error;
  }
};

// Canjear puntos
export const redeemLoyaltyPoints = async (identificacion, pointsToRedeem) => {
  if (!identificacion) {
    throw new Error('Identificación no proporcionada');
  }
  try {
    const response = await axios.post(
      `${API_URL}/loyalty/redeem`,
      { userId: identificacion, pointsToRedeem },
      getConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error redeeming loyalty points:', error);
    throw error;
  }
};