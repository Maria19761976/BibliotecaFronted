import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Recommended from '../components/Recommended'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeatureSection />
      <Recommended />
      <Footer />
    </div>
  )
}