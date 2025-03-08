import '../styles/Navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useState } from 'react';
import { GrMapLocation } from "react-icons/gr";
import { VscCallOutgoing } from "react-icons/vsc";
import { LuCalendarClock } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa

    const isAuthenticated = !!user;

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
        setIsMenuOpen(false); // Cerrar el menú al salir
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <Link to="/" className="title">
                Autocarest
            </Link>
            <button
                className={`menu ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={isMenuOpen ? 'active' : ''}>
                <li>
                    <NavLink to="https://www.google.com/maps/search/Autocarest/@-2.9016935,-79.0299089,17z/data=!3m1!4b1?entry=ttu" onClick={() => setIsMenuOpen(false)}>
                        <GrMapLocation/> Encuéntranos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="https://wa.me/+593999966466?text=Hola%20Autocarest,%20mi%20nombre%20es%20" onClick={() => setIsMenuOpen(false)}>
                        <FaWhatsapp/> Escríbenos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="tel:+59399966466" onClick={() => setIsMenuOpen(false)}>
                        <VscCallOutgoing/> Llámanos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/agenda" onClick={() => setIsMenuOpen(false)}>
                        <LuCalendarClock/> Agenda
                    </NavLink>
                </li>
                {isAuthenticated ? (
                    <li>
                        <NavLink
                            to="/"
                            onClick={handleLogout}
                            className="logout-link"
                        >
                            Cerrar Sesión
                        </NavLink>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                            Iniciar Sesión
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;