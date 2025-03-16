import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Para obtener el usuario autenticado
import '../styles/Store.css';

// Componente Store
const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el usuario autenticado desde Redux
  const { user } = useSelector((state) => state.auth);

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://asa-back-zs74.onrender.com/api/products');
        console.log(response)
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Opcional: Obtener datos protegidos del usuario (si es necesario)
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get('https://asa-back-zs74.onrender.com/api/users/data', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Enviar token para rutas protegidas
            },
          });
          console.log('Datos del usuario:', response.data);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  };

  if (loading) {
    return (
      <>
        <Navbar cartCount={cart.length} />
        <section className="container" style={containerStyles}>
          <p>Cargando productos...</p>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar cartCount={cart.length} />
        <section className="container" style={containerStyles}>
          <p>{error}</p>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar cartCount={cart.length} />
      <section className="container" style={containerStyles}>
        <div className="products-horizontal">
          {products.map((product) => (
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