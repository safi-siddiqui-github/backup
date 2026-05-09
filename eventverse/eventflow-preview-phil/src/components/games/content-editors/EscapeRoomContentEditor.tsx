import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Puzzle {
  id: string;
  type: "code" | "riddle" | "pattern" | "logic";
  question: string;
  answer: string;
  hints: string[];
  points: number;
  room: string;
}

interface EscapeRoomContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const EscapeRoomContentEditor = ({ gameData, setGameData }: EscapeRoomContentEditorProps) => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>(
    gameData.content?.puzzles || []
  );
  const [rooms, setRooms] = useState<string[]>(
    gameData.content?.rooms || ["Main Room"]
  );

  const addPuzzle = () => {
    const newPuzzle: Puzzle = {
      id: `p-${Date.now()}`,
      type: "riddle",
      question: "",
      answer: "",
      hints: ["", "", ""],
      points: 100,
      room: rooms[0] || "Main Room",
    };
    const updated = [...puzzles, newPuzzle];
    setPuzzles(updated);
    setGameData({ ...gameData, content: { puzzles: updated, rooms } });
  };

  const updatePuzzle = (index: number, field: string, value: any) => {
    const updated = [...puzzles];
    updated[index] = { ...updated[index], [field]: value };
    setPuzzles(updated);
    setGameData({ ...gameData, content: { puzzles: updated, rooms } });
  };

  const updateHint = (puzzleIndex: number, hintIndex: number, value: string) => {
    const updated = [...puzzles];
    updated[puzzleIndex].hints[hintIndex] = value;
    setPuzzles(updated);
    setGameData({ ...gameData, content: { puzzles: updated, rooms } });
  };

  const deletePuzzle = (index: number) => {
    const updated = puzzles.filter((_, i) => i !== index);
    setPuzzles(updated);
    setGameData({ ...gameData, content: { puzzles: updated, rooms } });
  };

  const addRoom = () => {
    const roomName = prompt("Enter room name:");
    if (roomName && !rooms.includes(roomName)) {
      const updated = [...rooms, roomName];
      setRooms(updated);
      setGameData({ ...gameData, content: { puzzles, rooms: updated } });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Escape Room Puzzles</h3>
          <p className="text-sm text-muted-foreground">Create puzzles for each room</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addRoom} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
          <Button onClick={addPuzzle} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Puzzle
          </Button>
        </div>
      </div>

      {rooms.length > 1 && (
        <div className="flex gap-2">
          <Label className="text-sm text-muted-foreground">Rooms:</Label>
          {rooms.map((room, i) => (
            <span key={i} className="px-2 py-1 text-xs bg-secondary rounded">
              {room}
            </span>
          ))}
        </div>
      )}

      {puzzles.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No puzzles yet. Add your first puzzle!</p>
        </Card>
      )}

      <div className="space-y-4">
        {puzzles.map((puzzle, index) => (
          <Card key={puzzle.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Label className="text-base font-semibold">Puzzle {index + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePuzzle(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Puzzle Type</Label>
                  <Select
                    value={puzzle.type}
                    onValueChange={(value) => updatePuzzle(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code">Code/Cipher</SelectItem>
                      <SelectItem value="riddle">Riddle</SelectItem>
                      <SelectItem value="pattern">Pattern</SelectItem>
                      <SelectItem value="logic">Logic Puzzle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Room</Label>
                  <Select
                    value={puzzle.room}
                    onValueChange={(value) => updatePuzzle(index, "room", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={puzzle.points}
                    onChange={(e) => updatePuzzle(index, "points", parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Question/Clue</Label>
                <Textarea
                  value={puzzle.question}
                  onChange={(e) => updatePuzzle(index, "question", e.target.value)}
                  placeholder="Enter the puzzle description or clue..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Answer</Label>
                <Input
                  value={puzzle.answer}
                  onChange={(e) => updatePuzzle(index, "answer", e.target.value)}
                  placeholder="Correct answer..."
                />
              </div>

              <div className="space-y-2">
                <Label>Hints (3 levels)</Label>
                {puzzle.hints.map((hint, hintIndex) => (
                  <Input
                    key={hintIndex}
                    value={hint}
                    onChange={(e) => updateHint(index, hintIndex, e.target.value)}
                    placeholder={`Hint ${hintIndex + 1} (${hintIndex === 0 ? 'subtle' : hintIndex === 1 ? 'medium' : 'obvious'})...`}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EscapeRoomContentEditor;
