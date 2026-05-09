import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageFooter } from "@/components/shared/PageFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb, Shield, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push boundaries to deliver cutting-edge event management solutions."
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Your events matter. We ensure 99.9% uptime and rock-solid security for peace of mind."
    },
    {
      icon: Heart,
      title: "Community",
      description: "We believe in the power of connections and building meaningful experiences together."
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "We're committed to delivering exceptional quality in everything we do."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Event Planners" },
    { value: "500K+", label: "Events Created" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "User Rating" }
  ];

  const timeline = [
    { year: "2022", title: "The Beginning", description: "Founded with a vision to simplify event planning for everyone." },
    { year: "2023", title: "Rapid Growth", description: "Reached 5,000 users and launched our vendor marketplace." },
    { year: "2024", title: "Innovation", description: "Introduced AI-powered features and mobile apps." },
    { year: "2025", title: "Global Expansion", description: "Serving customers in over 50 countries worldwide." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="About EventVerse"
        subtitle="We're on a mission to make event planning effortless, enjoyable, and accessible to everyone."
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Our Story */}
        <section className="mb-20">
          <SectionHeading 
            title="Our Story"
            subtitle="From a simple idea to the most comprehensive event management platform"
          />
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">{item.year}</span>
                </div>
                <div className="flex-1">
                  <div className="relative pl-8 pb-8 border-l-2 border-primary/30">
                    <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-primary" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower event planners with intuitive, powerful tools that turn complex logistics 
                  into seamless experiences. We believe every event deserves to be extraordinary, 
                  and we're here to make that happen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the world's most trusted event management platform, where millions of 
                  planners create unforgettable moments. We envision a future where technology 
                  enhances human connections, not replaces them.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <SectionHeading 
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* By The Numbers */}
        <section className="mb-20">
          <SectionHeading 
            title="By The Numbers"
            subtitle="Our impact in the event planning community"
          />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Join Us on Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're planning your first event or your thousandth, 
                EventVerse is here to help you create unforgettable experiences.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/create-event">
                  <Button size="lg">Start Planning Free</Button>
                </Link>
                <Link to="/careers">
                  <Button size="lg" variant="outline">Join Our Team</Button>
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

export default About;
