import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: number;
  previewUrl?: string;
}

interface CrowdDJContentEditorProps {
  gameData: any;
  setGameData: (data: any) => void;
}

const CrowdDJContentEditor = ({ gameData, setGameData }: CrowdDJContentEditorProps) => {
  const [songs, setSongs] = useState<Song[]>(
    gameData.content?.songs || []
  );

  const addSong = () => {
    const newSong: Song = {
      id: `s-${Date.now()}`,
      title: "",
      artist: "",
      genre: "Pop",
      duration: 180,
      previewUrl: "",
    };
    const updated = [...songs, newSong];
    setSongs(updated);
    setGameData({ ...gameData, content: { songs: updated } });
  };

  const updateSong = (index: number, field: string, value: any) => {
    const updated = [...songs];
    updated[index] = { ...updated[index], [field]: value };
    setSongs(updated);
    setGameData({ ...gameData, content: { songs: updated } });
  };

  const deleteSong = (index: number) => {
    const updated = songs.filter((_, i) => i !== index);
    setSongs(updated);
    setGameData({ ...gameData, content: { songs: updated } });
  };

  const loadSamplePlaylist = () => {
    const samples: Song[] = [
      {
        id: "sample-1",
        title: "Dance All Night",
        artist: "DJ Party",
        genre: "Electronic",
        duration: 210,
      },
      {
        id: "sample-2",
        title: "Summer Vibes",
        artist: "Cool Band",
        genre: "Pop",
        duration: 195,
      },
    ];
    setSongs(samples);
    setGameData({ ...gameData, content: { songs: samples } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Song Playlist</h3>
          <p className="text-sm text-muted-foreground">Add songs for crowd voting</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadSamplePlaylist} variant="outline" size="sm">
            Load Sample
          </Button>
          <Button onClick={addSong} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Song
          </Button>
        </div>
      </div>

      {songs.length === 0 && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">No songs yet. Build your playlist!</p>
        </Card>
      )}

      <div className="space-y-4">
        {songs.map((song, index) => (
          <Card key={song.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-base font-semibold">Song {index + 1}</Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSong(index)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Song Title</Label>
                  <Input
                    value={song.title}
                    onChange={(e) => updateSong(index, "title", e.target.value)}
                    placeholder="Enter song title..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Artist</Label>
                  <Input
                    value={song.artist}
                    onChange={(e) => updateSong(index, "artist", e.target.value)}
                    placeholder="Enter artist name..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Input
                    value={song.genre}
                    onChange={(e) => updateSong(index, "genre", e.target.value)}
                    placeholder="e.g., Pop, Rock, Electronic"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (seconds)</Label>
                  <Input
                    type="number"
                    value={song.duration}
                    onChange={(e) => updateSong(index, "duration", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Preview URL (optional)</Label>
                  <Input
                    value={song.previewUrl || ""}
                    onChange={(e) => updateSong(index, "previewUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CrowdDJContentEditor;
