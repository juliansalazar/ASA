import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from 'react-router-dom'
import { GrMapLocation } from "react-icons/gr";
import { VscCallOutgoing } from "react-icons/vsc";
import { LuCalendarClock } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

const BasicExample = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <nav>
        <Link to="/" className="title">Autocarest</Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <Link to="https://www.google.com/maps/search/Autocarest/@-2.9016935,-79.0299089,17z/data=!3m1!4b1?entry=ttu" > <GrMapLocation/> Encuéntranos</Link>
          </li>
          <li>
            <Link to="https://wa.me/+59399773001?text=Hola%20Autocarest,%20mi%20nombre%20es%20"> <FaWhatsapp/> Escríbenos</Link>
          </li>
          <li>
            <Link to="tel:+59399966466"> <VscCallOutgoing/> Llámanos</Link>
          </li>
          <li>
            <Link to="/agenda"> <LuCalendarClock/> Agenda </Link>
          </li>
        </ul>
        </div>
      </nav>
    </>    
  );
}

export default BasicExample;