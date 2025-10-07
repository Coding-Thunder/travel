"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/store/hooks"
import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import CallNow from "./CallNow"

export function FeaturedDestinations() {
  const destinations = useAppSelector((state) => state.admin.destinations)

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 text-balance">
            Featured Destinations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover amazing places around the world and start planning your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200 bg-white"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-bold mb-1.5">{destination.city}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-white/90">
                    <MapPin className="h-4 w-4" />
                    {destination.country}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed text-pretty">{destination.description}</p>
                <div className="w-fit mx-auto">
                  <Link className="mx-auto" href="/available-flights">
                  <CallNow />
                </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
