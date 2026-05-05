"use client";

import { useState, useEffect } from "react";
import { Lead, LeadMessage } from "../mockLeads";
import { ChatView } from "@/components/common/chat";
import { ChatMessage } from "@/components/common/chat/types";

interface CommunicationsTabContentProps {
  lead: Lead;
}

export default function CommunicationsTabContent({ lead }: CommunicationsTabContentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    (lead.messages || []).map((msg) => ({
      ...msg,
      sender: msg.sender === "vendor" ? "vendor" : "client",
    }))
  );

  // Update messages when lead changes
  useEffect(() => {
    setMessages(
      (lead.messages || []).map((msg) => ({
        ...msg,
        sender: msg.sender === "vendor" ? "vendor" : "client",
      }))
    );
  }, [lead]);

  const handleSendMessage = (messageText: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "vendor",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const getClientInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex flex-col max-h-[70vh] h-[70vh] overflow-hidden">
      <ChatView
        contactName={lead.clientName}
        contactInitials={getClientInitials(lead.clientName)}
        contactSubtitle={`${lead.eventTitle} • ${lead.location} • ${lead.eventDate}`}
        messages={messages}
        onSendMessage={handleSendMessage}
        showCallButtons={true}
        autoScroll={true}
        vendorSenderType="vendor"
      />
    </div>
  );
}
