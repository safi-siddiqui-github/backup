import { Button } from "@/components/ui/button";
import { Gamepad2, Users, Zap, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onCreateGame: () => void;
  onBrowseTemplates: () => void;
}

const EmptyState = ({ onCreateGame, onBrowseTemplates }: EmptyStateProps) => {
  const benefits = [
    {
      icon: Gamepad2,
      title: "10 Game Templates",
      description: "Lightning Trivia, Tap Race, Photo Challenges & more"
    },
    {
      icon: Users,
      title: "Unlimited Players",
      description: "From intimate groups to thousands"
    },
    {
      icon: Zap,
      title: "Real-time Fun",
      description: "Instant scoring & live leaderboards"
    }
  ];

  return (
    <div className="text-center py-16 px-4">
      {/* Illustration */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse">
            <Gamepad2 className="w-24 h-24 text-primary/20" />
          </div>
          <Gamepad2 className="w-24 h-24 text-primary relative" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Ready to Create Something Amazing?
      </h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose from 10 interactive game types. Perfect for events, parties, and gatherings!
      </p>

      {/* Benefits Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={onCreateGame}
          size="lg"
          className="px-8"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Create Your First Game
        </Button>
        <Button 
          onClick={onBrowseTemplates}
          variant="outline"
          size="lg"
          className="px-8"
        >
          Browse Templates →
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
