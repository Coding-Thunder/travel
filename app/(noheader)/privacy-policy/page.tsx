import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/config"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Privacy Policy</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
                How we collect, use, and protect your information
              </p>
              <p className="text-sm text-blue-200 mt-4">Last Updated: June 2024</p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-blue max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  {siteConfig.brand.name} ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you use our website
                  and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Name, email address, phone number, and mailing address</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Passport information and travel preferences</li>
                  <li>Account credentials and profile information</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, click patterns)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data (with your permission)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Process and manage your bookings and reservations</li>
                  <li>Communicate with you about your bookings and account</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send promotional offers and marketing communications (with your consent)</li>
                  <li>Improve our services and develop new features</li>
                  <li>Detect and prevent fraud and security threats</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> Airlines, car rental companies, hotels, and other travel
                    partners
                  </li>
                  <li>
                    <strong>Payment Processors:</strong> To process your transactions securely
                  </li>
                  <li>
                    <strong>Technology Partners:</strong> Including {siteConfig.brand.poweredBy} for booking services
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law or to protect our rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Disable cookies through your browser settings</li>
                  <li>Object to or restrict certain processing of your information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                  deliver personalized content. You can control cookies through your browser settings, but disabling
                  them may affect your ability to use certain features of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our services are not directed to children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you believe we have collected information from a child under
                  13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of
                  residence. We ensure appropriate safeguards are in place to protect your information in accordance
                  with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new policy on this page and updating the "Last Updated" date. Your continued use of our
                  services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
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
