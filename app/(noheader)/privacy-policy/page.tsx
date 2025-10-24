"use client";

import React, { useRef } from "react";
import { BUSINESS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

const PrivacyPolicyPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
            How we collect, use, and protect your information
          </p>
          <p className="text-sm text-blue-200 mt-4">Last Updated: {todayDate}</p>
        </div>
      </section>

      {/* Privacy Content */}
      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" ref={printRef}>
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {siteConfig.brand.name} is an online travel platform that helps customers to book flights, hotels, car rentals,
              and holiday packages. Your privacy is extremely important to us. We treat the personal information you share
              with us with the highest level of care, ensuring safety, confidentiality, and compliance with applicable data
              protection laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our website is operated by <strong>{siteConfig.brand.name}</strong>, with its registered office at{" "}
              <strong>1309 Coffeen Avenue, Sheridan,  Wyoming,  82801, USA</strong>. For assistance or queries, contact our
              support team at <strong>{siteConfig.brand.email}</strong> or call{" "}
              <strong>{siteConfig.brand.phone}</strong>.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>
                <strong>Information you provide directly</strong> — when creating an account, making a booking, or
                contacting support. This includes:
                <ul className="list-disc pl-6 mt-2">
                  <li>Full name, email address, and phone number</li>
                  <li>Billing and payment details</li>
                  <li>Passport number and travel itinerary</li>
                  <li>Travel preferences or special requests</li>
                </ul>
              </li>
              <li>
                <strong>b) Information collected automatically</strong> — such as IP address, browser type, device info,
                referring website, and browsing activity.
              </li>
              <li>
                <strong>c) Information from third parties</strong> — from social media, public databases, or partner
                websites when you connect or interact with our services.
              </li>
            </ul>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. How We Use Your Information</h2>

            <div className="space-y-4 text-gray-700">
              <p>
                <strong>a) Facilitating bookings:</strong> We process your reservations, send confirmations, and
                communicate with travel service providers.
              </p>
              <p>
                <strong>b) Account management:</strong> Your data helps manage your {siteConfig.brand.name} account and respond to
                inquiries effectively.
              </p>
              <p>
                <strong>c) Improving our platform:</strong> Usage data helps us improve features, UX, and service quality.
              </p>
              <p>
                <strong>d) Marketing and promotions:</strong> With consent, we send offers or newsletters about travel
                services.
              </p>
              <p>
                <strong>e) Sharing with trusted partners:</strong> We share information only with airlines, hotels, payment
                processors, or analytics partners who help fulfill your bookings. We never sell personal data.
              </p>
              <p>
                <strong>f) Legal compliance:</strong> Data may be disclosed when required by law or governmental request.
              </p>
              <p>
                <strong>g) Data retention:</strong> Personal information is kept only as long as necessary for bookings,
                legal obligations, or dispute resolution.
              </p>
              <p>
                <strong>h) Cookies and tracking:</strong> Cookies improve user experience and show relevant offers. Manage
                cookies via browser settings.
              </p>
              <p>
                <strong>i) Children’s privacy:</strong> Our services are not for users under 13. We do not knowingly collect
                children’s data.
              </p>
              <p>
                <strong>j) International data transfers:</strong> Data may be processed abroad with proper safeguards.
              </p>
              <p>
                <strong>k) Security measures:</strong> Technical, administrative, and physical safeguards (including SSL
                encryption and firewalls) are applied.
              </p>
              <p>
                <strong>l) Calls and recordings:</strong> Calls may be monitored for training and deleted after use.
              </p>
              <p>
                <strong>m) Fraud prevention:</strong> Identity and billing checks help prevent unauthorized use without
                affecting credit scores.
              </p>
              <p>
                <strong>n) Third-party data collection:</strong> Third parties like Google or Facebook may collect data per
                their privacy practices.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. How We Protect Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              {siteConfig.brand.name} employs advanced encryption, secure servers, and restricted access protocols to protect your
              personal information. Sensitive data (like card details) is encrypted during transmission and protected by
              firewalls and intrusion detection systems.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Your Rights & Choices</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access and obtain a copy of your personal data.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion of your data, subject to legal or contractual retention.</li>
              <li>Opt out of marketing communications anytime.</li>
              <li>Request data portability, where applicable.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              To exercise your rights, contact us at <strong>{BUSINESS.emails.main}</strong>.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Updates to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may revise this Privacy Policy periodically. Material updates will be communicated via email or posted on
              our website with the updated effective date.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">Last updated: {todayDate}</p>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              For questions or concerns about this Privacy Policy or data handling, please contact:
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {BUSINESS.emails.main}
              <br />
              <strong>Phone:</strong> {BUSINESS.phone.display}
              <br />
              <strong>Address:</strong> 850 Northvine Street, Fostoria OH 44830, USA
            </p>
          </section>
        </div>

        {/* Print Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => {
              if (printRef.current) {
                const printContent = printRef.current.innerHTML;
                const printWindow = window.open("", "_blank", "width=800,height=600");
                printWindow?.document.write(`
                <html>
                  <head>
                    <title>Privacy Policy - ${siteConfig.brand.name}</title>
                    <style>
                      body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                      h2, h3 { color: #1e3a8a; }
                      ul { margin-left: 20px; }
                    </style>
                  </head>
                  <body>${printContent}</body>
                </html>
              `);
                printWindow?.document.close();
                printWindow?.focus();
                printWindow?.print();
              }
            }}
            className="bg-blue-800 hover:bg-blue-700"
          >
            Print Privacy Policy
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
