import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Recommended from '../components/Recommended'

export default function Home() {
  return (
    <div className="space-y-7 pb-6 md:space-y-8">
      <Hero />
      <FeatureSection />
      <Recommended />
    </div>
  )
}
