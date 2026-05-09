import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Heart, Calendar } from "lucide-react";
import { PhotoLike } from "./types";
import { getInitials, getAvatarColor } from "./mockMediaData";
import { cn } from "@/lib/utils";

interface LikerProfileDialogProps {
  liker: PhotoLike | null;
  photoTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const LikerProfileDialog = ({
  liker,
  photoTitle,
  isOpen,
  onClose
}: LikerProfileDialogProps) => {
  if (!liker) return null;

  const initials = getInitials(liker.userName);
  const gradientColor = getAvatarColor(liker.userName);

  const handleEmail = () => {
    window.location.href = `mailto:${liker.userEmail}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative">
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white",
                  `bg-gradient-to-br ${gradientColor}`
                )}
              >
                {initials}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{liker.userName}</h3>
              <p className="text-sm text-muted-foreground">{liker.userEmail}</p>
            </div>
          </div>

          <Separator />

          {/* Like Info */}
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 mt-0.5 text-red-500 fill-current" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Liked Photo</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    "{photoTitle}"
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-accent/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Liked on</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(liker.likedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleEmail} className="flex-1 gap-2">
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LikerProfileDialog;
