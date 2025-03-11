import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getPlacas, reset } from '../features/placas/placaSlice'; // Asegúrate de tener esta acción
import '../styles/ManagePlates.css'; // Asegúrate de que este archivo de estilos esté disponible
import PlacaForm from '../components/PlacaForm.jsx'
import DeletePlateButton from '../components/DeletePlateButton.jsx'

const ManagePlates = () => {
  const dispatch = useDispatch();
  const { placas, isLoading, isError, isSuccess, message } = useSelector((state) => state.placa);
  const { user } = useSelector((state) => state.auth); // Obtener el estado del usuario desde el slice de auth
  const [newPlate, setNewPlate] = useState('');
  const [loading, setLoading] = useState(true);

  // Obtener las placas solo si el usuario está autenticado
  useEffect(() => {
    if (user) {
      dispatch(getPlacas());
    }

    // Limpiar el estado al desmontar el componente
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  // Si no hay sesión iniciada, mostrar mensaje
  if (!user) {
    return (
      <div className="no-auth">
        <p>Por favor inicia sesión para ver tus placas.</p>
      </div>
    );
  }

  // Mostrar mensaje de carga, error o lista de placas
  if (isLoading) {
    return <div className="loading">Cargando placas...</div>;
  }

  if (isError) {
    return (
      <div className="error">
        <h3>Error</h3>
        <p>{message}</p>
      </div>
    );
  }

  // Maneja el cambio en el input para agregar una nueva placa
  const handleInputChange = (e) => {
    setNewPlate(e.target.value);
  };

  // Función para formatear la fecha en formato Día/Mes/Año
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options); // Usamos 'es-ES' para formato español
  };

  // Agrega una nueva placa
  const handleAddPlate = (e) => {
    e.preventDefault();
    if (!newPlate.trim()) {
      toast.error('Por favor, ingresa un número de placa válido');
      return;
    }

    // Llamada a la API para agregar la placa (esto debe ser manejado por tu backend)
    fetch('/api/plates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`, // Aquí debes agregar el token en los headers
      },
      body: JSON.stringify({
        placa: newPlate,
        brand: 'Marca Desconocida', // Puedes modificar esto según sea necesario
        model: 'Modelo Desconocido', // Puedes modificar esto según sea necesario
      }),
    })
      .then((response) => response.json())
      .then((newPlateData) => {
        dispatch(getPlacas()); // Recargar las placas
        setNewPlate(''); // Limpiar el input
        toast.success('Placa agregada exitosamente');
      })
      .catch((error) => {
        toast.error('Hubo un problema al agregar la placa');
      });
  };

  // Elimina una placa
  const handleDeletePlate = (id) => {
    // Verificar si el token es válido
    if (!user || !user.token) {
        toast.error('Token de autenticación no válido');
        return;
    }

    // Llamada a la API para eliminar la placa
    fetch(`/api/plates/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${user.token}`, // Aquí debes agregar el token en los headers
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al eliminar la placa');
            }
            return response.json();
        })
        .then(() => {
            dispatch(getPlacas()); // Recargar las placas
            toast.success('Placa eliminada exitosamente');
        })
        .catch((error) => {
            toast.error(`Hubo un problema al eliminar la placa: ${error.message}`);
        });
};


  return (
    <div className="manage-plates">
      <h1>Gestionar tus Placas</h1>
      <PlacaForm />
      {/* Lista de placas */}
      <div className="plates-list">
        {placas.length === 0 ? (
          <p>No tienes placas registradas.</p>
        ) : (
          <ul>
            {placas.map((placa) => (
              <li key={placa._id} className="plate-item">
                <div className="plate-info">
                  <h3>{placa.placa}</h3>
                  <p><strong>Marca:</strong> {placa.brand}</p>
                  <p><strong>Modelo:</strong> {placa.model}</p>
                  <p><strong>Registrado:</strong> {formatDate(placa.createdAt)}</p>
                </div>
                <DeletePlateButton placaId={placa._id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManagePlates;
