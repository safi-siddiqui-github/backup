"use client";

import { useState } from "react";
import VendorCommunicationsSidebar from "./VendorCommunicationsSidebar";
import ChatView from "@/components/common/chat/ChatView";
import { ChatMessage } from "@/components/common/chat/types";
import { mockClients, Client } from "../client-hub/mockClients";

// Types
export interface VendorConversation {
  id: string;
  clientId: string;
  clientName: string;
  clientInitials: string;
  clientEmail: string;
  category: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

// Convert client messages to conversations
const createConversationsFromClients = (clients: Client[]): VendorConversation[] => {
  return clients
    .filter((client) => client.messages && client.messages.length > 0)
    .map((client) => {
      const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
      };

      const messages: ChatMessage[] = (client.messages || []).map((msg) => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender === "vendor" ? "vendor" : "user",
        timestamp: msg.timestamp,
        isRead: msg.isRead,
      }));

      const lastMessage = messages[messages.length - 1];
      const unreadCount = messages.filter((m) => !m.isRead && m.sender === "user").length;

      // Determine category based on source and status
      let category = "Archived";
      if (client.source === "marketplace") {
        category = "Marketplace";
      } else if (client.status === "active") {
        category = "Active Client";
      }

      return {
        id: `conv-${client.id}`,
        clientId: client.id,
        clientName: client.name,
        clientInitials: getInitials(client.name),
        clientEmail: client.email,
        category,
        lastMessage: lastMessage?.text || "No messages",
        lastMessageTime: lastMessage?.timestamp || "",
        unreadCount,
        messages,
      };
    });
};

// Shuffle array to mix up the order
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function VendorCommunicationsContent() {
  const [conversations, setConversations] = useState<VendorConversation[]>(() => {
    const allConversations = createConversationsFromClients(mockClients);
    // Mix up the order of conversations
    return shuffleArray(allConversations);
  });
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    conversations[0]?.id || null
  );

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    // Mark messages as read when conversation is selected
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: conv.messages.map((msg) => ({ ...msg, isRead: true })),
            unreadCount: 0,
          };
        }
        return conv;
      })
    );
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedConversationId) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: messageText,
      sender: "vendor",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      isRead: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageText,
            lastMessageTime: newMessage.timestamp,
          };
        }
        return conv;
      })
    );
  };

  const handleCall = () => {
    if (selectedConversation) {
      console.log("Calling", selectedConversation.clientName);
      // TODO: Implement call functionality
    }
  };

  const handleVideoCall = () => {
    if (selectedConversation) {
      console.log("Video calling", selectedConversation.clientName);
      // TODO: Implement video call functionality
    }
  };

  return (
    <div className="flex min-h-[500px] h-[calc(100vh-24rem)] lg:h-[650px] border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <VendorCommunicationsSidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />

      {/* Chat View */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col min-w-0">
          <ChatView
            contactName={selectedConversation.clientName}
            contactInitials={selectedConversation.clientInitials}
            contactSubtitle={selectedConversation.clientEmail}
            messages={selectedConversation.messages}
            onSendMessage={handleSendMessage}
            showCallButtons={true}
            onCall={handleCall}
            onVideoCall={handleVideoCall}
            vendorSenderType="vendor"
            conversationKey={selectedConversation.id}
            autoScroll={true}
            autoScrollOnMount={true}
            showBackButton={true}
            onBack={() => setSelectedConversationId(null)}
          />
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <p className="text-muted-foreground">Select a client to start chatting</p>
        </div>
      )}
    </div>
  );
}

