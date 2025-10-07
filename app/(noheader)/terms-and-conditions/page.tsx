"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/utils";

const TermsAndConditionsPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const generalTerms = [
    "By using budgettravels4u.com, you agree to comply with these Terms and Conditions.",
    "You must provide accurate information when creating an account, making bookings, or communicating with our support team.",
    "You are responsible for keeping your account credentials confidential and notifying us of any unauthorized access.",
    "budgettravels4u.com acts as a travel aggregator/mediator. We do not operate flights or car rentals directly.",
    "All bookings are subject to provider rules, pricing, availability, and restrictions.",
    "We reserve the right to modify these Terms and Conditions at any time. Updates will be posted on this page.",
  ];

  const bookingTerms = [
    "All bookings for flights or car rentals are subject to availability at the time of booking.",
    "You must comply with provider rules regarding ticketing, check-in, and vehicle usage.",
    `Booking confirmations are only valid after the provider issues confirmation. Contact us if you do not receive it.`,
    "Cancellations, changes, and refunds are governed by provider rules. See our Cancellation & Refund Policy for details.",
    "Travelers are responsible for valid travel documents (passport, visa, inoculation, etc.) and timely arrival at the departure or pickup location.",
    "Pricing errors or technical issues may be corrected before booking confirmation. You are not obligated to accept a booking at an erroneous price.",
  ];

  const userResponsibilities = [
    "You agree to pay all charges associated with your booking, including surcharges, fees, and taxes.",
    "You must not engage in fraudulent activities or attempt to bypass provider rules.",
    "Unauthorized use of our platform may result in account suspension or legal action.",
    "You are responsible for all communications, notifications, and follow-ups with providers if required.",
    "You may not transfer bookings to third parties without explicit permission from the provider.",
  ];

  const legalTerms = [
    "budgettravels4u.com is not liable for delays, cancellations, or other service disruptions caused by providers.",
    "We do not guarantee refunds or compensation beyond what the provider permits.",
    "By using our platform, you waive claims against budgettravels4u.com for any indirect, incidental, or consequential damages.",
    "All disputes will be resolved under the applicable laws of our operating jurisdiction.",
    "We may share information with service providers or law enforcement if required by law or for security purposes.",
  ];

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow?.document.write(`
        <html>
          <head>
            <title>Terms & Conditions</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
              h2 { color: #1e3a8a; }
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Terms & Conditions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-blue-200 mt-4">Last Updated: {todayDate}</p>
        </div>
      </section>

      {/* Terms Content */}
      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" ref={printRef}>
          {/* General Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">General Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {generalTerms.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Booking Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Booking Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {bookingTerms.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {userResponsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Legal Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Legal Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {legalTerms.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Contact Info */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Information</h2>
            <p className="text-gray-700 mb-2">
              For any questions regarding these Terms and Conditions, contact us at{" "}
              <strong>{BUSINESS.emails.main}</strong> or call {BUSINESS.phone.display}.
            </p>
            <p className="text-gray-700">Address: 1039 Coffen Avenue, STE 1200, Sheridan, Wyoming, 82801</p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Button onClick={handlePrint} className="bg-blue-800 hover:bg-blue-700">
            Print Terms & Conditions
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
