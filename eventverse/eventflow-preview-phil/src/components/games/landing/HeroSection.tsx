import { Button } from "@/components/ui/button";
import { Gamepad2, Sparkles, Zap, Trophy } from "lucide-react";

interface HeroSectionProps {
  onCreateGame: () => void;
  templateCount: number;
}

const HeroSection = ({ onCreateGame, templateCount }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-pink-600 p-8 md:p-12 border border-border/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <Gamepad2 className="absolute top-10 left-10 w-16 h-16 animate-[spin_20s_linear_infinite] text-white" />
        <Sparkles className="absolute top-20 right-20 w-12 h-12 animate-pulse text-white" />
        <Zap className="absolute bottom-20 left-20 w-10 h-10 animate-bounce text-white" />
        <Trophy className="absolute bottom-10 right-10 w-14 h-14 animate-[pulse_3s_ease-in-out_infinite] text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Create Amazing
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Interactive Games
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-2">
          Choose from {templateCount} game types • Unlimited players • Real-time fun
        </p>
        
        <p className="text-sm md:text-base text-white/80 mb-8">
          Perfect for events, parties, and team building
        </p>

        <Button 
          onClick={onCreateGame}
          size="lg"
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all hover:scale-105"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Create Your First Game
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
