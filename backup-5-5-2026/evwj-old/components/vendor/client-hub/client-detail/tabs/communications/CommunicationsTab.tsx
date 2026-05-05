"use client";

import { useState, useMemo, useEffect } from "react";
import ChatView from "@/components/common/chat/ChatView";
import { ChatMessage } from "@/components/common/chat/types";
import { Client } from "../../../mockClients";
import { Phone, Video } from "lucide-react";

interface CommunicationsTabProps {
  client: Client;
  selectedEventId?: string | null;
  selectedProjectId?: string | null;
}

export default function CommunicationsTab({ client, selectedEventId, selectedProjectId }: CommunicationsTabProps) {
  // Filter messages based on selected event/project
  const filteredMessages = useMemo(() => {
    const allMessages = client.messages || [];
    
    if (!selectedEventId && !selectedProjectId) {
      // Show all messages (general + all project-specific)
      return allMessages;
    }
    
    // Filter by project
    if (selectedProjectId) {
      return allMessages.filter(
        (msg) => msg.projectId === selectedProjectId || !msg.projectId
      );
    }
    
    // Filter by event (show all messages for projects in that event + general)
    if (selectedEventId) {
      return allMessages.filter(
        (msg) => msg.eventId === selectedEventId || !msg.eventId
      );
    }
    
    return allMessages;
  }, [client.messages, selectedEventId, selectedProjectId]);

  const [messages, setMessages] = useState<ChatMessage[]>(
    filteredMessages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
      timestamp: msg.timestamp,
      isRead: msg.isRead,
    }))
  );

  // Update messages when filter changes
  useEffect(() => {
    setMessages(
      filteredMessages.map((msg) => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender,
        timestamp: msg.timestamp,
        isRead: msg.isRead,
      }))
  );
  }, [filteredMessages]);

  const handleSendMessage = (messageText: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: messageText,
      sender: "vendor",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    
    // Note: In a real implementation, you would also save this message to the client's messages
    // with the projectId and eventId attached for proper filtering
  };

  const handleCall = () => {
    // Handle call action
    console.log("Calling", client.name);
  };

  const handleVideoCall = () => {
    // Handle video call action
    console.log("Video calling", client.name);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-[calc(100vh-300px)] min-h-[600px] border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <ChatView
        contactName={client.name}
        contactInitials={getInitials(client.name)}
        contactSubtitle={client.email}
        messages={messages}
        onSendMessage={handleSendMessage}
        showCallButtons={true}
        onCall={handleCall}
        onVideoCall={handleVideoCall}
        vendorSenderType="vendor"
        conversationKey={client.id}
        autoScroll={true}
        autoScrollOnMount={true}
      />
    </div>
  );
}

