import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../features/products/productSlice'
import Spinner from '../components/Spinner'
import ProductItem from './ProductItem'

const Productos = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { products, isLoading, isError, isSuccess, message } = useSelector((state) => state.products)



    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    return (
        <div>
            <section className='content'>
                {products.lenght > 0 ? (
                    <div>
                        {products.map((product) => (
                            <ProductItem key={product.name} product={product} />
                        ))}                        
                    </div>
                ) : (
                    <h3>No hay productos para mostrar</h3>
                )}
            </section>
        </div>
    )
}

export default Productos
