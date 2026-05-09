import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How does AI lead scoring work?",
      answer: "Our AI analyzes multiple data points including lead source, engagement history, event type, budget indicators, and response patterns to assign a quality score. This helps you prioritize leads most likely to convert, saving time and increasing your conversion rate by up to 34%.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and ACH bank transfers for annual plans. All payments are processed securely through industry-standard encryption.",
    },
    {
      question: "Can I import my existing client data?",
      answer: "Yes! We support importing from CSV files, Excel spreadsheets, and direct integrations with popular CRM systems. Our onboarding team will help you migrate your data smoothly without any downtime.",
    },
    {
      question: "Is there a contract or commitment?",
      answer: "No contracts required. Our monthly plans are flexible and can be canceled anytime. Annual plans offer a 20% discount and come with a 30-day money-back guarantee.",
    },
    {
      question: "How does the event marketplace work?",
      answer: "Event hosts post opportunities in our marketplace, specifying vendor needs. Our AI matches your profile with relevant events based on your category, location, availability, and past performance. You receive invitations and can choose which opportunities to pursue.",
    },
    {
      question: "What integrations are available?",
      answer: "We integrate with Google Calendar, Outlook, QuickBooks, Xero, Stripe, PayPal, Zoom, DocuSign, Mailchimp, and many more. New integrations are added regularly based on customer feedback.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level 256-bit SSL encryption, regular security audits, and comply with GDPR, CCPA, and SOC 2 standards. Your data is backed up daily and stored in secure, redundant data centers.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties. You'll continue to have access until the end of your billing period. We also offer a 30-day money-back guarantee on annual plans.",
    },
    {
      question: "Do you offer training or onboarding?",
      answer: "Yes! All plans include access to our video tutorials and knowledge base. Professional and Enterprise plans include personalized onboarding sessions, and Enterprise customers get a dedicated account manager.",
    },
    {
      question: "What happens after my trial ends?",
      answer: "After your 14-day trial, you can choose to upgrade to a paid plan or continue with our free tier. No credit card is required for the trial, and you won't be charged unless you actively upgrade.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about EventVerse
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
