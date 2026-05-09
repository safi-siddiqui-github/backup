import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Megaphone, 
  Clock, 
  CloudRain, 
  Car, 
  Shield, 
  Mail, 
  CheckCircle2, 
  Eye, 
  MousePointerClick,
  Download,
  ExternalLink,
  Copy,
  Send
} from "lucide-react";
import { Announcement } from "@/hooks/useAnnouncementStorage";
import { format } from "date-fns";
import RecipientTable from "./RecipientTable";

interface AnnouncementDetailViewProps {
  announcement: Announcement | null;
  open: boolean;
  onClose: () => void;
}

const AnnouncementDetailView = ({ announcement, open, onClose }: AnnouncementDetailViewProps) => {
  if (!announcement) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return AlertTriangle;
      case 'announcement': return Megaphone;
      case 'schedule-change': return Clock;
      case 'weather': return CloudRain;
      case 'parking': return Car;
      case 'safety': return Shield;
      default: return Megaphone;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'from-red-500 to-red-600';
      case 'announcement': return 'from-blue-500 to-blue-600';
      case 'schedule-change': return 'from-orange-500 to-orange-600';
      case 'weather': return 'from-cyan-500 to-cyan-600';
      case 'parking': return 'from-purple-500 to-purple-600';
      case 'safety': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-500 text-white',
      medium: 'bg-orange-500 text-white',
      low: 'bg-blue-500 text-white'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      sent: 'bg-green-500 text-white',
      sending: 'bg-blue-500 text-white',
      draft: 'bg-gray-500 text-white',
      scheduled: 'bg-purple-500 text-white',
      failed: 'bg-red-500 text-white'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const TypeIcon = getTypeIcon(announcement.type);
  const deliveryRate = announcement.totalRecipients > 0 
    ? Math.round((announcement.deliveredCount / announcement.totalRecipients) * 100)
    : 0;
  const openRate = announcement.deliveredCount > 0
    ? Math.round((announcement.openedCount / announcement.deliveredCount) * 100)
    : 0;
  const clickRate = announcement.openedCount > 0
    ? Math.round((announcement.clickedCount / announcement.openedCount) * 100)
    : 0;

  const getTargetAudienceText = () => {
    const { targetAudience } = announcement;
    
    if (targetAudience.type === 'all') {
      return 'All Attendees';
    }
    
    if (targetAudience.type === 'rsvp-groups' && targetAudience.rsvpGroupIds) {
      return `${targetAudience.rsvpGroupIds.length} RSVP Groups`;
    }
    
    if (targetAudience.type === 'ticket-tiers' && targetAudience.ticketTierIds) {
      return `${targetAudience.ticketTierIds.length} Ticket Tiers`;
    }
    
    if (targetAudience.type === 'custom' && targetAudience.customEmails) {
      return `${targetAudience.customEmails.length} Custom Recipients`;
    }
    
    return 'Unknown';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-14 h-14 bg-gradient-to-r ${getTypeColor(announcement.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <TypeIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-2xl mb-2">{announcement.title}</DialogTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  {getPriorityBadge(announcement.priority)}
                  {getStatusBadge(announcement.deliveryStatus)}
                  <span className="text-sm text-muted-foreground">
                    {announcement.sentAt 
                      ? `Sent ${format(announcement.sentAt, 'MMM d, yyyy h:mm a')}`
                      : `Created ${format(announcement.timestamp, 'MMM d, yyyy h:mm a')}`
                    }
                  </span>
                  <span className="text-sm text-muted-foreground">
                    by {announcement.createdBy}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Resend
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Content Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Message Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{announcement.content}</p>
              
              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Attachments:</p>
                  {announcement.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.type.toUpperCase()} • {(attachment.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {announcement.actionButton && (
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    {announcement.actionButton.text}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Overview */}
          {announcement.deliveryStatus === 'sent' && (
            <>
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span className="text-2xl font-bold">{announcement.totalRecipients}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Sent</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-2xl font-bold text-green-500">{deliveryRate}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Delivered ({announcement.deliveredCount})
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <span className="text-2xl font-bold text-blue-500">{openRate}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Opened ({announcement.openedCount})
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <MousePointerClick className="w-5 h-5 text-purple-500" />
                      <span className="text-2xl font-bold text-purple-500">{clickRate}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Clicked ({announcement.clickedCount})
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Target Audience Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Target Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {getTargetAudienceText()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      • {announcement.totalRecipients} total recipients
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recipients Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recipients ({announcement.recipients.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecipientTable recipients={announcement.recipients} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDetailView;
