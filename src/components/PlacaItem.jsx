import { useDispatch, useSelector } from 'react-redux'
import { deletePlaca } from '../features/placas/placaSlice'

const PlacaItem = ({ placa }) => {
    const dispatch = useDispatch()
    const { isLoading, isError, message } = useSelector((state) => state.placa)

    return (
        <div className="tarea">
            <h3>{placa.brand || 'Sin marca'} {placa.model || 'Sin modelo'}</h3>
            <h4>ID: {placa.placa || 'Sin ID'}</h4>
            <h4>Propietario: {placa.owner || 'Sin propietario'}</h4>
            <div>
                Creado: {placa.createdAt ? new Date(placa.createdAt).toLocaleString('es-EC') : 'Fecha no disponible'}
            </div>
            <button
                onClick={() => placa._id && dispatch(deletePlaca(placa._id))}
                className='close'
                disabled={isLoading}
            >
                {isLoading ? 'Eliminando...' : 'X'}
            </button>
            {isError && <p className="error">{message}</p>}
        </div>
    )
}

export default PlacaItem