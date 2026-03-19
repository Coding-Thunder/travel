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
    "By accessing or using rentalconfirmation.com, you agree to be legally bound by these Terms and Conditions.",
    "rentalconfirmation.com acts solely as an online travel aggregator (OTA) and intermediary for car rental bookings. We do not own, operate, or control any vehicles or rental services.",
    "All car rental services are provided by independent third-party rental providers, and are subject to their respective terms, conditions, and policies.",
    "You agree to provide accurate, complete, and up-to-date information during booking and account usage.",
    "We reserve the right to modify, suspend, or terminate access to our platform or services at any time without prior notice.",
    "We may update these Terms from time to time. Continued use of the platform constitutes acceptance of the revised Terms."
  ];

  const bookingTerms = [
    "All car rental bookings are subject to real-time availability and confirmation by the respective rental provider.",
    "A booking is considered confirmed only after full payment is received and confirmation is issued by the rental provider.",
    "Users must comply with all rental provider requirements, including valid driving license, age restrictions, identity verification, and security deposit conditions.",
    "Vehicle type, model, fuel policy, mileage limits, and additional charges are determined solely by the rental provider.",
    "rentalconfirmation.com is not responsible for vehicle condition, availability at pickup, or any changes made by the provider.",
    "In case of unavailability after booking, the provider may offer an alternative vehicle or cancel the booking with applicable refund as per their policy.",
    "Users are responsible for timely pickup and return of the vehicle. Delays may result in additional charges imposed by the provider."
  ];

  const userResponsibilities = [
    "You agree to pay all applicable charges, including rental fees, security deposits, insurance, penalties, and applicable taxes.",
    "You are solely responsible for the proper use of the rented vehicle and compliance with all traffic laws and regulations.",
    "Any damages, fines, theft, accidents, or misuse of the vehicle during the rental period are the sole responsibility of the user and governed by the provider’s policies.",
    "You must not engage in fraudulent activities, false bookings, or misuse of the platform.",
    "You may not transfer or sub-rent the vehicle to any third party unless explicitly permitted by the rental provider.",
    "You are responsible for reviewing and accepting the rental provider’s terms before confirming the booking."
  ];

  const legalTerms = [
    "rentalconfirmation.com acts solely as an intermediary and shall not be held liable for any acts, errors, omissions, representations, warranties, breaches, or negligence of any rental provider.",
    "We are not responsible for vehicle condition, breakdowns, accidents, injuries, delays, cancellations, or any service deficiencies.",
    "To the maximum extent permitted by law, rentalconfirmation.com shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our platform.",
    "Our total liability, if any, shall not exceed the total booking amount paid by the user.",
    "We are not responsible for any technical failures, including but not limited to website downtime, API failures, or payment gateway issues.",
    "Users agree to indemnify and hold harmless rentalconfirmation.com, its affiliates, and employees from any claims, damages, losses, or liabilities arising from their use of the platform or violation of these Terms.",
    "All disputes shall be governed by the laws of India, and subject to the exclusive jurisdiction of courts in Delhi."
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
              <strong>{siteConfig.brand.email}</strong> or call {siteConfig.brand.phone}.
            </p>
            {/* <p className="text-gray-700">Address: 1039 Coffen Avenue, STE 1200, Sheridan, Wyoming, 82801</p> */}
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
