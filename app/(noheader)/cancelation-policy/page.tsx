"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export default function CancellationPolicyPage() {
  const term1 = [
    "Bookings cannot be canceled once confirmed within 24 hours, but in exceptional cases like medical emergencies, cancellations can be processed with applicable fees.",
    "Acceptance of alternative arrangements is required when suggested by rentalconfirmation.com as your mediator.",
    "You may choose an alternative trip of similar standard if available. The alternative trip is treated as a new booking, and rentalconfirmation.com will coordinate with the airline, hotel, or car rental provider for compensation or refunds related to your original booking.",
    "Accepting a cancellation or canceling directly allows a refund only if the relevant provider’s (airline, hotel, or car rental) policy permits it. Refunds are subject to provider approval and applicable service charges.",
    "Each booking is governed by the refund and cancellation terms of both rentalconfirmation.com and the respective provider. By booking, you agree to abide by both.",
  ];


  const term2 = [
    "Most airline, hotel, and car rental bookings are non-refundable, non-changeable, and non-cancellable. In limited cases, providers may allow changes for a fee plus any fare or rate difference.",
    "Flight cancellations depend on airline policies. Some fares are fully refundable, partially refundable, or completely non-refundable. Refunds will only be processed if the airline allows cancellation.",
    "Hotel cancellations follow the hotel’s individual policy. Some rooms may be non-refundable or subject to cancellation charges.",
    "Car rental cancellations depend on the rental company’s rules. Advance notice is often required, and late pickups, early returns, or no-shows are generally non-refundable.",
    "All reservations are subject to provider availability at the time of booking. At least one adult must accompany minors under 18. Children 12 years & above are treated as adults for pricing.",
    "Each booking is subject to the specific provider’s rules, which may change at any time without prior notice.",
    `Reservations are not confirmed until the provider issues a booking confirmation. An email will be sent to the registered email address. If not received, please call ${BUSINESS.phone.display} or email Customer Service (${BUSINESS.emails.main}) to confirm.`,
    "Name changes are typically not permitted once the booking is confirmed.",
    "Confirmed bookings cannot be reassigned to different customers or providers.",
    "Processing time for bookings may take up to 72 hours.",
    "Meal, seat, or vehicle preferences are passed to the provider but not guaranteed. Fees for special requests are non-refundable.",
    "Seats, vehicles, and rooms are allocated automatically based on availability and provider rules.",
    "Additional fees such as baggage charges, vehicle surcharges, or hotel taxes may apply and are payable directly at the provider location.",
    "Prices are subject to change until confirmed by the provider.",
    "A valid phone number and email are required to secure a booking.",
    "Maximum tickets/bookings per transaction may be limited by provider policies.",
    "The name on each booking must exactly match the traveler’s valid ID or travel document.",
    "Travelers are responsible for ensuring valid documents (passport, visa, vaccination, etc.) required by the provider.",
    "rentalconfirmation.com may request credit card authorization or ID verification. Failure to provide this may result in cancellation.",
    "In case of a system error or incorrect pricing, rentalconfirmation.com reserves the right to correct the fare before confirmation. You are not obligated to continue with an erroneous booking.",
  ];
  const term3 = [
    "Displayed booking prices exclude surcharges, taxes, and service fees, which appear on the final confirmation screen.",
    "Charges on your payment method may appear under the provider’s or rentalconfirmation.com’s name.",
    "Administrative or service processing fees of up to $30 USD per booking may apply.",
    "All service and processing fees charged by rentalconfirmation.com are strictly non-refundable unless an error is proven to be on our part.",
    "Customers agree to pay the total displayed trip cost at checkout.",
    "Phone reservations may include an additional non-refundable service fee (up to $50 USD).",
    "Service fees may differ for premium classes, international routes, or high-risk destinations.",
    "In supplier-side cancellations (e.g., airline flight cancellations), refunds are issued per the supplier’s policy. rentalconfirmation.com does not guarantee refund amounts or timelines.",
  ];

  const term4 = [
    "Refunds are processed only if the provider’s policy allows cancellation and refund.",
    "No refunds will be issued for no-shows unless explicitly permitted by fare or rate rules.",
    "rentalconfirmation.com assists in securing waivers from airlines, hotels, or car rental providers to facilitate refund requests.",
    "Refund timelines depend entirely on the provider’s processing time.",
    "All refunds are issued after deducting non-refundable service or processing fees.",
    "To request a cancellation or refund, email support@rentalconfirmation.com with your Booking Reference Number, Full Name, Date of Travel/Booking, and Reason for Cancellation. Response time: 24–48 business hours.",
  ];


  // const term5 = [
  //   "Service fees apply to all e-tickets and paper bookings.",
  //   "Paper tickets will incur shipping fees ($25 USD domestic, $45+ USD international) via FedEx or similar service.",
  //   "PO Boxes cannot be used for paper ticket delivery. A physical address must be provided to process shipping.",
  //   `Provide your address via email (${BUSINESS.emails.main}) or call us at ${BUSINESS.phone.display}.`,
  // ];

  const term6 = [
    "Customers agree not to dispute fees if rentalconfirmation.com and providers have followed applicable policies.",
    `For questions about charges, call ${BUSINESS.phone.display} or email Customer Service (${BUSINESS.emails.main}) before disputing.`,
    "Unauthorized chargebacks may incur penalties and legal/collection costs.",
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

                    All reservations made through our platform are subject to the individual provider’s terms, refund rules, and cancellation policies. By booking through Budget Travels4U, you acknowledge and accept these terms
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
