import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        identificacion: '',
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isNaturalPerson, setIsNaturalPerson] = useState(true);

    const { name, email, password, password2, identificacion } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success('¡Registro exitoso! Inicia sesión para continuar.');
            navigate('/login');
        }
        return () => {
            dispatch(reset());
        };
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const onPersonTypeChange = (e) => {
        setIsNaturalPerson(e.target.checked);
        setFormData({ ...formData, identificacion: '' }); // Limpiar el campo al cambiar
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Validación de campos obligatorios
        if (!name || !email || !password || !password2 || !identificacion) {
            toast.error('Por favor, completa todos los campos');
            return;
        }

        // Validación de contraseñas
        if (password !== password2) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        // Validación de términos y condiciones
        if (!termsAccepted) {
            toast.error('Debes aceptar los términos y condiciones');
            return;
        }

        // Validación de Cédula (10 dígitos) o RUC (13 dígitos)
        const identificacionLength = identificacion.length;
        if (isNaturalPerson) {
            if (!/^\d{10}$/.test(identificacion)) {
                toast.error('La cédula debe tener exactamente 10 dígitos numéricos');
                return;
            }
        } else {
            if (!/^\d{13}$/.test(identificacion)) {
                toast.error('El RUC debe tener exactamente 13 dígitos numéricos');
                return;
            }
        }

        const userData = {
            name,
            email,
            password,
            identificacion,
            type: isNaturalPerson ? 'natural' : 'juridica',
        };
        dispatch(register(userData));
    };

    return (
        <>
            <Navbar />
            <br />
            <section className='heading'>
                <FaUser />
                <h4>Regístrate</h4>
                <p>Por favor completa los siguientes datos.</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Nombre'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Dirección de correo'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Contraseña'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirma tu contraseña'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>
                            <input
                                type="checkbox"
                                checked={isNaturalPerson}
                                onChange={onPersonTypeChange}
                            />
                            Persona Natural (Cédula) / Desmarcar para Persona Jurídica (RUC)
                        </label>
                    </div>
                    <div className='form-group'>
                        <input
                            type="text"
                            className='form-control'
                            id='identificacion'
                            name='identificacion'
                            value={identificacion}
                            placeholder={isNaturalPerson ? 'Cédula' : 'RUC'}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="tyc"
                            id="tyc"
                            checked={termsAccepted}
                            onChange={onTermsChange}
                        /> He leído y acepto los <a href="/terms" className='registerlink'>términos y condiciones</a>.
                    </div>
                    <br />
                    <div className="form-group">
                        <button
                            type='submit'
                            className='btn btn-block'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </section>
            <Footer />
        </>
    );
};

export default Register;