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
    "Most airline, hotel, and car rental bookings are non-refundable, non-changeable, and non-cancellable.",
    "Flight cancellations depend entirely on airline policies.",
    "Hotel cancellations follow the individual hotel’s policy.",
    "Car rental cancellations depend on the rental company’s rules. No-shows are generally non-refundable.",
    "Each booking is subject to the specific provider’s rules, which may change without notice.",
    `Reservations are not confirmed until the provider issues confirmation. Contact ${BUSINESS.phone.display} if not received.`,
    "Name changes are typically not permitted once confirmed.",
    "Confirmed bookings cannot be reassigned.",
    "Processing time for bookings may take up to 72 hours.",
  ];

  const term3 = [
    "Displayed booking prices exclude taxes, surcharges, and service fees.",
    "Administrative or service fees of up to $30 USD per booking may apply.",
    "All service and processing fees charged by rentalconfirmation.com are non-refundable.",
    "Supplier-side cancellations follow supplier refund policies.",
  ];

  // 🔴 UPDATED — THIS IS WHERE YOUR REQUIRED CLAUSES LIVE
  const term4 = [
    "Cut-off Time for Cancellation: A full refund may be considered only if the cancellation request is submitted at least 72 hours before the scheduled departure, pickup, or check-in time. Requests made within 72 hours may result in partial or zero refund, strictly as per provider rules.",

    "No-Show Policy: Failure to arrive for a scheduled flight, hotel check-in, or car rental pickup without prior cancellation will be treated as a no-show. No-shows are generally non-refundable unless explicitly permitted by the provider’s fare or rate rules.",

    "Refund Eligibility: Refunds are processed only if the airline, hotel, or car rental provider permits cancellation and refund under their applicable policy. rentalconfirmation.com does not guarantee refund approval.",

    "Processing & Service Fees: All service fees, convenience fees, payment gateway charges, and administrative fees charged by rentalconfirmation.com are strictly non-refundable, even if a provider approves a refund.",

    "Refund Timelines: Approved refunds may take 7–30 business days depending on provider and payment processor timelines.",

    "Mandatory Policy Acceptance: At checkout, customers must explicitly confirm acceptance of the Cancellation & Refund Policy by selecting the checkbox labeled “I agree to the Cancellation Policy” before payment can be completed.",
  ];

  const term6 = [
    "Customers agree not to dispute charges if policies are followed.",
    `For billing questions, contact ${BUSINESS.phone.display} before disputing.`,
    "Unauthorized chargebacks may result in penalties or legal action.",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-blue-800 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Cancellation & Refund Policy
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <Card>
            <CardContent className="p-6 flex gap-4">
              <AlertCircle className="h-6 w-6 text-blue-800" />
              <p className="text-sm text-gray-600">
                {siteConfig.brand.name} acts as an Online Travel Agency (OTA).
                All bookings are governed by provider policies.
              </p>
            </CardContent>
          </Card>

          <section>
            {term1.map((t, i) => (
              <p key={i} className="mb-4">{t}</p>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-medium mb-6">Booking Requirements</h2>
            {term2.map((t, i) => (
              <p key={i} className="mb-4">{t}</p>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-medium mb-6">Taxes & Fees</h2>
            {term3.map((t, i) => (
              <p key={i} className="mb-4">{t}</p>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-medium mb-6">Cancel & Refund</h2>
            {term4.map((t, i) => (
              <p key={i} className="mb-4">{t}</p>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-medium mb-6">
              Chargebacks & Disputes
            </h2>
            {term6.map((t, i) => (
              <p key={i} className="mb-4">{t}</p>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}
