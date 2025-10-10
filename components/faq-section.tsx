import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book a flight or rental car?",
    answer:
      "Use our search form to enter your travel details. Browse available options, select your preferred choice, and complete the booking process securely. We act as a booking facilitator, connecting you with the airline or rental provider.",
  },
  {
    question: "How do I book a hotel?",
    answer:
      "Search for your destination, dates, and number of guests. Choose a hotel from the options displayed and complete your booking securely. We facilitate the booking with the hotel, but hotel policies apply directly.",
  },
  {
    question: "Can I cancel or modify my flight or car booking?",
    answer:
      "Cancellation or modification is subject to the airline or provider's policy. Most providers allow changes or cancellations through our platform, but refunds are processed according to their rules. We can assist you in securing waivers when applicable.",
  },
  {
    question: "Can I cancel or modify my hotel booking?",
    answer:
      "Hotel cancellations and modifications are subject to the hotel's own policy. Some bookings may be non-refundable or time-sensitive. Our platform helps you communicate with the hotel to request changes or refunds.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All transactions are encrypted and secure. Your payment is transferred to the respective airline, hotel, or car provider.",
  },
  {
    question: "How do I receive my booking confirmation?",
    answer:
      "After booking, you'll receive a confirmation email from our platform containing your booking details, reference number, and any vouchers. The airline, hotel, or provider may also send direct confirmations.",
  },
  {
    question: "What happens if my flight or hotel is cancelled by the provider?",
    answer:
      "If a provider cancels, their own policies determine your eligibility for refunds or rebooking. We assist you in processing refunds or arranging alternatives whenever possible.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. We use advanced encryption and security measures to protect your personal and payment information. Your data is never shared with third parties except to facilitate bookings.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, our support team is available 24/7 to help with any booking issues, clarifications on cancellations, or refund requests. You can reach us via phone, email, or live chat.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Refunds are handled according to the provider's rules. Once approved, they are processed via your original payment method. We facilitate communication and waivers where possible to help expedite the process.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our booking services</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-blue-800">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
