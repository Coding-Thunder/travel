import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, DollarSign, Clock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Fast Booking",
    description: "Book your flights and cars in minutes with our streamlined process",
    color: "text-blue-800",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Trusted Providers",
    description: "We partner with the most reliable airlines and car rental companies",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description: "Compare prices from multiple providers to get the best deals",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our customer support team is always here to help you with easy refunds",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">Why Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            We make travel booking simple, secure, and affordable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="text-center hover:shadow-xl transition-all duration-300 border-gray-200 hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl mb-6`}
                  >
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
