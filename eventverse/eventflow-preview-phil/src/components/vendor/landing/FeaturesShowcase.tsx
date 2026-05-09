import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, DollarSign, MapPin, BarChart3, Calendar, FileText, MessageSquare } from "lucide-react";

export const FeaturesShowcase = () => {
  const features = [
    {
      id: "leads",
      icon: Bot,
      title: "AI-Powered Lead Management",
      description: "Automatic lead qualification and scoring with AI-generated proposal templates",
      benefits: [
        "Automatic lead qualification and scoring",
        "AI-generated proposal templates",
        "Smart reminders for follow-ups",
        "Lead source attribution tracking",
      ],
      stat: "Vendors increase conversion by 34% with AI lead scoring",
    },
    {
      id: "clients",
      icon: Users,
      title: "Client Management Hub",
      description: "Complete client history and relationship tracking in one place",
      benefits: [
        "Complete client history and communication log",
        "Project timeline management",
        "Automated check-ins and surveys",
        "Client satisfaction scoring",
      ],
      stat: "Save 10+ hours per week on client management",
    },
    {
      id: "billing",
      icon: DollarSign,
      title: "Smart Billing & Invoicing",
      description: "Automated invoice generation with online payment processing",
      benefits: [
        "Automated invoice generation",
        "Online payment processing",
        "Payment reminders and tracking",
        "Financial analytics and reporting",
      ],
      stat: "Get paid 40% faster with automated invoicing",
    },
    {
      id: "marketplace",
      icon: MapPin,
      title: "Event Booth Marketplace",
      description: "Direct event invitations from hosts with interactive venue floor plans",
      benefits: [
        "Direct event invitations from hosts",
        "Interactive venue floor plans",
        "Booth selection and customization",
        "Automated contract management",
      ],
      stat: "Access 500+ curated event opportunities monthly",
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Real-time revenue tracking and performance metrics",
      benefits: [
        "Real-time revenue tracking",
        "Performance metrics and trends",
        "Market insights and pricing optimization",
        "Competitor benchmarking",
      ],
      stat: "Data-driven vendors earn 28% more annually",
    },
    {
      id: "calendar",
      icon: Calendar,
      title: "Integrated Calendar",
      description: "Multi-event scheduling with team coordination tools",
      benefits: [
        "Multi-event scheduling",
        "Team coordination tools",
        "Automated reminders",
        "Resource allocation",
      ],
      stat: "Never miss a booking with smart scheduling",
    },
    {
      id: "documents",
      icon: FileText,
      title: "Document Management",
      description: "Centralized contract storage with e-signature integration",
      benefits: [
        "Centralized contract storage",
        "E-signature integration",
        "Template library",
        "Version control and audit trail",
      ],
      stat: "50% faster contract turnaround time",
    },
    {
      id: "communication",
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Unified inbox for all client messages and notifications",
      benefits: [
        "Centralized messaging",
        "Email integration",
        "SMS notifications",
        "Communication analytics",
      ],
      stat: "Respond 3x faster with unified communications",
    },
  ];

  const [activeTab, setActiveTab] = useState("leads");

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Grow Your Business
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed specifically for event vendors
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8 h-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="flex flex-col items-center gap-2 py-4"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs hidden md:inline">{feature.title.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <TabsContent key={feature.id} value={feature.id} className="mt-8">
                <Card className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-10 h-10 text-primary" />
                        <h3 className="text-3xl font-bold">{feature.title}</h3>
                      </div>
                      
                      <p className="text-lg text-muted-foreground mb-6">
                        {feature.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {feature.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span className="text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <Badge className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary">
                        {feature.stat}
                      </Badge>
                    </div>

                    <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                      <Icon className="w-32 h-32 text-primary/20" />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
