import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Clock } from "lucide-react";

interface ActiveGameProps {
  game: any;
  onBack: () => void;
  onComplete: (results?: any[]) => void;
}

const ActiveGame = ({ game, onBack, onComplete }: ActiveGameProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(game.duration * 60);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">{game.title}</h2>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600">
              <Users className="w-4 h-4" />
              <span className="font-semibold">{game.participants}</span>
            </div>
            <p className="text-xs text-gray-500">Participants</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
            <p className="text-xs text-gray-500">Time Left</p>
          </div>
        </div>

        {!isActive ? (
          <Button 
            onClick={handleStart}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Start Game
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-green-600">Game Active!</div>
            <p className="text-gray-600">Players are participating...</p>
            <Button 
              onClick={handleComplete}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              End Game
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveGame;