import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, login } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/'); // Redirige si ya está autenticado
        }

        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    // Validación de los campos del formulario
    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        // Validación de email
        if (!email) {
            newErrors.email = 'El email es requerido';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Por favor, introduce un email válido';
            valid = false;
        }

        // Validación de contraseña
        if (!password) {
            newErrors.password = 'La contraseña es requerida';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Si hay errores, no enviamos el formulario
        }

        const userData = { email, password };
        dispatch(login(userData)); // La navegación se maneja en el useEffect
    };

    return (
        <>
            <Navbar />
            <section className='login-container'>
                <div className="login-card">
                    <div className="login-header">
                        <FaSignInAlt size={40} />
                        <h4>Ingresa a la App</h4>
                        <p>Por favor escribe tu email y contraseña</p>
                        <p>
                            ¿Aún no tienes cuenta? <a href="/register" className='registerlink'>Regístrate aquí</a>
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="login-form">
                        <div className="form-group">
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id='email'
                                name='email'
                                value={email}
                                placeholder='Por favor escribe tu email'
                                onChange={onChange}
                                aria-label="Email"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id='password'
                                name='password'
                                value={password}
                                placeholder='Por favor escribe tu contraseña'
                                onChange={onChange}
                                aria-label="Contraseña"
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="form-group">
                            <button
                                type='submit'
                                className='btn btn-block'
                                disabled={isLoading} // Deshabilitar mientras carga
                            >
                                {isLoading ? 'Cargando...' : 'Accesar'}
                            </button>
                        </div>

                        {/* Botón para ir a la página de recuperación de contraseña */}
                        <div className="form-group text-center">
                            <a href="/forgot-password" className="forgot-password-link">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login;
