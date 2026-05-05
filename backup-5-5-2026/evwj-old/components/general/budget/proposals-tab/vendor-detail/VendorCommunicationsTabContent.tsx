"use client";

import { useState, useEffect } from "react";
import { Vendor } from "../../vendor-mgmt-tab/VendorListView";
import { ChatView } from "@/components/common/chat";
import { ChatMessage } from "@/components/common/chat/types";

interface VendorCommunicationsTabContentProps {
  vendor: Vendor;
}

// Mock messages for the vendor
const generateMockMessages = (vendorName: string): ChatMessage[] => [
  {
    id: "1",
    text: `Hi! This is ${vendorName}. I wanted to confirm the details for the upcoming milestone.`,
    sender: "vendor",
    timestamp: "10:30 AM",
    isRead: true,
  },
  {
    id: "2",
    text: "Hello! Yes, I'd like to discuss the timeline and deliverables for the next phase.",
    sender: "client",
    timestamp: "10:45 AM",
    isRead: true,
  },
  {
    id: "3",
    text: "Perfect! I've prepared a detailed breakdown of what we'll deliver. When would be a good time to review it?",
    sender: "vendor",
    timestamp: "11:00 AM",
    isRead: true,
  },
  {
    id: "4",
    text: "How about tomorrow afternoon? I'm available after 2 PM.",
    sender: "client",
    timestamp: "11:15 AM",
    isRead: true,
  },
];

export default function VendorCommunicationsTabContent({ vendor }: VendorCommunicationsTabContentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    generateMockMessages(vendor.name)
  );

  // Update messages when vendor changes
  useEffect(() => {
    setMessages(generateMockMessages(vendor.name));
  }, [vendor]);

  const handleSendMessage = (messageText: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "client",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const getVendorInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex flex-col max-h-[70vh] h-[70vh] overflow-hidden">
      <ChatView
        contactName={vendor.name}
        contactInitials={getVendorInitials(vendor.name)}
        contactSubtitle={`${vendor.category} • ${vendor.status}`}
        messages={messages}
        onSendMessage={handleSendMessage}
        showCallButtons={true}
        autoScroll={true}
        vendorSenderType="user"
      />
    </div>
  );
}

