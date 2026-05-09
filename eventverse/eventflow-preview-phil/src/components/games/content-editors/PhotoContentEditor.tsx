import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Camera, Clock, Users } from "lucide-react";
import { PhotoChallenge } from "@/types/game";

interface PhotoContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const PhotoContentEditor = ({ gameData, setGameData }: PhotoContentEditorProps) => {
  const photoChallenges = gameData.content?.photoChallenges || [];

  const addPhotoChallenge = () => {
    const newChallenge: PhotoChallenge = {
      id: `photo-${Date.now()}`,
      title: '',
      description: '',
      criteria: '',
      timeLimit: 60,
      maxSubmissions: 1
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        photoChallenges: [...photoChallenges, newChallenge]
      }
    });
  };

  const updateChallenge = (index: number, updatedChallenge: PhotoChallenge) => {
    const updatedChallenges = [...photoChallenges];
    updatedChallenges[index] = updatedChallenge;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        photoChallenges: updatedChallenges
      }
    });
  };

  const removeChallenge = (index: number) => {
    const updatedChallenges = photoChallenges.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        photoChallenges: updatedChallenges
      }
    });
  };

  const generateSampleChallenges = () => {
    const sampleChallenges: PhotoChallenge[] = [
      {
        id: 'photo-1',
        title: 'Team Spirit',
        description: 'Capture your team showing their enthusiasm',
        criteria: 'Photo must include at least 3 team members making a fun pose or gesture',
        timeLimit: 120,
        maxSubmissions: 3
      },
      {
        id: 'photo-2',
        title: 'Creative Workspace',
        description: 'Show us your most creative workspace setup',
        criteria: 'Photo should showcase an interesting or unique work environment',
        timeLimit: 90,
        maxSubmissions: 1
      },
      {
        id: 'photo-3',
        title: 'Action Shot',
        description: 'Capture someone in the middle of an activity',
        criteria: 'Photo must show movement or action, no static poses',
        timeLimit: 150,
        maxSubmissions: 2
      },
      {
        id: 'photo-4',
        title: 'Behind the Scenes',
        description: 'Show what happens when nobody is looking',
        criteria: 'Candid photo that reveals something unexpected or amusing',
        timeLimit: 180,
        maxSubmissions: 1
      }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        photoChallenges: sampleChallenges
      }
    });
  };

  const getTimeLimitColor = (timeLimit: number) => {
    if (timeLimit >= 150) return 'bg-green-100 text-green-800';
    if (timeLimit >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Photo Challenges ({photoChallenges.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Create photo challenges for participants to complete
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSampleChallenges} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addPhotoChallenge} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Challenge
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {photoChallenges.map((challenge: PhotoChallenge, index: number) => (
          <Card key={challenge.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Challenge {index + 1}</Badge>
                  <Badge className={getTimeLimitColor(challenge.timeLimit)} variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {challenge.timeLimit}s
                  </Badge>
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {challenge.maxSubmissions} max
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeChallenge(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Challenge Title</label>
                <Input
                  placeholder="e.g., Team Spirit, Creative Workspace"
                  value={challenge.title}
                  onChange={(e) => updateChallenge(index, { ...challenge, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="What should participants photograph?"
                  value={challenge.description}
                  rows={2}
                  onChange={(e) => updateChallenge(index, { ...challenge, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Success Criteria</label>
                <Textarea
                  placeholder="What makes a photo successful for this challenge?"
                  value={challenge.criteria}
                  rows={2}
                  onChange={(e) => updateChallenge(index, { ...challenge, criteria: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Time Limit (seconds)</label>
                  <Input
                    type="number"
                    placeholder="60"
                    min="30"
                    max="300"
                    value={challenge.timeLimit}
                    onChange={(e) => updateChallenge(index, { ...challenge, timeLimit: parseInt(e.target.value) || 60 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Submissions</label>
                  <Input
                    type="number"
                    placeholder="1"
                    min="1"
                    max="5"
                    value={challenge.maxSubmissions}
                    onChange={(e) => updateChallenge(index, { ...challenge, maxSubmissions: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {photoChallenges.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No photo challenges created yet.</p>
              <p className="text-sm mt-2">Add challenges for participants to complete with their cameras!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {photoChallenges.length > 0 && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">💡 Photo Challenge Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Make criteria clear and specific to avoid confusion</li>
                <li>• Consider lighting and venue when setting challenges</li>
                <li>• Shorter time limits create more excitement and urgency</li>
                <li>• Allow multiple submissions for creative challenges</li>
                <li>• Test challenges beforehand to ensure they're achievable</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};