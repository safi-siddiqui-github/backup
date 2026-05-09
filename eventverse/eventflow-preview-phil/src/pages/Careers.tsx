import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageFooter } from "@/components/shared/PageFooter";
import { JobCard } from "@/components/shared/JobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Laptop, Heart, TrendingUp, Users, Coffee, Plane, 
  GraduationCap, DollarSign, Calendar, MapPin
} from "lucide-react";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const benefits = [
    {
      icon: Laptop,
      title: "Remote First",
      description: "Work from anywhere in the world with flexible hours"
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance"
    },
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-leading compensation plus equity options"
    },
    {
      icon: Calendar,
      title: "Unlimited PTO",
      description: "Take the time you need to recharge and refresh"
    },
    {
      icon: GraduationCap,
      title: "Learning Budget",
      description: "$2,000 annual budget for courses and conferences"
    },
    {
      icon: Plane,
      title: "Team Retreats",
      description: "Annual all-expenses-paid company retreats"
    }
  ];

  const jobs = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build beautiful, responsive user interfaces using React, TypeScript, and modern web technologies. Work on features used by thousands of event planners daily."
    },
    {
      title: "Product Designer (UI/UX)",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive experiences for event planners. Create pixel-perfect interfaces and conduct user research to improve our platform continuously."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help customers maximize value from EventVerse. Build relationships, provide training, and ensure customer satisfaction and retention."
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive growth through compelling campaigns. Manage content, social media, email marketing, and partnerships to expand our reach."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure. Ensure 99.9% uptime, optimize performance, and implement security best practices."
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      description: "Generate qualified leads and schedule demos. Be the first point of contact for potential customers and help grow our customer base."
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Design and build scalable APIs and services. Work with databases, authentication systems, and real-time features."
    },
    {
      title: "Content Marketing Lead",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Create engaging content that educates and inspires event planners. Manage our blog, guides, and video content strategy."
    }
  ];

  const departments = ["all", "Engineering", "Design", "Marketing", "Sales", "Customer Success"];
  const locations = ["all", "Remote", "Hybrid", "New York", "San Francisco"];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
    return matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Join the EventVerse Team"
        subtitle="Help us build the future of event management and create unforgettable experiences for millions of people worldwide"
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Why Work Here */}
        <section className="mb-20">
          <SectionHeading 
            title="Why Work at EventVerse?"
            subtitle="We're building something special, and we want you to be part of it"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Culture */}
        <section className="mb-20">
          <SectionHeading 
            title="Our Culture"
            subtitle="What makes EventVerse a great place to work"
          />
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Collaborative" },
              { icon: TrendingUp, label: "Growth-Minded" },
              { icon: Heart, label: "Inclusive" },
              { icon: Coffee, label: "Fun & Friendly" }
            ].map((item, index) => (
              <Card key={index} className="border-border bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-20">
          <SectionHeading 
            title="Open Positions"
            subtitle={`${filteredJobs.length} opportunities to make an impact`}
          />
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Department</p>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept === "all" ? "All" : dept}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Location</p>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <Button
                    key={loc}
                    variant={selectedLocation === loc ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(loc)}
                  >
                    {loc === "all" ? "All" : loc}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No positions match your filters. Try adjusting your selection.
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Application Process */}
        <section className="mb-20">
          <SectionHeading 
            title="Our Hiring Process"
            subtitle="What to expect when you apply"
          />
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Apply", description: "Submit your application" },
              { step: "2", title: "Screen", description: "Initial phone call" },
              { step: "3", title: "Interview", description: "Technical & cultural fit" },
              { step: "4", title: "Offer", description: "We'd love to have you!" },
              { step: "5", title: "Onboard", description: "Welcome to the team" }
            ].map((stage, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-xl flex items-center justify-center mx-auto mb-3">
                  {stage.step}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{stage.title}</h3>
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Don't See a Perfect Fit?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always looking for talented people. Send us your resume and let us know what you're passionate about.
              </p>
              <Button size="lg">
                Send General Application
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <PageFooter />
    </div>
  );
};

export default Careers;
