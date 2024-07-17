import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Terms from './pages/Terms'
import About from './pages/About'
import Contact from './pages/Contact'
import Store from './pages/Store'


function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-right" />  
    </>
  )
}

export default App
