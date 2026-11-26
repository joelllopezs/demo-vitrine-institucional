import Amenities from '../components/site/Amenities'
import Footer from '../components/site/Footer'
import Gallery from '../components/site/Gallery'
import Header from '../components/site/Header'
import Hero from '../components/site/Hero'
import History from '../components/site/History'
import Location from '../components/site/Location'
import Menu from '../components/site/Menu'

export default function Site() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <History />
        <Menu />
        <Gallery />
        <Amenities />
        <Location />
      </main>
      <Footer />
    </>
  )
}
