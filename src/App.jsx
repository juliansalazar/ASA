import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Terms from './pages/Terms.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import Store from './pages/Store.jsx';
import Agenda from './pages/Agenda.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ManagePlates from './pages/ManagePlates.jsx';
import WorkOrderPage from './pages/WorkOrderPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import CookieConsent from './components/CookieConsent';
import Whatsapp from './components/Whatsapp';
import PrivateRoute from './components/PrivateRoute.jsx';
import History from './pages/History.jsx';

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Rutas protegidas */}
          <Route
            path="/agenda"
            element={
              <PrivateRoute>
                <Agenda />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-plates"
            element={
              <PrivateRoute>
                <ManagePlates />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/work-order"
            element={
              <PrivateRoute adminOnly={true}>
                <WorkOrderPage />
              </PrivateRoute>
            }
          />
          {/* Ruta opcional para no autorizado */}
          <Route path="/unauthorized" element={<h1>No tienes permisos para acceder a esta página</h1>} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
      <CookieConsent />
      <Whatsapp />
    </>
  );
}

export default App;