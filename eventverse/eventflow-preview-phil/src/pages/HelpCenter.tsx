import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageFooter } from "@/components/shared/PageFooter";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, BookOpen, Video, MessageCircle, Mail, Phone,
  Calendar, Users, MapPin, DollarSign, BarChart, Bell,
  Camera, ClipboardList, Globe, Ticket, Plane, Megaphone
} from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickStartGuides = [
    {
      icon: Calendar,
      title: "Creating Your First Event",
      description: "Step-by-step guide to setting up your event from scratch in under 5 minutes."
    },
    {
      icon: Users,
      title: "Inviting Guests & Managing RSVPs",
      description: "Learn how to send invitations, track responses, and manage your guest list."
    },
    {
      icon: MapPin,
      title: "Setting Up Seating Charts",
      description: "Create beautiful seating arrangements with our drag-and-drop builder."
    },
    {
      icon: DollarSign,
      title: "Managing Vendors & Budget",
      description: "Track expenses, manage vendor contracts, and stay within budget."
    }
  ];

  const modules = [
    { icon: BarChart, title: "Analytics", description: "Track engagement and event metrics" },
    { icon: Bell, title: "Announcements", description: "Send updates to your guests" },
    { icon: DollarSign, title: "Budget", description: "Manage event finances" },
    { icon: Camera, title: "Media", description: "Share photos and videos" },
    { icon: ClipboardList, title: "RSVP", description: "Track guest responses" },
    { icon: Calendar, title: "Schedule", description: "Create event timelines" },
    { icon: MapPin, title: "Seating", description: "Arrange seating charts" },
    { icon: Globe, title: "Website Builder", description: "Create custom event pages" },
    { icon: Ticket, title: "Ticketing", description: "Sell event tickets" },
    { icon: Plane, title: "Travel", description: "Coordinate guest travel" },
    { icon: Megaphone, title: "Marketing", description: "Promote your events" }
  ];

  const troubleshooting = [
    {
      question: "Guests aren't receiving invitation emails",
      answer: "Check that email addresses are correct and ask guests to check spam folders. Ensure your email settings are configured properly in Settings > Notifications. If issues persist, try resending invitations or use SMS as an alternative."
    },
    {
      question: "I can't upload images to my event",
      answer: "Ensure images are under 10MB and in supported formats (JPG, PNG, GIF). Check your browser's file upload permissions. Try clearing cache or using a different browser. Premium users have higher upload limits."
    },
    {
      question: "My seating chart isn't saving",
      answer: "Make sure you click 'Save Changes' after making modifications. Check your internet connection. If using the mobile app, try the web version. Contact support if the issue continues."
    },
    {
      question: "How do I recover a deleted event?",
      answer: "Events are kept in trash for 30 days. Go to Settings > Trash to restore. After 30 days, deletion is permanent. We recommend exporting important data regularly as a backup."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Help Center"
        subtitle="Get answers, learn features, and master EventVerse"
      >
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search help articles..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Quick Start Guides */}
        <section className="mb-20">
          <SectionHeading 
            title="Quick Start Guides"
            subtitle="Get up and running in minutes with these essential guides"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartGuides.map((guide, index) => (
              <FeatureCard 
                key={index}
                icon={guide.icon}
                title={guide.title}
                description={guide.description}
              />
            ))}
          </div>
        </section>

        {/* Feature Documentation */}
        <section className="mb-20">
          <SectionHeading 
            title="Feature Documentation"
            subtitle="Detailed guides for every EventVerse module"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <Link key={index} to={`/modules/${module.title.toLowerCase()}`}>
                <Card className="border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50 h-full">
                  <CardContent className="p-6">
                    <module.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-20">
          <SectionHeading 
            title="Video Tutorials"
            subtitle="Watch and learn with step-by-step video guides"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Card key={num} className="border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Video className="w-16 h-16 text-primary" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">
                    Getting Started Tutorial {num}
                  </h3>
                  <p className="text-sm text-muted-foreground">5 minutes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <SectionHeading 
            title="Troubleshooting"
            subtitle="Solutions to common issues"
          />
          
          <Accordion type="single" collapsible className="w-full">
            {troubleshooting.map((item, index) => (
              <AccordionItem key={index} value={`trouble-${index}`}>
                <AccordionTrigger className="text-left text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="border-border bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Need More Help?
                </h2>
                <p className="text-muted-foreground">
                  Our support team is available 24/7 to assist you
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Response within 2 hours
                  </p>
                  <Button variant="outline" size="sm">
                    Send Email
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Instant assistance
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mon-Fri, 9am-6pm EST
                  </p>
                  <Button variant="outline" size="sm">
                    Call Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <PageFooter />
    </div>
  );
};

export default HelpCenter;
