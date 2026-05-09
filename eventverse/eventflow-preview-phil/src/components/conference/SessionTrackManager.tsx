
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Tag } from "lucide-react";
import { SessionTrack, EventSession } from "@/types/conferenceScheduling";
import EnhancedTrackCard from "./EnhancedTrackCard";
import { getRandomAttendeesForSession } from "@/utils/mockConferenceData";

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
  sessions: EventSession[];
  onTracksChange: (tracks: SessionTrack[]) => void;
}

const SessionTrackManager = ({ tracks, sessions, onTracksChange }: SessionTrackManagerProps) => {
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

  // Calculate track statistics
  const getTrackStats = (trackId: string) => {
    const trackSessions = sessions.filter(s => s.trackId === trackId);
    const sessionCount = trackSessions.length;
    const totalRegistered = trackSessions.reduce((sum, s) => sum + s.registeredCount, 0);
    const totalCapacity = trackSessions.reduce((sum, s) => sum + s.capacity, 0);
    
    return { sessionCount, totalRegistered, totalCapacity };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Conference Tracks</h3>
          <p className="text-sm text-muted-foreground">Organize sessions into themed tracks</p>
        </div>
        <Button 
          onClick={() => setShowAddTrack(true)}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Track
        </Button>
      </div>

      {tracks.length === 0 ? (
        <div className="text-center py-12">
          <Tag className="w-16 h-16 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-4">No tracks created yet</p>
          <Button 
            onClick={() => setShowAddTrack(true)}
            variant="outline"
          >
            Create First Track
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => {
            const stats = getTrackStats(track.id);
            return (
              <EnhancedTrackCard
                key={track.id}
                track={track}
                sessionCount={stats.sessionCount}
                totalRegistered={stats.totalRegistered}
                totalCapacity={stats.totalCapacity}
                onEdit={handleEditTrack}
                onDelete={handleDeleteTrack}
              />
            );
          })}
        </div>
      )}

      <Dialog open={showAddTrack} onOpenChange={setShowAddTrack}>
        <DialogContent className="w-full max-w-md mx-auto bg-card border-border">
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
                className="flex-1"
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
