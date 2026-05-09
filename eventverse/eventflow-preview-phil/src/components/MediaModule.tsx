
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderOpen, Grid, Upload } from "lucide-react";
import PhotoGallery from "./media/PhotoGallery";
import MediaUpload from "./media/MediaUpload";
import LivePhotoFeed from "./media/LivePhotoFeed";
import PhotoBooth from "./media/PhotoBooth";
import MainAlbumManager from "./media/MainAlbumManager";
import MediaSidebar from "./media/MediaSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MediaModuleProps {
  eventId: string;
  onBack: () => void;
}

const MediaModule = ({ eventId, onBack }: MediaModuleProps) => {
  const [activeSection, setActiveSection] = useState("albums");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const stats = {
    totalPhotos: 247,
    totalVideos: 12,
    totalAlbums: 8,
    totalContributors: 45,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-20 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Media Center</h1>
            <p className="text-sm text-muted-foreground">
              Organized Albums & Guest Uploads
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hide on mobile, show as drawer */}
        {!isMobile && (
          <MediaSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            stats={stats}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            {activeSection === "albums" && <MainAlbumManager eventId={eventId} />}
            {activeSection === "gallery" && <PhotoGallery eventId={eventId} />}
            {activeSection === "upload" && <MediaUpload eventId={eventId} />}
            {activeSection === "live-feed" && <LivePhotoFeed eventId={eventId} />}
            {activeSection === "photo-booth" && <PhotoBooth eventId={eventId} />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="bg-card border-t border-border p-2 flex justify-around items-center sticky bottom-0 z-20">
          <Button
            variant={activeSection === "albums" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("albums")}
            className="flex-col h-auto py-2 px-3"
          >
            <FolderOpen className="w-5 h-5" />
            <span className="text-xs mt-1">Albums</span>
          </Button>
          <Button
            variant={activeSection === "gallery" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("gallery")}
            className="flex-col h-auto py-2 px-3"
          >
            <Grid className="w-5 h-5" />
            <span className="text-xs mt-1">Gallery</span>
          </Button>
          <Button
            variant={activeSection === "upload" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("upload")}
            className="flex-col h-auto py-2 px-3"
          >
            <Upload className="w-5 h-5" />
            <span className="text-xs mt-1">Upload</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2 px-3"
          >
            <div className="text-xs">More</div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaModule;
