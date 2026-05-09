import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Rocket, Compass } from "lucide-react";

interface FinalCTAProps {
  onSignupClick: () => void;
}

export const FinalCTA = ({ onSignupClick }: FinalCTAProps) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Ready to Grow Your Event Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join 2,500+ vendors already growing with EventVerse
          </p>
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8">
            <span className="text-sm font-semibold text-primary">
              🔥 15 vendors signed up this week
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Talk to our vendor success team
            </p>
            <Button variant="outline" size="lg" className="w-full">
              Schedule a Demo
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1 border-primary shadow-lg scale-105">
            <Rocket className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-3">Ready to start?</h3>
            <p className="text-muted-foreground mb-6">
              14-day free trial, no credit card needed
            </p>
            <Button size="lg" className="w-full" onClick={onSignupClick}>
              Start Free Trial
            </Button>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <Compass className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-3">Want to explore?</h3>
            <p className="text-muted-foreground mb-6">
              Take an interactive product tour
            </p>
            <Button variant="outline" size="lg" className="w-full">
              Take a Tour
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
