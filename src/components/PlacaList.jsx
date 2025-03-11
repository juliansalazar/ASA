import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacas, reset } from '../features/placas/placaSlice'
import '../styles/PlacaList.css'

const PlacaList = () => {
    const dispatch = useDispatch()
    const { placas, isLoading, isError, message } = useSelector((state) => state.placa)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            dispatch(getPlacas())
        }

        return () => {
            dispatch(reset())
        }
    }, [dispatch, user])

    if (!user) {
        return (
            <div className="no-auth">
                <p>Por favor inicia sesión para ver tus placas.</p>
            </div>
        )
    }

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

    // Función para determinar el estado del mantenimiento
    const getMantenimientoStatus = (nextServiceDate) => {
        if (!nextServiceDate) return "Desconocido";  // Si no hay fecha, estado desconocido
    
        const today = new Date();
        const nextService = new Date(nextServiceDate);
    
        // Si la fecha de servicio está en el futuro
        if (nextService > today) {
            const diffTime = nextService - today;  // Diferencia de tiempo
            const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Días de diferencia
    
            // Si el mantenimiento está a menos de 30 días, marcarlo como "Próximo mantenimiento"
            if (diffDays <= 30) {
                return "Próximo mantenimiento";
            } else {
                return "Al día";  // Si la diferencia es mayor a 30 días, el vehículo está al día
            }
        }
    
        // Si la fecha de servicio ya pasó, está atrasado
        return "Atrasado";
    }
    

    return (
        <div className="placa-list">
            <h2>Mis Placas</h2>
            {placas.length === 0 ? (
                <p>No hay placas registradas.</p>
            ) : (
                <div className="placas">
                    {placas.map((placa) => {
                        const mantenimientoStatus = getMantenimientoStatus(placa.mantenimiento?.nextService);
                        return (
                            <div key={placa._id} className="placa-card">
                                <h3>{placa.placa}</h3>
                                <p><strong>Marca:</strong> {placa.brand}</p>
                                <p><strong>Modelo:</strong> {placa.model}</p>
                                <p><strong>Registrado:</strong> {new Date(placa.createdAt).toLocaleDateString()}</p>
                                <p><strong>Mantenimiento:</strong> 
                                    <span className={`status-badge ${mantenimientoStatus}`}>
                                        {mantenimientoStatus}
                                    </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default PlacaList;
