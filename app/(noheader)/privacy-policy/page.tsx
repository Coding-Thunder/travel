"use client";

import React, { useRef } from "react";
import { BUSINESS } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const privacyTerms1 = [
    "As a travel aggregator/mediator, we collect information to help you compare and book flights and car rentals:",
    "a) Information you provide directly when creating accounts, making bookings through our platform, or contacting customer support. This may include name, email, phone number, billing info, and travel preferences.",
    "b) Automatically collected information such as IP address, browser type, device information, and referring website.",
    "c) Information from third-party partners when you link your account or interact with partner services.",
  ];

  const privacyTerms2 = [
    {
      heading: "a) Facilitating bookings",
      subitems: [
        "We use your data to transmit booking requests to travel service providers and send confirmations and updates on your behalf.",
      ],
    },
    {
      heading: "b) Account management",
      subitems: [
        "Your information helps us manage your account and respond to inquiries efficiently.",
      ],
    },
    {
      heading: "c) Improving our platform",
      subitems: [
        "We analyze usage data to enhance our website, user experience, and service offerings.",
      ],
    },
    {
      heading: "d) Marketing and promotions",
      subitems: [
        "With your consent, we may send promotional emails about travel services that match your interests.",
      ],
    },
    {
      heading: "e) Sharing with trusted partners",
      subitems: [
        "We may share data with service providers and partners who facilitate bookings, payment processing, and analytics. We never sell your personal data.",
      ],
    },
    {
      heading: "f) Legal compliance",
      subitems: [
        "We may disclose information to comply with legal obligations or lawful requests.",
      ],
    },
    {
      heading: "g) Data retention",
      subitems: [
        "We retain personal information only as long as necessary to provide our platform services, comply with legal requirements, or resolve disputes.",
      ],
    },
    {
      heading: "h) Cookies and tracking",
      subitems: [
        "We use cookies and similar technologies to improve your experience, analyze usage, and display relevant content. You can manage cookies through your browser settings.",
      ],
    },
    {
      heading: "i) Children’s privacy",
      subitems: [
        "Our platform is not intended for individuals under 13. We do not knowingly collect information from children.",
      ],
    },
    {
      heading: "j) International data transfers",
      subitems: [
        "Your information may be transferred and stored outside your country. We ensure appropriate safeguards are in place.",
      ],
    },
    {
      heading: "k) Security measures",
      subitems: [
        "We implement technical, administrative, and physical measures to protect your data against unauthorized access and misuse.",
      ],
    },
    {
      heading: "l) Contact and complaints",
      subitems: [
        `For questions, requests, or complaints regarding your personal data, contact us at ${BUSINESS.emails.main}.`,
      ],
    },
  ];

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
            <p className="text-gray-700 leading-relaxed">
              budgettravels4u.com respects your privacy and is committed to protecting your personal information. This
              policy explains what data we collect, how we use it, and your rights as a user.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {privacyTerms1.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How We Use Your Information</h2>
            {privacyTerms2.map((item, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.heading}</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  {item.subitems.map((text, subIdx) => (
                    <li key={subIdx}>{text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement strict technical and organizational measures to protect your data from unauthorized access,
              loss, or misuse. While we strive to protect your personal information, no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Rights and Controls</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to access, update, or delete your personal information. You can also manage your
              communication preferences at any time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For any privacy-related requests, contact our support team at <strong>{BUSINESS.emails.main}</strong>.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {BUSINESS.emails.main}
              </p>
              <p>
                <strong>Phone:</strong> {BUSINESS.phone.display}
              </p>
            </div>
          </section>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => {
              if (printRef.current) {
                const printContent = printRef.current.innerHTML;
                const printWindow = window.open("", "_blank", "width=800,height=600");
                printWindow?.document.write(`
                  <html>
                    <head>
                      <title>Privacy Policy</title>
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
