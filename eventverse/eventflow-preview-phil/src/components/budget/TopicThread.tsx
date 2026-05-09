import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, MessageSquare } from "lucide-react";
import TopicMessage from "./TopicMessage";
import type { CommunicationTopic } from "./VendorManagementHub";

interface TopicThreadProps {
  topic: CommunicationTopic | null;
  vendorName: string;
  onSendMessage: (topicId: string, content: string) => void;
}

const TopicThread = ({ topic, vendorName, onSendMessage }: TopicThreadProps) => {
  const [replyContent, setReplyContent] = useState("");

  if (!topic) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Select a topic</h3>
          <p className="text-sm text-muted-foreground">
            Choose a topic from the list to view the conversation
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSendMessage = () => {
    if (replyContent.trim()) {
      onSendMessage(topic.id, replyContent);
      setReplyContent("");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'logistics': return 'bg-orange-100 text-orange-800';
      case 'payment': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{topic.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${getCategoryColor(topic.category)}`}>
                {topic.category}
              </Badge>
              {topic.status === 'resolved' && (
                <Badge variant="outline" className="text-xs">Resolved</Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {topic.messageCount} messages
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-6 space-y-4">
        {topic.messages.map((message) => (
          <TopicMessage
            key={message.id}
            message={message}
            vendorName={vendorName}
          />
        ))}
      </CardContent>

      <div className="border-t p-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Type your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4 mr-2" />
              Attach
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!replyContent.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopicThread;
