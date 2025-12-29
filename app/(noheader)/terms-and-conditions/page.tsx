"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

const TermsAndConditionsPage: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const generalTerms = [
    `By using ${siteConfig.brand.domain}, you agree to comply with these Terms and Conditions.`,
    "You must provide accurate information when creating an account, making bookings, or communicating with our support team.",
    "You are responsible for keeping your account credentials confidential and notifying us of any unauthorized access.",
    `${siteConfig.brand.domain} acts as a travel aggregator/mediator. We do not operate flights or car rentals directly.`,
    "All bookings are subject to provider rules, pricing, availability, and restrictions.",
    "We reserve the right to modify these Terms and Conditions at any time. Updates will be posted on this page.",
  ];

  const bookingTerms = [
    "All bookings for flights or car rentals are subject to availability at the time of booking.",
    "You must comply with provider rules regarding ticketing, check-in, and vehicle usage.",
    "Booking confirmations are only valid after the service provider issues confirmation. Contact us if you do not receive it.",
    "Cancellations, changes, and refunds are governed by provider rules and our Cancellation & Refund Policy.",
    "Travelers are responsible for valid travel documents (passport, visa, inoculation, etc.) and timely arrival at the departure or pickup location.",
    "Pricing errors or technical issues may be corrected before booking confirmation. You are not obligated to accept a booking at an erroneous price.",
  ];

  const cancellationPolicy = [
    "No-Show Policy: If a traveler fails to show up for the scheduled flight, pickup, or service without prior cancellation, the booking will be treated as a no-show and will generally be non-refundable, subject to airline or service provider rules.",
    "Cut-off Time for Cancellation: A full refund may be available if a cancellation request is submitted at least 72 hours before the scheduled departure or pickup time. Cancellations made within 72 hours may be eligible only for a partial refund or no refund, depending on provider rules.",
    "Refund Processing Fees: Any service fees, convenience fees, or payment gateway charges levied by us are non-refundable, even if the service provider approves a refund.",
    "Mandatory Acceptance: At checkout, users are required to explicitly confirm acceptance of the Cancellation & Refund Policy by selecting the checkbox labeled “I agree to the Cancellation Policy” before proceeding with payment.",
  ];

  const userResponsibilities = [
    "You agree to pay all charges associated with your booking, including surcharges, fees, and applicable taxes.",
    "You must not engage in fraudulent activities or attempt to bypass service provider rules.",
    "Unauthorized use of our platform may result in account suspension or legal action.",
    "You are responsible for all communications, notifications, and follow-ups with service providers if required.",
    "You may not transfer bookings to third parties without explicit permission from the provider.",
  ];

  const legalTerms = [
    `${siteConfig.brand.domain} is not liable for delays, cancellations, or service disruptions caused by third-party providers.`,
    "We do not guarantee refunds or compensation beyond what the service provider permits.",
    `By using our platform, you waive claims against ${siteConfig.brand.domain} for any indirect, incidental, or consequential damages.`,
    `All disputes will be governed and interpreted under the laws of ${siteConfig.brand.location}.`,
    "We may share information with service providers or law enforcement if required by law or for security purposes.",
  ];

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow?.document.write(`
        <html>
          <head>
            <title>Terms & Conditions – ${siteConfig.brand.name}</title>
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
      <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-sm text-blue-200 mt-4">
            Last Updated: {todayDate}
          </p>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-12" ref={printRef}>
          <section>
            <h2 className="text-2xl font-bold mb-4">General Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              {generalTerms.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Booking Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              {bookingTerms.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Cancellation & No-Show Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {cancellationPolicy.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              {userResponsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Legal Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              {legalTerms.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>
              Contact us at <strong>{siteConfig.brand.email}</strong> or{" "}
              <a href={`tel:${siteConfig.brand.phoneLink}`} className="underline">
                {siteConfig.brand.phone}
              </a>
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Button onClick={handlePrint} className="bg-blue-800">
            Print Terms & Conditions
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
