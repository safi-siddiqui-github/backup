import { 
  Zap, Hand, Camera, Puzzle, Grid3x3, Eye, BookOpen, 
  Swords, Brain, Compass, LucideIcon 
} from "lucide-react";
import { GameType } from "@/types/enhanced-games";
import { cn } from "@/lib/utils";

interface GameIconAnimatedProps {
  type: GameType;
  className?: string;
}

const iconMap: Record<GameType, { 
  Icon: LucideIcon; 
  animation: string;
  color: string;
}> = {
  'lightning-trivia': {
    Icon: Zap,
    animation: 'animate-electric-pulse',
    color: 'text-yellow-500'
  },
  'tap-race': {
    Icon: Hand,
    animation: 'animate-rapid-tap',
    color: 'text-blue-500'
  },
  'photo-challenge': {
    Icon: Camera,
    animation: 'animate-camera-shutter',
    color: 'text-purple-500'
  },
  'crowd-puzzle': {
    Icon: Puzzle,
    animation: 'animate-puzzle-assemble',
    color: 'text-green-500'
  },
  'digital-bingo': {
    Icon: Grid3x3,
    animation: 'animate-cell-highlight',
    color: 'text-red-500'
  },
  'prediction-master': {
    Icon: Eye,
    animation: 'animate-mystic-glow',
    color: 'text-purple-600'
  },
  'choose-story': {
    Icon: BookOpen,
    animation: 'animate-page-turn',
    color: 'text-amber-600'
  },
  'battle-opinions': {
    Icon: Swords,
    animation: 'animate-pendulum-swing',
    color: 'text-orange-500'
  },
  'puzzle-rush': {
    Icon: Brain,
    animation: 'animate-brain-spin',
    color: 'text-pink-500'
  },
  'ar-treasure': {
    Icon: Compass,
    animation: 'animate-radar-scan',
    color: 'text-teal-500'
  },
  // Additional game types with fallback icons
  'sentence-builder': { Icon: BookOpen, animation: '', color: 'text-indigo-500' },
  'beat-tapper': { Icon: Hand, animation: '', color: 'text-rose-500' },
  'crowd-dj': { Icon: Hand, animation: '', color: 'text-violet-500' },
  'murder-mystery': { Icon: Eye, animation: '', color: 'text-slate-500' },
  'escape-room': { Icon: Puzzle, animation: '', color: 'text-cyan-500' },
  'survivor-elimination': { Icon: Swords, animation: '', color: 'text-red-600' },
  'step-challenge': { Icon: Hand, animation: '', color: 'text-lime-500' },
  'digital-hot-potato': { Icon: Hand, animation: '', color: 'text-orange-600' },
  'crossword-clash': { Icon: Grid3x3, animation: '', color: 'text-blue-600' },
  'random-drawing': { Icon: Hand, animation: '', color: 'text-fuchsia-500' }
};

const GameIconAnimated = ({ type, className }: GameIconAnimatedProps) => {
  const config = iconMap[type] || iconMap['lightning-trivia'];
  const { Icon, animation, color } = config;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Icon 
        className={cn(
          "w-full h-full",
          color,
          animation
        )}
        strokeWidth={1.5}
      />
    </div>
  );
};

export default GameIconAnimated;
