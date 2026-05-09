import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Clock } from "lucide-react";
import { PricingTier } from "@/types/website";

interface PricingTableProps {
  pricing: PricingTier[];
  title?: string;
  description?: string;
  showEarlyBird?: boolean;
}

export const PricingTable = ({ 
  pricing, 
  title = "Ticket Pricing", 
  description,
  showEarlyBird = true 
}: PricingTableProps) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const isEarlyBirdActive = (tier: PricingTier) => {
    if (!tier.earlyBird || !showEarlyBird) return false;
    const deadline = new Date(tier.earlyBird.deadline);
    return new Date() < deadline;
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricing.map((tier) => {
            const earlyBirdActive = isEarlyBirdActive(tier);
            const currentPrice = earlyBirdActive ? tier.earlyBird!.price : tier.price;
            
            return (
              <Card 
                key={tier.id} 
                className={`relative ${
                  tier.isPopular 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:shadow-lg transition-shadow'
                }`}
              >
                {tier.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                {earlyBirdActive && (
                  <Badge className="absolute -top-3 right-4 bg-orange-500">
                    <Clock className="w-3 h-3 mr-1" />
                    Early Bird
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">
                        {formatPrice(currentPrice, tier.currency)}
                      </span>
                    </div>
                    
                    {earlyBirdActive && (
                      <div className="mt-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(tier.price, tier.currency)}
                        </span>
                        <p className="text-xs text-orange-600 mt-1">
                          Early bird until {new Date(tier.earlyBird!.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      tier.isPopular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={tier.isPopular ? 'default' : 'outline'}
                    size="lg"
                  >
                    Get {tier.name} Ticket
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All prices are in USD. Group discounts available for 5+ tickets.
          </p>
        </div>
      </div>
    </section>
  );
};