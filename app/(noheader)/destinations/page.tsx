import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CallNow from "@/components/CallNow"

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    description: "The City of Light awaits with iconic landmarks, world-class museums, and exquisite cuisine.",
    image: "/eiffel-tower.jpg",
    rating: 4.9,
    reviews: 2847,
    startingPrice: 599,
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    description: "Experience the perfect blend of ancient traditions and cutting-edge technology.",
    image: "/tokyo-skyline.jpg",
    rating: 4.8,
    reviews: 3124,
    startingPrice: 899,
  },
  {
    id: 3,
    name: "New York, USA",
    description: "The city that never sleeps offers endless entertainment, culture, and dining.",
    image: "/new-york-city.jpg",
    rating: 4.7,
    reviews: 4521,
    startingPrice: 449,
  },
  {
    id: 4,
    name: "Dubai, UAE",
    description: "Luxury shopping, ultramodern architecture, and a lively nightlife scene.",
    image: "/dubai-skyline.jpg",
    rating: 4.8,
    reviews: 2156,
    startingPrice: 749,
  },
  {
    id: 5,
    name: "Bali, Indonesia",
    description: "Tropical paradise with stunning beaches, rice terraces, and spiritual temples.",
    image: "/tropical-sunset-palms.png",
    rating: 4.9,
    reviews: 3892,
    startingPrice: 699,
  },
  {
    id: 6,
    name: "London, UK",
    description: "Historic landmarks, royal palaces, and a vibrant cultural scene.",
    image: "/london-bridge.jpg",
    rating: 4.7,
    reviews: 3654,
    startingPrice: 529,
  },
  {
    id: 7,
    name: "Rome, Italy",
    description: "Ancient ruins, Renaissance art, and authentic Italian cuisine.",
    image: "/roman-colosseum.jpg",
    rating: 4.8,
    reviews: 2987,
    startingPrice: 579,
  },
  {
    id: 8,
    name: "Sydney, Australia",
    description: "Iconic Opera House, beautiful harbors, and stunning coastal beaches.",
    image: "/sydney-opera-house.jpg",
    rating: 4.8,
    reviews: 2341,
    startingPrice: 1099,
  },
]

export default function DestinationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-800 to-orange-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Explore Amazing Destinations</h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto text-pretty">
                Discover the world's most beautiful places and create unforgettable memories
              </p>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{destination.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 text-pretty">{destination.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.reviews.toLocaleString()} reviews</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-orange-800">${destination.startingPrice}</p>
                      </div>
                      <CallNow />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
