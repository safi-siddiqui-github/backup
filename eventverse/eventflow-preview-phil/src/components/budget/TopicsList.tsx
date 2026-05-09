import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MessageSquare } from "lucide-react";
import type { CommunicationTopic } from "./VendorManagementHub";

interface TopicsListProps {
  topics: CommunicationTopic[];
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string) => void;
  onNewTopic: () => void;
  vendorName: string;
}

const TopicsList = ({ topics, selectedTopicId, onSelectTopic, onNewTopic, vendorName }: TopicsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'logistics': return 'bg-orange-100 text-orange-800';
      case 'payment': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastMessage = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-lg">Topics</CardTitle>
          <Button size="sm" onClick={onNewTopic}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto space-y-2 pt-0">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No topics yet</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={onNewTopic}>
              Start First Topic
            </Button>
          </div>
        ) : (
          filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                selectedTopicId === topic.id ? 'bg-accent border-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm line-clamp-1 flex-1">{topic.title}</h4>
                {topic.unreadCount > 0 && (
                  <Badge variant="default" className="ml-2 h-5 min-w-5 px-1.5 text-xs">
                    {topic.unreadCount}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-xs ${getCategoryColor(topic.category)}`}>
                  {topic.category}
                </Badge>
                {topic.status === 'resolved' && (
                  <Badge variant="outline" className="text-xs">Resolved</Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{topic.messageCount} messages</span>
                <span>{formatLastMessage(topic.lastMessageAt)}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </div>
  );
};

export default TopicsList;
