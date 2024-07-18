import '../styles/Navbar.css'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const token = localStorage.getItem('token')

  return (
    <>
        <nav>
            <Link to="/" className='title'>
                Autocarest
            </Link>
            <div className='menu'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li>
                    <NavLink to="/about">Nosotros</NavLink>
                </li>
                <li>
                    <NavLink to="/">Servicios</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Iniciar Sesión</NavLink>
                </li>
                
            </ul>
        </nav>
    </>
  )
}

export default Navbar
