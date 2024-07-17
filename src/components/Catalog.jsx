import React from 'react';
import '../styles/Catalog.css';

const products = [
  { id: 1, name: 'Batería', description: 'Batería de alta duración de libre mantenimiento', price: 100, image: 'bateria' },
  { id: 2, name: 'Llantas', description: 'Llantas de alta resistencia', price: 50, image: 'tire.jpg' },
  { id: 3, name: 'Aceite Full Sintético', description: 'Filtro de aceite premium', price: 25, image: 'oil_filter.jpg' },
  { id: 4, name: 'Filtro de Aceite', description: 'Filtro de aceite premium', price: 25, image: 'oil_filter.jpg' },
  { id: 5, name: 'Importaciones', description: 'Importación de autopartes para todos los vehículos', price: 50, image: 'tire.jpg' },
];

const Catalog = () => {
  return (
    <div className="container catalog-container">
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <button className='btn btn-primary'>Añadir al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
