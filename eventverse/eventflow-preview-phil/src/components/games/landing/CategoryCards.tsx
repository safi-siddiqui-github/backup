import { 
  Brain, Zap, Camera, Users, Target, 
  BarChart3, BookOpen, Puzzle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import triviaKnowledgeImg from "@/assets/games/categories/trivia-knowledge.jpg";
import fastPacedImg from "@/assets/games/categories/fast-paced.jpg";
import arCameraImg from "@/assets/games/categories/ar-camera.jpg";
import collaborativeImg from "@/assets/games/categories/collaborative.jpg";
import groupCompetitionImg from "@/assets/games/categories/group-competition.jpg";
import pollDecisionImg from "@/assets/games/categories/poll-decision.jpg";
import storyRoleplayImg from "@/assets/games/categories/story-roleplay.jpg";
import wordPuzzleImg from "@/assets/games/categories/word-puzzle.jpg";

interface CategoryCardsProps {
  onSelectCategory: (category: string) => void;
}

const CategoryCards = ({ onSelectCategory }: CategoryCardsProps) => {
  const categories = [
    {
      name: "Trivia & Knowledge",
      icon: Brain,
      count: 1,
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      image: triviaKnowledgeImg
    },
    {
      name: "Fast-Paced",
      icon: Zap,
      count: 1,
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      image: fastPacedImg
    },
    {
      name: "AR & Camera",
      icon: Camera,
      count: 2,
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
      image: arCameraImg
    },
    {
      name: "Collaborative",
      icon: Users,
      count: 1,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      image: collaborativeImg
    },
    {
      name: "Group Competition",
      icon: Target,
      count: 1,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      image: groupCompetitionImg
    },
    {
      name: "Poll & Decision",
      icon: BarChart3,
      count: 2,
      gradient: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      image: pollDecisionImg
    },
    {
      name: "Story & Roleplay",
      icon: BookOpen,
      count: 1,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      image: storyRoleplayImg
    },
    {
      name: "Word & Puzzle",
      icon: Puzzle,
      count: 1,
      gradient: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-950/30",
      image: wordPuzzleImg
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className="group relative h-auto overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
              </div>
              
              <div className="relative z-10 p-8 flex flex-col items-center gap-4 text-center min-h-[180px] justify-center">
                {/* Content */}
                <p className="font-bold text-sm mb-1 text-white drop-shadow-lg">{category.name}</p>
                <p className="text-xs text-white/90 font-medium drop-shadow">
                  {category.count} {category.count === 1 ? 'game' : 'games'}
                </p>
                
                {/* Sparkle effect on hover */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCards;
