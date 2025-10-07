"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { BUSINESS } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export default function CancellationPolicyPage() {
  const term1 = [
    "Bookings cannot be canceled once confirmed within 24 hours, but in exceptional cases like medical emergencies, cancellations can be processed with applicable fees.",
    "Acceptance of alternative arrangements is required when suggested by rentalconfirmation.com as your mediator.",
    "You can purchase an alternative trip of the same standard to your original booking if available. The alternative trip is considered a new booking, and we, as the mediator, will coordinate with airlines or car rental providers for any compensation or refunds of the original booking. If you do not wish to accept this option, you may choose any other available option, paying the relevant price adjustments.",
    "Accepting a cancellation or canceling directly will allow you to receive a full refund of all costs paid to rentalconfirmation.com, if permitted by the relevant provider (airline or car rental agency).",
  ];

  const term2 = [
    "Most airline and car rental bookings are non-refundable, non-changeable, and non-cancellable. In limited instances, the service provider may allow changes for a fee plus any difference in price.",
    "All reservations are subject to availability at the time of booking. At least one adult must accompany children below 18 years old. Children 12 years & above are considered adults for pricing purposes.",
    "All bookings are subject to specific rules imposed by individual providers which may change at any time.",
    `Reservations are not confirmed until the provider issues a booking confirmation. An email will be sent to the customer’s email address indicating confirmation. If you do not receive this email, call ${BUSINESS.phone.display} or email Customer Service (${BUSINESS.emails.main}) to confirm.`,
    "Name changes are generally not permitted once the reservation is confirmed.",
    "Once a booking is confirmed, it may not be reassigned to a different customer or provider.",
    "We require up to 72 hours to process all bookings.",
    "Meal, seat, or vehicle preferences will be sent to the provider, but cannot be guaranteed. Service fees for special requests are non-refundable. Always confirm directly with the provider.",
    "Seats or vehicles are allocated automatically based on availability and are subject to provider rules.",
    "Additional fees such as baggage or vehicle surcharges may be required at the provider location. Always consult the provider for complete fee details.",
    "Prices are subject to change until booking confirmation by the provider is received.",
    "A valid phone number and email address are required to secure your booking.",
    "Maximum tickets/bookings per transaction may be limited by provider policies.",
    "The name on each booking must match a valid ID or travel document as required by the provider.",
    "Travelers are responsible for valid travel documents for flights or car rentals (passport, visa, inoculation, etc.).",
    "In certain cases, rentalconfirmation.com may request credit card authorization and identity verification for your booking. Failure to provide these may result in cancellation.",
    "SYSTEM ERROR: In case of a system error in pricing for flights or car rentals, rentalconfirmation.com may correct the price before issuing confirmation. You are not obligated to accept a booking at an erroneous price.",
  ];

  const term3 = [
    "Booking prices do not include surcharges or service fees, which are displayed on the final confirmation.",
    "Charges on your credit card may appear in the name of the provider or rentalconfirmation.com.",
    "Processing fees of up to $30 USD per booking may be applied for administrative and service costs.",
    "All processing fees are non-refundable.",
    "Customers agree to pay the Total Trip Cost as displayed on the final booking page.",
    "Phone bookings may include an additional non-refundable service fee of up to $50 USD per booking.",
    "Service fees may vary for first/business class tickets, high-risk cities, or international bookings.",
  ];

  const term4 = [
    "Refunds are allowed if the provider’s policies permit.",
    "No-show bookings are generally not eligible for refunds.",
    "We, as your mediator, secure waivers from providers to process cancellations and refunds.",
  ];

  const term5 = [
    "Service fees apply to all e-tickets and paper bookings.",
    "Paper tickets will incur shipping fees ($25 USD domestic, $45+ USD international) via FedEx or similar service.",
    "PO Boxes cannot be used for paper ticket delivery. A physical address must be provided to process shipping.",
    `Provide your address via email (${BUSINESS.emails.main}) or call us at ${BUSINESS.phone.display}.`,
  ];

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
                  <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This policy applies to bookings made through {siteConfig.brand.name}. Please note that airline
                    and car rental companies may have their own cancellation policies that supersede ours.
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
                mediation helps secure waivers, but final decisions rest with the provider. Refunds may take 60-90
                days.
              </p>
              {term4.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>

            {/** Term5 */}
            <section>
              <p className="text-xl font-medium mb-6">Paper Tickets and Shipping Fees</p>
              {term5.map((text, idx) => (
                <div key={idx} className="w-fit flex items-start gap-4 mb-4">
                  <div className="p-1 rounded-full bg-app-blue-1" />
                  <p>{text}</p>
                </div>
              ))}
            </section>

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
