import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Tag,
  User,
  Calendar,
  FolderOpen,
} from "lucide-react";
import { format } from "date-fns";
import PhotoLikesList from "./PhotoLikesList";

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  uploader: {
    name: string;
    avatar?: string;
  };
  uploadedAt: Date;
  tags: string[];
  likedBy: any[];
  album?: string;
}

interface PhotoLightboxProps {
  photo: Photo | null;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onLike: (photoId: string) => void;
  onDownload: (photoId: string) => void;
  onShare: (photoId: string) => void;
}

const PhotoLightbox = ({
  photo,
  photos,
  isOpen,
  onClose,
  onNavigate,
  onLike,
  onDownload,
  onShare,
}: PhotoLightboxProps) => {
  const [showComments, setShowComments] = useState(false);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 gap-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left: Image Viewer */}
          <div className="flex-1 relative bg-black/95 flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Navigation Arrows */}
            {hasPrev && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}
            {hasNext && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            )}

            {/* Image */}
            <img
              src={photo.url}
              alt={photo.title}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Right: Details Panel */}
          <div className="w-80 bg-card border-l border-border flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {photo.uploader.avatar ? (
                    <img
                      src={photo.uploader.avatar}
                      alt={photo.uploader.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <span>{photo.uploader.name}</span>
              </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Metadata */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {format(photo.uploadedAt, "PPP 'at' p")}
                    </span>
                  </div>
                  {photo.album && (
                    <div className="flex items-center gap-2 text-sm">
                      <FolderOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{photo.album}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {photo.tags.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Tag className="w-4 h-4" />
                      <span>Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Likes */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Heart className="w-4 h-4" />
                    <span>Likes</span>
                  </div>
                  <PhotoLikesList
                    likes={photo.likedBy}
                    photoTitle={photo.title}
                    onLike={() => onLike(photo.id)}
                  />
                </div>

                {/* Comments Section (Placeholder) */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Comments (0)
                  </Button>
                  {showComments && (
                    <div className="text-sm text-muted-foreground text-center py-4">
                      No comments yet
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Actions Footer */}
            <div className="p-4 border-t border-border flex gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => onDownload(photo.id)}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => onShare(photo.id)}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoLightbox;
