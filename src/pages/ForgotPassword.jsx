import { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword } from '../features/auth/authSlice'; // Asegúrate de crear una acción para manejar el restablecimiento de contraseña
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Por favor, ingresa tu correo electrónico');
            return;
        }

        try {
            setIsLoading(true);
            // Aquí se realiza la acción de reset de contraseña
            await dispatch(resetPassword({ email }));
            toast.success('Revisa tu correo para las instrucciones de recuperación');
            setEmail(''); // Limpiar el campo de correo electrónico
        } catch (error) {
            toast.error('Ocurrió un error al enviar el enlace de recuperación');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <br />
            <section className="heading">
                <FaRegEnvelope />
                <h4>Recupera tu contraseña</h4>
                <p>Por favor, ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Correo electrónico"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                        </button>
                    </div>
                </form>
            </section>

            <Footer />
        </>
    );
};

export default ForgotPassword;
