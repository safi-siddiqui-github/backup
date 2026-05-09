import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { PageFooter } from "@/components/shared/PageFooter";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = {
    general: [
      {
        question: "What is EventVerse?",
        answer: "EventVerse is a comprehensive event management platform that helps you plan, organize, and execute events of any size. From weddings to corporate conferences, we provide all the tools you need in one place."
      },
      {
        question: "Who is EventVerse for?",
        answer: "EventVerse is designed for anyone planning events - whether you're a professional event planner, corporate organizer, wedding coordinator, or hosting your first birthday party. Our platform scales to your needs."
      },
      {
        question: "What types of events can I create?",
        answer: "You can create any type of event including weddings, corporate events, conferences, birthday parties, festivals, fundraisers, workshops, seminars, and more. Our flexible platform adapts to your event type."
      },
      {
        question: "Do I need to download anything?",
        answer: "No downloads required! EventVerse is a web-based platform accessible from any browser. We also offer mobile apps for iOS and Android for on-the-go management."
      }
    ],
    pricing: [
      {
        question: "Is there a free plan?",
        answer: "Yes! Our free plan includes basic event creation, RSVP management, and guest communication for events up to 50 guests. Perfect for small gatherings and getting started."
      },
      {
        question: "What's included in the Premium plan?",
        answer: "Premium includes unlimited guests, advanced modules (seating charts, budget tracking, vendor management), custom branding, priority support, and all future features. Starting at $29/month."
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades will apply at the end of your current billing cycle."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and can arrange invoicing for enterprise customers."
      }
    ],
    features: [
      {
        question: "How does RSVP tracking work?",
        answer: "Send custom RSVP invitations via email or SMS. Guests can respond directly with their attendance, meal preferences, and plus-ones. Get real-time updates and automated reminders for non-responders."
      },
      {
        question: "Can I create seating charts?",
        answer: "Yes! Our drag-and-drop seating chart builder (Premium) lets you arrange tables, assign seats, consider dietary restrictions, and export printable charts. Perfect for weddings and formal events."
      },
      {
        question: "How do I manage vendors?",
        answer: "Our vendor management module helps you find, communicate with, and track all your event vendors. Store contracts, manage payments, and keep everything organized in one place."
      },
      {
        question: "Can guests access event information?",
        answer: "Yes! Each event has a customizable guest portal where attendees can view schedules, maps, RSVP, upload photos, and stay updated with announcements."
      }
    ],
    technical: [
      {
        question: "Which browsers are supported?",
        answer: "EventVerse works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
      },
      {
        question: "Is there a mobile app?",
        answer: "Yes! We have native apps for both iOS and Android. Download from the App Store or Google Play to manage your events on the go."
      },
      {
        question: "Can I export my data?",
        answer: "Absolutely! You can export guest lists, RSVPs, budgets, and schedules to CSV or PDF format at any time. Your data is always yours."
      },
      {
        question: "Do you offer an API?",
        answer: "Yes, Premium and Enterprise plans include API access for custom integrations with your existing tools and workflows. Full documentation available."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' in the top right corner, enter your email and create a password. You can also sign up using Google, Microsoft, or Apple for faster access."
      },
      {
        question: "I forgot my password, what do I do?",
        answer: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. The link is valid for 24 hours."
      },
      {
        question: "Can I collaborate with my team?",
        answer: "Yes! Invite team members to your events with specific roles and permissions. Collaborate in real-time on planning and see who's making changes."
      },
      {
        question: "How is my data protected?",
        answer: "We use bank-level encryption, secure data centers, regular security audits, and comply with GDPR and CCPA. Your data privacy is our top priority."
      }
    ],
    security: [
      {
        question: "Is my data encrypted?",
        answer: "Yes, all data is encrypted in transit (TLS 1.3) and at rest (AES-256). We follow industry best practices for data security."
      },
      {
        question: "Are you GDPR compliant?",
        answer: "Yes, we are fully GDPR compliant. You have full control over your data, can request exports or deletion, and we never sell your information."
      },
      {
        question: "What are your backup policies?",
        answer: "We perform automated backups every 6 hours and maintain point-in-time recovery for 30 days. Your data is stored redundantly across multiple regions."
      },
      {
        question: "Do you have uptime guarantees?",
        answer: "Yes, we maintain 99.9% uptime SLA for Premium plans. Our infrastructure is monitored 24/7 with automatic failover systems."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about EventVerse"
      >
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search questions..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {Object.entries(faqCategories).map(([category, questions]) => (
            <TabsContent key={category} value={category}>
              <Accordion type="single" collapsible className="w-full">
                {questions
                  .filter(q => 
                    searchQuery === "" || 
                    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((faq, index) => (
                    <AccordionItem key={index} value={`${category}-${index}`}>
                      <AccordionTrigger className="text-left text-lg">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>

        {/* Still Have Questions */}
        <section className="mt-16">
          <Card className="border-border bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/help">
                  <Button variant="outline" size="lg">
                    <Mail className="w-4 h-4 mr-2" />
                    Visit Help Center
                  </Button>
                </Link>
                <Button size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <PageFooter />
    </div>
  );
};

export default FAQ;
