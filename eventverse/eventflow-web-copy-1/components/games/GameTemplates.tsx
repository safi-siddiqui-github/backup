"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameTemplate } from "@/types/game";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building,
  Camera,
  Clock,
  Film,
  Filter,
  Gift,
  Grid3x3,
  Heart,
  Search,
  Sparkles,
  Star,
  Sun,
  Type,
  Users,
} from "lucide-react";
import { ElementType, useState } from "react";
import {
  expandedGameTemplates,
  getFeaturedGames,
  getGamesByCategory,
  searchGames,
} from "./expandedGameTemplates";

interface GameTemplatesProps {
  onBack: () => void;
  onSelectTemplate: (template: Partial<GameTemplate>) => void;
}

const iconMap: Record<string, ElementType> = {
  Heart,
  Building,
  Film,
  Camera,
  Users,
  Grid3x3,
  BookOpen,
  Award,
  Type,
  Gift,
  Sun,
  MapPin: Users,
  Zap: Star,
  ArrowRightLeft: Camera,
  Smile: Star,
  CrystalBall: Sparkles,
  Image: Camera,
  AlphabeticalOrder: Type,
};

const GameTemplates = ({ onBack, onSelectTemplate }: GameTemplatesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [favoriteGames, setFavoriteGames] = useState<Set<string>>(new Set());

  const categories = [
    { id: "all", label: "All Games", count: expandedGameTemplates.length },
    { id: "featured", label: "Featured", count: getFeaturedGames().length },
    {
      id: "engagement",
      label: "Engagement",
      count: getGamesByCategory("engagement").length,
    },
    {
      id: "social",
      label: "Social",
      count: getGamesByCategory("social").length,
    },
    {
      id: "creative",
      label: "Creative",
      count: getGamesByCategory("creative").length,
    },
    {
      id: "competitive",
      label: "Competitive",
      count: getGamesByCategory("competitive").length,
    },
    {
      id: "seasonal",
      label: "Seasonal",
      count: getGamesByCategory("seasonal").length,
    },
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
      games = games.filter((game) => game.difficulty === selectedDifficulty);
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
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredGames = getFilteredGames();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">Game Templates</h1>
                <p className="text-sm text-purple-100">
                  {expandedGameTemplates.length} ready-to-use games
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white"
            >
              {filteredGames.length} games found
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6 rounded-xl bg-white/95 p-4 backdrop-blur-sm">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search games by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Tabs */}
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="text-xs"
                  >
                    {category.label}
                    <Badge
                      variant="secondary"
                      className="ml-1 text-xs"
                    >
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Difficulty:</span>
              <div className="flex gap-1">
                {["all", "easy", "medium", "hard"].map((diff) => (
                  <Button
                    key={diff}
                    variant={
                      selectedDifficulty === diff ? "default" : "outline"
                    }
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => {
            const IconComponent = iconMap[game.icon] || Sparkles;
            return (
              <div
                key={game.id}
                className="group cursor-pointer rounded-xl bg-white/95 p-4 backdrop-blur-sm transition-all hover:shadow-lg"
                onClick={() => onSelectTemplate(game)}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold transition-colors group-hover:text-purple-600">
                        {game.title}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">
                        {game.type.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {game.featured && (
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(game.id);
                      }}
                      className="h-auto p-1"
                    >
                      <Heart
                        className={`h-4 w-4 ${favoriteGames.has(game.id) ? "fill-current text-red-500" : "text-gray-400"}`}
                      />
                    </Button>
                  </div>
                </div>

                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {game.description}
                </p>

                <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {game.duration}min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {game.minParticipants}+ players
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getDifficultyColor(game.difficulty)}`}
                  >
                    {game.difficulty}
                  </Badge>
                </div>

                <div className="mb-3 flex flex-wrap gap-1">
                  {game.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {game.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >
                      +{game.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {game.popularity && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Popularity</span>
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-16 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                          style={{ width: `${game.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {game.popularity}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="py-12 text-center">
            <div className="rounded-xl bg-white/95 p-8 backdrop-blur-sm">
              <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                No games found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or browse different
                categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTemplates;
