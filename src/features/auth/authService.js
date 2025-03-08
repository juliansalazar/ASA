import axios from 'axios';


const API_URL = 'https://autocarest.com/api/users/'

// Función para registrar un nuevo usuario
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Función para loguear un usuario
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Función para hacer logout
const logout = () => {
    localStorage.removeItem('user');
};

// Función para recuperar la contraseña
const resetPassword = async (email) => {
    const response = await axios.post(API_URL + 'reset-password', { email });
    return response.data; // Asumiendo que la respuesta contiene un mensaje de éxito
};

// Función para actualizar la contraseña después de la recuperación
const updatePassword = async (token, newPassword) => {
    const response = await axios.post(API_URL + 'update-password', { token, newPassword });
    return response.data; // Respuesta con el mensaje de éxito
};

const authService = {
    register,
    login,
    logout,
    resetPassword,  // Función para la recuperación de contraseña
    updatePassword, // Función para la actualización de contraseña
};

export default authService;
