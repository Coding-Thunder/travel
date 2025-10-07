import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { siteConfig } from "@/lib/config"

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Cancellation & Refund Policy</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
                Understanding your rights and our policies
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-blue-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      This policy applies to bookings made through {siteConfig.brand.name}. Please note that airline and
                      car rental companies may have their own cancellation policies that supersede ours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="prose prose-blue max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Cancellations</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation Within 24 Hours</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you cancel your flight booking within 24 hours of purchase and your departure date is at least 7
                  days away, you are eligible for a full refund with no cancellation fees.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation After 24 Hours</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>7+ days before departure: $50 cancellation fee + airline penalties</li>
                  <li>3-6 days before departure: $100 cancellation fee + airline penalties</li>
                  <li>Less than 3 days before departure: $150 cancellation fee + airline penalties</li>
                  <li>No-show: No refund available</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Non-Refundable Tickets</h3>
                <p className="text-gray-600 leading-relaxed">
                  Some promotional fares are non-refundable. In such cases, you may be eligible for a travel credit
                  minus applicable fees, subject to airline policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Rental Cancellations</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Standard Cancellation Policy</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>48+ hours before pickup: Free cancellation, full refund</li>
                  <li>24-48 hours before pickup: $25 cancellation fee</li>
                  <li>Less than 24 hours before pickup: One day rental charge</li>
                  <li>No-show: Full rental amount charged</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prepaid Reservations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Prepaid car rental reservations may have different cancellation terms. Please review your booking
                  confirmation for specific details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Approved refunds will be processed within 7-10 business days to the original payment method. Please
                  note that your bank or credit card company may take additional time to post the refund to your
                  account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Cancel</h2>
                <p className="text-gray-600 leading-relaxed mb-4">To cancel your booking, please:</p>
                <ol className="list-decimal pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Log in to your account and go to "My Bookings"</li>
                  <li>Select the booking you wish to cancel</li>
                  <li>Click "Cancel Booking" and follow the prompts</li>
                  <li>You will receive a confirmation email once the cancellation is processed</li>
                </ol>
                <p className="text-gray-600 leading-relaxed">
                  Alternatively, you can contact our support team at {siteConfig.brand.phone} or{" "}
                  {siteConfig.brand.email} for assistance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>
                <p className="text-gray-600 leading-relaxed">
                  In cases of medical emergencies, natural disasters, or other extraordinary circumstances, we may waive
                  cancellation fees at our discretion. Documentation may be required. Please contact our support team to
                  discuss your situation.
                </p>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about our cancellation and refund policy, please don't hesitate to contact
                  us at {siteConfig.brand.email} or call {siteConfig.brand.phone}.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}
