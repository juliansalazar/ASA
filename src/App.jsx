import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Terms from './pages/Terms'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Store from './pages/Store'
import Agenda from './pages/Agenda'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/store" element={<Store />} />
            <Route path="/agenda" element={<Agenda />} />
          </Routes>
      </Router>
      <ToastContainer position="top-right" />  
    </>
  )
}

export default App
