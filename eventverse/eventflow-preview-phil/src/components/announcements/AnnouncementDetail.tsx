import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Megaphone, 
  AlertTriangle, 
  Info, 
  CloudRain, 
  Car, 
  Shield,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { Announcement } from "@/types/announcement";
import { format } from "date-fns";

interface AnnouncementDetailProps {
  announcement: Announcement | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcknowledge?: (id: string) => void;
}

const AnnouncementDetail = ({ 
  announcement, 
  open, 
  onOpenChange,
  onAcknowledge 
}: AnnouncementDetailProps) => {
  if (!announcement) return null;

  const getIcon = () => {
    switch (announcement.type) {
      case 'urgent':
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'schedule-change':
        return <Calendar className="w-6 h-6 text-orange-600" />;
      case 'weather':
        return <CloudRain className="w-6 h-6 text-blue-600" />;
      case 'parking':
        return <Car className="w-6 h-6 text-purple-600" />;
      case 'safety':
        return <Shield className="w-6 h-6 text-green-600" />;
      default:
        return <Megaphone className="w-6 h-6 text-gray-600" />;
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'link':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {getIcon()}
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{announcement.title}</DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="capitalize">
                  {announcement.type.replace('-', ' ')}
                </Badge>
                {announcement.priority === 'high' && (
                  <Badge variant="destructive">High Priority</Badge>
                )}
                {announcement.isAcknowledged && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Acknowledged
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  {format(announcement.timestamp, 'MMMM d, yyyy • h:mm a')}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
          </div>

          {announcement.attachments && announcement.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Attachments</h4>
              <div className="space-y-2">
                {announcement.attachments.map((attachment) => (
                  <div 
                    key={attachment.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {getAttachmentIcon(attachment.type)}
                      <div>
                        <p className="font-medium text-sm">{attachment.name}</p>
                        {attachment.size && (
                          <p className="text-xs text-muted-foreground">
                            {(attachment.size / 1024).toFixed(1)} KB
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(attachment.url, '_blank')}
                    >
                      {attachment.type === 'link' ? (
                        <>
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {announcement.relatedScheduleItems && announcement.relatedScheduleItems.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Related Schedule Items</h4>
              <div className="space-y-1">
                {announcement.relatedScheduleItems.map((item, idx) => (
                  <div key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {announcement.requiresAcknowledgement && (
            <div className="pt-4 border-t">
              {!announcement.isAcknowledged ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900 mb-3">
                    This announcement requires your acknowledgement. Please click the button below to confirm you've read and understood this message.
                  </p>
                  <Button
                    onClick={() => {
                      onAcknowledge?.(announcement.id);
                      onOpenChange(false);
                    }}
                    className="w-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    I Understand & Acknowledge
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        You acknowledged this announcement
                      </p>
                      {announcement.acknowledgedAt && (
                        <p className="text-xs text-green-700">
                          {format(announcement.acknowledgedAt, 'MMM d, yyyy • h:mm a')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDetail;
