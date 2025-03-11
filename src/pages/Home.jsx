import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import AdditionalServices from '../components/AdditionalServices';
import GoogleReview from '../components/GoogleReview';
import PlacaList from '../components/PlacaList';
import UserServices from '../components/UserServices';
import '../styles/Home.css';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className="main-content">
        {user && (
          <>
                <h2 className='welcome'>Bienvenid@, {user?.name || 'Usuario'}!</h2>
                <UserServices />
                <PlacaList />
          </>
        )}
      </div>
      <div className="main-content">
        <Banner />
        <AdditionalServices />
      </div>
      <GoogleReview />
      <Footer />
    </>
  );
};

export default Home;