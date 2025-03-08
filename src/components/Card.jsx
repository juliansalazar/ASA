import '../styles/Card.css';
import PropTypes from 'prop-types';

const Card = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    const [integer, decimal] = price.toFixed(2).split('.');
    return { integer, decimal };
  };

  const { integer, decimal } = formatPrice(product.price);

  return (
    <div className="card">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        loading="lazy"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/250'; }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="pricing">
          <span className="price">
            <span className="price-decimals">$</span>
            {integer}
            <span className="price-decimals">{decimal}</span>
          </span> + Shipping
        </p>
        {product.listPrice && (
          <p className="list-price">
            List: <span className="ex-price">${product.listPrice.toFixed(2)}</span>
          </p>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    listPrice: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Card;
