import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacas, reset } from '../features/placas/placaSlice'
import '../styles/PlacaList.css'

const PlacaList = () => {
    const dispatch = useDispatch()
    const { placas, isLoading, isError, isSuccess, message } = useSelector((state) => state.placa)
    const { user } = useSelector((state) => state.auth) // Obtener el estado del usuario desde el slice de auth

    // Obtener las placas solo si el usuario está autenticado
    useEffect(() => {
        if (user) {
            dispatch(getPlacas())
        }

        // Limpiar el estado al desmontar el componente
        return () => {
            dispatch(reset())
        }
    }, [dispatch, user]) // Dependencia en 'user' para reaccionar a cambios en la autenticación

    // Si no hay sesión iniciada, mostrar mensaje
    if (!user) {
        return (
            <div className="no-auth">
                <p>Por favor inicia sesión para ver tus placas.</p>
            </div>
        )
    }

    // Mostrar mensaje de carga, error o lista de placas
    if (isLoading) {
        return <div className="loading">Cargando placas...</div>
    }

    if (isError) {
        return (
            <div className="error">
                <h3>Error</h3>
                <p>{message}</p>
            </div>
        )
    }

    // Función para formatear la fecha en formato Día/Mes/Año
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options); // Usamos 'es-ES' para formato español
    }

    return (
        <div className="placa-list">
            <h2>Mis Placas</h2>
            {placas.length === 0 ? (
                <p>No hay placas registradas.</p>
            ) : (
                <div className="placas">
                    {placas.map((placa) => (
                        <div key={placa._id} className="placa-card">
                            <h3>{placa.placa}</h3>
                            <p><strong>Marca:</strong> {placa.brand}</p>
                            <p><strong>Modelo:</strong> {placa.model}</p>
                            <p><strong>Registrado:</strong> {formatDate(placa.createdAt)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PlacaList
