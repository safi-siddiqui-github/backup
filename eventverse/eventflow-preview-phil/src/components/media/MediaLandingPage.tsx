import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, FolderOpen, Play, Image, Users, Clock, Plus, Settings, BarChart3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContributorList from "./ContributorList";
import { generateMockContributors, getRandomContributors } from "./mockMediaData";

interface MediaLandingPageProps {
  eventId: string;
  onNavigateToModule: () => void;
}

const MediaLandingPage = ({ eventId, onNavigateToModule }: MediaLandingPageProps) => {
  // Generate mock contributors once
  const allContributors = generateMockContributors(45);
  
  // Mock data - in real app, this would come from storage/API
  const stats = {
    totalPhotos: 247,
    totalVideos: 12,
    totalAlbums: 8,
    totalContributors: 45,
    storageUsed: "2.4 GB",
    storageLimit: "10 GB",
    recentUploads: 23,
    pendingApprovals: 5
  };

  const recentAlbums = [
    {
      id: "1",
      name: "Ceremony",
      description: "Official ceremony photos",
      photoCount: 67,
      videoCount: 3,
      contributors: getRandomContributors(allContributors, 12),
      coverImage: "/placeholder.svg",
      isActive: true,
      lastUpdated: "2 hours ago"
    },
    {
      id: "2",
      name: "Reception",
      description: "Reception and dinner photos",
      photoCount: 134,
      videoCount: 7,
      contributors: getRandomContributors(allContributors, 28),
      coverImage: "/placeholder.svg",
      isActive: true,
      lastUpdated: "5 hours ago"
    },
    {
      id: "3",
      name: "Photo Booth",
      description: "Fun photo booth moments",
      photoCount: 46,
      videoCount: 2,
      contributors: getRandomContributors(allContributors, 15),
      coverImage: "/placeholder.svg",
      isActive: true,
      lastUpdated: "1 day ago"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Management</h1>
          <p className="text-muted-foreground mt-1">
            Organize, manage, and share your event photos and videos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onNavigateToModule} size="lg" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Media
          </Button>
          <Button onClick={onNavigateToModule} variant="outline" size="lg" className="gap-2">
            <FolderOpen className="w-4 h-4" />
            Manage Albums
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Camera className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{stats.totalPhotos}</div>
            <div className="text-xs text-muted-foreground">Photos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Play className="w-5 h-5 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <div className="text-xs text-muted-foreground">Videos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FolderOpen className="w-5 h-5 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{stats.totalAlbums}</div>
            <div className="text-xs text-muted-foreground">Albums</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-5 h-5 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{stats.totalContributors}</div>
            <div className="text-xs text-muted-foreground">Contributors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Upload className="w-5 h-5 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{stats.recentUploads}</div>
            <div className="text-xs text-muted-foreground">Recent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-5 h-5 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent className="p-4 text-center">
            <Image className="w-5 h-5 mx-auto mb-2 text-indigo-600" />
            <div className="text-2xl font-bold">{stats.storageUsed}</div>
            <div className="text-xs text-muted-foreground">of {stats.storageLimit} used</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={onNavigateToModule}
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create Album</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={onNavigateToModule}
          >
            <Upload className="w-5 h-5" />
            <span className="text-sm">Upload Photos</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={onNavigateToModule}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">AI Search</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex-col gap-2"
            onClick={onNavigateToModule}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">View Analytics</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Albums */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Albums</h2>
          <Button variant="ghost" onClick={onNavigateToModule}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAlbums.map((album) => (
            <Card key={album.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={album.coverImage} 
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                {album.isActive && (
                  <Badge className="absolute top-2 right-2">Active</Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{album.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {album.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      {album.photoCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {album.videoCount}
                    </span>
                  </div>
                </div>
                <div>
                  <ContributorList 
                    contributors={album.contributors}
                    albumName={album.name}
                    totalPhotos={album.photoCount}
                  />
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Updated {album.lastUpdated}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={onNavigateToModule}
                  >
                    <FolderOpen className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onNavigateToModule}
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Media Features</CardTitle>
          <CardDescription>
            Everything you need to manage event photos and videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-lg h-fit">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Album Management</h4>
                <p className="text-xs text-muted-foreground">
                  Organize photos into albums and sub-albums
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-lg h-fit">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Guest Uploads</h4>
                <p className="text-xs text-muted-foreground">
                  Let guests upload and share their photos
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-lg h-fit">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">AI-Powered Search</h4>
                <p className="text-xs text-muted-foreground">
                  Find photos using natural language
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-lg h-fit">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Photo Booth</h4>
                <p className="text-xs text-muted-foreground">
                  Interactive photo booth experience
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-lg h-fit">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Live Feed</h4>
                <p className="text-xs text-muted-foreground">
                  Real-time photo feed during the event
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-lg h-fit">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Analytics</h4>
                <p className="text-xs text-muted-foreground">
                  Track engagement and downloads
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLandingPage;
