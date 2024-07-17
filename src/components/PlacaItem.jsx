import { useDispatch } from 'react-redux'
import { deletePlaca } from '../features/placas/placaSlice'

const PlacaItem = ({ placa }) => {

    const dispatch = useDispatch()

    return (
        <div className="tarea">
            <h3>{placa.brand} {placa.model}</h3>
            <h4>ID: {placa.placa}</h4>
            <h4>Propietario: {placa.owner}</h4>
            <div>
                Creado: {new Date(placa.createdAt).toLocaleString('es-EC')}
            </div>
            <button onClick={() => dispatch(deletePlaca(placa._id))} className='close'>X</button>
        </div>
    )
}

export default PlacaItem