
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Camera, Upload, FolderOpen, Play, Grid, List } from "lucide-react";
import PhotoGallery from "./media/PhotoGallery";
import MediaUpload from "./media/MediaUpload";
import LivePhotoFeed from "./media/LivePhotoFeed";
import PhotoBooth from "./media/PhotoBooth";
import MainAlbumManager from "./media/MainAlbumManager";

interface MediaModuleProps {
  eventId: string;
  onBack: () => void;
}

const MediaModule = ({ eventId, onBack }: MediaModuleProps) => {
  const [activeTab, setActiveTab] = useState("albums");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10 p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">Media Center</h1>
                <p className="text-purple-100 text-sm">Organized Albums & Guest Uploads</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="text-white hover:bg-white/10 p-2"
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Camera className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-800">247</div>
              <div className="text-sm text-gray-600">Photos</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Play className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-600">Videos</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <FolderOpen className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-800">8</div>
              <div className="text-sm text-gray-600">Sub-Albums</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Upload className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-gray-800">45</div>
              <div className="text-sm text-gray-600">Contributors</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800">Event Media Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="live-feed">Live Feed</TabsTrigger>
                <TabsTrigger value="photo-booth">Photo Booth</TabsTrigger>
              </TabsList>

              <TabsContent value="albums" className="mt-6">
                <MainAlbumManager eventId={eventId} />
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <PhotoGallery eventId={eventId} viewMode={viewMode} />
              </TabsContent>

              <TabsContent value="upload" className="mt-6">
                <MediaUpload eventId={eventId} />
              </TabsContent>

              <TabsContent value="live-feed" className="mt-6">
                <LivePhotoFeed eventId={eventId} />
              </TabsContent>

              <TabsContent value="photo-booth" className="mt-6">
                <PhotoBooth eventId={eventId} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MediaModule;
