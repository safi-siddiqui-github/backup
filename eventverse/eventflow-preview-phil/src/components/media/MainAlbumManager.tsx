
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Settings, Camera, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MainAlbum, AlbumSettings } from "./types";
import SubAlbumList from "./SubAlbumList";
import AlbumQRCode from "./AlbumQRCode";
import ContributorList from "./ContributorList";
import { generateMockContributors } from "./mockMediaData";

interface MainAlbumManagerProps {
  eventId: string;
}

const MainAlbumManager = ({ eventId }: MainAlbumManagerProps) => {
  const allContributors = generateMockContributors(45);
  const [mainAlbum, setMainAlbum] = useState<MainAlbum | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [maxPhotosPerGuest, setMaxPhotosPerGuest] = useState(15);
  const [allowDownloads, setAllowDownloads] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const { toast } = useToast();

  const createMainAlbum = () => {
    if (!albumName.trim()) {
      toast({
        title: "Album name required",
        description: "Please enter a name for your main album.",
        variant: "destructive"
      });
      return;
    }

    const settings: AlbumSettings = {
      maxPhotosPerGuest,
      allowDownloads,
      requireApproval,
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'],
      maxFileSize: 10,
      isPublic: true
    };

    const newMainAlbum: MainAlbum = {
      id: Date.now().toString(),
      name: albumName,
      description: albumDescription,
      eventId,
      created: new Date(),
      isActive: true,
      settings,
      subAlbums: [],
      totalPhotos: 0,
      totalVideos: 0,
      totalContributors: allContributors.length,
      contributors: allContributors
    };

    setMainAlbum(newMainAlbum);
    setIsCreating(false);
    setAlbumName("");
    setAlbumDescription("");

    toast({
      title: "Main album created",
      description: `${newMainAlbum.name} has been created successfully.`
    });
  };

  const updateMainAlbumSettings = (newSettings: Partial<AlbumSettings>) => {
    if (!mainAlbum) return;

    setMainAlbum({
      ...mainAlbum,
      settings: { ...mainAlbum.settings, ...newSettings }
    });

    toast({
      title: "Settings updated",
      description: "Album settings have been saved."
    });
  };

  if (!mainAlbum) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create Your Event Album</CardTitle>
            <p className="text-gray-600">
              Set up the main album for your event and organize photos into sub-albums
            </p>
          </CardHeader>
          <CardContent>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Main Album
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Main Event Album</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="album-name">Album Name</Label>
                    <Input
                      id="album-name"
                      placeholder="e.g., Company Retreat 2024"
                      value={albumName}
                      onChange={(e) => setAlbumName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="album-description">Description</Label>
                    <Textarea
                      id="album-description"
                      placeholder="Brief description of your event"
                      value={albumDescription}
                      onChange={(e) => setAlbumDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Initial Settings</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Max photos per guest</Label>
                        <p className="text-sm text-gray-600">Free tier limit</p>
                      </div>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={maxPhotosPerGuest}
                        onChange={(e) => setMaxPhotosPerGuest(Number(e.target.value))}
                        className="w-20"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow downloads</Label>
                        <p className="text-sm text-gray-600">Let guests download photos</p>
                      </div>
                      <Switch
                        checked={allowDownloads}
                        onCheckedChange={setAllowDownloads}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require approval</Label>
                        <p className="text-sm text-gray-600">Review photos before publishing</p>
                      </div>
                      <Switch
                        checked={requireApproval}
                        onCheckedChange={setRequireApproval}
                      />
                    </div>
                  </div>

                  <Button onClick={createMainAlbum} className="w-full">
                    Create Album
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Album Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                {mainAlbum.name}
              </CardTitle>
              <p className="text-gray-600 mt-1">{mainAlbum.description}</p>
            </div>
            <Badge variant="default">Main Album</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <Camera className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="text-lg font-semibold">{mainAlbum.totalPhotos}</div>
              <div className="text-sm text-gray-600">Photos</div>
            </div>
            <div className="text-center">
              <Camera className="w-6 h-6 mx-auto mb-1 text-green-600" />
              <div className="text-lg font-semibold">{mainAlbum.totalVideos}</div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <FolderOpen className="w-6 h-6 mx-auto mb-1 text-orange-600" />
              <div className="text-lg font-semibold">{mainAlbum.subAlbums.length}</div>
              <div className="text-sm text-gray-600">Sub-Albums</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Contributors</div>
            <ContributorList 
              contributors={mainAlbum.contributors}
              albumName={mainAlbum.name}
              totalPhotos={mainAlbum.totalPhotos}
            />
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Album Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Max photos per guest</Label>
                      <p className="text-sm text-gray-600">Current limit: {mainAlbum.settings.maxPhotosPerGuest}</p>
                    </div>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      defaultValue={mainAlbum.settings.maxPhotosPerGuest}
                      onChange={(e) => updateMainAlbumSettings({ maxPhotosPerGuest: Number(e.target.value) })}
                      className="w-20"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow downloads</Label>
                      <p className="text-sm text-gray-600">Let guests download photos</p>
                    </div>
                    <Switch
                      checked={mainAlbum.settings.allowDownloads}
                      onCheckedChange={(checked) => updateMainAlbumSettings({ allowDownloads: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require approval</Label>
                      <p className="text-sm text-gray-600">Review photos before publishing</p>
                    </div>
                    <Switch
                      checked={mainAlbum.settings.requireApproval}
                      onCheckedChange={(checked) => updateMainAlbumSettings({ requireApproval: checked })}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <AlbumQRCode mainAlbum={mainAlbum} />
          </div>
        </CardContent>
      </Card>

      {/* Sub-Albums */}
      <SubAlbumList mainAlbum={mainAlbum} onUpdateMainAlbum={setMainAlbum} />
    </div>
  );
};

export default MainAlbumManager;
