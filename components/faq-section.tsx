import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [
  {
    question: "How do I book a rental car?",
    answer:
      "You can call our support team or submit a request through our platform. Our agent will assist you in finding available car rental options and complete the booking on your behalf.",
  },
  {
    question: "Do I need to search and book online?",
    answer:
      "No. Our process is agent-assisted. You share your requirements, and our team handles the search, comparison, and booking with rental providers.",
  },
  {
    question: "How will I receive booking details?",
    answer:
      "Once your booking is confirmed, you will receive a confirmation via email or WhatsApp with all relevant details, including pickup location and provider information.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Cancellations or modifications depend on the rental provider’s policy. Our team can assist in raising requests, but approval and charges are determined by the provider.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept payments via secure payment links shared by our agents. Additional charges such as deposits may be required directly by the rental provider at pickup.",
  },
  {
    question: "Is a security deposit required?",
    answer:
      "Yes, most rental providers require a refundable security deposit at pickup. This is managed entirely by the provider.",
  },
  {
    question: "What documents are required?",
    answer:
      "You must provide a valid driving license, ID proof, and any additional documents required by the rental provider at the time of pickup.",
  },
  {
    question: "What happens if the provider cancels my booking?",
    answer:
      "If the rental provider cancels, we will assist in arranging alternatives or processing refunds as per the provider’s policy.",
  },
  {
    question: "Do you provide customer support?",
    answer:
      "Yes, our team is available to assist with booking, coordination, and provider communication.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Refunds are subject to the rental provider’s policy. Our team assists in initiating requests, but timelines and approvals are controlled by the provider.",
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
