
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FolderOpen, Plus, Edit, Trash, Users, Camera, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Album {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  photoCount: number;
  videoCount: number;
  contributors: number;
  created: Date;
  isPublic: boolean;
}

interface AlbumManagerProps {
  eventId: string;
}

const AlbumManager = ({ eventId }: AlbumManagerProps) => {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: "1",
      name: "Reception Photos",
      description: "Welcome reception and guest arrivals",
      coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop",
      photoCount: 45,
      videoCount: 3,
      contributors: 12,
      created: new Date(),
      isPublic: true
    },
    {
      id: "2",
      name: "Team Activities",
      description: "Team building and group activities",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
      photoCount: 67,
      videoCount: 8,
      contributors: 23,
      created: new Date(),
      isPublic: true
    },
    {
      id: "3",
      name: "Behind the Scenes",
      description: "Setup and preparation moments",
      coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop",
      photoCount: 28,
      videoCount: 2,
      contributors: 5,
      created: new Date(),
      isPublic: false
    }
  ]);

  const [newAlbumName, setNewAlbumName] = useState("");
  const [newAlbumDescription, setNewAlbumDescription] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const { toast } = useToast();

  const createAlbum = () => {
    if (!newAlbumName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for the album.",
        variant: "destructive"
      });
      return;
    }

    const newAlbum: Album = {
      id: Date.now().toString(),
      name: newAlbumName,
      description: newAlbumDescription,
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
      photoCount: 0,
      videoCount: 0,
      contributors: 0,
      created: new Date(),
      isPublic: true
    };

    setAlbums(prev => [...prev, newAlbum]);
    setNewAlbumName("");
    setNewAlbumDescription("");
    setIsCreateDialogOpen(false);

    toast({
      title: "Album created",
      description: `${newAlbum.name} has been created successfully.`
    });
  };

  const updateAlbum = () => {
    if (!editingAlbum || !newAlbumName.trim()) return;

    setAlbums(prev => prev.map(album => 
      album.id === editingAlbum.id 
        ? { ...album, name: newAlbumName, description: newAlbumDescription }
        : album
    ));

    setEditingAlbum(null);
    setNewAlbumName("");
    setNewAlbumDescription("");

    toast({
      title: "Album updated",
      description: "Album details have been updated successfully."
    });
  };

  const deleteAlbum = (albumId: string) => {
    setAlbums(prev => prev.filter(album => album.id !== albumId));
    toast({
      title: "Album deleted",
      description: "Album has been deleted successfully."
    });
  };

  const toggleAlbumVisibility = (albumId: string) => {
    setAlbums(prev => prev.map(album => 
      album.id === albumId ? { ...album, isPublic: !album.isPublic } : album
    ));
  };

  const downloadAlbum = (album: Album) => {
    toast({
      title: "Download started",
      description: `Downloading ${album.name} with ${album.photoCount + album.videoCount} items...`
    });
  };

  const startEditing = (album: Album) => {
    setEditingAlbum(album);
    setNewAlbumName(album.name);
    setNewAlbumDescription(album.description);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Album Management</h2>
          <p className="text-sm text-gray-600">Organize your event photos into collections</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Album
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAlbum ? 'Edit Album' : 'Create New Album'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="album-name">Album Name</Label>
                <Input
                  id="album-name"
                  placeholder="e.g., Reception Photos"
                  value={newAlbumName}
                  onChange={(e) => setNewAlbumName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="album-description">Description</Label>
                <Input
                  id="album-description"
                  placeholder="Brief description of the album"
                  value={newAlbumDescription}
                  onChange={(e) => setNewAlbumDescription(e.target.value)}
                />
              </div>

              <Button 
                onClick={editingAlbum ? updateAlbum : createAlbum} 
                className="w-full"
              >
                {editingAlbum ? 'Update Album' : 'Create Album'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Albums Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <FolderOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-900">{albums.length}</div>
            <div className="text-sm text-blue-700">Total Albums</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-900">
              {albums.reduce((sum, album) => sum + album.photoCount + album.videoCount, 0)}
            </div>
            <div className="text-sm text-green-700">Total Media</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-900">
              {albums.reduce((sum, album) => sum + album.contributors, 0)}
            </div>
            <div className="text-sm text-purple-700">Contributors</div>
          </CardContent>
        </Card>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Card key={album.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={album.coverImage}
                  alt={album.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge variant={album.isPublic ? "default" : "secondary"} className="text-xs">
                    {album.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                  {album.photoCount + album.videoCount} items
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{album.name}</h3>
                  <p className="text-sm text-gray-600">{album.description}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{album.photoCount} photos</span>
                  <span>{album.videoCount} videos</span>
                  <span>{album.contributors} contributors</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      startEditing(album);
                      setIsCreateDialogOpen(true);
                    }}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAlbum(album)}
                    className="flex-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAlbumVisibility(album.id)}
                    className="flex-1"
                  >
                    {album.isPublic ? "Make Private" : "Make Public"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlbum(album.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Album Management Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Album Management Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Organization Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Create albums by event segments (arrival, activities, etc.)</li>
                <li>• Use descriptive names and descriptions</li>
                <li>• Set appropriate privacy levels for each album</li>
                <li>• Monitor contributor activity regularly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Sharing & Access:</h4>
              <ul className="space-y-1">
                <li>• Public albums are visible to all event guests</li>
                <li>• Private albums are only visible to organizers</li>
                <li>• Download albums as ZIP files for archiving</li>
                <li>• Generate QR codes for easy guest access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlbumManager;
