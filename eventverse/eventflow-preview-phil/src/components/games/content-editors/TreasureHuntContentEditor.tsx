import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin, Eye, Lightbulb } from "lucide-react";
import { TreasureItem } from "@/types/game";

interface TreasureHuntContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const TreasureHuntContentEditor = ({ gameData, setGameData }: TreasureHuntContentEditorProps) => {
  const treasureItems = gameData.content?.treasures || [];

  const addTreasureItem = () => {
    const newTreasure: TreasureItem = {
      id: `treasure-${Date.now()}`,
      name: '',
      location: '',
      hint: '',
      points: 10,
      found: false
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        treasures: [...treasureItems, newTreasure]
      }
    });
  };

  const updateTreasure = (index: number, updatedTreasure: TreasureItem) => {
    const updatedTreasures = [...treasureItems];
    updatedTreasures[index] = updatedTreasure;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        treasures: updatedTreasures
      }
    });
  };

  const removeTreasure = (index: number) => {
    const updatedTreasures = treasureItems.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        treasures: updatedTreasures
      }
    });
  };

  const generateSampleTreasures = () => {
    const sampleTreasures: TreasureItem[] = [
      {
        id: 'treasure-1',
        name: 'Golden Compass',
        location: 'Near the main entrance',
        hint: 'Look for something that always points north, where everyone first enters',
        points: 25,
        found: false
      },
      {
        id: 'treasure-2',
        name: 'Silver Key',
        location: 'Behind the reception desk',
        hint: 'Where information flows and guests are greeted, seek what unlocks mysteries',
        points: 30,
        found: false
      },
      {
        id: 'treasure-3',
        name: 'Crystal Orb',
        location: 'In the conference room',
        hint: 'Where minds meet and decisions are made, a sphere of clarity awaits',
        points: 35,
        found: false
      },
      {
        id: 'treasure-4',
        name: 'Ancient Scroll',
        location: 'Near the bookshelf',
        hint: 'Among the keepers of knowledge, wisdom from ages past lies waiting',
        points: 20,
        found: false
      },
      {
        id: 'treasure-5',
        name: 'Magic Coin',
        location: 'By the coffee station',
        hint: 'Where energy flows and morning rituals begin, fortune favors the caffeinated',
        points: 15,
        found: false
      },
      {
        id: 'treasure-6',
        name: 'Enchanted Mirror',
        location: 'In the restroom area',
        hint: 'Where reflections reveal truth, seek the mirror that shows more than appearance',
        points: 40,
        found: false
      }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        treasures: sampleTreasures
      }
    });
  };

  const getPointsColor = (points: number) => {
    if (points >= 35) return 'bg-purple-100 text-purple-800';
    if (points >= 25) return 'bg-blue-100 text-blue-800';
    if (points >= 15) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const totalPoints = treasureItems.reduce((sum: number, treasure: TreasureItem) => sum + treasure.points, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            AR Treasure Hunt ({treasureItems.length} treasures)
          </h3>
          <p className="text-sm text-muted-foreground">
            Create virtual treasures hidden around your venue for players to find with AR
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSampleTreasures} variant="outline" size="sm">
            Load Sample Hunt
          </Button>
          <Button onClick={addTreasureItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Treasure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{treasureItems.length}</div>
          <div className="text-sm text-muted-foreground">Treasures</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {treasureItems.length > 0 ? Math.round(totalPoints / treasureItems.length) : 0}
          </div>
          <div className="text-sm text-muted-foreground">Avg. Points</div>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {treasureItems.map((treasure: TreasureItem, index: number) => (
          <Card key={treasure.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Treasure {index + 1}</Badge>
                  <Badge className={getPointsColor(treasure.points)} variant="secondary">
                    {treasure.points} points
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTreasure(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Treasure Name
                  </label>
                  <Input
                    placeholder="e.g., Golden Compass, Silver Key"
                    value={treasure.name}
                    onChange={(e) => updateTreasure(index, { ...treasure, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Points Value</label>
                  <Input
                    type="number"
                    placeholder="10"
                    min="1"
                    max="100"
                    value={treasure.points}
                    onChange={(e) => updateTreasure(index, { ...treasure, points: parseInt(e.target.value) || 10 })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Location Description
                </label>
                <Input
                  placeholder="e.g., Near the main entrance, Behind the reception desk"
                  value={treasure.location}
                  onChange={(e) => updateTreasure(index, { ...treasure, location: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  General area description for organizers (not shown to players)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Hint for Players
                </label>
                <Textarea
                  placeholder="e.g., Look for something that always points north, where everyone first enters..."
                  value={treasure.hint}
                  rows={2}
                  onChange={(e) => updateTreasure(index, { ...treasure, hint: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Cryptic clue that will guide players to the treasure location
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Badge variant="outline" className="text-xs">
                  📍 {treasure.location || 'No location'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  💡 {treasure.hint ? 'Has hint' : 'No hint'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {treasureItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No treasures configured yet.</p>
              <p className="text-sm mt-2">Add virtual treasures for players to discover using their phone cameras!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {treasureItems.length > 0 && (
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">💡 AR Treasure Hunt Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Players use their cameras to scan QR codes or markers at locations</li>
                <li>• Hints should be challenging but solvable with local knowledge</li>
                <li>• Higher point values for harder-to-find or more remote treasures</li>
                <li>• Consider accessibility - ensure all locations are reachable by participants</li>
                <li>• Test the hunt route beforehand to ensure proper difficulty balance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};