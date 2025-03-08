import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import AdditionalServices from '../components/AdditionalServices'
import GoogleReview from '../components/GoogleReview'
import Whatsapp from '../components/Whatsapp'
import PlacaList from '../components/PlacaList'
import '../styles/Home.css'


const Home = () => {

    return (
        <>
            <Navbar />
            <div className="main-content"> {/* Contenedor con margen superior */}
                <Banner />
                <AdditionalServices />
                <PlacaList />
                <GoogleReview />
            </div>
            <Whatsapp />
            <Footer />
        </>
    )
}
export default Home