"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, FolderOpen, Plus, Settings, Users } from "lucide-react";
import { useState } from "react";
import AlbumQRCode from "./AlbumQRCode";
import SubAlbumList from "./SubAlbumList";
import { AlbumSettings, MainAlbum } from "./types";

interface MainAlbumManagerProps {
  eventId: string;
}

const MainAlbumManager = ({ eventId }: MainAlbumManagerProps) => {
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
        variant: "destructive",
      });
      return;
    }

    const settings: AlbumSettings = {
      maxPhotosPerGuest,
      allowDownloads,
      requireApproval,
      allowedFileTypes: ["image/jpeg", "image/png", "image/gif", "video/mp4"],
      maxFileSize: 10,
      isPublic: true,
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
      totalContributors: 0,
    };

    setMainAlbum(newMainAlbum);
    setIsCreating(false);
    setAlbumName("");
    setAlbumDescription("");

    toast({
      title: "Main album created",
      description: `${newMainAlbum.name} has been created successfully.`,
    });
  };

  const updateMainAlbumSettings = (newSettings: Partial<AlbumSettings>) => {
    if (!mainAlbum) return;

    setMainAlbum({
      ...mainAlbum,
      settings: { ...mainAlbum.settings, ...newSettings },
    });

    toast({
      title: "Settings updated",
      description: "Album settings have been saved.",
    });
  };

  if (!mainAlbum) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create Your Event Album</CardTitle>
            <p className="text-gray-600">
              Set up the main album for your event and organize photos into
              sub-albums
            </p>
          </CardHeader>
          <CardContent>
            <Dialog
              open={isCreating}
              onOpenChange={setIsCreating}
            >
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
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
                        onChange={(e) =>
                          setMaxPhotosPerGuest(Number(e.target.value))
                        }
                        className="w-20"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow downloads</Label>
                        <p className="text-sm text-gray-600">
                          Let guests download photos
                        </p>
                      </div>
                      <Switch
                        checked={allowDownloads}
                        onCheckedChange={setAllowDownloads}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require approval</Label>
                        <p className="text-sm text-gray-600">
                          Review photos before publishing
                        </p>
                      </div>
                      <Switch
                        checked={requireApproval}
                        onCheckedChange={setRequireApproval}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={createMainAlbum}
                    className="w-full"
                  >
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
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FolderOpen className="h-5 w-5" />
                {mainAlbum.name}
              </CardTitle>
              <p className="mt-1 text-gray-600">{mainAlbum.description}</p>
            </div>
            <Badge variant="default">Main Album</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <Camera className="mx-auto mb-1 h-6 w-6 text-blue-600" />
              <div className="text-lg font-semibold">
                {mainAlbum.totalPhotos}
              </div>
              <div className="text-sm text-gray-600">Photos</div>
            </div>
            <div className="text-center">
              <Camera className="mx-auto mb-1 h-6 w-6 text-green-600" />
              <div className="text-lg font-semibold">
                {mainAlbum.totalVideos}
              </div>
              <div className="text-sm text-gray-600">Videos</div>
            </div>
            <div className="text-center">
              <Users className="mx-auto mb-1 h-6 w-6 text-purple-600" />
              <div className="text-lg font-semibold">
                {mainAlbum.totalContributors}
              </div>
              <div className="text-sm text-gray-600">Contributors</div>
            </div>
            <div className="text-center">
              <FolderOpen className="mx-auto mb-1 h-6 w-6 text-orange-600" />
              <div className="text-lg font-semibold">
                {mainAlbum.subAlbums.length}
              </div>
              <div className="text-sm text-gray-600">Sub-Albums</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Settings className="mr-2 h-4 w-4" />
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
                      <p className="text-sm text-gray-600">
                        Current limit: {mainAlbum.settings.maxPhotosPerGuest}
                      </p>
                    </div>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      defaultValue={mainAlbum.settings.maxPhotosPerGuest}
                      onChange={(e) =>
                        updateMainAlbumSettings({
                          maxPhotosPerGuest: Number(e.target.value),
                        })
                      }
                      className="w-20"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow downloads</Label>
                      <p className="text-sm text-gray-600">
                        Let guests download photos
                      </p>
                    </div>
                    <Switch
                      checked={mainAlbum.settings.allowDownloads}
                      onCheckedChange={(checked) =>
                        updateMainAlbumSettings({ allowDownloads: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require approval</Label>
                      <p className="text-sm text-gray-600">
                        Review photos before publishing
                      </p>
                    </div>
                    <Switch
                      checked={mainAlbum.settings.requireApproval}
                      onCheckedChange={(checked) =>
                        updateMainAlbumSettings({ requireApproval: checked })
                      }
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
      <SubAlbumList
        mainAlbum={mainAlbum}
        onUpdateMainAlbum={setMainAlbum}
      />
    </div>
  );
};

export default MainAlbumManager;
