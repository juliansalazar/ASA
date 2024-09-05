import React from "react";
import Slider from "react-slick";
function NuestrosClientes() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    cssEase: "linear",
  };
  return (
    <>
      <div className="container">
        <h1>Nuestros Clientes</h1>
        <p>Confían en Autocarest. ¿Y tu qué esperas?</p>
        <br />
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3rC-y99bINVGs2HakHy3XVYdFDo3Ymk-OQ&s" style={{height: "80px", width: "auto", alignSelf: "center"}}/>
            </div>
            <div>
              <img src="https://www.starflowers.com.ec/logomal.jpg" style={{height: "80px", width: "auto", alignSelf: "center"}}/>
            </div>
            <div>
              <img src="data:image/jpeg;base64,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" style={{height: "80px", width: "auto", alignSelf: "center"}}/>
            </div>
            <div>
              <img src="https://consulfinco.com/img/clientes/MegaLimpio.jpg" style={{height: "80px", width: "auto", alignSelf: "center"}}/>
            </div>
            <div>
              <img src="https://blog.gustavomoscoso.com/wp-content/uploads/2015/03/logo-negro.png" style={{height: "80px", width: "auto", alignSelf: "center"}} />
            </div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7XdB67ZggEanxuOM3jyb77SQ4O-4jvu6qoA&s" style={{height: "80px", width: "auto", alignSelf: "center"}} />
            </div>
          </Slider>
        </div>
        <br />
      </div>
    </>
  );
}

export default NuestrosClientes;
