import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onSignupClick: () => void;
}

export const PricingSection = ({ onSignupClick }: PricingSectionProps) => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic lead management",
        "Up to 5 active clients",
        "2 event bookings/month",
        "Basic analytics",
        "Community support",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "For growing businesses",
      features: [
        "Unlimited clients",
        "Unlimited event bookings",
        "AI-powered insights",
        "Priority support",
        "All integrations",
        "Custom branding",
        "Advanced analytics",
        "E-signature integration",
      ],
      cta: "Start 14-Day Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "White-label solution",
        "Multi-location management",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Onboarding & training",
        "API access",
        "Advanced security",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Choose the plan that fits your business
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Save 20% with annual billing
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${
                plan.popular 
                  ? "border-primary shadow-xl scale-105 z-10" 
                  : "hover:shadow-lg transition-shadow"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/{plan.period.split(' ')[0]}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                onClick={onSignupClick}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
