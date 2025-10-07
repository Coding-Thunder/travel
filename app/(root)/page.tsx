import { Footer } from "@/components/footer"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ReviewsSection } from "@/components/reviews-section"
import { FAQSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">
        {/* <HeroSection /> */}
        <WhyChooseUs />
        <FeaturedDestinations />
        <ReviewsSection />
        <FAQSection />
      </main>
      
    </div>
  )
}
