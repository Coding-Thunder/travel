import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Globe, Award } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">About {siteConfig.brand.name}</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
                Your trusted partner for seamless travel experiences worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4 text-pretty">
              At {siteConfig.brand.name}, we're dedicated to making travel accessible, affordable, and hassle-free for
              everyone. We believe that exploring the world should be an exciting adventure, not a stressful ordeal.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-pretty">
              Powered by {siteConfig.brand.poweredBy}, we leverage cutting-edge technology to bring you the best deals
              on flights and car rentals, ensuring you get the most value for your money while enjoying a seamless
              booking experience.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-800" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Booking</h3>
                  <p className="text-gray-600 text-sm text-pretty">
                    Your data is protected with industry-leading security measures
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm text-pretty">Our dedicated team is always here to help you</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Coverage</h3>
                  <p className="text-gray-600 text-sm text-pretty">Access to thousands of destinations worldwide</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
                  <p className="text-gray-600 text-sm text-pretty">Competitive rates and exclusive deals guaranteed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-600 mb-8 text-pretty">
              Have questions? We'd love to hear from you. Our team is ready to assist with your travel needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Phone</p>
                <p className="text-blue-800">{siteConfig.brand.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Email</p>
                <p className="text-blue-800">{siteConfig.brand.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Location</p>
                <p className="text-gray-600">{siteConfig.brand.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
