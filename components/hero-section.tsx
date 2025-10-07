"use client"
import { useState } from "react"
import { Plane, Car } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import SearchFlights from "@/components/search-flights"
import SearchCar from "@/components/search-car"

const heroImages = [
  "/tropical-sunset-palms.png",
  "/snow-capped-mountains.png",
  "/city-night-skyline.png",
  "/desert-sand-dunes.png",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [activeTab, setActiveTab] = useState("flights")

  useState(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  })

  return (
    <div className="relative min-h-[680px] max-h-fit py-8 md:py-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={image || "/placeholder.svg"} alt="Travel destination" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance drop-shadow-2xl leading-tight">
            Find Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white/95 text-pretty drop-shadow-lg font-medium">
            Compare and book flights, hotels, and car rentals
          </p>
        </div>

        {/* Search Box with Tabs */}
        <div className="flex flex-col gap-0">
          {/* Tab Buttons - Separate from search box */}
          <div className="flex gap-2 mb-[-1px] z-10">
            <button
              onClick={() => setActiveTab("flights")}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3.5 rounded-t-xl font-semibold transition-all border-b-2",
                activeTab === "flights"
                  ? "bg-white text-primary border-primary shadow-sm"
                  : "bg-white/90 text-gray-600 border-transparent hover:bg-white",
              )}
            >
              <Plane className="h-5 w-5" />
              Flights
            </button>
            <button
              onClick={() => setActiveTab("cars")}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3.5 rounded-t-xl font-semibold transition-all border-b-2",
                activeTab === "cars"
                  ? "bg-white text-primary border-primary shadow-sm"
                  : "bg-white/90 text-gray-600 border-transparent hover:bg-white",
              )}
            >
              <Car className="h-5 w-5" />
              Cars
            </button>
          </div>

          {/* Search Box - Clean white card */}
          <Card className="p-8 shadow-2xl bg-white rounded-xl rounded-tl-none border-0">
            {activeTab === "flights" && <SearchFlights />}
            {activeTab === "cars" && <SearchCar />}
          </Card>
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center gap-2.5 mt-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${index === currentImage ? "w-10 bg-white shadow-lg" : "w-2 bg-white/60 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
