import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Copy, Users, Clock, Settings } from "lucide-react";

interface GameDetailsViewProps {
  game: any;
  onBack: () => void;
  onEdit: (game: any) => void;
  onDuplicate: (game: any) => void;
}

const GameDetailsView = ({ game, onBack, onEdit, onDuplicate }: GameDetailsViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">Game Details</h2>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h3>
          <p className="text-gray-600 mb-4">{game.description}</p>
          
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1 text-blue-600">
              <Users className="w-4 h-4" />
              <span>{game.participants} participants</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="w-4 h-4" />
              <span>{game.duration} minutes</span>
            </div>
            <div className="flex items-center gap-1 text-purple-600">
              <Settings className="w-4 h-4" />
              <span className="capitalize">{game.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onEdit(game)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Game
          </Button>
          <Button
            onClick={() => onDuplicate(game)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Duplicate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsView;