import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { VendorProfile } from "@/types/budget";
import type { CommunicationTopic } from "./VendorManagementHub";
import TopicsList from "./TopicsList";
import TopicThread from "./TopicThread";
import NewTopicDialog from "./NewTopicDialog";
import { useToast } from "@/hooks/use-toast";

interface VendorCommunicationDetailsProps {
  vendor: VendorProfile;
  topics: CommunicationTopic[];
}

const VendorCommunicationDetails = ({ vendor, topics }: VendorCommunicationDetailsProps) => {
  const { toast } = useToast();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    topics.length > 0 ? topics[0].id : null
  );
  const [showNewTopicDialog, setShowNewTopicDialog] = useState(false);
  const [topicsList, setTopicsList] = useState<CommunicationTopic[]>(topics);

  const selectedTopic = topicsList.find(t => t.id === selectedTopicId) || null;

  const handleSendMessage = (topicId: string, content: string) => {
    setTopicsList(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          topicId,
          sender: 'host' as const,
          senderName: 'You',
          content,
          timestamp: new Date(),
          attachments: [],
        };
        return {
          ...topic,
          messages: [...topic.messages, newMessage],
          messageCount: topic.messageCount + 1,
          lastMessageAt: new Date(),
        };
      }
      return topic;
    }));

    toast({
      title: "Message sent",
      description: "Your message has been sent to the vendor.",
    });
  };

  const handleCreateTopic = (title: string, category: string, message: string) => {
    const newTopic: CommunicationTopic = {
      id: `topic-${Date.now()}`,
      vendorId: vendor.id,
      title,
      category: category as any,
      createdBy: 'host',
      createdAt: new Date(),
      lastMessageAt: new Date(),
      messageCount: 1,
      unreadCount: 0,
      status: 'active',
      messages: [
        {
          id: `msg-${Date.now()}`,
          topicId: `topic-${Date.now()}`,
          sender: 'host',
          senderName: 'You',
          content: message,
          timestamp: new Date(),
          attachments: [],
        }
      ]
    };

    setTopicsList(prev => [newTopic, ...prev]);
    setSelectedTopicId(newTopic.id);

    toast({
      title: "Topic created",
      description: "New conversation topic has been started.",
    });
  };

  return (
    <div className="h-[calc(100vh-300px)]">
      <div className="grid grid-cols-[350px_1fr] gap-4 h-full">
        {/* Topics List - Left Sidebar */}
        <Card className="overflow-hidden">
          <TopicsList
            topics={topicsList}
            selectedTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
            onNewTopic={() => setShowNewTopicDialog(true)}
            vendorName={vendor.name}
          />
        </Card>

        {/* Thread View - Right Panel */}
        <TopicThread
          topic={selectedTopic}
          vendorName={vendor.name}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* New Topic Dialog */}
      <NewTopicDialog
        open={showNewTopicDialog}
        onClose={() => setShowNewTopicDialog(false)}
        onCreateTopic={handleCreateTopic}
        vendorName={vendor.name}
      />
    </div>
  );
};

export default VendorCommunicationDetails;
