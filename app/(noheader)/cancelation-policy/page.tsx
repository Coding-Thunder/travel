"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function CancellationPolicyPage() {

  // Merged terms from original policy + your term arrays
  const sections = [
    {
      title: "Overview",
      content: [
        "At Budget Travels4U LLC, we are committed to providing transparent, reliable, and customer-focused travel services. This policy outlines our procedures for cancellations, refunds, and pricing related to flights, holiday packages, and other travel-related services."
      ]
    },
    {
      title: "Payment Confirmation",
      content: [
        "Once payment is successfully completed, a confirmation email will be sent within 24 hours of receipt.",
        "Please ensure that your email address is accurate and accessible.",
        "If you do not receive confirmation within 24 hours, please check your spam/junk folder or contact us at support@budgettravels4u.com."
      ]
    },
    {
      title: "Refund Policy",
      content: [
        "We understand that travel plans may change. Our refund process is transparent, efficient, and compliant with industry standards.",
        "Refunds will be processed only through the original mode of payment used at the time of booking.",
        "The time required to complete a refund depends on the issuing bank and may take 7 to 21 business days.",
        "Refund eligibility is strictly governed by the airline, hotel, or car-rental supplier’s fare rules and conditions in effect at the time of booking.",
        "For holiday packages, refunds are calculated based on the utilized components and supplier rules applicable at the time of cancellation.",
        "Certain promotional, discounted, or special fares may be non-refundable, and these terms will be clearly displayed prior to purchase.",
        "Service and processing fees charged by Budget Travels4U LLC are non-refundable once a booking has been confirmed.",
        "Refunds are processed only if the provider’s policy allows cancellation and refund.",
        "No refunds will be issued for no-shows unless explicitly permitted by fare or rate rules.",
        `${siteConfig.brand.domain} assists in securing waivers from airlines, hotels, or car rental providers to facilitate refund requests.`,
        "Refund timelines depend entirely on the provider’s processing time.",
        "All refunds are issued after deducting non-refundable service or processing fees.",
        `To request a cancellation or refund, email ${siteConfig.brand.email} with your Booking Reference Number, Full Name, Date of Travel/Booking, and Reason for Cancellation. Response time: 24–48 business hours.`,
      ]
    },
    {
      title: "Cancellation Policy",
      content: [
        "Customers may cancel their booking within 24 hours of purchase, provided that tickets or confirmations have not yet been issued.",
        "All cancellation requests must be submitted in writing to our customer support team.",
        "Refunds for eligible cancellations will be processed to the original payment method and may take up to 21 business days to reflect in your account, depending on your bank.",
        "If a booking or service is designated as non-refundable or non-cancellable, this will be clearly displayed prior to completing your purchase.",
        "Once a flight booking is confirmed, cancellations within 24 hours are generally not permitted. However, in exceptional cases such as verified medical emergencies, cancellation requests may be considered subject to applicable airline and service fees.",
        "If alternative options are offered due to disruptions, passengers are expected to cooperate with the rebooking or adjustment process as coordinated through our platform.",
        "When possible, travelers may opt for an alternate flight of similar value or class, subject to airline approval and fare availability. Such modifications are treated as new bookings, and any refund or adjustment from the original ticket will follow the airline’s policy.",
        "Cancellations or refunds are processed strictly in line with the airline’s fare rules and conditions. Refunds are subject to the carrier’s approval and may include service or processing deductions.",
        "By confirming a flight booking, you agree to comply with the fare terms and cancellation/refund conditions set forth by both the airline and our booking platform.",]
    },
    {
      title: "Pricing and Currency",
      content: [
        "All fares and prices on BudgetTravels4U.com are displayed in U.S. Dollars (USD) and include applicable taxes and service charges unless otherwise noted.",
        "The amount displayed on the checkout page is the final amount charged to your payment method.",
        "Slight differences may occur due to bank exchange rates or currency conversions at the time of transaction.",
        "In the event of pricing or availability errors, Budget Travels4U LLC reserves the right to correct such discrepancies and notify the customer before final confirmation.",
        "Displayed booking prices exclude surcharges, taxes, and service fees, which appear on the final confirmation screen.",
        `Charges on your payment method may appear under the provider’s or ${siteConfig.brand.domain}’s name.`,
        `All service and processing fees charged by ${siteConfig.brand.domain} are strictly non-refundable unless an error is proven to be on our part.`,
        "Customers agree to pay the total displayed trip cost at checkout.",
        "Service fees may differ for premium classes, international routes, or high-risk destinations.",
        `In supplier-side cancellations (e.g., airline flight cancellations), refunds are issued per the supplier’s policy. ${siteConfig.brand.domain} does not guarantee refund amounts or timelines.`,]
    },
    {
      title: "Booking Requirements",
      content: [
        "Most airfares are non-refundable and non-changeable unless explicitly allowed by the airline’s policy. Some fares may be eligible for changes or cancellations upon payment of airline and service fees.",
        "Flight cancellations are entirely governed by airline fare rules. Depending on the class and type of ticket, certain fares may be fully refundable, partially refundable, or completely non-refundable.",
        "All bookings remain subject to airline availability at the time of reservation. At least one adult passenger is required for travelers under 18 years of age. Children aged 12 years or above are charged as adults.",
        "Ticket issuance is not guaranteed until the airline confirms the booking. A confirmation email will be sent to your registered email address. If not received, please contact Customer Support via email or phone for verification.",
        "Passenger names must exactly match the government-issued photo ID or passport used for travel. Name corrections or transfers to other individuals are typically not permitted once tickets are issued.",
        "Booking confirmations may take up to 72 hours to process depending on the airline and payment verification.",
        "Seat selection, meal preference, or baggage inclusion are subject to airline availability and are not guaranteed. Any additional fees paid for special requests are non-refundable.",
        "Additional charges such as baggage fees, airport taxes, or carrier surcharges may apply and must be paid directly to the airline when required.",
        "Fares are not guaranteed until ticketed. Prices may change due to fluctuations in airline availability, exchange rates, or system errors.",
        "A valid email address and phone number are mandatory for booking validation and communication of schedule changes or cancellations.",
        "In case of a technical or pricing error, the platform reserves the right to correct or cancel the fare before final ticketing. Customers may choose to accept the corrected fare or cancel the booking without penalty.",]
    },
    {
      title: "Customer Support",
      content: [
        "For questions regarding cancellations, refunds, or travel bookings, please contact us:",
        "📧 Email: support@budgettravels4u.com",
        "📞 Phone: (551) 362-8471",
        "🏢 Address: 1309 Coffeen Ave, Sheridan, Wyoming 82801, USA",
        "🌐 Website: https://budgettravels4u.com",
        "🕓 Support Hours: 24/7",
        "Our dedicated support team is available around the clock to ensure a smooth travel experience."
      ]
    },
    {
      title: "Acknowledgment",
      content: [
        "By booking any flight, holiday package, or other travel-related service through Budget Travels4U LLC, you acknowledge that you have read, understood, and agreed to this Cancellation & Refund Policy.",
        "Customers agree not to dispute service fees or charges if both the platform and the airline have adhered to applicable policies and fare rules.",
        "For billing or charge-related queries, please contact Customer Support before initiating a dispute with your bank or card provider.",
        "Unauthorized chargebacks may result in penalties and legal or collection costs as per applicable regulations.",]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-800 to-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Cancellation & Refund Policy</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto text-pretty">
            Understanding your rights and our policies
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Important Notice */}
          {/* <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-orange-800 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {siteConfig.brand.name} acts as an Online Travel Agency (OTA) facilitating bookings for flights, hotels, and car rentals through trusted third-party providers. All reservations are subject to individual provider’s terms, refund rules, and cancellation policies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Render Sections */}
          <div className="prose prose-blue max-w-none space-y-8">
            {sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                {section.content.map((text, tIdx) => (
                  <div key={tIdx} className="w-fit flex items-start gap-4 mb-3">
                    <div className="p-1 rounded-full bg-orange-500" />
                    <p>{text}</p>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
