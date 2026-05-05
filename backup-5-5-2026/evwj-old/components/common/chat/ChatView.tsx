"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Video, Paperclip, Send, Check } from "lucide-react";
import { ChatMessage } from "./types";
import { cn } from "@/lib/utils";

export interface ChatViewProps {
  // Contact/Chat Information
  contactName: string;
  contactInitials?: string;
  contactSubtitle?: string;
  avatarClassName?: string;
  
  // Messages
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  
  // Optional features
  showCallButtons?: boolean;
  onCall?: () => void;
  onVideoCall?: () => void;
  
  // Optional header actions
  headerActions?: React.ReactNode;
  
  // Optional input placeholder
  inputPlaceholder?: string;
  
  // Optional auto-scroll
  autoScroll?: boolean;
  autoScrollOnMount?: boolean; // Whether to scroll on initial mount (default: false)
  
  // Optional back button (for mobile)
  onBack?: () => void;
  showBackButton?: boolean;
  
  // Message sender mapping - which sender should appear as "vendor" (right-aligned, blue)
  vendorSenderType?: "vendor" | "user";
  
  // Optional key to reset scroll tracking when conversation changes
  conversationKey?: string;
}

export default function ChatView({
  contactName,
  contactInitials,
  contactSubtitle,
  avatarClassName,
  messages,
  onSendMessage,
  showCallButtons = true,
  onCall,
  onVideoCall,
  headerActions,
  inputPlaceholder = "Type your message...",
  autoScroll = true,
  autoScrollOnMount = false,
  onBack,
  showBackButton = false,
  vendorSenderType = "vendor",
  conversationKey,
}: ChatViewProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const previousMessagesLength = useRef(messages.length);
  const previousConversationKey = useRef(conversationKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset previous messages length when conversation changes
  useEffect(() => {
    if (conversationKey && conversationKey !== previousConversationKey.current) {
      previousMessagesLength.current = messages.length;
      previousConversationKey.current = conversationKey;
    }
  }, [conversationKey, messages.length]);

  // Auto-scroll only when new messages are added (not on initial mount or when switching conversations)
  useEffect(() => {
    if (autoScroll) {
      const hasNewMessage = messages.length > previousMessagesLength.current;
      const conversationChanged = conversationKey && conversationKey !== previousConversationKey.current;
      
      // Only scroll if:
      // 1. New message was added (not on initial mount or conversation change)
      // 2. OR autoScrollOnMount is true and it's the initial mount
      if (hasNewMessage && !conversationChanged) {
        // New message added - scroll to bottom
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } else if (autoScrollOnMount && conversationChanged) {
        // Scroll on mount if enabled and conversation just changed
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
      
      if (!conversationChanged) {
        previousMessagesLength.current = messages.length;
      }
    }
  }, [messages.length, autoScroll, autoScrollOnMount, conversationKey]);

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const initials = contactInitials || getInitials(contactName);
  
  // Determine if message should be right-aligned (vendor style)
  const isVendorMessage = (msg: ChatMessage) => {
    return msg.sender === vendorSenderType;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="border-b shrink-0 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between gap-2 p-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="shrink-0 h-9 w-9 lg:hidden"
              >
                ←
              </Button>
            )}
            
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback
                className={cn(
                  "text-xs bg-linear-to-r from-purple-600 to-cyan-600 text-white",
                  avatarClassName
                )}
              >
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {contactName}
              </p>
              {contactSubtitle && (
                <p
                  className="text-xs text-muted-foreground line-clamp-2"
                  style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                >
                  {contactSubtitle}
                </p>
              )}
            </div>
          </div>

          {/* Desktop actions - Right Side */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {showCallButtons && (
              <>
                {onCall && (
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onCall}>
                    <Phone className="mr-1.5 h-3.5 w-3.5" /> Call
                  </Button>
                )}
                {onVideoCall && (
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={onVideoCall}>
                    <Video className="mr-1.5 h-3.5 w-3.5" /> Video
                  </Button>
                )}
              </>
            )}
            {headerActions}
          </div>
        </div>

        {/* Mobile Bottom Section - Call/Video Buttons */}
        {showCallButtons && (onCall || onVideoCall) && (
          <div className="lg:hidden px-3 pb-2 flex items-center gap-2 w-full">
            {onCall && (
              <Button variant="outline" size="sm" className="flex-1 text-xs h-8" onClick={onCall}>
                <Phone className="h-3.5 w-3.5 mr-1.5" /> Call
              </Button>
            )}
            {onVideoCall && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
                onClick={onVideoCall}
              >
                <Video className="h-3.5 w-3.5 mr-1.5" /> Video
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Messages Area - Fills all remaining space and scrolls */}
      <div className="flex-1 overflow-y-auto min-h-0 max-h-full p-3 space-y-3 bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
        {messages.length > 0 ? (
          <>
            {messages.map((msg) => {
              const isVendor = isVendorMessage(msg);
              return (
                <div
                  key={msg.id}
                  className={cn("flex w-full px-0 shrink-0", isVendor ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[95%] min-w-0 rounded-lg px-3 py-2 shrink-0",
                      isVendor
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-white text-foreground dark:text-black border border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <p
                      className="text-xs leading-relaxed whitespace-pre-wrap"
                      style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                    >
                      {msg.text}
                    </p>

                    <div
                      className={cn(
                        "flex items-center gap-1 mt-1.5 text-[10px] shrink-0",
                        isVendor ? "text-blue-100" : "text-muted-foreground"
                      )}
                    >
                      <span className="whitespace-nowrap">{msg.timestamp}</span>
                      {isVendor && <Check className="h-3 w-3 shrink-0" />}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-full">
            <p className="text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="p-3 border-t shrink-0 w-full bg-white dark:bg-gray-900">
        <div className="flex items-center gap-1.5 min-w-0 w-full">
          <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>

          <Input
            placeholder={inputPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 text-xs h-8 min-w-0"
          />

          <Button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 h-8 w-8"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

