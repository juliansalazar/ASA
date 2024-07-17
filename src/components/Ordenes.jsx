import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacas, reset } from '../features/placas/placaSlice'
import Spinner from '../components/Spinner'
import PlacaItem from '../components/PlacaItem'

const Ordenes = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { placas, isLoading, isError, isSuccess, message } = useSelector((state) => state.placa)
    useEffect(() => {
        if (isLoading) {
            console.log('Loading')
            return <Spinner />
        }
        if (isError) {
            console.log(message)
        }
        if (isSuccess) {
            dispatch(reset())
        }
        if (!user) {
            navigate('/login')
        } else {
            dispatch(getPlacas())
        }
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
  return (
    <div>
        <section className='content'>
                {placas.length > 0 ? (
                    <div className="placas">
                        {placas.map((placa) => (
                            <PlacaItem key={placa.placa} placa={placa}/>
                        ))}
                    </div>
                ) : (
                    <h3>No hay vehiculos para mostrar</h3>
                )}
            </section>
    </div>
  )
}

export default Ordenes
