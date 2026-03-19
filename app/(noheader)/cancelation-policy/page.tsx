"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function CancellationPolicyPage() {
  const term1 = [
    "Car rental bookings cannot be canceled or modified once confirmed, unless permitted by the respective rental provider’s policy.",
    "In exceptional cases (e.g., medical emergencies), cancellation requests may be considered subject to provider approval and applicable fees.",
    "rentalconfirmation.com acts solely as an intermediary and may assist in communicating alternative arrangements, but acceptance of such alternatives is at the user’s discretion.",
    "Any approved modification or rebooking will be treated as a new booking and may involve additional charges, rate differences, or penalties as defined by the rental provider.",
    "Refund eligibility is strictly governed by the rental provider’s cancellation policy. rentalconfirmation.com does not guarantee refunds under any circumstances.",
  ];

  const term2 = [
    "All car rental bookings are subject to real-time availability and confirmation by the rental provider.",
    "Most car rental bookings are non-refundable, non-changeable, and non-cancellable unless explicitly stated otherwise.",
    "Booking confirmation is valid only after the rental provider issues final confirmation. Processing time may take up to 72 hours.",
    "Users must meet all provider requirements, including valid driving license, age criteria, identity verification, and security deposit conditions.",
    "Vehicle category, fuel policy, mileage limits, deposit amount, and additional charges are determined solely by the rental provider.",
    "Late pickup, early return, or no-show will be treated as a completed booking with no refund unless allowed by provider policy.",
    "Vehicle allocation is subject to availability. Specific models, features, or preferences are not guaranteed.",
    "Prices are subject to change until final confirmation by the rental provider.",
    "The name on the booking must exactly match the valid government-issued ID presented at pickup.",
    "Users are responsible for ensuring all required documents and eligibility conditions are met at the time of pickup.",
    "rentalconfirmation.com may require additional verification (ID, payment authorization). Failure to comply may result in booking cancellation.",
    "Bookings cannot be transferred, reassigned, or resold to another individual without provider approval.",
  ];
  const term3 = [
    "Displayed prices may exclude applicable taxes, surcharges, insurance, deposits, and service fees, which will be shown at checkout or payable at pickup.",
    "A refundable security deposit may be required by the rental provider at the time of vehicle pickup. This amount is controlled entirely by the provider.",
    "rentalconfirmation.com does not hold, control, or process security deposits and is not responsible for deposit refunds.",
    "All service, convenience, and processing fees charged by rentalconfirmation.com are non-refundable under all circumstances unless an internal error is proven.",
    "Users agree to pay the total booking amount, including any applicable fees, charges, or penalties.",
    "Charges may appear under rentalconfirmation.com or the rental provider on your payment method.",
    "In case of pricing errors, technical issues, or incorrect listings, rentalconfirmation.com reserves the right to cancel bookings and issue a refund.",
  ];
  const term4 = [
    "Refunds are processed only if explicitly permitted under the rental provider’s cancellation policy.",
    "No refunds will be issued for no-shows, late arrivals, early returns, or unused rental periods unless allowed by the provider.",
    "All refund requests are subject to provider approval. rentalconfirmation.com does not guarantee refund outcomes or timelines.",
    "Refund processing timelines are controlled solely by the rental provider, bank, or payment gateway.",
    "All approved refunds will exclude non-refundable service, processing, or convenience fees.",
    "rentalconfirmation.com may assist in raising refund or waiver requests with the provider but holds no authority over final decisions.",
  ];

  const term6 = [
    "Users agree not to initiate chargebacks or payment disputes without first contacting rentalconfirmation.com for resolution.",
    "If a chargeback is initiated without valid grounds and the booking complies with provider policies, the user may be liable for penalties, recovery costs, and legal action.",
    "Fraudulent transactions, misuse of payment methods, or abuse of refund policies may result in account suspension and reporting to relevant authorities.",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
              Understanding your rights and our policies
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Important Notice */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-blue-800 flex-shrink-0 mt-1" />
                <div>
                  {/* <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3> */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {siteConfig.brand.name} acts as an Online Travel Agency (OTA) facilitating bookings for flights, hotels, and car rentals through trusted third-party service providers, including airlines, hotels, car rental agencies, and global distribution systems such as Amadeus.

                    All reservations made through our platform are subject to the individual provider’s terms, refund rules, and cancellation policies. By booking through RentalConfirmation.com, you acknowledge and accept these terms
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="prose prose-blue max-w-none space-y-8">
            {/** Exceptional Circumstances */}
            <section>
              <p>
                Exceptional circumstances like environmental changes, political issues, or provider adjustments may
                require cancellations or modifications. {siteConfig.brand.name}, as your mediator, reserves the right to
                manage such changes and offer alternative options.
              </p>
              <p>
                In case of important changes or cancellations, we will inform you as soon as possible and provide
                alternative routing, dates, or equivalent options if confirmed by the provider. You must choose from
                the options we provide or follow the provider’s terms.
              </p>
            </section>

            {/** Term1 */}
            <section>
              {term1.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>

            {/** Term2 */}
            <section>
              <p className="font-medium text-xl mb-6">Booking Requirements</p>
              {term2.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>

            {/** Term3 */}
            <section>
              <p className="text-xl font-medium mb-6">Taxes, Charges, and Fees</p>
              {term3.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>

            {/** Term4 */}
            <section>
              <p className="text-xl font-medium mb-6">Cancel and Refund</p>
              <p className="mb-6">
                Refunds are processed according to provider rules. Fees, penalties, and processing times vary. Our
                mediation helps secure waivers, but final decisions rest with the provider. Refunds may take 07-30
                days.
              </p>
              {term4.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>

            {/* * Term5
            <section>
              <p className="text-xl font-medium mb-6">Paper Tickets and Shipping Fees</p>
              {term5.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section> */}

            {/** Term6 */}
            <section>
              <p className="text-xl font-medium mb-6">Chargebacks and Credit Card Disputes</p>
              {term6.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
