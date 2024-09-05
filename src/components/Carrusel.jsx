import React from "react";
import Slider from "react-slick";
import Banner from "./Banner";

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
          <Banner />
        </div>
        <div>
          <Banner />
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
