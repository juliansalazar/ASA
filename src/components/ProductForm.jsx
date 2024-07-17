import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../features/products/productSlice'

const ProductForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createProduct({ name, description, price, image }))
        setName('')
        setDescription('')
        setPrice('')
        setImage('')
        alert('Producto creado con éxito')
        window.location.reload(false)
        window.scrollTo(0, 0)
        window.history.back()
    }
    return (
        <>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Ingresa nombre de producto: </label>
                        <input
                            type="text"
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="description">Ingresa la descripcion del producto: </label>
                        <input
                            type="text"
                            className='form-control'
                            id='description'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="price">Ingresa el precio del producto: </label>
                        <input
                            type="text"
                            className='form-control'
                            id='price'
                            name='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="image">Ingresa la URL de la imagen: </label>
                        <input
                            type="text"
                            className='form-control'
                            id='image'
                            name='image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">Crear Producto</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ProductForm