import Hero from "@/components/hero"
import AbstractSection from "@/components/abstract-section"
import PointCloudSection from "@/components/point-cloud-section"
import HowItWorksSection from "@/components/how-it-works-section"
import RelatedWork from "@/components/related-work"
import Citation from "@/components/citation"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AbstractSection />
      <HowItWorksSection />
      <PointCloudSection />
      <RelatedWork />
      <Citation />
      <Contact />
    </main>
  )
}
