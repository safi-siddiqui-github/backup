import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Megaphone, 
  AlertTriangle, 
  Info, 
  CloudRain, 
  Car, 
  Shield,
  Calendar,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Announcement } from "@/types/announcement";
import { format } from "date-fns";

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
  onAcknowledge?: (id: string) => void;
  onToggleRead?: (id: string) => void;
}

const AnnouncementCard = ({ 
  announcement, 
  onClick, 
  onAcknowledge,
  onToggleRead 
}: AnnouncementCardProps) => {
  const getIcon = () => {
    switch (announcement.type) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'schedule-change':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'parking':
        return <Car className="w-5 h-5 text-purple-600" />;
      case 'safety':
        return <Shield className="w-5 h-5 text-green-600" />;
      default:
        return <Megaphone className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = () => {
    switch (announcement.type) {
      case 'urgent':
        return 'border-red-300 bg-red-50/50';
      case 'schedule-change':
        return 'border-orange-300 bg-orange-50/50';
      case 'weather':
        return 'border-blue-300 bg-blue-50/50';
      case 'parking':
        return 'border-purple-300 bg-purple-50/50';
      case 'safety':
        return 'border-green-300 bg-green-50/50';
      default:
        return 'border-gray-300 bg-gray-50/50';
    }
  };

  const getBorderAccent = () => {
    if (!announcement.isRead) {
      switch (announcement.type) {
        case 'urgent':
          return 'border-l-4 border-l-red-500';
        case 'schedule-change':
          return 'border-l-4 border-l-orange-500';
        case 'weather':
          return 'border-l-4 border-l-blue-500';
        case 'parking':
          return 'border-l-4 border-l-purple-500';
        case 'safety':
          return 'border-l-4 border-l-green-500';
        default:
          return 'border-l-4 border-l-gray-500';
      }
    }
    return '';
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${getTypeColor()} ${getBorderAccent()} ${
        !announcement.isRead ? 'ring-2 ring-primary/20' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className={`font-semibold ${!announcement.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {announcement.title}
                </h3>
                {!announcement.isRead && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    New
                  </Badge>
                )}
                {announcement.priority === 'high' && (
                  <Badge variant="destructive">High Priority</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {format(announcement.timestamp, 'MMM d, yyyy • h:mm a')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleRead?.(announcement.id);
              }}
              className="h-8 w-8 p-0"
            >
              {announcement.isRead ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
          {announcement.content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="capitalize">
              {announcement.type.replace('-', ' ')}
            </Badge>
            {announcement.attachments && announcement.attachments.length > 0 && (
              <Badge variant="outline">
                {announcement.attachments.length} attachment{announcement.attachments.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          {announcement.requiresAcknowledgement && !announcement.isAcknowledged && (
            <Button
              size="sm"
              variant="default"
              onClick={(e) => {
                e.stopPropagation();
                onAcknowledge?.(announcement.id);
              }}
              className="bg-primary"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Acknowledge
            </Button>
          )}
          
          {announcement.isAcknowledged && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Acknowledged
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
