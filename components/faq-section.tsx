import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [
  {
    question: "How do I book a flight through your platform?",
    answer:
      "Simply enter your trip details in our search form — departure, destination, and travel dates. We’ll show available options from multiple airlines. Choose your preferred flight and complete the booking securely on our platform. We act as an OTA, facilitating your booking directly with the airline.",
  },
  {
    question: "Can I cancel or modify my flight booking?",
    answer:
      "Yes, cancellations and modifications depend on the airline’s rules and fare conditions. You can request changes through our platform, and we’ll coordinate with the airline to process your request or secure applicable waivers when possible.",
  },
  {
    question: "What happens if my flight is cancelled by the airline?",
    answer:
      "If the airline cancels your flight, their policy determines your eligibility for a refund or rebooking. As your OTA, we assist in processing refunds or arranging alternate options as per the airline’s guidelines.",
  },
  {
    question: "How do I receive my flight booking confirmation?",
    answer:
      "Once your booking is complete, we’ll send a confirmation email containing your airline PNR, e-ticket, and travel details. The airline may also send you a direct confirmation.",
  },
  {
    question: "What payment methods are available for flight bookings?",
    answer:
      "We accept all major credit cards, debit cards, and PayPal. Payments are processed securely through encrypted gateways, and funds are settled with the airline via our system.",
  },
  {
    question: "How do flight refunds work?",
    answer:
      "Refunds are processed as per the airline’s policy once approved. We coordinate with the airline and initiate the refund to your original payment method. Processing times may vary by airline and payment provider.",
  },
  {
    question: "Is my personal and payment information secure?",
    answer:
      "Yes. As an OTA, we use advanced encryption and follow industry-standard data protection practices. Your information is shared only with the airline and payment providers as needed to complete your booking.",
  },
  {
    question: "Do you provide customer support for flight bookings?",
    answer:
      "Absolutely. Our customer support team is available 24/7 to help with booking issues, cancellations, schedule changes, or refund queries. You can reach us via phone, email, or live chat.",
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
