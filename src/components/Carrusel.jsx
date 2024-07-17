import '../styles/Carrusel.css'
import React from 'react'

const Carrusel = () => {

  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ]

  return (
    <div className='carousel'>
        <div >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
    </div>
  )
}

export default Carrusel
