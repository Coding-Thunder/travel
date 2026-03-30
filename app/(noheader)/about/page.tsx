import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Globe, Award } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About {siteConfig.brand.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Expert-assisted car rental bookings made simple and reliable
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

            <p className="text-lg text-gray-600 mb-4">
              At {siteConfig.brand.name}, we simplify car rental bookings by connecting
              you with trusted rental providers through a guided, expert-assisted process.
            </p>

            <p className="text-lg text-gray-600">
              Instead of complex searches, our team handles the comparison, coordination,
              and booking for you — ensuring a smooth and hassle-free experience from start to finish.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-800" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                  <p className="text-gray-600 text-sm">
                    Your transactions are handled through trusted and secure payment systems
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Expert Assistance</h3>
                  <p className="text-gray-600 text-sm">
                    Real agents help you find and book the right car rental options
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Wide Network</h3>
                  <p className="text-gray-600 text-sm">
                    Access to multiple rental providers across various locations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600 text-sm">
                    Clear pricing with no misleading promises or hidden surprises
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>

            <p className="text-lg text-gray-600 mb-8">
              Call or contact us to get assistance with your car rental booking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>
                <p className="font-semibold mb-1">Phone</p>
                <p className="text-blue-800">{siteConfig.brand.phone}</p>
              </div>

              <div>
                <p className="font-semibold mb-1">Email</p>
                <p className="text-blue-800">{siteConfig.brand.email}</p>
              </div>

              <div>
                <p className="font-semibold mb-1">Location</p>
                <p className="text-gray-600">{siteConfig.brand.location}</p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}