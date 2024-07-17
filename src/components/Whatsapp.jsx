import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const Whatsapp = () => {
  return (
    <>
      <div className="App">
      <FloatingWhatsApp 
      phoneNumber="+593984976911" // WhatsApp business number
      float={true} // Whether to float or not. Default: true
      floatPosition="right" // Position of the float, options: 'left', 'right', 'top', 'bottom'. Default: 'right'
      sidebar="true" // Whether to have a sidebar. Default: false
      messageDelay={true} // Delay
      chatMessage="Hola, gracias por comunicarte con nosotros. ¿En qué te podemos ayudar?"
      accountName="Autocarest"
      avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6obwRpA3XrkwhBylvVy_y9fKPBhkTotBniw&s"
      allowClickAway
      allowEsc
      />
    </div>
    </>
  )
}

export default Whatsapp
