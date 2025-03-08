// Ejemplo en un componente protegido (e.g., Store.jsx)
import axios from 'axios';
import { useEffect } from 'react';

const ProtectedComponent = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        const response = await axios.get('https://asa-back-zs74.onrender.com/api/users/data', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Datos protegidos:', response.data);
      }
    };
    fetchProtectedData();
  }, []);

  return <div>Contenido protegido</div>;
};

export default ProtectedComponent;