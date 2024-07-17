import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'

const products = [
    { id: 1, name: 'Product 1', image: 'image1.jpg', description: 'Lorem ipsum dolor sit amet', price: 19.99 },
    { id: 2, name: 'Product 2', image: 'image2.jpg', description: 'Lorem ipsum dolor sit amet', price: 29.99 },
    { id: 3, name: 'Product 3', image: 'image3.jpg', description: 'Lorem ipsum dolor sit amet', price: 39.99 },
    { id: 4, name: 'Product 4', image: 'image4.jpg', description: 'Lorem ipsum dolor sit amet', price: 49.99 },
    { id: 5, name: 'Product 5', image: 'image5.jpg', description: 'Lorem ipsum dolor sit amet', price: 59.99 },
]

const Store = () => {

    return (
        <>
            <Navbar />
            <section className='container' style={{ 
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
                

             }}>
                <div className='row mt-5'>
                    <br />
                    {products.map(product => (
                        <div key={product.id} className='product-card'>
                            <img src={product.image} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button className='btn'>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Store