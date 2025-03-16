import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import AdditionalServices from '../components/AdditionalServices';
import GoogleReview from '../components/GoogleReview';
import PlacaList from '../components/PlacaList';
import UserServices from '../components/UserServices';
import '../styles/Home.css';
import { useSelector } from 'react-redux';
import PuntosCliente from '../components/PuntosCliente';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className="main-content">
        {user && (
          <>
            <h2 style={{marginTop:'20px'}}>Bienvenid@, {user?.name || 'Usuario'}!</h2>
            <PuntosCliente />
            <UserServices />
            <PlacaList />
          </>
        )}
        <Banner />
        <AdditionalServices />
        <GoogleReview />
      </div>
      <Footer />
    </>
  );
};

export default Home;