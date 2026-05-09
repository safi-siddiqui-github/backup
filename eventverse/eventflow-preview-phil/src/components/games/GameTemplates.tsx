
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Search, 
  Star, 
  Clock, 
  Users, 
  Filter,
  Sparkles,
  Heart,
  Building,
  Film,
  Camera,
  Grid3x3,
  BookOpen,
  Award,
  Type,
  Gift,
  Sun
} from "lucide-react";
import { expandedGameTemplates, getFeaturedGames, getGamesByCategory, searchGames, type GameTemplate } from "./expandedGameTemplates";

interface GameTemplatesProps {
  onBack: () => void;
  onSelectTemplate: (template: GameTemplate) => void;
}

const iconMap: Record<string, any> = {
  Heart, Building, Film, Camera, Users, Grid3x3, BookOpen, Award, Type, Gift, Sun,
  MapPin: Users, Zap: Star, ArrowRightLeft: Camera, Smile: Star, CrystalBall: Sparkles,
  Image: Camera, AlphabeticalOrder: Type
};

const GameTemplates = ({ onBack, onSelectTemplate }: GameTemplatesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [favoriteGames, setFavoriteGames] = useState<Set<string>>(new Set());

  const categories = [
    { id: "all", label: "All Games", count: expandedGameTemplates.length },
    { id: "featured", label: "Featured", count: getFeaturedGames().length },
    { id: "engagement", label: "Engagement", count: getGamesByCategory("engagement").length },
    { id: "social", label: "Social", count: getGamesByCategory("social").length },
    { id: "creative", label: "Creative", count: getGamesByCategory("creative").length },
    { id: "competitive", label: "Competitive", count: getGamesByCategory("competitive").length },
    { id: "seasonal", label: "Seasonal", count: getGamesByCategory("seasonal").length },
  ];

  const getFilteredGames = () => {
    let games = expandedGameTemplates;

    // Filter by search
    if (searchQuery) {
      games = searchGames(searchQuery);
    }

    // Filter by category
    if (selectedCategory === "featured") {
      games = getFeaturedGames();
    } else if (selectedCategory !== "all") {
      games = getGamesByCategory(selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      games = games.filter(game => game.difficulty === selectedDifficulty);
    }

    return games.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  };

  const toggleFavorite = (gameId: string) => {
    const newFavorites = new Set(favoriteGames);
    if (newFavorites.has(gameId)) {
      newFavorites.delete(gameId);
    } else {
      newFavorites.add(gameId);
    }
    setFavoriteGames(newFavorites);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredGames = getFilteredGames();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">Game Templates</h1>
                <p className="text-purple-100 text-sm">{expandedGameTemplates.length} ready-to-use games</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {filteredGames.length} games found
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Search and Filters */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search games by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.label}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Difficulty:</span>
              <div className="flex gap-1">
                {["all", "easy", "medium", "hard"].map(diff => (
                  <Button
                    key={diff}
                    variant={selectedDifficulty === diff ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(diff)}
                    className="text-xs capitalize"
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map(game => {
            const IconComponent = iconMap[game.icon] || Sparkles;
            return (
              <div
                key={game.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => onSelectTemplate(game)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-purple-600 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">{game.type.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {game.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(game.id);
                      }}
                      className="p-1 h-auto"
                    >
                      <Heart className={`w-4 h-4 ${favoriteGames.has(game.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {game.duration}min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {game.minParticipants}+ players
                  </div>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {game.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {game.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{game.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {game.popularity && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Popularity</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                          style={{ width: `${game.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{game.popularity}%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No games found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or browse different categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTemplates;
