import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import AdditionalServices from '../components/AdditionalServices'
import GoogleReview from '../components/GoogleReview'
import Whatsapp from '../components/Whatsapp'
import NuestrosClientes from '../components/NuestrosClientes'
import Calendly from '../components/Calendly'

const Home = () => {

    return (
        <>
            <Whatsapp />
            <Navbar />
            <Banner />
            <Calendly />
            <AdditionalServices />
            <NuestrosClientes />
            <GoogleReview />
            <Footer />
        </>
    )
}
export default Home