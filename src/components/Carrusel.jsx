import React from "react";
import Slider from "react-slick";
import Banner from "./Banner";
import Banner2 from "./Banner2";
function Carrusel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <a href="https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%20llantas.%20PROMOWEB:%20LLANTAS">
            <Banner2 />
          </a>
        </div>
        <div>
          <a href="https://wa.me/+593999966466?text=Hola%20Autocarest,%20estoy%20interesado%20en%20agendar%20una%20cita.%20PROMOWEB:%2050%OFF">
            <Banner />
          </a>
        </div>
        <div>
          <Banner />
        </div>
      </Slider>
        <br />
    </div>
    
  );
}

export default Carrusel;
