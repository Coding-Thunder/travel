"use client"

import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: `Booked a hotel and flight for my business trip through ${siteConfig.brand.name}. Everything was smooth and prices were competitive. The OTA platform made it super easy!`,
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    text: `Used ${siteConfig.brand.name} to book multiple flights and hotels. The booking process was seamless, and I received instant confirmations for all my reservations. Highly recommend this OTA!`,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    text: `Found amazing hotel deals and flights for my family vacation on ${siteConfig.brand.name}. The OTA interface is intuitive, and the support team helped me with cancellations and modifications.`,
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    text: `Booked flights and multiple hotel rooms for our corporate team via ${siteConfig.brand.name}. As an OTA, they made managing group bookings and payment hassle-free.`,
  },
]


export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied travelers who trust us with their bookings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-xl transition-all duration-300 border-border/50 bg-card">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 text-pretty">{review.text}</p>
                <div className="border-t border-border/50 pt-4">
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  {/* <p className="text-sm text-muted-foreground">{review.role}</p> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
