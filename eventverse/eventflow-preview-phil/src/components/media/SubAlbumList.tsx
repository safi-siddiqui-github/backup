
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash, Camera, Users, Download, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MainAlbum, SubAlbum, SubAlbumSettings } from "./types";

interface SubAlbumListProps {
  mainAlbum: MainAlbum;
  onUpdateMainAlbum: (album: MainAlbum) => void;
}

const SubAlbumList = ({ mainAlbum, onUpdateMainAlbum }: SubAlbumListProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<SubAlbum | null>(null);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [maxPhotosPerGuest, setMaxPhotosPerGuest] = useState(mainAlbum.settings.maxPhotosPerGuest);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const { toast } = useToast();

  const createSubAlbum = () => {
    if (!albumName.trim()) {
      toast({
        title: "Album name required",
        description: "Please enter a name for the sub-album.",
        variant: "destructive"
      });
      return;
    }

    const settings: SubAlbumSettings = {
      maxPhotosPerGuest,
      allowDownloads,
      isActive: true
    };

    const newSubAlbum: SubAlbum = {
      id: Date.now().toString(),
      name: albumName,
      description: albumDescription,
      mainAlbumId: mainAlbum.id,
      photoCount: 0,
      videoCount: 0,
      contributors: [],
      created: new Date(),
      isActive: true,
      settings
    };

    const updatedMainAlbum = {
      ...mainAlbum,
      subAlbums: [...mainAlbum.subAlbums, newSubAlbum]
    };

    onUpdateMainAlbum(updatedMainAlbum);
    setIsCreating(false);
    resetForm();

    toast({
      title: "Sub-album created",
      description: `${newSubAlbum.name} has been added to ${mainAlbum.name}.`
    });
  };

  const updateSubAlbum = () => {
    if (!editingAlbum || !albumName.trim()) return;

    const updatedSubAlbum = {
      ...editingAlbum,
      name: albumName,
      description: albumDescription,
      settings: {
        ...editingAlbum.settings,
        maxPhotosPerGuest,
        allowDownloads
      }
    };

    const updatedMainAlbum = {
      ...mainAlbum,
      subAlbums: mainAlbum.subAlbums.map(album => 
        album.id === editingAlbum.id ? updatedSubAlbum : album
      )
    };

    onUpdateMainAlbum(updatedMainAlbum);
    setEditingAlbum(null);
    resetForm();

    toast({
      title: "Sub-album updated",
      description: "Album details have been updated successfully."
    });
  };

  const deleteSubAlbum = (albumId: string) => {
    const updatedMainAlbum = {
      ...mainAlbum,
      subAlbums: mainAlbum.subAlbums.filter(album => album.id !== albumId)
    };

    onUpdateMainAlbum(updatedMainAlbum);

    toast({
      title: "Sub-album deleted",
      description: "Album has been deleted successfully."
    });
  };

  const toggleSubAlbumStatus = (albumId: string) => {
    const updatedMainAlbum = {
      ...mainAlbum,
      subAlbums: mainAlbum.subAlbums.map(album => 
        album.id === albumId ? { ...album, isActive: !album.isActive } : album
      )
    };

    onUpdateMainAlbum(updatedMainAlbum);
  };

  const startEditing = (album: SubAlbum) => {
    setEditingAlbum(album);
    setAlbumName(album.name);
    setAlbumDescription(album.description);
    setMaxPhotosPerGuest(album.settings.maxPhotosPerGuest);
    setAllowDownloads(album.settings.allowDownloads);
  };

  const resetForm = () => {
    setAlbumName("");
    setAlbumDescription("");
    setMaxPhotosPerGuest(mainAlbum.settings.maxPhotosPerGuest);
    setAllowDownloads(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Sub-Albums</CardTitle>
          <Dialog open={isCreating || !!editingAlbum} onOpenChange={(open) => {
            if (!open) {
              setIsCreating(false);
              setEditingAlbum(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Sub-Album
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingAlbum ? 'Edit Sub-Album' : 'Create Sub-Album'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sub-album-name">Album Name</Label>
                  <Input
                    id="sub-album-name"
                    placeholder="e.g., Arrival & Welcome"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sub-album-description">Description</Label>
                  <Input
                    id="sub-album-description"
                    placeholder="Brief description of this section"
                    value={albumDescription}
                    onChange={(e) => setAlbumDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Max photos per guest</Label>
                    <p className="text-sm text-gray-600">Limit for this sub-album</p>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max={mainAlbum.settings.maxPhotosPerGuest}
                    value={maxPhotosPerGuest}
                    onChange={(e) => setMaxPhotosPerGuest(Number(e.target.value))}
                    className="w-20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow downloads</Label>
                    <p className="text-sm text-gray-600">Let guests download from this album</p>
                  </div>
                  <Switch
                    checked={allowDownloads}
                    onCheckedChange={setAllowDownloads}
                  />
                </div>

                <Button 
                  onClick={editingAlbum ? updateSubAlbum : createSubAlbum} 
                  className="w-full"
                >
                  {editingAlbum ? 'Update Sub-Album' : 'Create Sub-Album'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {mainAlbum.subAlbums.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No sub-albums yet. Create your first sub-album to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainAlbum.subAlbums.map((subAlbum) => (
              <Card key={subAlbum.id} className={`${subAlbum.isActive ? '' : 'opacity-60'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{subAlbum.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{subAlbum.description}</p>
                    </div>
                    <Badge variant={subAlbum.isActive ? "default" : "secondary"} className="text-xs">
                      {subAlbum.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>{subAlbum.photoCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{subAlbum.contributors.length}</span>
                    </div>
                    <div className="text-gray-500">
                      {subAlbum.settings.maxPhotosPerGuest} max
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(subAlbum)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSubAlbumStatus(subAlbum.id)}
                      className="flex-1"
                    >
                      {subAlbum.isActive ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSubAlbum(subAlbum.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubAlbumList;
