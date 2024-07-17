import { useDispatch } from 'react-redux'
import { deleteProduct } from '../features/products/productSlice'

const ProductItem = ({ products }) => {

    const dispatch = useDispatch()

    return (
        <div className="tarea">
            <h3>{products.name}</h3>
            <button onClick={() => dispatch(deleteProduct(products._id))} className='close'>X</button>
        </div>
    )
}

export default ProductItem