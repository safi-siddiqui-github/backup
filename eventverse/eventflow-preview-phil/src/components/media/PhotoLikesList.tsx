import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Heart, Search, ChevronDown } from "lucide-react";
import { PhotoLike } from "./types";
import { getInitials, getAvatarColor } from "./mockMediaData";
import { cn } from "@/lib/utils";
import LikerProfileDialog from "./LikerProfileDialog";

interface PhotoLikesListProps {
  likes: PhotoLike[];
  photoTitle: string;
  onLike?: () => void;
  isLiked?: boolean;
}

const PhotoLikesList = ({ likes, photoTitle, onLike, isLiked = false }: PhotoLikesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLiker, setSelectedLiker] = useState<PhotoLike | null>(null);

  const filteredLikes = likes.filter(like =>
    like.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    like.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayLikes = likes.slice(0, 3);
  const remainingCount = Math.max(0, likes.length - 3);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) {
      onLike();
    }
  };

  if (likes.length === 0) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLikeClick}
        className="h-8 px-2 gap-1"
      >
        <Heart className={cn("w-3 h-3", isLiked && "fill-current text-red-500")} />
        <span className="text-xs">0</span>
      </Button>
    );
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLikeClick}
          className="h-8 px-2"
        >
          <Heart className={cn("w-3 h-3", isLiked && "fill-current text-red-500")} />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-2">
                  {displayLikes.map((like, index) => {
                    const initials = getInitials(like.userName);
                    const gradientColor = getAvatarColor(like.userName);
                    
                    return (
                      <div
                        key={like.userId}
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white border-2 border-background",
                          "transition-transform hover:scale-110 hover:z-10",
                          `bg-gradient-to-br ${gradientColor}`
                        )}
                        style={{ zIndex: 10 - index }}
                      >
                        {initials}
                      </div>
                    );
                  })}
                </div>
                {remainingCount > 0 && (
                  <span className="text-xs text-muted-foreground">+{remainingCount}</span>
                )}
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="font-semibold">Liked by {likes.length} {likes.length === 1 ? 'person' : 'people'}</h3>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredLikes.map((like, index) => {
                  const initials = getInitials(like.userName);
                  const gradientColor = getAvatarColor(like.userName);
                  const timeAgo = getTimeAgo(like.likedAt);
                  
                  return (
                    <div
                      key={like.userId}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setSelectedLiker(like)}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white",
                          `bg-gradient-to-br ${gradientColor}`
                        )}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{like.userName}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          Liked {timeAgo}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredLikes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <LikerProfileDialog
        liker={selectedLiker}
        photoTitle={photoTitle}
        isOpen={!!selectedLiker}
        onClose={() => setSelectedLiker(null)}
      />
    </>
  );
};

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  return 'just now';
}

export default PhotoLikesList;
