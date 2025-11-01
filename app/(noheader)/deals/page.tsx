import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Percent, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CallNow from "@/components/CallNow"

// Helper function to get date exactly 6 days ahead
function validIn6Days() {
  const today = new Date();
  today.setDate(today.getDate() + 6);
  return today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
const deals = [
  {
    id: 1,
    title: "Summer Sale: Europe Flights",
    description: "Save up to 40% on flights to major European cities. Limited time offer!",
    discount: "40% OFF",
    validUntil: validIn6Days(),
    image: "/eiffel-tower.jpg",
    category: "Flights",
  },
  {
    id: 2,
    title: "Weekend Car Rental Special",
    description: "Book any car for the weekend and get the third day free!",
    discount: "1 Day FREE",
    validUntil: validIn6Days(),
    image: "/toyota-camry.png",
    category: "Cars",
  },
  {
    id: 3,
    title: "Asia Adventure Package",
    description: "Flight + Hotel combo deals to Tokyo, Bangkok, and Singapore.",
    discount: "35% OFF",
    validUntil: validIn6Days(),
    image: "/tokyo-skyline.jpg",
    category: "Packages",
  },
  {
    id: 4,
    title: "Luxury Car Upgrade",
    description: "Book a standard car and get upgraded to luxury class for free!",
    discount: "FREE UPGRADE",
    validUntil: validIn6Days(),
    image: "/mercedes.png",
    category: "Cars",
  },
  {
    id: 5,
    title: "Caribbean Getaway",
    description: "Exclusive deals on flights to Caribbean islands. Paradise awaits!",
    discount: "30% OFF",
    validUntil: validIn6Days(),
    image: "/tropical-sunset-palms.png",
    category: "Flights",
  },
  {
    id: 6,
    title: "Business Class Flash Sale",
    description: "Upgrade to business class for only $199 extra on select routes.",
    discount: "$199 UPGRADE",
    validUntil: validIn6Days(),
    image: "/business-class.jpg",
    category: "Flights",
  },
]

export default function DealsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Tag className="h-8 w-8" />
                <h1 className="text-4xl md:text-5xl font-bold text-balance">Exclusive Deals & Offers</h1>
              </div>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto text-pretty">
                Save big on your next adventure with our limited-time special offers
              </p>
            </div>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal) => (
                <Card key={deal.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                    <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-700 text-white font-bold px-3 py-1">
                      <Percent className="h-3 w-3 mr-1" />
                      {deal.discount}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {deal.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-balance">{deal.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 text-pretty">{deal.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4" />
                      <span>Valid until {deal.validUntil}</span>
                    </div>
                    <div className="mx-auto w-fit">
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
