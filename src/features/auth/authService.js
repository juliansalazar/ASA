// features/auth/authService.js
import axios from 'axios';

// Define la URL del backend usando variables de entorno
const API_URL =  'https://asa-back-zs74.onrender.com/api/users' // 'http://localhost:8080/api/users' || -- utilizar esto para las pruebas

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const resetPassword = async (email) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email });
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('user');
};

export default { register, login, resetPassword, logout };