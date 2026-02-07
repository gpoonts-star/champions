import { Navigation } from "@/components/navigation"
import { SocialHeader } from "@/components/social-header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProgramsSection } from "@/components/programs-section"
import { BranchesSection } from "@/components/branches-section"
import { ContactSection } from "@/components/contact-section"
import { RatingSystem } from "@/components/rating-system"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SocialHeader />
      <Navigation />
      <HeroSection />
      <BranchesSection />
      <AboutSection />
      <ProgramsSection />
      <RatingSystem />
      <ContactSection />
    </main>
  )
}
