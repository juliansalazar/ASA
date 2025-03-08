// features/auth/authService.js
import axios from 'axios';

const API_URL = 'http://asa-back-zs74.onrender.com/api/users';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true, // Habilita cookies si usas el enfoque de cookie
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
  // Limpia localStorage, pero no hace solicitud al backend
  localStorage.removeItem('user');
};

export default { register, login, resetPassword, logout };