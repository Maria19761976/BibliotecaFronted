import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Recommended from '../components/Recommended'

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <FeatureSection />
      <Recommended />
    </div>
  )
}
