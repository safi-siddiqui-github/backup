import { Card } from "@/components/ui/card";
import { UserPlus, Settings, Zap, TrendingUp } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      duration: "2 minutes",
      description: "Create your account, select your vendor category, and complete your business profile.",
    },
    {
      icon: Settings,
      title: "Set Up",
      duration: "10 minutes",
      description: "Import existing clients (optional), customize your preferences, and connect your calendar.",
    },
    {
      icon: Zap,
      title: "Get Matched",
      duration: "Instant",
      description: "AI finds relevant leads, you receive event invitations, and browse the marketplace.",
    },
    {
      icon: TrendingUp,
      title: "Grow Business",
      duration: "Ongoing",
      description: "Respond to leads, manage bookings, track analytics, and watch your business grow.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to transform your event business
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card 
                  key={index} 
                  className="relative p-6 text-center hover:shadow-lg transition-shadow bg-card"
                >
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-primary font-semibold mb-3">
                    {step.duration}
                  </p>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
