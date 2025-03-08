import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useState } from 'react';
import '../styles/Store.css'; // Asegúrate de importar el CSS

const PRODUCTS = [
  {
    id: 1,
    name: 'Bateria Bosch S4',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Alta duracion y de libre mantenimiento',
    price: 129.99,
    listPrice: 150.00,
  },
  {
    id: 2,
    name: 'Bateria Bosch S5',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Mayor potencia y durabilidad',
    price: 149.99,
    listPrice: 170.00,
  },
  {
    id: 1,
    name: 'Bateria Bosch S4',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Alta duracion y de libre mantenimiento',
    price: 129.99,
    listPrice: 150.00,
  },
  {
    id: 2,
    name: 'Bateria Bosch S5',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Mayor potencia y durabilidad',
    price: 149.99,
    listPrice: 170.00,
  },
  {
    id: 1,
    name: 'Bateria Bosch S4',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Alta duracion y de libre mantenimiento',
    price: 129.99,
    listPrice: 150.00,
  },
  {
    id: 2,
    name: 'Bateria Bosch S5',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Mayor potencia y durabilidad',
    price: 149.99,
    listPrice: 170.00,
  },
  {
    id: 1,
    name: 'Bateria Bosch S4',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Alta duracion y de libre mantenimiento',
    price: 129.99,
    listPrice: 150.00,
  },
  {
    id: 2,
    name: 'Bateria Bosch S5',
    image: 'https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg',
    description: 'Mayor potencia y durabilidad',
    price: 149.99,
    listPrice: 170.00,
  },
];

const Store = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  };

  return (
    <>
      <Navbar cartCount={cart.length} />
      <section className="container" style={containerStyles}>
        <div className="products-horizontal">
          {PRODUCTS.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Store;