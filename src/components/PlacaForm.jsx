import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { crearPlaca } from '../features/placas/placaSlice'
import { TbSettingsExclamation } from 'react-icons/tb'

const PlacaForm = () => {

    const [placa, setPlaca] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [owner, setOwner] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(crearPlaca({ placa, brand, model, owner }))
        setPlaca('')
    }

    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="descripcion">Ingresa la placa Ej: ABH8433 :</label>
                        <input
                            type="text"
                            name="placa"
                            id="placa"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                        />
                        <label htmlFor="descripcion">Ingresa la marca Ej: Mazda :</label>
                        <input
                            type="text"
                            name="brand"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <label htmlFor="descripcion">Ingresa el modelo Ej: CX-3 :</label>
                        <input
                            type="text"
                            name="model"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                        <label htmlFor="descripcion">Ingresa el nombre del propietario Ej: Julian Salazar :</label>
                        <input
                            type="text"
                            name="owner"
                            id="owner"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">Crear Vehiculo</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default PlacaForm