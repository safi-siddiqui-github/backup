import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Star, 
  Sparkles, 
  Gift,
  Zap,
  PartyPopper
} from "lucide-react";

interface CelebrationModalProps {
  open: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    xpReward: number;
    tier: string;
    icon: React.ComponentType<any>;
  } | null;
}

const CelebrationModal = ({ open, onClose, achievement }: CelebrationModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!achievement) return null;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze": return "from-amber-500 to-orange-600";
      case "silver": return "from-gray-400 to-gray-600";
      case "gold": return "from-yellow-400 to-yellow-600";
      case "platinum": return "from-blue-400 to-blue-600";
      case "diamond": return "from-purple-400 to-pink-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto text-center p-0 overflow-hidden border-0">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className={`relative bg-gradient-to-br ${getTierColor(achievement.tier)} p-8 text-white`}>
          <div className="space-y-4">
            {/* Achievement Icon */}
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-scale-in">
              <achievement.icon className="w-8 h-8" />
            </div>

            {/* Achievement Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <PartyPopper className="w-5 h-5" />
                <h2 className="text-xl font-bold">Achievement Unlocked!</h2>
                <PartyPopper className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold">{achievement.title}</h3>
            </div>

            {/* Achievement Description */}
            <p className="text-white/90 text-sm leading-relaxed">
              {achievement.description}
            </p>

            {/* Tier Badge */}
            <Badge className="bg-white/20 text-white text-sm px-3 py-1 border-0">
              {achievement.tier.toUpperCase()} TIER
            </Badge>

            {/* XP Reward */}
            {achievement.xpReward > 0 && (
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">+{achievement.xpReward} XP</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-6 bg-background space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Keep up the amazing work! Your dedication to creating exceptional events is paying off.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white border-0"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Awesome!
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Share Achievement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationModal;