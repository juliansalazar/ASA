import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import AdditionalServices from '../components/AdditionalServices'
import GoogleReview from '../components/GoogleReview'
import Whatsapp from '../components/Whatsapp'
import HomeVideo from '../components/HomeVideo'
import GoogleMaps from '../components/GoogleMaps'
import NuestrosClientes from '../components/NuestrosClientes'

const Home = () => {

    return (
        <>
            <Navbar />
            <HomeVideo />
            <Banner />
            <AdditionalServices />
            <Whatsapp />
            <GoogleMaps />
            <GoogleReview />
            <NuestrosClientes />
            <Footer />
        </>
    )
}
export default Home