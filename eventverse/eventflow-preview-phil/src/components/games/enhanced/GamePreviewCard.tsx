import { EnhancedGameTemplate } from "@/types/enhanced-games";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Zap, Camera, Activity } from "lucide-react";
import GameIconAnimated from "./GameIconAnimated";
import { cn } from "@/lib/utils";

interface GamePreviewCardProps {
  template: EnhancedGameTemplate;
}

const difficultyColors = {
  'Easy': 'bg-success text-success-foreground',
  'Medium': 'bg-warning text-warning-foreground',
  'Hard': 'bg-destructive text-destructive-foreground'
};

const GamePreviewCard = ({ template }: GamePreviewCardProps) => {
  const getDemoContent = () => {
    switch (template.type) {
      case 'lightning-trivia':
        return (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Sample Question
            </div>
            <Card className="bg-accent/50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">What year did World War II end?</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>30 seconds</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'tap-race':
        return (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Demo Area
            </div>
            <div className="bg-accent/50 rounded-lg p-4 flex flex-col items-center gap-2">
              <div className="text-4xl font-bold text-primary">0</div>
              <div className="text-xs text-muted-foreground">Taps</div>
              <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
          </div>
        );
      
      case 'photo-challenge':
        return (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Sample Challenge
            </div>
            <Card className="bg-accent/50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Take a photo of something blue!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'crowd-puzzle':
        return (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Puzzle Grid
            </div>
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square rounded border-2 transition-colors",
                    i < 3 ? "bg-primary/20 border-primary" : "bg-muted border-border"
                  )}
                />
              ))}
            </div>
          </div>
        );
      
      case 'digital-bingo':
        return (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Bingo Card Preview
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['B5', 'I12', 'N9', 'G8', 'O15', 'B3', 'I17', 'G11', 'O22'].map((num, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded bg-accent flex items-center justify-center text-xs font-semibold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Interactive Preview
            </div>
            <Card className="bg-accent/50">
              <CardContent className="p-4">
                <p className="text-sm text-center text-muted-foreground">
                  Preview will appear during gameplay
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-6">
        {/* Header with Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24">
            <GameIconAnimated type={template.type} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{template.name}</h2>
            <Badge className={difficultyColors[template.difficulty]}>
              {template.difficulty}
            </Badge>
          </div>
        </div>

        {/* Default Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">Duration</span>
            </div>
            <div className="text-lg font-semibold">{template.duration} min</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Players</span>
            </div>
            <div className="text-lg font-semibold">
              {template.minParticipants}-{template.maxParticipants}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Key Features
          </div>
          <div className="flex flex-wrap gap-2">
            {template.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        {getDemoContent()}

        {/* Requirements */}
        {(template.requiresCamera || template.requiresMotion || template.requiresAudio) && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Requirements
            </div>
            <div className="flex flex-wrap gap-2">
              {template.requiresCamera && (
                <Badge variant="secondary" className="text-xs">
                  <Camera className="w-3 h-3 mr-1" />
                  Camera
                </Badge>
              )}
              {template.requiresMotion && (
                <Badge variant="secondary" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  Motion
                </Badge>
              )}
              {template.requiresAudio && (
                <Badge variant="secondary" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  Audio
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GamePreviewCard;
