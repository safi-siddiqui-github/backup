import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, TrendingUp, DollarSign, Play, Star } from "lucide-react";

interface HeroSectionProps {
  onSignupClick: () => void;
  onLoginClick: () => void;
}

export const HeroSection = ({ onSignupClick, onLoginClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Star className="w-4 h-4 mr-2 fill-yellow-500 text-yellow-500" />
            4.9/5 from 2,500+ vendors
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            100,000+ events powered
          </Badge>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Grow Your Event Business
          <br />
          with AI-Powered Tools
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Join thousands of vendors managing clients, leads, and bookings in one intelligent platform
        </p>

        {/* Value props */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border">
            <Bot className="w-8 h-8 text-primary" />
            <span className="font-semibold">AI-Enhanced Leads</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="font-semibold">Smart Business Intel</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border">
            <DollarSign className="w-8 h-8 text-primary" />
            <span className="font-semibold">Automated Billing</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={onSignupClick}
          >
            Start Free Trial
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Demo (2 min)
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            onClick={onLoginClick}
          >
            Sign In
          </Button>
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {["Venues", "Caterers", "Photographers", "DJs", "Florists", "Planners"].map((category) => (
            <Badge key={category} variant="outline" className="px-3 py-1">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
