import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface GameCreatorProps {
  onBack: () => void;
  onCreate: (gameData: any) => void;
  onUpdate: (gameId: string, gameData: any) => void;
  selectedTemplate?: any;
  editingGame?: any;
}

const GameCreator = ({ onBack, onCreate, onUpdate, selectedTemplate, editingGame }: GameCreatorProps) => {
  const [gameData, setGameData] = useState({
    title: editingGame?.title || selectedTemplate?.title || "",
    description: editingGame?.description || selectedTemplate?.description || "",
    type: editingGame?.type || selectedTemplate?.type || "lightning-trivia",
    duration: editingGame?.duration || selectedTemplate?.duration || 15,
    questions: editingGame?.questions || [],
    settings: editingGame?.settings || selectedTemplate?.settings || {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      onUpdate(editingGame.id, gameData);
    } else {
      onCreate(gameData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">
          {editingGame ? "Edit Game" : "Create New Game"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game Title
            </label>
            <Input
              value={gameData.title}
              onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
              placeholder="Enter game title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              value={gameData.description}
              onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
              placeholder="Describe your game"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game Type
            </label>
            <Select 
              value={gameData.type} 
              onValueChange={(value) => setGameData({ ...gameData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select game type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lightning-trivia">Lightning Trivia</SelectItem>
                <SelectItem value="tap-race">Tap Race</SelectItem>
                <SelectItem value="photo-challenge">Photo Challenge</SelectItem>
                <SelectItem value="crowd-puzzle">Crowd Puzzle</SelectItem>
                <SelectItem value="digital-bingo">Digital Bingo</SelectItem>
                <SelectItem value="prediction-master">Prediction Master</SelectItem>
                <SelectItem value="choose-story">Choose Story</SelectItem>
                <SelectItem value="battle-opinions">Battle Opinions</SelectItem>
                <SelectItem value="puzzle-rush">Puzzle Rush</SelectItem>
                <SelectItem value="ar-treasure">AR Treasure Hunt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <Input
              type="number"
              value={gameData.duration}
              onChange={(e) => setGameData({ ...gameData, duration: parseInt(e.target.value) })}
              min="1"
              max="60"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
            {editingGame ? "Update Game" : "Create Game"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GameCreator;