import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdditionalServices from '../components/AdditionalServices'
import GoogleReview from '../components/GoogleReview'
import Whatsapp from '../components/Whatsapp'
import NuestrosClientes from '../components/NuestrosClientes'
import Carrusel from '../components/Carrusel'

const Home = () => {

    return (
        <>
            <Whatsapp />
            <Navbar />
            <Carrusel />
            <AdditionalServices />
            <NuestrosClientes />
            <GoogleReview />
            <Footer />
        </>
    )
}
export default Home