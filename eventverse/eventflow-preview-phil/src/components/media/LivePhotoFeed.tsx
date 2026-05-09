
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, RefreshCw, Pause, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LivePhoto {
  id: string;
  url: string;
  thumbnail: string;
  uploader: string;
  uploadTime: Date;
  likes: number;
  comments: number;
  isNew: boolean;
  album?: string;
}

interface LivePhotoFeedProps {
  eventId: string;
}

const LivePhotoFeed = ({ eventId }: LivePhotoFeedProps) => {
  const [photos, setPhotos] = useState<LivePhoto[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop",
      uploader: "Sarah M.",
      uploadTime: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      likes: 8,
      comments: 2,
      isNew: true,
      album: "Reception"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
      uploader: "Mike R.",
      uploadTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      likes: 12,
      comments: 4,
      isNew: false,
      album: "Activities"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop",
      uploader: "Emma K.",
      uploadTime: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      likes: 15,
      comments: 6,
      isNew: false,
      album: "Venue"
    }
  ]);

  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const { toast } = useToast();

  // Simulate new photo uploads
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      // Randomly add new photos (simulation)
      if (Math.random() > 0.7) {
        const newPhoto: LivePhoto = {
          id: Date.now().toString(),
          url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
          thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop",
          uploader: `Guest ${Math.floor(Math.random() * 100)}`,
          uploadTime: new Date(),
          likes: 0,
          comments: 0,
          isNew: true,
          album: ["Reception", "Activities", "Venue"][Math.floor(Math.random() * 3)]
        };

        setPhotos(prev => [newPhoto, ...prev]);
        
        toast({
          title: "New photo uploaded!",
          description: `${newPhoto.uploader} just shared a photo`
        });

        // Mark as not new after 30 seconds
        setTimeout(() => {
          setPhotos(prev => prev.map(p => 
            p.id === newPhoto.id ? { ...p, isNew: false } : p
          ));
        }, 30000);
      }
      setLastRefresh(new Date());
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoRefresh, toast]);

  const handleLike = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ));
  };

  const handleComment = (photoId: string) => {
    // In a real app, this would open a comment dialog
    console.log(`Opening comments for photo ${photoId}`);
  };

  const handleShare = (photo: LivePhoto) => {
    navigator.clipboard.writeText(photo.url);
    toast({
      title: "Link copied",
      description: "Photo link has been copied to clipboard"
    });
  };

  const manualRefresh = () => {
    setLastRefresh(new Date());
    toast({
      title: "Feed refreshed",
      description: "Checking for new photos..."
    });
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Feed Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Live Photo Feed</CardTitle>
              <p className="text-sm text-gray-600">
                Real-time photos from your event • Last updated: {formatTimeAgo(lastRefresh)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={isAutoRefresh ? "text-green-600" : "text-gray-600"}
              >
                {isAutoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoRefresh ? "Pause" : "Resume"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={manualRefresh}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>{photos.filter(p => p.isNew).length} new photos</span>
            </div>
            <div className="text-gray-600">
              {photos.length} total photos in feed
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Photo Stream */}
      <div className="space-y-4">
        {photos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-2">📷</div>
              <p className="text-gray-600">No photos in the live feed yet.</p>
              <p className="text-sm text-gray-500">Photos will appear here as guests upload them!</p>
            </CardContent>
          </Card>
        ) : (
          photos.map((photo) => (
            <Card 
              key={photo.id} 
              className={`hover:shadow-lg transition-all ${
                photo.isNew ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Photo Thumbnail */}
                  <div className="relative">
                    <img
                      src={photo.thumbnail}
                      alt={`Photo by ${photo.uploader}`}
                      className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    />
                    {photo.isNew && (
                      <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1">
                        New!
                      </Badge>
                    )}
                  </div>

                  {/* Photo Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{photo.uploader}</h4>
                        <p className="text-sm text-gray-600">{formatTimeAgo(photo.uploadTime)}</p>
                        {photo.album && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {photo.album}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Engagement Actions */}
                    <div className="flex gap-4 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(photo.id)}
                        className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {photo.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(photo.id)}
                        className="h-8 px-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {photo.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(photo)}
                        className="h-8 px-2 text-green-500 hover:text-green-600 hover:bg-green-50"
                      >
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Feed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feed Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{photos.length}</div>
              <div className="text-sm text-gray-600">Total Photos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {photos.reduce((sum, p) => sum + p.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {photos.filter(p => p.isNew).length}
              </div>
              <div className="text-sm text-gray-600">New Photos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {new Set(photos.map(p => p.uploader)).size}
              </div>
              <div className="text-sm text-gray-600">Contributors</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePhotoFeed;
