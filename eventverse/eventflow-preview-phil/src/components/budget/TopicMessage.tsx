import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import type { TopicMessage as TopicMessageType } from "./VendorManagementHub";

interface TopicMessageProps {
  message: TopicMessageType;
  vendorName: string;
}

const TopicMessage = ({ message, vendorName }: TopicMessageProps) => {
  const isHost = message.sender === 'host';

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className={`flex gap-3 ${isHost ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
        isHost ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`}>
        {message.senderName.charAt(0).toUpperCase()}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isHost ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{message.senderName}</span>
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
        </div>

        <div className={`rounded-lg p-3 ${
          isHost ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 border rounded bg-card hover:bg-accent transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs flex-1 truncate">{attachment.name}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-1">
            {message.reactions.map((reaction, idx) => (
              <Badge key={idx} variant="outline" className="text-xs px-2 py-0">
                {reaction.emoji} {reaction.count}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicMessage;
