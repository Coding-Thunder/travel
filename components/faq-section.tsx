import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I book a flight or rental car?",
    answer:
      "Simply use our search form on the homepage to enter your travel details. Browse available options, select your preferred choice, and complete the booking process with our secure payment system.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify most bookings through your account dashboard. Cancellation policies vary by provider, so please review the specific terms during booking. Visit our Cancellation & Refund page for detailed information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal. All transactions are secured with industry-standard encryption.",
  },
  {
    question: "How do I receive my booking confirmation?",
    answer:
      "After completing your booking, you will receive an instant confirmation email with all your travel details, booking reference number, and any necessary vouchers or tickets.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use advanced encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes! Our customer support team is available 24/7 to assist you with any questions or issues. You can reach us via phone, email, or live chat through our Contact page.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our services</p>
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
  )
}
