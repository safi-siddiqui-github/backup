import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Edit, Trash2, Eye, Users, Clock, Search } from "lucide-react";
import { useGameSessionManager } from "./GameSessionManager";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Game } from "@/types/game";

interface GameLibraryProps {
  games: Game[];
  onGameStart: (game: Game) => void;
  onGameEdit: (game: Game) => void;
  onGameDelete: (gameId: string) => void;
  onGameView: (game: Game) => void;
}

const GameLibrary = ({ games, onGameStart, onGameEdit, onGameDelete, onGameView }: GameLibraryProps) => {
  const { createGameSession } = useGameSessionManager();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const handleStartGame = (game: Game) => {
    const session = createGameSession(game);
    onGameStart(game);
    
    toast({
      title: "Game Started! 🎮",
      description: `Game code: ${session.code}. Share this code with guests to join!`
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white dark:bg-green-600';
      case 'completed': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      default: return 'Draft';
    }
  };

  // Filter and search games
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || game.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Games</h2>
          <span className="text-sm text-muted-foreground">
            Showing {filteredGames.length} of {games.length} games
          </span>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search your games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs value={filterStatus} onValueChange={setFilterStatus}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">
            {searchQuery || filterStatus !== "all" 
              ? "No games match your search or filter."
              : "No games created yet. Start by creating your first game!"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredGames.map((game) => (
            <div key={game.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-xl text-card-foreground">{game.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}>
                      {getStatusLabel(game.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{game.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{game.minParticipants}-{game.maxParticipants} players</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{game.duration} minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="flex gap-2">
                {game.status === 'draft' && (
                  <Button
                    onClick={() => handleStartGame(game)}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                )}
                
                <Button
                  onClick={() => onGameView(game)}
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                
                <Button
                  onClick={() => onGameEdit(game)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => onGameDelete(game.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameLibrary;