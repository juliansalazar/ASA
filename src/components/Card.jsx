import '../styles/Card.css'


const Card = () => {
  return (
    <>
    <section className='content'>
      <div className="card">
      <img src="https://boschecuador.com/productos_gallery/img/51559231e9b918da84cbeb49bcb42aa8.jpg" className="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title">Bateria Bosch S4</h5>
        <p className="card-text">Alta duracion y de libre mantenimiento.</p>
        <p className='pricing' ><span className='price'> <span className='price-decimals'>$</span>129<span className='price-decimals'>99</span> </span> + Shipping</p><p></p>
        <p className='List-Price'>List: <span className='ex-price'>$150.00</span></p>
        <button type="button" className="btn">Agregar al carrito</button>
      </div>
      </div>
    </section>
    </>
  )
}

export default Card