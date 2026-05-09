import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageFooter } from "@/components/shared/PageFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Settings, Users, BarChart, Smartphone, Camera,
  ShoppingBag, TrendingUp, MessageCircle, CreditCard, Shield, Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const plannerSteps = [
    {
      number: "01",
      icon: Calendar,
      title: "Create Your Event",
      description: "Start with a template or build from scratch. Set your event details, date, location, and theme in minutes. Our intuitive interface guides you through every step.",
      features: ["Pre-built templates", "Custom branding", "Multi-day support"]
    },
    {
      number: "02",
      icon: Settings,
      title: "Customize Everything",
      description: "Select the modules you need - RSVP tracking, seating charts, budget management, vendor coordination, and more. Enable only what your event requires.",
      features: ["15+ powerful modules", "Drag-and-drop builder", "Custom workflows"]
    },
    {
      number: "03",
      icon: Users,
      title: "Invite Your Guests",
      description: "Send beautiful invitations via email or SMS. Track RSVPs in real-time, collect dietary preferences, manage plus-ones, and send automated reminders.",
      features: ["Automated reminders", "Custom invitations", "Guest portal access"]
    },
    {
      number: "04",
      icon: BarChart,
      title: "Manage & Track",
      description: "Your dashboard shows everything at a glance - confirmed guests, pending RSVPs, budget status, vendor communications, and task completion.",
      features: ["Real-time analytics", "Automated reports", "Team collaboration"]
    },
    {
      number: "05",
      icon: Smartphone,
      title: "Execute Flawlessly",
      description: "On event day, use mobile check-in with QR codes, send live updates to guests, coordinate with vendors, and manage everything from your phone.",
      features: ["QR code check-in", "Live updates", "Mobile app"]
    },
    {
      number: "06",
      icon: Camera,
      title: "Capture Memories",
      description: "After your event, collect photos from guests, share highlights, send thank-you messages, and review analytics to make your next event even better.",
      features: ["Photo sharing", "Feedback surveys", "Success metrics"]
    }
  ];

  const vendorSteps = [
    {
      number: "01",
      icon: ShoppingBag,
      title: "Create Your Profile",
      description: "Showcase your services with a professional profile including portfolio, pricing, availability, and client reviews.",
      features: ["Portfolio showcase", "Service catalog", "Reviews & ratings"]
    },
    {
      number: "02",
      icon: TrendingUp,
      title: "Get Matched with Events",
      description: "Our AI matches you with relevant events based on your services, location, and availability. Receive qualified leads automatically.",
      features: ["AI matching", "Lead notifications", "Smart filtering"]
    },
    {
      number: "03",
      icon: MessageCircle,
      title: "Communicate & Quote",
      description: "Chat with event planners, share proposals, negotiate terms, and close deals all within the platform. No more email chains.",
      features: ["Built-in messaging", "Proposal templates", "Contract management"]
    },
    {
      number: "04",
      icon: CreditCard,
      title: "Manage Bookings",
      description: "Track all your bookings in one calendar. Process payments, send invoices, and manage contracts with integrated tools.",
      features: ["Payment processing", "Invoice generation", "Calendar sync"]
    }
  ];

  const useCases = [
    {
      title: "Weddings",
      description: "Plan every detail from engagement to honeymoon",
      color: "from-pink-500/20 to-purple-500/20"
    },
    {
      title: "Corporate Events",
      description: "Organize conferences, meetings, and team building",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Conferences",
      description: "Manage large-scale events with multiple tracks",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Birthday Parties",
      description: "Create memorable celebrations for any age",
      color: "from-orange-500/20 to-yellow-500/20"
    },
    {
      title: "Festivals",
      description: "Coordinate multi-day outdoor events",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Fundraisers",
      description: "Maximize donations and engagement",
      color: "from-red-500/20 to-orange-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="How EventVerse Works"
        subtitle="Everything you need to plan, manage, and execute unforgettable events"
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <Tabs defaultValue="planners" className="w-full mb-20">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="planners" className="text-lg">For Planners</TabsTrigger>
            <TabsTrigger value="vendors" className="text-lg">For Vendors</TabsTrigger>
          </TabsList>

          <TabsContent value="planners">
            <div className="space-y-16">
              {plannerSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-primary/30">{step.number}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="border-border">
                      <CardContent className="p-8">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                          <step.icon className="w-24 h-24 text-primary/40" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors">
            <div className="space-y-16">
              {vendorSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-primary/30">{step.number}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="border-border">
                      <CardContent className="p-8">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                          <step.icon className="w-24 h-24 text-primary/40" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Use Cases */}
        <section className="mb-20">
          <SectionHeading 
            title="Perfect for Any Event Type"
            subtitle="From intimate gatherings to large-scale productions"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`h-32 bg-gradient-to-br ${useCase.color}`} />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <SectionHeading 
            title="Why Choose EventVerse?"
            subtitle="The features that set us apart"
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Create an event in under 5 minutes with our intuitive interface
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Bank-level encryption and 99.9% uptime guarantee
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our team is always here to help you succeed
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Create Your First Event?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of planners who trust EventVerse to bring their events to life
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/create-event">
                  <Button size="lg">Start Planning Free</Button>
                </Link>
                <Link to="/public-events">
                  <Button size="lg" variant="outline">View Pricing</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <PageFooter />
    </div>
  );
};

export default HowItWorks;
