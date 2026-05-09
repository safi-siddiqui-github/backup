import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface Character {
  id: string;
  name: string;
  role: string;
  backstory: string;
  secret: string;
  alibi: string;
  isMurderer: boolean;
}

interface Clue {
  id: string;
  text: string;
  location: string;
  relatedCharacters: string[];
  isRedHerring: boolean;
}

interface MurderMysteryContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const MurderMysteryContentEditor = ({ gameData, setGameData }: MurderMysteryContentEditorProps) => {
  const [characters, setCharacters] = useState<Character[]>(
    gameData.content?.characters || []
  );
  const [clues, setClues] = useState<Clue[]>(
    gameData.content?.clues || []
  );

  const addCharacter = () => {
    const newCharacter: Character = {
      id: `char-${Date.now()}`,
      name: "",
      role: "",
      backstory: "",
      secret: "",
      alibi: "",
      isMurderer: false,
    };
    const updated = [...characters, newCharacter];
    setCharacters(updated);
    setGameData({ ...gameData, content: { characters: updated, clues } });
  };

  const updateCharacter = (index: number, field: string, value: any) => {
    const updated = [...characters];
    
    if (field === "isMurderer" && value) {
      updated.forEach(char => char.isMurderer = false);
    }
    
    updated[index] = { ...updated[index], [field]: value };
    setCharacters(updated);
    setGameData({ ...gameData, content: { characters: updated, clues } });
  };

  const deleteCharacter = (index: number) => {
    const updated = characters.filter((_, i) => i !== index);
    setCharacters(updated);
    setGameData({ ...gameData, content: { characters: updated, clues } });
  };

  const addClue = () => {
    const newClue: Clue = {
      id: `clue-${Date.now()}`,
      text: "",
      location: "",
      relatedCharacters: [],
      isRedHerring: false,
    };
    const updated = [...clues, newClue];
    setClues(updated);
    setGameData({ ...gameData, content: { characters, clues: updated } });
  };

  const updateClue = (index: number, field: string, value: any) => {
    const updated = [...clues];
    updated[index] = { ...updated[index], [field]: value };
    setClues(updated);
    setGameData({ ...gameData, content: { characters, clues: updated } });
  };

  const deleteClue = (index: number) => {
    const updated = clues.filter((_, i) => i !== index);
    setClues(updated);
    setGameData({ ...gameData, content: { characters, clues: updated } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Murder Mystery</h3>
        <p className="text-sm text-muted-foreground">Create characters and clues for your mystery</p>
      </div>

      <Tabs defaultValue="characters" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="characters">Characters ({characters.length})</TabsTrigger>
          <TabsTrigger value="clues">Clues ({clues.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="characters" className="space-y-4 mt-6">
          <div className="flex justify-end">
            <Button onClick={addCharacter} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Character
            </Button>
          </div>

          {characters.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground">No characters yet. Add your first character!</p>
            </Card>
          )}

          <div className="space-y-4">
            {characters.map((character, index) => (
              <Card key={character.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Label className="text-base font-semibold">{character.name || `Character ${index + 1}`}</Label>
                      {character.isMurderer && (
                        <span className="px-2 py-1 text-xs bg-destructive text-destructive-foreground rounded">
                          Murderer
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCharacter(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={character.name}
                        onChange={(e) => updateCharacter(index, "name", e.target.value)}
                        placeholder="Character name..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        value={character.role}
                        onChange={(e) => updateCharacter(index, "role", e.target.value)}
                        placeholder="e.g., Butler, Guest, Detective"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Backstory</Label>
                    <Textarea
                      value={character.backstory}
                      onChange={(e) => updateCharacter(index, "backstory", e.target.value)}
                      placeholder="Character's background and history..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Secret</Label>
                    <Textarea
                      value={character.secret}
                      onChange={(e) => updateCharacter(index, "secret", e.target.value)}
                      placeholder="Hidden information about this character..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Alibi</Label>
                    <Input
                      value={character.alibi}
                      onChange={(e) => updateCharacter(index, "alibi", e.target.value)}
                      placeholder="Where they were during the crime..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`murderer-${index}`}
                      checked={character.isMurderer}
                      onCheckedChange={(checked) => updateCharacter(index, "isMurderer", checked)}
                    />
                    <label
                      htmlFor={`murderer-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This character is the murderer
                    </label>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clues" className="space-y-4 mt-6">
          <div className="flex justify-end">
            <Button onClick={addClue} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Clue
            </Button>
          </div>

          {clues.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground">No clues yet. Add your first clue!</p>
            </Card>
          )}

          <div className="space-y-4">
            {clues.map((clue, index) => (
              <Card key={clue.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Label className="text-base font-semibold">Clue {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteClue(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Clue Text</Label>
                    <Textarea
                      value={clue.text}
                      onChange={(e) => updateClue(index, "text", e.target.value)}
                      placeholder="Describe the clue..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={clue.location}
                      onChange={(e) => updateClue(index, "location", e.target.value)}
                      placeholder="Where this clue is found..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`herring-${index}`}
                      checked={clue.isRedHerring}
                      onCheckedChange={(checked) => updateClue(index, "isRedHerring", checked)}
                    />
                    <label
                      htmlFor={`herring-${index}`}
                      className="text-sm font-medium leading-none"
                    >
                      This is a red herring (misleading clue)
                    </label>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MurderMysteryContentEditor;
