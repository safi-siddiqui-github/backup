import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Grid3x3 } from "lucide-react";
import { BingoItem } from "@/types/game";

interface BingoContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

export const BingoContentEditor = ({ gameData, setGameData }: BingoContentEditorProps) => {
  const bingoItems = gameData.content?.bingoItems || [];

  const addBingoItem = () => {
    const newItem: BingoItem = {
      id: `item-${Date.now()}`,
      text: '',
      category: 'general',
      rarity: 'common'
    };

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        bingoItems: [...bingoItems, newItem]
      }
    });
  };

  const updateItem = (index: number, updatedItem: BingoItem) => {
    const updatedItems = [...bingoItems];
    updatedItems[index] = updatedItem;
    
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        bingoItems: updatedItems
      }
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = bingoItems.filter((_: any, i: number) => i !== index);
    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        bingoItems: updatedItems
      }
    });
  };

  const generateSampleItems = () => {
    const sampleItems: BingoItem[] = [
      { id: 'sample-1', text: 'Someone mentions the weather', category: 'conversation', rarity: 'common' },
      { id: 'sample-2', text: 'A phone rings during the event', category: 'technical', rarity: 'common' },
      { id: 'sample-3', text: 'Someone takes a selfie', category: 'social', rarity: 'common' },
      { id: 'sample-4', text: 'Someone spills a drink', category: 'accident', rarity: 'uncommon' },
      { id: 'sample-5', text: 'Someone cries happy tears', category: 'emotional', rarity: 'uncommon' },
      { id: 'sample-6', text: 'A surprise guest arrives', category: 'surprise', rarity: 'rare' },
      { id: 'sample-7', text: 'Someone tells an embarrassing story', category: 'social', rarity: 'uncommon' },
      { id: 'sample-8', text: 'The microphone stops working', category: 'technical', rarity: 'rare' },
      { id: 'sample-9', text: 'Someone loses their keys', category: 'accident', rarity: 'rare' },
      { id: 'sample-10', text: 'A child starts crying', category: 'family', rarity: 'common' },
      { id: 'sample-11', text: 'Someone compliments the food', category: 'food', rarity: 'common' },
      { id: 'sample-12', text: 'Someone asks for the WiFi password', category: 'technical', rarity: 'common' },
      { id: 'sample-13', text: 'Someone mentions traffic', category: 'conversation', rarity: 'common' },
      { id: 'sample-14', text: 'A dance-off happens', category: 'entertainment', rarity: 'uncommon' },
      { id: 'sample-15', text: 'Someone forgets someone\'s name', category: 'social', rarity: 'uncommon' }
    ];

    setGameData({
      ...gameData,
      content: {
        ...gameData.content,
        bingoItems: sampleItems
      }
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-green-100 text-green-800';
      case 'uncommon': return 'bg-yellow-100 text-yellow-800';
      case 'rare': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Grid3x3 className="w-5 h-5" />
            Bingo Items ({bingoItems.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Create items for players to spot during your event
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateSampleItems} variant="outline" size="sm">
            Load Samples
          </Button>
          <Button onClick={addBingoItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            {bingoItems.filter((item: BingoItem) => item.rarity === 'common').length}
          </div>
          <div className="text-xs text-muted-foreground">Common</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-yellow-600">
            {bingoItems.filter((item: BingoItem) => item.rarity === 'uncommon').length}
          </div>
          <div className="text-xs text-muted-foreground">Uncommon</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600">
            {bingoItems.filter((item: BingoItem) => item.rarity === 'rare').length}
          </div>
          <div className="text-xs text-muted-foreground">Rare</div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {bingoItems.map((item: BingoItem, index: number) => (
          <Card key={item.id} className="relative">
            <CardContent className="pt-4">
              <div className="flex gap-3">
                <div className="flex-1 space-y-3">
                  <Input
                    placeholder="Something that might happen at your event..."
                    value={item.text}
                    onChange={(e) => updateItem(index, { ...item, text: e.target.value })}
                  />
                  
                  <div className="flex gap-2">
                    <Select
                      value={item.category}
                      onValueChange={(value) => updateItem(index, { ...item, category: value })}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="conversation">Conversation</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="food">Food & Drink</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="accident">Accidents</SelectItem>
                        <SelectItem value="emotional">Emotional</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="surprise">Surprises</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={item.rarity}
                      onValueChange={(value: any) => updateItem(index, { ...item, rarity: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="common">Common</SelectItem>
                        <SelectItem value="uncommon">Uncommon</SelectItem>
                        <SelectItem value="rare">Rare</SelectItem>
                      </SelectContent>
                    </Select>

                    <Badge className={getRarityColor(item.rarity)} variant="secondary">
                      {item.rarity}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {bingoItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Grid3x3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No bingo items configured yet.</p>
              <p className="text-sm mt-2">Add items for players to look out for during your event!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};