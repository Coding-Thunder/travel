import { siteConfig } from "@/lib/config"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Terms & Conditions</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
                Please read these terms carefully before using our services
              </p>
              <p className="text-sm text-blue-200 mt-4">Last Updated: June 2024</p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-blue max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using {siteConfig.brand.name}'s website and services, you agree to be bound by these
                  Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Description</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {siteConfig.brand.name} operates as a travel booking platform that facilitates reservations for
                  flights, car rentals, and related travel services. We act as an intermediary between you and
                  third-party service providers, including airlines, car rental companies, and other travel partners.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our platform is powered by {siteConfig.brand.poweredBy}, providing access to a comprehensive inventory
                  of travel options worldwide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You are responsible for all activities that occur under your account</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate your account if you violate these terms or engage in
                  fraudulent or illegal activities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking and Payment</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Booking Process</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>All bookings are subject to availability and confirmation</li>
                  <li>Prices are displayed in USD and may be subject to change until booking is confirmed</li>
                  <li>You must provide accurate passenger and payment information</li>
                  <li>A booking confirmation will be sent to your registered email address</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Terms</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Payment is due at the time of booking unless otherwise specified</li>
                  <li>We accept major credit cards, debit cards, and other payment methods as displayed</li>
                  <li>All payments are processed securely through third-party payment processors</li>
                  <li>Additional fees may apply for certain payment methods or services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellations and Refunds</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cancellation and refund policies vary depending on the service provider and fare type. Please refer to
                  our Cancellation & Refund Policy for detailed information. Key points include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Cancellation fees may apply based on timing and fare rules</li>
                  <li>Some bookings may be non-refundable</li>
                  <li>Refunds are subject to service provider policies</li>
                  <li>Processing time for refunds may vary</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you book through our platform, you enter into a contract with the respective service provider
                  (airline, car rental company, etc.). We are not responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Flight delays, cancellations, or schedule changes</li>
                  <li>Quality of service provided by third parties</li>
                  <li>Lost or damaged luggage</li>
                  <li>Vehicle condition or availability issues</li>
                  <li>Changes to third-party terms and conditions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Documents</h2>
                <p className="text-gray-600 leading-relaxed">
                  You are responsible for ensuring you have all necessary travel documents, including valid passports,
                  visas, and health certificates. We are not liable for any issues arising from invalid or missing
                  travel documents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed mb-4">To the maximum extent permitted by law:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>Our total liability is limited to the amount you paid for the booking</li>
                  <li>We do not guarantee uninterrupted or error-free service</li>
                  <li>We are not responsible for third-party actions or omissions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content on our website, including text, graphics, logos, and software, is the property of{" "}
                  {siteConfig.brand.name}
                  or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute,
                  or create derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Activities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Use our services for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Use automated systems to access our website without permission</li>
                  <li>Provide false or misleading information</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
                <p className="text-gray-600 leading-relaxed">
                  Any disputes arising from these terms or your use of our services shall be resolved through binding
                  arbitration in accordance with the laws of {siteConfig.brand.location}. You waive your right to
                  participate in class action lawsuits.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                  immediately upon posting. Your continued use of our services after changes are posted constitutes
                  acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms and Conditions are governed by and construed in accordance with the laws of{" "}
                  {siteConfig.brand.location}, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Email:</strong> {siteConfig.brand.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {siteConfig.brand.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {siteConfig.brand.location}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
