// features/auth/authService.js
import axios from 'axios';

const API_URL = 'https://asa-back-zs74.onrender.com/api/users';

// Registrar usuario
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login de usuario
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true, // Habilita el envío de cookies si usas el enfoque de cookie en el backend
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data; // Debería incluir token y datos del usuario
};

// Recuperar contraseña
const resetPassword = async (email) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email });
  return response.data;
};

// Logout
const logout = async () => {
  // No necesitas una solicitud al backend si solo limpias localStorage
  // Si el backend requiere una acción de logout, descomenta y ajusta:
  // await axios.post(`${API_URL}/logout`);
};

export default { register, login, resetPassword, logout };