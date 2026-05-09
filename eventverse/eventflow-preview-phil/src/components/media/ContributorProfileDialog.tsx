import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Upload, Eye, Calendar, Camera } from "lucide-react";
import { Contributor } from "./types";
import { getInitials, getAvatarColor } from "./mockMediaData";
import { cn } from "@/lib/utils";

interface ContributorProfileDialogProps {
  contributor: Contributor | null;
  albumName: string;
  totalPhotos: number;
  isOpen: boolean;
  onClose: () => void;
}

const ContributorProfileDialog = ({
  contributor,
  albumName,
  totalPhotos,
  isOpen,
  onClose
}: ContributorProfileDialogProps) => {
  if (!contributor) return null;

  const initials = getInitials(contributor.name);
  const gradientColor = getAvatarColor(contributor.name);

  const handleEmail = () => {
    window.location.href = `mailto:${contributor.email}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contributor Profile</DialogTitle>
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
              {contributor.role === 'uploader' && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                  <Upload className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{contributor.name}</h3>
              <p className="text-sm text-muted-foreground">{contributor.email}</p>
            </div>
            <Badge variant={contributor.role === 'uploader' ? 'default' : 'secondary'}>
              {contributor.role === 'uploader' ? (
                <>
                  <Upload className="w-3 h-3 mr-1" />
                  Uploader
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 mr-1" />
                  Viewer
                </>
              )}
            </Badge>
          </div>

          <Separator />

          {/* Statistics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Activity in {albumName}</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-accent/50 rounded-lg text-center">
                <Camera className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-2xl font-bold">{contributor.uploadCount}</div>
                <div className="text-xs text-muted-foreground">Photos Uploaded</div>
              </div>
              <div className="p-3 bg-accent/50 rounded-lg text-center">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                <div className="text-sm font-semibold">
                  {new Date(contributor.joinedAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-muted-foreground">Joined</div>
              </div>
            </div>
          </div>

          {contributor.uploadCount > 0 && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-2">
                <Upload className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Upload Contribution</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {contributor.uploadCount} of {totalPhotos} photos ({Math.round((contributor.uploadCount / totalPhotos) * 100)}%)
                  </div>
                </div>
              </div>
            </div>
          )}

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

export default ContributorProfileDialog;
