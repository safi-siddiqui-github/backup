import { Button } from "@/components/ui/button";
import { 
  Zap, Camera, Users, Grid3x3, Target, 
  Lightbulb, BookOpen, MessageSquare, Puzzle, MapPin
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EnhancedGameTemplate } from "@/types/enhanced-games";
import lightningTriviaImg from "@/assets/games/featured/lightning-trivia.jpg";
import tapRaceImg from "@/assets/games/featured/tap-race.jpg";
import photoChallengeImg from "@/assets/games/featured/photo-challenge.jpg";
import crowdPuzzleImg from "@/assets/games/featured/crowd-puzzle.jpg";
import digitalBingoImg from "@/assets/games/featured/digital-bingo.jpg";
import predictionMasterImg from "@/assets/games/featured/prediction-master.jpg";
import chooseStoryImg from "@/assets/games/featured/choose-story.jpg";
import battleOpinionsImg from "@/assets/games/featured/battle-opinions.jpg";
import puzzleRushImg from "@/assets/games/featured/puzzle-rush.jpg";
import arTreasureImg from "@/assets/games/featured/ar-treasure.jpg";

interface FeaturedGamesProps {
  games: EnhancedGameTemplate[];
  onSelectGame: (game: EnhancedGameTemplate) => void;
}

const gameIcons: Record<string, any> = {
  'lightning-trivia': Zap,
  'tap-race': Target,
  'photo-challenge': Camera,
  'crowd-puzzle': Grid3x3,
  'digital-bingo': Target,
  'prediction-master': Lightbulb,
  'choose-story': BookOpen,
  'battle-opinions': MessageSquare,
  'puzzle-rush': Puzzle,
  'ar-treasure': MapPin
};

const gameImages: Record<string, string> = {
  'lightning-trivia': lightningTriviaImg,
  'tap-race': tapRaceImg,
  'photo-challenge': photoChallengeImg,
  'crowd-puzzle': crowdPuzzleImg,
  'digital-bingo': digitalBingoImg,
  'prediction-master': predictionMasterImg,
  'choose-story': chooseStoryImg,
  'battle-opinions': battleOpinionsImg,
  'puzzle-rush': puzzleRushImg,
  'ar-treasure': arTreasureImg
};

const FeaturedGames = ({ games, onSelectGame }: FeaturedGamesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Featured Games</h2>
        <span className="text-sm text-muted-foreground">{games.length} templates</span>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {games.map((game) => {
            const Icon = gameIcons[game.type] || Zap;
            const gameImage = gameImages[game.type];
            return (
              <CarouselItem key={game.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group relative h-full overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={gameImage} 
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-primary/10 transition-opacity duration-300" />
                  </div>
                  
                  <div className="relative z-10 p-6 flex flex-col h-full min-h-[280px]">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg">
                        {game.name}
                      </h3>
                      <p className="text-sm text-white/90 drop-shadow mb-4 line-clamp-2">
                        {game.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-white/80 drop-shadow mb-4">
                        <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Users className="w-3 h-3" />
                          {game.minParticipants}-{game.maxParticipants}
                        </div>
                        <div className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          {game.duration}min
                        </div>
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => onSelectGame(game)}
                      className="w-full bg-white/90 text-primary hover:bg-white backdrop-blur-sm"
                      variant="secondary"
                    >
                      Try This
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedGames;
