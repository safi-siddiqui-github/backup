
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Trophy, 
  Clock, 
  Gamepad2,
  Loader2
} from "lucide-react";

interface GameJoinDialogProps {
  open: boolean;
  onClose: () => void;
  gameId: string;
  gameCode: string;
  onJoinSuccess: (gameSessionId: string) => void;
}

const GameJoinDialog = ({ open, onClose, gameId, gameCode, onJoinSuccess }: GameJoinDialogProps) => {
  const [enteredCode, setEnteredCode] = useState(gameCode || "");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  // Mock game details based on gameId
  const getGameDetails = (id: string) => {
    const games = {
      "live-1": {
        title: "Sarah & Michael's Love Story Trivia",
        hostName: "Sarah Johnson",
        participants: 23,
        maxParticipants: 50,
        difficulty: "Easy",
        estimatedDuration: "10 min",
        description: "Test your knowledge about the happy couple's journey together!"
      },
      "live-2": {
        title: "Wedding Photo Scavenger Hunt",
        hostName: "Michael Chen",
        participants: 31,
        maxParticipants: 40,
        difficulty: "Medium",
        estimatedDuration: "Ongoing",
        description: "Find and photograph specific moments during the celebration!"
      }
    };
    return games[id as keyof typeof games] || {
      title: "Wedding Game",
      hostName: "Host",
      participants: 15,
      maxParticipants: 30,
      difficulty: "Medium",
      estimatedDuration: "8 min",
      description: "Join this exciting wedding game!"
    };
  };

  // Mock recent participants
  const recentParticipants = [
    { name: "Emma Davis", joinedAgo: "2 min ago" },
    { name: "Mike Chen", joinedAgo: "3 min ago" },
    { name: "Lisa Brown", joinedAgo: "5 min ago" },
    { name: "James Wilson", joinedAgo: "6 min ago" },
    { name: "Rachel Green", joinedAgo: "8 min ago" }
  ];

  const gameDetails = getGameDetails(gameId);

  const handleJoinGame = async () => {
    if (!enteredCode.trim()) {
      setError("Please enter a game code");
      return;
    }

    if (enteredCode.toUpperCase() !== gameCode.toUpperCase()) {
      setError("Invalid game code. Please check and try again.");
      return;
    }

    setIsJoining(true);
    setError("");

    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false);
      onJoinSuccess(`session-${gameId}-${Date.now()}`);
      onClose();
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-500" />
            Join Game
          </DialogTitle>
          <DialogDescription>
            Enter the game code to join this live game session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">{gameDetails.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{gameDetails.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{gameDetails.participants}/{gameDetails.maxParticipants}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{gameDetails.estimatedDuration}</span>
              </div>
              <Badge className={getDifficultyColor(gameDetails.difficulty)}>
                {gameDetails.difficulty}
              </Badge>
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              Hosted by {gameDetails.hostName}
            </div>
          </div>

          {/* Game Code Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">Game Code</label>
            <Input
              placeholder="Enter game code (e.g., LOVE2024)"
              value={enteredCode}
              onChange={(e) => {
                setEnteredCode(e.target.value.toUpperCase());
                setError("");
              }}
              className="text-center text-lg font-mono tracking-wider"
              maxLength={10}
            />
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>

          {/* Recent Participants */}
          <div>
            <h4 className="text-sm font-medium mb-3">Recent Participants</h4>
            <div className="space-y-2">
              {recentParticipants.slice(0, 3).map((participant, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-purple-100 text-purple-600">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{participant.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{participant.joinedAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={isJoining}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleJoinGame}
              className="flex-1 bg-purple-500 hover:bg-purple-600"
              disabled={isJoining || !enteredCode.trim()}
            >
              {isJoining ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Join Game
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameJoinDialog;
