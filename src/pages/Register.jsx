import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset} from '../features/auth/authSlice'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    const { name, email, password, password2 } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector((state) => (state.auth))

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            toast.success(message)
            navigate('/login')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(password!==password2){
            toast.error('Las contraseñas no coinciden')
            return
        } else {
            const userData = {
                name, email, password
            }
            dispatch(register(userData))
        }
        
    }

  return (
    <>
        <Navbar />
        <br />
        <section className='heading'>
            <FaUser/>
            <h4>Registrate</h4>
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
                        type="text" 
                        className='form-control' 
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Direccion de correo'
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
                <div>
                    <input type="checkbox" name="tyc" id="tyc" required/> He leído y acepto los <a href="/terms" className='registerlink'>terminos y condiciones</a>.
                </div>
                <br />
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>Registrar</button>
                </div>
            </form>
        </section>
        <Footer />
    </>
  )
}
export default Register
