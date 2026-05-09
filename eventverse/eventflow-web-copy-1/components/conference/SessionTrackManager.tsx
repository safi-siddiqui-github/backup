
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { SessionTrack } from "@/types/conferenceScheduling";

const trackColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Teal", value: "bg-teal-500" }
];

interface SessionTrackManagerProps {
  tracks: SessionTrack[];
  onTracksChange: (tracks: SessionTrack[]) => void;
}

const SessionTrackManager = ({ tracks, onTracksChange }: SessionTrackManagerProps) => {
  const [showAddTrack, setShowAddTrack] = useState(false);
  const [editingTrack, setEditingTrack] = useState<SessionTrack | null>(null);
  const [newTrack, setNewTrack] = useState<Partial<SessionTrack>>({
    name: "",
    description: "",
    color: "bg-blue-500"
  });

  const handleAddTrack = () => {
    const trackToAdd: SessionTrack = {
      ...newTrack as SessionTrack,
      id: Date.now().toString()
    };
    onTracksChange([...tracks, trackToAdd]);
    resetForm();
    setShowAddTrack(false);
  };

  const handleEditTrack = (track: SessionTrack) => {
    setEditingTrack(track);
    setNewTrack(track);
    setShowAddTrack(true);
  };

  const handleUpdateTrack = () => {
    if (editingTrack) {
      onTracksChange(tracks.map(track => 
        track.id === editingTrack.id ? { ...newTrack as SessionTrack, id: editingTrack.id } : track
      ));
      setEditingTrack(null);
      resetForm();
      setShowAddTrack(false);
    }
  };

  const handleDeleteTrack = (trackId: string) => {
    onTracksChange(tracks.filter(track => track.id !== trackId));
  };

  const resetForm = () => {
    setNewTrack({
      name: "",
      description: "",
      color: "bg-blue-500"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Conference Tracks</h3>
        <Button 
          onClick={() => setShowAddTrack(true)}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Track
        </Button>
      </div>

      {tracks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No tracks created yet</p>
          <Button 
            onClick={() => setShowAddTrack(true)}
            variant="outline"
            className="mt-3"
          >
            Create First Track
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {tracks.map((track) => (
            <div key={track.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${track.color} text-white`}>
                      {track.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{track.description}</p>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditTrack(track)}
                    className="p-1 h-8 w-8"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteTrack(track.id)}
                    className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showAddTrack} onOpenChange={setShowAddTrack}>
        <DialogContent className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTrack ? "Edit Track" : "Add Track"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trackName">Track Name *</Label>
              <Input
                id="trackName"
                placeholder="e.g., AI/ML, DevOps, Security"
                value={newTrack.name || ""}
                onChange={(e) => setNewTrack({...newTrack, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trackDescription">Description</Label>
              <Textarea
                id="trackDescription"
                placeholder="Brief description of this track"
                value={newTrack.description || ""}
                onChange={(e) => setNewTrack({...newTrack, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Track Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {trackColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setNewTrack({...newTrack, color: color.value})}
                    className={`h-8 rounded ${color.value} ${
                      newTrack.color === color.value ? 'ring-2 ring-gray-400' : ''
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddTrack(false);
                  setEditingTrack(null);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={editingTrack ? handleUpdateTrack : handleAddTrack}
                disabled={!newTrack.name}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {editingTrack ? "Update Track" : "Add Track"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionTrackManager;
