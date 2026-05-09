import TriviaContentEditor from "../content-editors/TriviaContentEditor";
import { TapRaceContentEditor } from "../content-editors/TapRaceContentEditor";
import { PhotoContentEditor } from "../content-editors/PhotoContentEditor";
import { CrowdPuzzleContentEditor } from "../content-editors/CrowdPuzzleContentEditor";
import { BingoContentEditor } from "../content-editors/BingoContentEditor";
import { PredictionContentEditor } from "../content-editors/PredictionContentEditor";
import { StoryContentEditor } from "../content-editors/StoryContentEditor";
import { OpinionBattleContentEditor } from "../content-editors/OpinionBattleContentEditor";
import { PuzzleRushContentEditor } from "../content-editors/PuzzleRushContentEditor";
import { TreasureHuntContentEditor } from "../content-editors/TreasureHuntContentEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface GameContentRouterProps {
  gameData: any;
  setGameData: (data: any) => void;
  onBack: () => void;
  onCreate: () => void;
}

const GameContentRouter = ({ gameData, setGameData, onBack, onCreate }: GameContentRouterProps) => {
  const renderEditor = () => {
    switch (gameData.type) {
      case "lightning-trivia":
        return <TriviaContentEditor gameData={gameData} setGameData={setGameData} />;
      case "tap-race":
        return <TapRaceContentEditor gameData={gameData} setGameData={setGameData} />;
      case "photo-challenge":
        return <PhotoContentEditor gameData={gameData} setGameData={setGameData} />;
      case "crowd-puzzle":
        return <CrowdPuzzleContentEditor gameData={gameData} setGameData={setGameData} />;
      case "digital-bingo":
        return <BingoContentEditor gameData={gameData} setGameData={setGameData} />;
      case "prediction-master":
        return <PredictionContentEditor gameData={gameData} setGameData={setGameData} />;
      case "choose-story":
        return <StoryContentEditor gameData={gameData} setGameData={setGameData} />;
      case "battle-opinions":
        return <OpinionBattleContentEditor gameData={gameData} setGameData={setGameData} />;
      case "puzzle-rush":
        return <PuzzleRushContentEditor gameData={gameData} setGameData={setGameData} />;
      case "ar-treasure":
        return <TreasureHuntContentEditor gameData={gameData} setGameData={setGameData} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Content editor for {gameData.type} coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Configure Game Content</h2>
          <p className="text-muted-foreground">{gameData.title}</p>
        </div>

        {renderEditor()}

        <div className="flex gap-3 mt-8 pt-6 border-t">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
          <Button onClick={onCreate} className="ml-auto">
            Create Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameContentRouter;
