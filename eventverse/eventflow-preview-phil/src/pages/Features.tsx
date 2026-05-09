import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageFooter } from "@/components/shared/PageFooter";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Users, Mail, MapPin, DollarSign, BarChart,
  Camera, Globe, Ticket, Plane, Megaphone, Bell,
  Clock, CheckCircle, Shield, Zap, Smartphone, Cloud
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const planningFeatures = [
    {
      icon: Calendar,
      title: "Event Creation & Templates",
      description: "Start with professional templates or build from scratch. Support for multi-day events with unlimited sessions."
    },
    {
      icon: Clock,
      title: "Timeline & Schedule Builder",
      description: "Create detailed schedules, set reminders, and keep everyone on track with visual timelines."
    },
    {
      icon: CheckCircle,
      title: "Task Management",
      description: "Assign tasks, track progress, set deadlines, and collaborate with your team in real-time."
    }
  ];

  const guestFeatures = [
    {
      icon: Users,
      title: "RSVP Tracking",
      description: "Send invitations, collect responses, track attendance, and manage plus-ones effortlessly."
    },
    {
      icon: Mail,
      title: "Guest Groups & Segments",
      description: "Organize guests into groups, send targeted messages, and manage permissions by segment."
    },
    {
      icon: MapPin,
      title: "Seating Arrangements",
      description: "Drag-and-drop seating charts with table layouts, dietary restrictions, and accessibility needs."
    }
  ];

  const communicationFeatures = [
    {
      icon: Mail,
      title: "Email Campaigns",
      description: "Design beautiful emails with our drag-and-drop builder. Track opens, clicks, and engagement."
    },
    {
      icon: Bell,
      title: "SMS & Push Notifications",
      description: "Send instant updates via text message or mobile push notifications for time-sensitive info."
    },
    {
      icon: Globe,
      title: "Guest Portal",
      description: "Customizable portal where guests access schedules, maps, RSVP, and share photos."
    }
  ];

  const vendorFeatures = [
    {
      icon: Users,
      title: "Vendor Marketplace",
      description: "Browse and book verified vendors. Read reviews, compare prices, and communicate directly."
    },
    {
      icon: DollarSign,
      title: "Budget Tracking",
      description: "Set budgets, track expenses, manage invoices, and get spending alerts automatically."
    },
    {
      icon: CheckCircle,
      title: "Contract Management",
      description: "Store contracts, track payments, set milestones, and manage vendor relationships."
    }
  ];

  const marketingFeatures = [
    {
      icon: Globe,
      title: "Event Website Builder",
      description: "Create stunning event websites with no code. Custom domains, SEO optimization included."
    },
    {
      icon: Ticket,
      title: "Ticketing & Registration",
      description: "Sell tickets, process payments, scan QR codes, and manage attendee types and pricing."
    },
    {
      icon: Megaphone,
      title: "Social Media Integration",
      description: "Share updates across platforms, embed social feeds, and track social engagement."
    }
  ];

  const analyticsFeatures = [
    {
      icon: BarChart,
      title: "Real-time Dashboard",
      description: "Monitor everything at a glance with customizable dashboards and real-time updates."
    },
    {
      icon: Users,
      title: "Attendance Tracking",
      description: "QR code check-in, badge printing, live attendance counts, and capacity management."
    },
    {
      icon: CheckCircle,
      title: "Engagement Metrics",
      description: "Track email opens, website visits, RSVP rates, and guest engagement scores."
    }
  ];

  const mediaFeatures = [
    {
      icon: Camera,
      title: "Photo & Video Hosting",
      description: "Upload unlimited media, create galleries, enable guest uploads, and download in bulk."
    },
    {
      icon: Globe,
      title: "Live Streaming",
      description: "Stream your event live to remote attendees with HD quality and interactive chat."
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Secure cloud storage for all event files, documents, and media with easy sharing."
    }
  ];

  const advancedFeatures = [
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android apps for on-the-go event management and check-in."
    },
    {
      icon: Shield,
      title: "Enterprise SSO",
      description: "Single sign-on integration with your corporate identity provider for security."
    },
    {
      icon: Zap,
      title: "API Access",
      description: "RESTful API for custom integrations with your existing tools and workflows."
    }
  ];

  const comparisonFeatures = [
    { feature: "Unlimited Events", free: true, premium: true },
    { feature: "Guest Limit", free: "50", premium: "Unlimited" },
    { feature: "RSVP Management", free: true, premium: true },
    { feature: "Email Invitations", free: true, premium: true },
    { feature: "Seating Charts", free: false, premium: true },
    { feature: "Budget Tracking", free: false, premium: true },
    { feature: "Vendor Marketplace", free: false, premium: true },
    { feature: "Custom Branding", free: false, premium: true },
    { feature: "Priority Support", free: false, premium: true },
    { feature: "API Access", free: false, premium: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Everything You Need to Plan Perfect Events"
        subtitle="Comprehensive tools and features for events of any size"
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <Tabs defaultValue="planning" className="w-full mb-20">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-12">
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="planning">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guests">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guestFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communicationFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...advancedFeatures, ...mediaFeatures].map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Feature Comparison */}
        <section className="mb-20">
          <SectionHeading 
            title="Free vs Premium Features"
            subtitle="Choose the plan that fits your needs"
          />
          
          <Card className="border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-foreground">
                      <Badge variant="secondary">Free</Badge>
                    </th>
                    <th className="text-center p-4 font-semibold text-foreground">
                      <Badge>Premium</Badge>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-foreground">{item.feature}</td>
                      <td className="p-4 text-center">
                        {typeof item.free === 'boolean' ? (
                          item.free ? (
                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">{item.free}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof item.premium === 'boolean' ? (
                          item.premium ? (
                            <CheckCircle className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-foreground font-medium">{item.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Integration Partners */}
        <section className="mb-20">
          <SectionHeading 
            title="Seamless Integrations"
            subtitle="Connect with the tools you already use"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Zoom', 'Google Calendar', 'Stripe', 'Mailchimp', 'Slack', 'Zapier'].map((partner, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{partner}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Platform Specs */}
        <section className="mb-20">
          <SectionHeading 
            title="Platform Specifications"
            subtitle="Built for performance, security, and scale"
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Security</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>AES-256 Encryption</li>
                  <li>GDPR & CCPA Compliant</li>
                  <li>SOC 2 Type II Certified</li>
                  <li>Regular Security Audits</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Performance</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>99.9% Uptime SLA</li>
                  <li>Global CDN</li>
                  <li>Sub-second Load Times</li>
                  <li>Auto-scaling Infrastructure</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <Cloud className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Reliability</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Multi-region Redundancy</li>
                  <li>Automated Backups</li>
                  <li>24/7 Monitoring</li>
                  <li>Disaster Recovery Plan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Experience All Features?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start with our free plan and upgrade anytime to unlock premium features
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/create-event">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline">See How It Works</Button>
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

export default Features;
