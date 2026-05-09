
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Share, ExternalLink } from "lucide-react";
import PublicProfilePreview from "./PublicProfilePreview";

interface ProfilePreviewDialogProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const ProfilePreviewDialog = ({ open, onClose, onEdit }: ProfilePreviewDialogProps) => {
  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.origin + '/profile/share');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Public Profile Preview</DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Page
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            This is how your profile appears to other users and potential event attendees.
          </p>
        </DialogHeader>
        
        <div className="mt-6">
          <PublicProfilePreview />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePreviewDialog;
